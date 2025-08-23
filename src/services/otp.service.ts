import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp, OtpDocument } from '../schemas/otpSchema.schema';
import { TradieDocument } from '../schemas/tradieSchema.schema';
import { SendVerificationEmailService } from './verification.service';
import { DB_PROVIDERS_INJECTION_TOKENS } from '../constants/db.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OtpService {
    constructor(
        @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
        @Inject(DB_PROVIDERS_INJECTION_TOKENS.TRADIE_MODEL)
        private tradieModel: Model<TradieDocument>,
        private verificationService: SendVerificationEmailService,
        private jwtService: JwtService,
    ) { }

    async createOtp(email: string): Promise<{ success: boolean; message: string }> {
        try {
            // Check if user already exists
            const existingUser = await this.tradieModel.findOne({ email });
            if (existingUser) {
                return { success: false, message: 'User already exists with this email' };
            }

            // Generate OTP
            const otp = this.generateOtp();

            // Send email FIRST
            const emailResult = await this.verificationService.sendVerficationEmail(
                email.split('@')[0],
                email,
                otp
            );

            if (!emailResult.success) {
                return { success: false, message: 'Failed to send OTP email' };
            }

            // Only save to database if email was sent successfully
            const otpDoc = new this.otpModel({
                email,
                otp,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
            });

            await otpDoc.save();

            return { success: true, message: 'OTP created and email sent successfully' };
        } catch (error) {
            console.error('Error creating OTP:', error);
            return { success: false, message: 'Failed to create OTP' };
        }
    }

    async verifyOtp(email: string, otp: string): Promise<{ success: boolean; message: string; user?: any }> {
        try {
            const otpDoc = await this.otpModel.findOne({ email, otp });

            if (!otpDoc) {
                return { success: false, message: 'Invalid OTP' };
            }

            // Check if OTP is expired
            if (otpDoc.expiresAt && new Date() > otpDoc.expiresAt) {
                await this.otpModel.findByIdAndDelete(otpDoc._id);
                return { success: false, message: 'OTP has expired' };
            }

            // Check if user already exists
            const existingUser = await this.tradieModel.findOne({ email });
            if (existingUser) {
                // Delete the OTP after verification
                await this.otpModel.findByIdAndDelete(otpDoc._id);
                return { success: false, message: 'User already exists with this email' };
            }

            // Create new user (signup)
            const tradie = await this.tradieModel.create({
                email,
                authProvider: 'email',
                isVerified: true
            });
            console.log(tradie, "dekh");
            // Delete the OTP after successful verification and signup
            await this.otpModel.findByIdAndDelete(otpDoc._id);
            const accessToken = await this.jwtService.signAsync({ id: tradie._id }, { expiresIn: '1h' });
            const refreshToken = await this.jwtService.signAsync({ id: tradie._id }, { expiresIn: '7d' });
            return {
                success: true,
                message: 'OTP verified and user registered successfully',
                user: {
                    id: tradie._id,
                    email: tradie.email,
                    accessToken,
                    refreshToken
                }
            };
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return { success: false, message: 'Failed to verify OTP' };
        }
    }

    private generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}

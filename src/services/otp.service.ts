import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp, OtpDocument } from '../schemas/otpSchema.schema';
import { SendVerificationEmailService } from './verification.service';

@Injectable()
export class OtpService {
    constructor(
        @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
        private verificationService: SendVerificationEmailService,
    ) { }

    async createOtp(email: string): Promise<{ success: boolean; message: string }> {
        try {
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

    async verifyOtp(email: string, otp: string): Promise<{ success: boolean; message: string }> {
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

            // Delete the OTP after successful verification
            await this.otpModel.findByIdAndDelete(otpDoc._id);

            return { success: true, message: 'OTP verified successfully' };
        } catch (error) {
            console.error('Error verifying OTP:', error);
            return { success: false, message: 'Failed to verify OTP' };
        }
    }

    private generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}

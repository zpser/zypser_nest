import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Otp, OtpSchema } from '../schemas/otpSchema.schema';
import { OtpService } from '../services/otp.service';
import { SendVerificationEmailService } from '../services/verification.service';
import { OtpController } from '../controllers/otp.controller';
import { TradieProvider } from '../provider/authProvider/tradie.provider';
import { databaseProvider } from '../provider/database.provider';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Otp.name, schema: OtpSchema }
        ]),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'your-secret-key',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [OtpController],
    providers: [OtpService, SendVerificationEmailService, databaseProvider, TradieProvider],
    exports: [OtpService, SendVerificationEmailService],
})
export class OtpModule { }

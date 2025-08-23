import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET') || 'your-secret-key',
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [OtpController],
    providers: [OtpService, SendVerificationEmailService, databaseProvider, TradieProvider],
    exports: [OtpService, SendVerificationEmailService],
})
export class OtpModule { }

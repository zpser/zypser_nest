import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from '../schemas/otpSchema.schema';
import { OtpService } from '../services/otp.service';
import { SendVerificationEmailService } from '../services/verification.service';
import { OtpController } from '../controllers/otp.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Otp.name, schema: OtpSchema }
        ])
    ],
    controllers: [OtpController],
    providers: [OtpService, SendVerificationEmailService],
    exports: [OtpService, SendVerificationEmailService],
})
export class OtpModule { }

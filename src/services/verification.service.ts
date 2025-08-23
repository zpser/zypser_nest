
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class SendVerificationEmailService {
    private resend: Resend;

    constructor(private configService: ConfigService) {
        this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY') ?? "");
    }
    async sendVerficationEmail(
        username: string,
        email: string,
        verifyCode: string
    ): Promise<{ success: boolean; message: string }> {
        try {
            console.log('Verification service: Starting email send to:', email);
            console.log('API Key:', this.configService.get<string>('RESEND_API_KEY') ? 'Present' : 'Missing');

            const result = await this.resend.emails.send({
                from: 'no-reply@zypser.com.au',
                to: email,
                subject: 'Email Verification',
                html: `<h1>Email Verification</h1><p>Hello ${username}, your verification code is: ${verifyCode}</p>`,
            });
            console.log('Resend API result:', result, "dekh");
            return { success: true, message: "Email Verfication Successful" }
        } catch (emailError) {
            console.error("Error while sending the verify code:", emailError);
            return { success: false, message: "email verification failed" }
        }
    }

}
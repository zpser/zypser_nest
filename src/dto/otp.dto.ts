import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class SendOtpDto {
    @ApiProperty({
        description: 'Email address to send OTP to',
        example: 'user@example.com',
    })
    @IsEmail()
    email: string;
}

export class VerifyOtpDto {
    @ApiProperty({
        description: 'Email address',
        example: 'user@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: '6-digit OTP code',
        example: '123456',
        minLength: 6,
        maxLength: 6,
    })
    @IsString()
    @Length(6, 6)
    otp: string;
}

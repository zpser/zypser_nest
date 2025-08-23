import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { OtpService } from '../services/otp.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendOtpDto, VerifyOtpDto } from '../dto/otp.dto';

@Controller('otp')
export class OtpController {
    constructor(private readonly otpService: OtpService) { }

    @Post('send')
    @ApiOperation({ summary: 'Send OTP to email' })
    @ApiResponse({ status: 200, description: 'OTP sent successfully' })
    @ApiResponse({ status: 400, description: 'Invalid email' })
    async sendOtp(@Body() body: SendOtpDto) {
        try {
            const result = await this.otpService.createOtp(body.email);
            return result;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('verify')
    @ApiOperation({ summary: 'Verify OTP' })
    @ApiResponse({ status: 200, description: 'OTP verified successfully' })
    @ApiResponse({ status: 400, description: 'Invalid or expired OTP' })
    async verifyOtp(@Body() body: VerifyOtpDto) {
        return await this.otpService.verifyOtp(body.email, body.otp);
    }
}

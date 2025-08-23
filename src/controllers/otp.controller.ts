import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { OtpService } from '../services/otp.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendOtpDto, VerifyOtpDto } from '../dto/otp.dto';

@ApiTags('OTP & Registration')
@Controller('otp')
export class OtpController {
    constructor(private readonly otpService: OtpService) { }

    @Post('send')
    @ApiOperation({
        summary: 'Send OTP to email',
        description: 'Send OTP to email for registration. Checks if user already exists.'
    })
    @ApiResponse({ status: 200, description: 'OTP sent successfully' })
    @ApiResponse({ status: 400, description: 'Invalid email or user already exists' })
    async sendOtp(@Body() body: SendOtpDto) {
        try {
            const result = await this.otpService.createOtp(body.email);
            return result;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('verify')
    @ApiOperation({
        summary: 'Verify OTP and Register User',
        description: 'Verify OTP and automatically register the user. This combines OTP verification and user signup.'
    })
    @ApiResponse({
        status: 200,
        description: 'OTP verified and user registered successfully',
        schema: {
            type: 'object',
            properties: {
                success: { type: 'boolean', example: true },
                message: { type: 'string', example: 'OTP verified and user registered successfully' },
                user: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                        email: { type: 'string', example: 'user@example.com' }
                    }
                }
            }
        }
    })
    @ApiResponse({ status: 400, description: 'Invalid or expired OTP, or user already exists' })
    async verifyOtp(@Body() body: VerifyOtpDto) {
        return await this.otpService.verifyOtp(body.email, body.otp);
    }
}

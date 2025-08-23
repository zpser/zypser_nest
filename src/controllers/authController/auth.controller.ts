import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SigninDto } from "src/dto/auth.dto";
import { AuthService } from "src/services/authService.service";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    // Note: Signup is now handled by POST /otp/verify endpoint
    // This combines OTP verification and user registration in one step
}
import { Module } from "@nestjs/common";
import { AuthController } from "src/controllers/authController/auth.controller";
import { AuthService } from "src/services/authService.service";
import { databaseProvider } from "src/provider/database.provider";
import { TradieProvider } from "src/provider/authProvider/tradie.provider";
import { OtpProvider } from "src/provider/authProvider/otp.provider";

@Module({
    controllers: [AuthController],
    providers: [AuthService, databaseProvider, TradieProvider, OtpProvider],
})
export class AuthModule { }
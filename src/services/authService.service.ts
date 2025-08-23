import { Inject, Injectable, BadRequestException } from "@nestjs/common";
import { Model } from "mongoose";
import { DB_PROVIDERS_INJECTION_TOKENS } from "src/constants/db.constants";
import { OtpDocument } from "src/schemas/otpSchema.schema";
import { TradieDocument } from "src/schemas/tradieSchema.schema";

@Injectable()
export class AuthService {
    constructor(
        @Inject(DB_PROVIDERS_INJECTION_TOKENS.TRADIE_MODEL)
        private tradieModel: Model<TradieDocument>,
        @Inject(DB_PROVIDERS_INJECTION_TOKENS.OTP_MODEL)
        private otpModel: Model<OtpDocument>,
    ) { }

    // Note: User registration is now handled by the OTP service
    // when OTP is verified, the user is automatically created
}
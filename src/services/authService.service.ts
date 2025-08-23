import { Inject, Injectable } from "@nestjs/common";
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


    async signUp(signUpDto: { email: string, password: string }) {
        let isOtpValid = false;
        const { email, password } = signUpDto;
        const ExistingOtp = await this.otpModel.findOne({ email });
        if (ExistingOtp) {
            await this.otpModel.deleteMany({ email: ExistingOtp.email });
            isOtpValid = true;
        }
        if (isOtpValid) {
            const tradie = await this.tradieModel.create({ email, password });
            return tradie;
        }

    }



}
import { Provider } from "@nestjs/common";
import { Connection, model } from "mongoose";
import { DB_PROVIDERS_INJECTION_TOKENS } from "src/constants/db.constants";
import { DB_TABLES } from "src/constants/dbTables.constants";
import { OtpSchema } from "src/schemas/otpSchema.schema";

export const OtpProvider: Provider = {
    provide: DB_PROVIDERS_INJECTION_TOKENS.OTP_MODEL,
    useFactory: (connection: Connection) => connection.model(DB_TABLES.OTP, OtpSchema),
    inject: [DB_PROVIDERS_INJECTION_TOKENS.DATABASE_CONNECTION]
}

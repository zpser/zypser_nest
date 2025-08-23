import { Inject, Provider } from "@nestjs/common";
import { DB_PROVIDERS_INJECTION_TOKENS } from "src/constants/db.constants";
import * as mongoose from 'mongoose';
import { ConfigService } from "@nestjs/config";

export const databaseProvider: Provider = {
    provide: DB_PROVIDERS_INJECTION_TOKENS.DATABASE_CONNECTION,
    useFactory: (configService: ConfigService): Promise<typeof mongoose> => {

        return mongoose.connect(configService.get('DATABASE_URI') ?? "");
    },
    inject: [ConfigService]
}
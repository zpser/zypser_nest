import { Provider } from "@nestjs/common";
import { Connection, model } from "mongoose";
import { DB_PROVIDERS_INJECTION_TOKENS } from "src/constants/db.constants";
import { DB_TABLES } from "src/constants/dbTables.constants";
import { TradieSchema } from "src/schemas/tradieSchema.schema";

export const TradieProvider: Provider = {
    provide: DB_PROVIDERS_INJECTION_TOKENS.TRADIE_MODEL,
    useFactory: (connection: Connection) => connection.model(DB_TABLES.TRADIE, TradieSchema),
    inject: [DB_PROVIDERS_INJECTION_TOKENS.DATABASE_CONNECTION]
}
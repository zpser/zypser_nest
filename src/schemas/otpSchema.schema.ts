

import { model } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
export type OtpDocument = Otp & Document;

@Schema({
    collection: 'otp',
    timestamps: true,
})
export class Otp {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    otp: string;

    @Prop({ required: true })
    expiresAt: Date;
}


export const OtpSchema = SchemaFactory.createForClass(Otp);




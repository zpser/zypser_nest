import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TradieDocument = Tradie & Document;

@Schema()
export class DocumentSchema {
    @Prop()
    fileName: string;

    @Prop()
    url: string;

    @Prop({ default: false })
    isVerified: boolean;

    @Prop()
    uploadedAt: Date;
}

@Schema({
    collection: 'tradie',
    timestamps: true,
})
export class Tradie {
    @Prop({
        lowercase: true,
        unique: true,
        sparse: true,
    })
    email?: string;

    @Prop({
        unique: true,
        sparse: true,
        partialFilterExpression: { mobileNumber: { $exists: true, $ne: null } },
    })
    mobileNumber?: string;

    @Prop({ default: false })
    isVerified: boolean;

    @Prop({
        enum: ['email', 'phone', 'google', 'apple'],
        required: true,
    })
    authProvider: 'email' | 'phone' | 'google' | 'apple';

    @Prop({
        unique: true,
        sparse: true,
    })
    googleId?: string;

    @Prop({
        unique: true,
        sparse: true,
    })
    appleId?: string;

    @Prop()
    tradieName?: string;

    @Prop()
    companyName?: string;

    @Prop()
    businessPhone?: string;

    @Prop({
        unique: true,
        sparse: true
    })
    abn?: string;

    @Prop()
    street?: string;

    @Prop()
    suburb?: string;

    @Prop()
    state?: string;

    @Prop()
    postalCode?: string;

    @Prop({ type: [String] })
    businessType?: string[];

    @Prop({ type: [String], default: [] })
    businessCategory?: string[];

    @Prop({ default: false })
    isProfileComplete: boolean;

    @Prop({ type: [DocumentSchema], default: [] })
    documents?: DocumentSchema[];
}

export const TradieSchema = SchemaFactory.createForClass(Tradie);
export const DocumentSchemaSchema = SchemaFactory.createForClass(DocumentSchema);

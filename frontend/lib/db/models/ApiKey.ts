import mongoose, { Schema, Document } from 'mongoose';

export interface IApiKey extends Document {
    name: string;
    key: string;
    isActive: boolean;
    lastUsedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const ApiKeySchema: Schema = new Schema(
    {
        name: { type: String, required: true }, // e.g., "Marketing Website"
        key: { type: String, required: true, unique: true }, // The actual hashed or plain UUID key
        isActive: { type: Boolean, default: true },
        lastUsedAt: { type: Date },
    },
    { timestamps: true, collection: 'apikeys' }
);

ApiKeySchema.index({ key: 1 });

export const ApiKey = mongoose.models.ApiKey || mongoose.model<IApiKey>('ApiKey', ApiKeySchema);

import mongoose, { Document, Schema } from 'mongoose';

export interface IAICache extends Document {
  promptHash: string;
  response: string;
  createdAt: Date;
}

const aiCacheSchema = new Schema<IAICache>({
  promptHash: { type: String, required: true, unique: true },
  response: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '30d' } // Auto-delete after 30 days
});

export const AICache = mongoose.models.AICache || mongoose.model<IAICache>('AICache', aiCacheSchema);

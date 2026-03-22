import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  source: string; // e.g. "Main Website", "Landing Page A"
  data: Record<string, any>; // Flexible form data
  status: 'new' | 'contacted' | 'converted' | 'archived';
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  source: { type: String, required: true, default: 'External Source' },
  data: { type: Schema.Types.Map, of: Schema.Types.Mixed, required: true },
  status: { type: String, enum: ['new', 'contacted', 'converted', 'archived'], default: 'new' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

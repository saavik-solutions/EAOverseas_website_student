import mongoose, { Schema, Document } from 'mongoose';
import './User'; // Force User model registration

export interface INotification extends Document {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  userId?: mongoose.Types.ObjectId; // If null, it's a global notification
  targetId?: string; // e.g. Post ID
  targetType?: 'post' | 'comment' | 'global';
  read: boolean;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  type: { type: String, enum: ['info', 'success', 'warning', 'error'], default: 'info' },
  message: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  targetId: { type: String, default: null },
  targetType: { type: String, enum: ['post', 'comment', 'global'], default: null },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema);

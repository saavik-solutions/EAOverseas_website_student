import mongoose, { Schema, Document } from 'mongoose';
import './User'; // Force User model registration

export interface ICommentReply {
    userId?: mongoose.Schema.Types.ObjectId;
    userIp?: string;
    userName?: string;
    text: string;
    createdAt: Date;
}

export interface IComment {
    userId?: mongoose.Schema.Types.ObjectId;
    userIp?: string;
    userName?: string;
    text: string;
    replies?: ICommentReply[];
    createdAt: Date;
}

export interface IPost extends Document {
    authorId: mongoose.Schema.Types.ObjectId;
    authorName: string;
    authorAvatar?: string;
    title: string;
    content: string;
    imageUrl?: string;
    category: string;
    tags: string[];
    upvotes: string[];
    commentsList: IComment[];
    flair?: string;
    views: number;
    clicks: number;
    isGlobal: boolean;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ReplySchema = new Schema<ICommentReply>({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userIp: { type: String },
    userName: { type: String, default: 'Anonymous Student' },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const CommentSchema = new Schema<IComment>({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userIp: { type: String },
    userName: { type: String, default: 'Anonymous Student' },
    text: { type: String, required: true },
    replies: [ReplySchema],
    createdAt: { type: Date, default: Date.now }
});

const PostSchema: Schema = new Schema(
    {
        authorId: { type: Schema.Types.ObjectId, ref: 'User' },
        authorName: { type: String, required: true },
        authorAvatar: { type: String },
        title: { type: String, required: true },
        content: { type: String, required: true },
        imageUrl: { type: String },
        category: { type: String, default: 'general' },
        tags: [{ type: String }],
        upvotes: [{ type: String }],
        commentsList: [CommentSchema],
        flair: { type: String, default: 'Discussion' },
        views: { type: Number, default: 0 },
        clicks: { type: Number, default: 0 },
        isGlobal: { type: Boolean, default: false },
        published: { type: Boolean, default: true },
    },
    { timestamps: true, collection: 'community' }
);

// Indexes
PostSchema.index({ createdAt: -1 });
PostSchema.index({ isGlobal: 1 });
PostSchema.index({ tags: 1 });

// Model export with support for HMR in development
export const Post = (mongoose.models && mongoose.models.Post) || mongoose.model<IPost>('Post', PostSchema);

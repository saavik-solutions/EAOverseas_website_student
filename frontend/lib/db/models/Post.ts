import mongoose, { Schema, Document } from 'mongoose';

export interface ICommentReply {
    _id?: mongoose.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    text: string;
    createdAt: Date;
}

export interface IComment {
    _id?: mongoose.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
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
    category: string;
    tags: string[];
    upvotes: mongoose.Schema.Types.ObjectId[];
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
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const CommentSchema = new Schema<IComment>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
        category: { type: String, default: 'general' },
        tags: [{ type: String }],
        upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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

export const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

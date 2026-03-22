import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    slug: string;
    content: string;
    authorName: string;
    authorId?: mongoose.Schema.Types.ObjectId;
    coverImage?: string;
    excerpt?: string;
    readTime?: string; // e.g., "5 min read"
    views: number;
    clicks: number;
    likes: number;
    comments: Array<{
        user: string;
        content: string;
        createdAt: Date;
    }>;
    published: boolean;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        authorName: { type: String, required: true, default: 'Admin' },
        authorId: { type: Schema.Types.ObjectId, ref: 'User' },
        coverImage: { type: String },
        excerpt: { type: String },
        readTime: { type: String, default: '5 min read' },
        views: { type: Number, default: 0 },
        clicks: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        comments: [
            {
                user: { type: String, required: true },
                content: { type: String, required: true },
                createdAt: { type: Date, default: Date.now }
            }
        ],
        published: { type: Boolean, default: false },
        tags: [{ type: String }],
    },
    { timestamps: true, collection: 'blogs' }
);

// Indexes for fast lookup by slug and internal admin sorting
BlogSchema.index({ slug: 1 });
BlogSchema.index({ createdAt: -1 });

export const Blog = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

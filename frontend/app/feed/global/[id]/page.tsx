"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { FeedPost } from '@/components/features/feed/FeedPost';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function GlobalPostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/feed/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data.post);
        } else {
          router.push('/feed');
        }
      } catch (err) {
        console.error("Failed to load global post detail", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (postId) fetchPost();
  }, [postId, router]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
           <Loader2 className="h-8 w-8 animate-spin text-brand-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!post) return null;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <button 
          onClick={() => router.push('/feed')}
          className="flex items-center gap-2 text-text-muted hover:text-brand-primary font-bold text-sm transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Global Feed
        </button>

        <FeedPost 
          id={post._id}
          type={post.category?.toUpperCase() || 'NEWS'}
          title={post.title}
          excerpt={post.content}
          media={post.imageUrl}
          author={{
            name: post.authorId?.fullName || post.authorName || 'Global Protocol',
            logo: post.authorId?.avatarUrl || 'G'
          }}
          timestamp={new Date(post.createdAt).toLocaleDateString()}
          views={post.views?.toString() || '0'}
          isPinned={false}
          isDetailedView={true}
          comments={post.commentsList?.length || 0}
        />
      </div>
    </DashboardLayout>
  );
}

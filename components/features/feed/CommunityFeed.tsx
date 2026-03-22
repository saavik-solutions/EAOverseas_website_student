"use client";

import React from 'react';

import { CommunityCategorySidebar } from './CommunityCategorySidebar';
import { CommunityPost, CommunityFlair } from './CommunityPost';
import { CommunitySidebar } from './CommunitySidebar';
import { NewPostModal } from './NewPostModal';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export const CommunityFeed: React.FC = () => {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [posts, setPosts] = React.useState<any[]>([]);
  const searchParams = useSearchParams();
  const highlightedId = searchParams.get('highlight');

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/feed');
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts || []);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
        <aside className="hidden lg:block lg:col-span-3 xl:col-span-2 space-y-4">
          {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-10 bg-bg-base rounded-xl animate-pulse" />)}
        </aside>
        <main className="lg:col-span-9 xl:col-span-7 space-y-6">
          <div className="h-20 bg-white border border-border rounded-2xl animate-pulse" />
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-white border border-border rounded-2xl animate-pulse" />)}
        </main>
        <aside className="hidden xl:block xl:col-span-3 space-y-6">
          <div className="h-64 bg-white border border-border rounded-2xl animate-pulse" />
          <div className="h-48 bg-white border border-border rounded-2xl animate-pulse" />
        </aside>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
      {/* Categories Sidebar */}
      <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
        <CommunityCategorySidebar />
      </aside>

      {/* Main Feed */}
      <main className="lg:col-span-9 xl:col-span-7 space-y-6">
        <div 
          onClick={() => setModalOpen(true)}
          className="bg-white p-4 rounded-2xl border border-border flex items-center gap-4 mb-8 cursor-pointer hover:border-brand-primary transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-nav-bg flex items-center justify-center text-white font-black text-xs">
            JD
          </div>
          <div className="flex-1 bg-bg-base rounded-xl px-4 py-2.5 text-sm font-medium text-text-muted">
            Create a post...
          </div>
        </div>

        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="bg-white border text-center border-border rounded-2xl p-12">
              <div className="w-16 h-16 mx-auto bg-brand-primary/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-black text-text-primary mb-2">No discussions yet</h3>
              <p className="text-sm font-medium text-text-muted max-w-sm mx-auto mb-6">
                Be the first to start a conversation! Ask a question, share an experience, or post a review.
              </p>
              <button 
                onClick={() => setModalOpen(true)}
                className="btn-primary px-6 py-2.5 rounded-xl font-bold text-sm mx-auto block"
              >
                Start a Discussion
              </button>
            </div>
          ) : (
            posts.map((post) => (
              <Link key={post._id} href={`/feed/community/${post._id}`}>
                <CommunityPost 
                  id={post._id}
                  isHighlighted={highlightedId === post._id}
                  category={post.category}
                  title={post.title}
                  content={post.content}
                  authorName={post.authorId?.fullName || post.authorName || 'Anonymous Student'}
                  authorAvatar={post.authorId?.avatarUrl || post.authorAvatar}
                  createdAt={post.createdAt}
                  upvotes={post.upvotes?.length || 0}
                  comments={post.commentsList?.length || 0}
                  tags={post.tags}
                />
              </Link>
            ))
          )}
        </div>
      </main>

      {/* Community Stats Sidebar */}
      <aside className="hidden xl:block xl:col-span-3">
        <CommunitySidebar />
      </aside>

      <NewPostModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

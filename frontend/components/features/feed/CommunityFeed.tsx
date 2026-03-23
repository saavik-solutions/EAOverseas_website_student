"use client";

import React from 'react';

import { CommunityCategorySidebar } from './CommunityCategorySidebar';
import { CommunityPost, CommunityFlair } from './CommunityPost';
import { CommunitySidebar } from './CommunitySidebar';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const CommunityFeed: React.FC = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = React.useState(true);
  const [posts, setPosts] = React.useState<any[]>([]);
  const [stats, setStats] = React.useState<any>(null);
  const searchParams = useSearchParams();
  const highlightedId = searchParams.get('highlight');
  
  // Inline Composer State
  const [isComposing, setIsComposing] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState('');
  const [newContent, setNewContent] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handlePostSubmit = async () => {
    if (!newContent.trim()) return;
    setIsSubmitting(true);
    try {
      // Deploy the Post directly, completely bypassing authentication requirements
      const res = await fetch('/api/feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle || 'Community Discussion',
          content: newContent,
          category: 'general',
          flair: 'Discussion'
        })
      });
      
      if (res.ok) {
        const data = await res.json();
        setPosts([data.post, ...posts]);
        setNewTitle('');
        setNewContent('');
        setIsComposing(false);
      } else {
        const errData = await res.json().catch(() => ({}));
        console.error("Institutional node rejected the payload:", errData);
        alert(errData.error || "Failed to publish post. Please check your network connection.");
      }
    } catch (error) {
      console.error(error);
      alert("Network anomaly detected. Post deployment failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/feed');
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts || []);
          setStats(data.stats || null);
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
        {isComposing ? (
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm mb-8 space-y-4 transition-all">
             <input 
                type="text" 
                placeholder="Discussion Title (Optional)" 
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-lg font-bold text-text-primary placeholder:text-text-muted/50 border-none outline-none focus:ring-0 px-0 bg-transparent"
             />
             <textarea 
                placeholder="What's on your mind? Share an experience, ask a question..." 
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                autoFocus
                className="w-full min-h-[120px] text-sm text-text-primary placeholder:text-text-muted border-none outline-none focus:ring-0 px-0 bg-transparent resize-y custom-scrollbar"
             />
             <div className="flex items-center justify-end gap-3 pt-4 border-t border-border mt-4">
                <button 
                  onClick={() => setIsComposing(false)}
                  className="px-4 py-2 text-sm font-bold text-text-muted hover:text-text-primary transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePostSubmit}
                  disabled={!newContent.trim() || isSubmitting}
                  className="btn-primary px-6 py-2 rounded-xl text-sm font-bold disabled:opacity-50 flex items-center justify-center min-w-[100px] transition-all"
                >
                  {isSubmitting ? 'Posting...' : 'Post'}
                </button>
             </div>
          </div>
        ) : (
          <div 
            onClick={() => setIsComposing(true)}
            className="bg-white p-4 rounded-2xl border border-border flex items-center gap-4 mb-8 cursor-pointer hover:border-brand-primary transition-colors shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-nav-bg flex items-center justify-center text-white font-black text-xs shrink-0">
              {session?.user?.name ? session.user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : 'AS'}
            </div>
            <div className="flex-1 bg-bg-base/70 rounded-full px-5 py-3 text-sm font-medium text-text-muted">
              Create a post...
            </div>
          </div>
        )}

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
                onClick={() => setIsComposing(true)}
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
        <CommunitySidebar statsData={stats} />
      </aside>


    </div>
  );
};

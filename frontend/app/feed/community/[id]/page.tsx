"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { CommunityPost } from '@/components/features/feed/CommunityPost';
import { ArrowLeft, Send, CornerDownRight, Loader2 } from 'lucide-react';

export default function DetailedPostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;

  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        console.error("Failed to load post detail", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (postId) fetchPost();
  }, [postId, router]);

  const handleAction = async (action: 'comment' | 'reply', targetCommentId?: string) => {
    if (action === 'comment' && !commentText.trim()) return;
    if (action === 'reply' && !replyText.trim()) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/feed/${postId}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          text: action === 'comment' ? commentText : replyText,
          commentId: targetCommentId
        })
      });

      if (res.ok) {
        const data = await res.json();
        setPost(data.post);
        if (action === 'comment') setCommentText('');
        if (action === 'reply') {
          setReplyText('');
          setReplyingToId(null);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          className="flex items-center gap-2 text-text-muted hover:text-brand-primary font-bold text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Feed
        </button>

        {/* The Core Post component */}
        <CommunityPost 
          id={post._id}
          category={post.category}
          title={post.title}
          content={post.content}
          authorName={post.authorId?.fullName || post.authorName || 'Anonymous Student'}
          authorAvatar={post.authorId?.avatarUrl || post.authorAvatar}
          createdAt={post.createdAt}
          upvotes={post.upvotes?.length || 0}
          comments={post.commentsList?.length || 0}
          tags={post.tags}
          isDetailedView={true} // Add strict detailed flag below
        />

        {/* Interaction Section */}
        <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
          <h3 className="text-lg font-black tracking-tight text-text-primary mb-6">Discussion ({post.commentsList?.length || 0})</h3>

          {/* New Top Level Comment Input */}
          <div className="flex items-center gap-3 mb-10 bg-white p-3 border border-border rounded-2xl shadow-sm">
             <div className="w-10 h-10 rounded-full bg-nav-bg flex items-center justify-center text-xs font-black text-white shrink-0">
               {post.authorName ? 'A' : 'A'} {/* Static A as fallback for anonymous for now, handled generically */}
             </div>
             <div className="flex-1 relative flex items-center">
                <input 
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAction('comment') }}
                  placeholder="Write a comment..."
                  className="w-full h-10 pl-4 pr-12 bg-bg-base/50 border-none rounded-xl focus:ring-0 font-medium text-sm text-text-primary placeholder:text-text-muted/60 transition-all outline-none"
                />
                <button 
                  disabled={isSubmitting || !commentText.trim()}
                  onClick={() => handleAction('comment')}
                  className="absolute right-1 w-8 h-8 flex items-center justify-center bg-brand-primary text-white rounded-lg hover:bg-brand-primary/90 disabled:opacity-50 transition-all"
                >
                  {isSubmitting && !replyingToId ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                </button>
             </div>
          </div>

          {/* Comments List */}
          <div className="space-y-8">
            {post.commentsList?.map((comment: any) => (
              <div key={comment._id} className="group relative">
                {/* Vertical Thread Line */}
                {comment.replies?.length > 0 && (
                  <div className="absolute left-5 top-14 bottom-0 w-0.5 bg-border rounded-full" />
                )}

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs shrink-0 z-10 border-4 border-white">
                    {comment.userId?.fullName?.charAt(0) || '?'}
                  </div>
                  <div className="flex-1 space-y-2">
                     <div className="flex items-center gap-2">
                       <span className="font-bold text-sm text-text-primary">{comment.userId?.fullName || 'Anonymous'}</span>
                       <span className="text-xs text-text-muted font-medium px-2 bg-bg-base rounded-md">
                         {new Date(comment.createdAt).toLocaleDateString()}
                       </span>
                     </div>
                     <p className="text-sm font-medium text-slate-700 leading-relaxed bg-slate-50 border border-slate-100 p-4 rounded-xl rounded-tl-none">
                       {comment.text}
                     </p>
                     <div className="flex items-center gap-4 pt-1">
                       <button 
                         onClick={() => setReplyingToId(comment._id)}
                         className="text-xs font-bold text-text-muted hover:text-brand-primary flex items-center gap-1 transition-colors"
                       >
                         <CornerDownRight className="w-3 h-3" /> Reply
                       </button>
                     </div>

                     {/* Reply Input Box */}
                     {replyingToId === comment._id && (
                       <div className="flex gap-3 mt-4 animate-in fade-in slide-in-from-top-2">
                          <textarea 
                            autoFocus
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                            className="flex-1 min-h-[60px] p-3 text-sm bg-bg-base border border-border rounded-xl focus:border-brand-primary outline-none"
                          />
                          <div className="flex flex-col gap-2">
                            <button 
                              onClick={() => handleAction('reply', comment._id)}
                              disabled={isSubmitting || !replyText.trim()}
                              className="bg-brand-primary text-white p-3 rounded-xl hover:bg-brand-primary/90 transition-colors disabled:opacity-50"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => { setReplyingToId(null); setReplyText(''); }}
                              className="p-3 text-xs font-bold text-text-muted hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                       </div>
                     )}

                     {/* Nested Replies Rendering */}
                     {comment.replies && comment.replies.length > 0 && (
                       <div className="space-y-4 mt-6">
                         {comment.replies.map((reply: any) => (
                           <div key={reply._id} className="flex gap-3 relative before:absolute before:-left-8 before:top-4 before:w-6 before:h-0.5 before:bg-border before:rounded-full">
                              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-[10px] shrink-0 border-2 border-white shadow-sm z-10">
                                {reply.userId?.fullName?.charAt(0) || '?'}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-bold text-xs text-text-primary">{reply.userId?.fullName || 'Anonymous'}</span>
                                  <span className="text-[10px] text-text-muted">{new Date(reply.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm font-medium text-slate-600 bg-white border border-border/50 p-3 rounded-xl rounded-tl-none shadow-sm">
                                  {reply.text}
                                </p>
                              </div>
                           </div>
                         ))}
                       </div>
                     )}

                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}

import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export const GlobalSidebar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [trending, setTrending] = useState<any[]>([]);
  const [webinars, setWebinars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackTrending = [
    "New UK post-study work visa rules explained",
    "Top 10 business schools in Canada for 2026",
    "How to clear IELTS in 30 days: Expert tips",
    "Living expenses in Munich: A student guide",
    "Scholarship opportunities at Ivy League"
  ];

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        const res = await fetch('/api/feed');
        if (res.ok) {
          const data = await res.json();
          const allPosts = data.posts || [];
          
          // Extract top 5 latest posts for trending
          setTrending(allPosts.slice(0, 5));

          // Extract top 3 latest posts with 'webinar' tag or flair
          const webinarPosts = allPosts.filter((p: any) => 
            p.tags?.some((t: string) => t.toLowerCase() === 'webinar') ||
            p.flair?.toLowerCase() === 'webinar' ||
            p.category?.toLowerCase() === 'webinar'
          ).slice(0, 3);
          setWebinars(webinarPosts);
        }
      } catch (err) {
        console.error("Failed to fetch sidebar data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSidebarData();
  }, []);

  const handlePostClick = (postId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('post', postId);
    router.push(`/feed?${params.toString()}`);
  };

  return (
    <div className="space-y-8 sticky top-24">
      {/* What's Trending */}
      <div className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-orange-100">
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </div>
          <h4 className="font-black text-xs uppercase tracking-widest text-text-primary">WHAT'S TRENDING</h4>
        </div>
        
        <div className="space-y-5">
          {loading ? (
             <div className="flex justify-center py-4">
               <Loader2 className="h-5 w-5 text-brand-primary animate-spin" />
             </div>
          ) : trending.length > 0 ? (
            trending.map((post, idx) => (
              <div 
                key={post._id || idx} 
                onClick={() => handlePostClick(post._id || post.id)}
                className="flex gap-4 group cursor-pointer"
              >
                <span className="text-xl font-black text-border group-hover:text-brand-primary transition-colors">0{idx + 1}</span>
                <p className="text-[13px] font-bold text-text-primary line-clamp-2 leading-tight group-hover:text-brand-primary transition-colors">
                  {post.title}
                </p>
              </div>
            ))
          ) : (
            fallbackTrending.map((item, idx) => (
              <div key={idx} className="flex gap-4 group cursor-pointer opacity-60 grayscale hover:grayscale-0 transition-all">
                <span className="text-xl font-black text-border group-hover:text-brand-primary transition-colors">0{idx + 1}</span>
                <p className="text-[13px] font-bold text-text-primary line-clamp-2 leading-tight group-hover:text-brand-primary transition-colors">
                  {item} <span className="text-[8px] font-black uppercase text-brand-primary ml-1">(Trending)</span>
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upcoming Webinars */}
      <div className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-blue-100">
            <Calendar className="h-4 w-4 text-blue-600" />
          </div>
          <h4 className="font-black text-xs uppercase tracking-widest text-text-primary">UPCOMING WEBINARS</h4>
        </div>
        <div className="space-y-4">
          {loading ? (
             <div className="flex justify-center py-4">
               <Loader2 className="h-5 w-5 text-brand-primary animate-spin" />
             </div>
          ) : webinars.length > 0 ? (
            webinars.map((item, idx) => (
              <div 
                key={item._id || idx} 
                onClick={() => handlePostClick(item._id || item.id)}
                className="flex items-center justify-between p-3 bg-bg-base rounded-xl border border-border/50 hover:border-brand-primary/50 transition-colors cursor-pointer group"
              >
                <span className="text-[13px] font-bold text-text-primary group-hover:text-brand-primary line-clamp-1">{item.title}</span>
                <span className="text-[10px] font-black text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-lg shrink-0">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Soon'}
                </span>
              </div>
            ))
          ) : (
            <div className="py-8 text-center bg-bg-base/50 rounded-2xl border border-dashed border-border/50">
               <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">No data to show</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

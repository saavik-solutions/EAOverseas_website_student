import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export const GlobalSidebar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [trending, setTrending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackTrending = [
    "New UK post-study work visa rules explained",
    "Top 10 business schools in Canada for 2026",
    "How to clear IELTS in 30 days: Expert tips",
    "Living expenses in Munich: A student guide",
    "Scholarship opportunities at Ivy League"
  ];

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch('/api/feed');
        if (res.ok) {
          const data = await res.json();
          // Extract top 5 latest posts
          const latestPosts = (data.posts || []).slice(0, 5);
          setTrending(latestPosts);
        }
      } catch (err) {
        console.error("Failed to fetch trending:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  const handlePostClick = (postId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('post', postId);
    router.push(`/feed?${params.toString()}`);
  };

  const webinars = [
    { title: "Visa Mastery Workshop", date: "Mar 22" },
    { title: "USA University Admissions", date: "Mar 25" },
    { title: "Part-time Jobs in Australia", date: "Mar 28" }
  ];

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
            // Only show fallback if definitely no posts exist
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
          <h4 className="font-black text-xs uppercase tracking-widest text-text-primary">Upcoming Webinars</h4>
        </div>
        <div className="space-y-4">
          {webinars.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-bg-base rounded-xl border border-border/50 hover:border-brand-primary/50 transition-colors cursor-pointer group">
              <span className="text-[13px] font-bold text-text-primary group-hover:text-brand-primary">{item.title}</span>
              <span className="text-[10px] font-black text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-lg">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

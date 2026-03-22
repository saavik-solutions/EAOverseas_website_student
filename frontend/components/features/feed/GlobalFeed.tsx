"use client";

import React from 'react';
import { Filter } from 'lucide-react';
import { FeedFilterSidebar } from './FeedFilterSidebar';
import { FeedPost, FeedPostType } from './FeedPost';
import { GlobalSidebar } from './GlobalSidebar';
import { FeedDrawer } from './FeedDrawer';
import { useRouter, useSearchParams } from 'next/navigation';

export const GlobalFeed: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [posts, setPosts] = React.useState<any[]>([]);
  const [activeFilter, setActiveFilter] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    const fetchGlobalPosts = async () => {
      try {
        const res = await fetch('/api/feed');
        if (res.ok) {
          const data = await res.json();
          // Only show 'global' category posts that are 'published'
          const globalPosts = (data.posts || []).filter((p: any) => p.category === 'global' && p.published !== false);
          setPosts(globalPosts);
        }
      } catch (err) {
        console.error("Failed to fetch global feed:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGlobalPosts();
  }, []);

  const handlePostClick = (postId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('post', postId);
    router.push(`/feed?${params.toString()}`);
  };

  const filteredPosts = React.useMemo(() => {
    return posts.filter(post => {
      const matchesFilter = activeFilter === 'All' || post.type?.toUpperCase() === activeFilter.toUpperCase() || post.flair?.toUpperCase() === activeFilter.toUpperCase();
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) || post.content?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [posts, activeFilter, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex flex-col xl:flex-row gap-8">
        <aside className="xl:w-[240px] hidden xl:block">
           <div className="card-premium h-96 animate-pulse" />
        </aside>
        <div className="flex-1 lg:max-w-[750px] space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-premium h-[400px] animate-pulse" />
          ))}
        </div>
        <aside className="xl:w-[320px] space-y-8">
          <div className="card-premium h-64 animate-pulse" />
        </aside>
      </div>
    );
  }

  return (
    <div className="flex flex-col xl:flex-row gap-8 items-start">
      {/* Search & Filter Discovery - Left Column */}
      <aside className="xl:w-[240px] shrink-0 w-full xl:sticky xl:top-24">
        <FeedFilterSidebar 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </aside>

      {/* Main Intelligence Stream - Center Column */}
      <div className="flex-1 lg:max-w-[750px] w-full">
        <div className="grid grid-cols-1 gap-8">
          {filteredPosts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-border shadow-inner">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="h-6 w-6 text-slate-300" />
               </div>
               <p className="text-text-muted font-bold uppercase tracking-[0.2em] text-[10px] italic">No intelligence matched your current matrix</p>
               <button 
                 onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
                 className="mt-6 text-[10px] font-black text-brand-primary uppercase tracking-widest hover:underline"
               >
                 Reset Discovery Protocol
               </button>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post._id || post.id} onClick={() => handlePostClick(post._id || post.id)} className="cursor-pointer">
                <FeedPost 
                  {...post} 
                  id={post._id || post.id}
                  type={post.flair || post.type || 'NEWS'}
                  excerpt={post.content || post.excerpt}
                  timestamp={post.createdAt ? new Date(post.createdAt).toLocaleDateString() : post.timestamp}
                />
              </div>
            ))
          )}
        </div>
        
        {/* Network Synced Activity */}
        <div className="mt-12 flex justify-center">
          <div className="flex items-center gap-3 text-text-muted font-black text-[10px] uppercase tracking-widest italic bg-white px-6 py-3 rounded-full border border-border shadow-sm">
            <div className="w-3 h-3 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
            Synchronizing additional intelligence...
          </div>
        </div>
      </div>

      {/* Regional Intelligence - Right Column */}
      <aside className="xl:w-[320px] shrink-0 w-full">
        <GlobalSidebar />
      </aside>

      <FeedDrawer />
    </div>
  );
};

"use client";

import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search, 
  ShieldAlert,
  User,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function CommunityGovernancePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/community');
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleVisibility = async (postId: string, currentStatus: boolean) => {
    try {
      await fetch('/api/admin/community', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, published: !currentStatus })
      });
      fetchPosts();
    } catch (err) {
      alert('Failed to update visibility Node.');
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Operational Security: Permanently delete this user record?')) return;
    try {
      await fetch('/api/admin/community', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId })
      });
      fetchPosts();
    } catch (err) {
      alert('Termination Failed: Node persistent.');
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.authorName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Institutional Module Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Community Governance</h1>
            <p className="text-sm text-slate-500 mt-1">Audit, moderate, and secure institutional user-generated content.</p>
         </div>
         <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 bg-rose-50 border border-rose-100 rounded-lg text-rose-600 text-[11px] font-bold uppercase tracking-wider flex items-center gap-2">
               <ShieldAlert className="h-4 w-4" />
               Moderation Active
            </div>
         </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Workspace Toolbar */}
        <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                 type="text" 
                 placeholder="Search student records..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium w-80 focus:ring-2 focus:ring-slate-100 transition-all outline-none" 
              />
           </div>
           <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{filteredPosts.length} Records Synchronized</div>
        </div>

        {/* Institutional Ledger */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-8 py-5">Intel Identity</th>
                <th className="px-8 py-5">Originator</th>
                <th className="px-8 py-5">Analytics</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Sync Date</th>
                <th className="px-8 py-5 text-right w-32">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan={6} className="h-20 bg-slate-50/20" /></tr>)
              ) : filteredPosts.length === 0 ? (
                <tr>
                   <td colSpan={6} className="py-24 text-center text-sm font-semibold text-slate-400">No community records detected in system.</td>
                </tr>
              ) : filteredPosts.map((post) => (
                <tr key={post._id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-5">
                     <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-slate-600 transition-colors">{post.title || 'Institutional Thread'}</p>
                        <p className="text-xs text-slate-500 truncate max-w-[250px]">{post.content?.substring(0, 60)}...</p>
                     </div>
                  </td>
                  <td className="px-8 py-5">
                     <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center">
                           <User className="h-4 w-4 text-slate-500" />
                        </div>
                        <div>
                           <p className="text-xs font-bold text-slate-900">{post.authorName}</p>
                           <p className="text-[10px] font-medium text-slate-400">{post.authorId?.email || 'Verified Student'}</p>
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-5">
                     <div className="flex items-center gap-4">
                        <div className="text-center">
                           <p className="text-xs font-bold text-slate-900">{post.views || 0}</p>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Views</p>
                        </div>
                        <div className="text-center">
                           <p className="text-xs font-bold text-slate-900">{post.upvotes?.length || 0}</p>
                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Votes</p>
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-5">
                     <button 
                       onClick={() => toggleVisibility(post._id, post.published)}
                       className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${post.published !== false ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100'}`}
                     >
                        {post.published !== false ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                        {post.published !== false ? 'Live' : 'Hidden'}
                     </button>
                  </td>
                  <td className="px-8 py-5 text-[10px] font-bold text-slate-400">
                     {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-8 py-5">
                     <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => deletePost(post._id)}
                          className="p-2 hover:bg-rose-50 text-slate-300 hover:text-rose-500 rounded-xl transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 text-slate-300 hover:text-slate-900 rounded-xl transition-all">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Calendar,
  Layers,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BlogManagementPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All Content');

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/blogs');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id: string) => {
    if (!confirm('Permanently delete this article?')) return;
    try {
      const res = await fetch('/api/admin/blogs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (res.ok) fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredBlogs = blogs.filter(b => {
    const title = b.title || '';
    const slug = b.slug || '';
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All Content' || 
                       (activeTab === 'Drafts' && !b.published) || 
                       (activeTab === 'News & Updates' && b.tags?.includes('News')) ||
                       (activeTab === 'Educational Guides' && b.tags?.includes('Guides')) ||
                       (activeTab === 'Webinar Summaries' && b.tags?.includes('Webinars'));
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
         <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Content Management</h1>
            <p className="text-slate-500 mt-1 font-medium">Create and manage institutional blog intelligence.</p>
         </div>
         <Link 
            href="/admin/blogs/write"
            className="px-6 py-2.5 bg-brand-primary text-white rounded-xl text-sm font-bold shadow-soft flex items-center gap-2 hover:scale-105 transition-all"
         >
            <Plus className="h-4 w-4" /> New Article
         </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
         {/* Filter Sidebar */}
         <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-8">
               <div className="space-y-3">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Search Library</label>
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                     <input 
                       type="text" 
                       placeholder="Filter by title..." 
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:ring-1 focus:ring-brand-primary/20 transition-all outline-none" 
                     />
                  </div>
               </div>

               <div className="space-y-4">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Intelligence Sector</label>
                  <div className="space-y-1">
                     {['All Content', 'News & Updates', 'Educational Guides', 'Webinar Summaries', 'Drafts'].map((cat) => (
                       <button 
                         key={cat} 
                         onClick={() => setActiveTab(cat)}
                         className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === cat ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                       >
                         {cat}
                       </button>
                     ))}
                  </div>
               </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
               <Layers className="h-6 w-6 text-brand-primary mb-4" />
               <h4 className="text-sm font-bold text-slate-900 mb-2">Content Velocity</h4>
               <p className="text-xs text-slate-500 leading-relaxed font-medium">
                 Articles are high-performance SEO nodes synchronized for global discovery.
               </p>
            </div>
         </div>

         {/* Content Table */}
         <div className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                        <th className="px-6 py-4">Article</th>
                        <th className="px-6 py-4">Performance</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {isLoading ? (
                        [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan={4} className="h-20 bg-slate-50/50" /></tr>)
                     ) : filteredBlogs.length === 0 ? (
                        <tr>
                           <td colSpan={4} className="py-24 text-center">
                              <p className="text-sm font-semibold text-slate-400 italic">No content found in this sector.</p>
                           </td>
                        </tr>
                     ) : filteredBlogs.map((blog) => (
                        <tr key={blog._id} className="hover:bg-slate-50/50 transition-all group">
                           <td className="px-6 py-5">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                                    {blog.coverImage ? (
                                       <img src={blog.coverImage} className="w-full h-full object-cover" />
                                    ) : (
                                       <FileText className="h-5 w-5 text-slate-400" />
                                    )}
                                 </div>
                                 <div className="min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                       <p className="text-sm font-bold text-slate-900 line-clamp-1">{blog.title}</p>
                                       {!blog.published && (
                                          <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Draft</span>
                                       )}
                                    </div>
                                    <p className="text-xs text-slate-400 font-medium">/{blog.slug}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-5">
                              <div className="flex items-center gap-6">
                                 <div>
                                    <p className="text-sm font-bold text-slate-900">{blog.views || 0}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Views</p>
                                 </div>
                                 <div className="h-8 w-[1px] bg-slate-100" />
                                 <div>
                                    <p className="text-sm font-bold text-slate-900">{blog.clicks || 0}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Clicks</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-5">
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                                 <Calendar className="h-3.5 w-3.5" />
                                 {new Date(blog.createdAt).toLocaleDateString()}
                              </div>
                           </td>
                           <td className="px-6 py-5 text-right">
                              <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <Link 
                                   href={`/admin/blogs/edit/${blog._id}`}
                                   className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-200"
                                 >
                                    <Edit className="h-4 w-4" />
                                 </Link>
                                 <button 
                                   onClick={() => deleteBlog(blog._id)} 
                                   className="p-2 hover:bg-rose-50 rounded-xl text-slate-400 hover:text-rose-600 transition-all border border-transparent hover:border-rose-100"
                                 >
                                    <Trash2 className="h-4 w-4" />
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
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  SendHorizontal, 
  Trash2, 
  Eye, 
  EyeOff, 
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function GlobalBroadcastPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [flair, setFlair] = useState('Announcement');
  const [posts, setPosts] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const flairs = ['News', 'Guides', 'Webinars', 'Forms', 'Alerts', 'Announcement'];

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/broadcast');
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

  const handleBroadcast = async () => {
    if (!title || !content) {
      alert('Validation Failure: Title and Content are mandatory for institutional dissemination.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, flair, imageUrl })
      });
      if (res.ok) {
        setTitle('');
        setContent('');
        setImageUrl('');
        alert('Institutional Communication Deactivated: Success');
        fetchPosts();
      } else {
        throw new Error('Persistence Failed');
      }
    } catch (err) {
      alert('Deployment Failure: Network anomaly detected.');
    } finally {
      setSubmitting(false);
    }
  };

  const deletePost = async (postId: string) => {
    if (!confirm('Operational Security: Terminate this official broadcast record?')) return;
    try {
      await fetch('/api/admin/broadcast', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId })
      });
      fetchPosts();
    } catch (err) {
      alert('Termination Failed.');
    }
  };

  const toggleVisibility = async (postId: string, currentStatus: boolean) => {
    try {
      await fetch('/api/admin/broadcast', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, published: !currentStatus })
      });
      fetchPosts();
    } catch (err) {
      alert('Visibility Refinement Failed.');
    }
  };

  return (
    <div className="space-y-12">
      {/* Institutional Module Header */}
      <div className="pb-8 border-b border-slate-200">
         <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Intelligence Broadcaster</h1>
         <p className="text-sm text-slate-500 mt-1">Deploy official communications and audit institutional transmission history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-12 space-y-10">
           {/* Deployment Interface */}
           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                 <Radio className="h-4 w-4 text-slate-500" /> New Intelligence Transmission
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="md:col-span-2 space-y-4">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Broadcast Title</label>
                    <input 
                       type="text" 
                       value={title}
                       onChange={(e) => setTitle(e.target.value)}
                       placeholder="Enter institutional topic..."
                       className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-slate-100 outline-none transition-all" 
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Sector Category</label>
                    <div className="flex flex-wrap gap-2">
                       {flairs.map(f => (
                         <button 
                           key={f} 
                           onClick={() => setFlair(f)} 
                           className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${flair === f ? 'bg-slate-900 text-white shadow-sm' : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-300'}`}
                         >
                           {f}
                         </button>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Transmission Content</label>
                 <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Author official synchronization message..."
                    className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-slate-100 outline-none resize-none transition-all" 
                 />
              </div>

              <div className="space-y-4">
                 <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Transmission Media (Image URL)</label>
                 <div className="flex gap-4">
                    <input 
                       type="text" 
                       value={imageUrl}
                       onChange={(e) => setImageUrl(e.target.value)}
                       placeholder="https://example.com/image.jpg"
                       className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-slate-100 outline-none transition-all" 
                    />
                    {imageUrl && (
                       <div className="w-24 h-12 rounded-lg border border-slate-200 overflow-hidden shrink-0">
                          <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                       </div>
                    )}
                 </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                 <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                    <AlertCircle className="h-3 w-3" />
                    Broadcasts are deployed globally to all student nodes immediately.
                 </div>
                 <button 
                   onClick={handleBroadcast} 
                   disabled={submitting} 
                   className={`px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs flex items-center gap-3 hover:translate-y-[-1px] active:translate-y-[1px] shadow-lg shadow-slate-200 disabled:opacity-50 transition-all`}
                 >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizontal className="h-4 w-4" />}
                    Deploy Broadcast
                 </button>
              </div>
           </div>

           {/* Institutional Ledger */}
           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-8 py-5 bg-slate-50/50 border-b border-slate-200 flex justify-between items-center">
                 <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Transmission Repository</h3>
                 <div className="text-[11px] font-bold text-slate-400">{posts.length} Active Payloads</div>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full border-collapse">
                    <thead>
                       <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left bg-slate-50/30">
                          <th className="px-8 py-4 border-b border-slate-100">Intel Topic</th>
                          <th className="px-8 py-4 border-b border-slate-100">Category</th>
                          <th className="px-8 py-4 border-b border-slate-100 text-center">Status</th>
                          <th className="px-8 py-4 border-b border-slate-100">Deployment Date</th>
                          <th className="px-8 py-4 border-b border-slate-100 text-right">Ops</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {posts.length === 0 ? (
                         <tr><td colSpan={5} className="py-20 text-center text-sm font-semibold text-slate-400">No official transmissions detected.</td></tr>
                       ) : posts.map((post) => (
                         <tr key={post._id} className="hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-5">
                               <p className="text-sm font-bold text-slate-900 line-clamp-1">{post.title}</p>
                               <p className="text-[10px] text-slate-400 mt-1 truncate max-w-[200px]">{post.content}</p>
                            </td>
                            <td className="px-8 py-5">
                               <span className="px-2.5 py-1 bg-slate-50 text-slate-500 border border-slate-100 text-[10px] font-bold uppercase rounded-lg">{post.flair}</span>
                            </td>
                            <td className="px-8 py-5">
                               <div className="flex justify-center">
                                 <button 
                                   onClick={() => toggleVisibility(post._id, post.published)} 
                                   className={`flex items-center gap-1.5 px-3 py-1 bg-white border rounded-full text-[10px] font-bold uppercase transition-all ${post.published ? 'text-emerald-500 border-emerald-100 hover:bg-emerald-50' : 'text-slate-400 border-slate-100 hover:bg-slate-50'}`}
                                 >
                                    {post.published ? <CheckCircle className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                                    {post.published ? 'Live' : 'Hidden'}
                                 </button>
                               </div>
                            </td>
                            <td className="px-8 py-5 text-[11px] font-bold text-slate-400">
                               {new Date(post.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                            </td>
                            <td className="px-8 py-5 text-right w-32">
                               <div className="flex items-center justify-end gap-2">
                                  <button onClick={() => deletePost(post._id)} className="p-2 hover:bg-rose-50 text-slate-300 hover:text-rose-500 rounded-xl transition-all">
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
    </div>
  );
}

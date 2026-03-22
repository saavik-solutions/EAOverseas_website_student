"use client";

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  EyeOff, 
  Image as ImageIcon, 
  Clock, 
  User as UserIcon,
  Loader2,
  CheckCircle2,
  Settings as SettingsIcon,
  Type,
  Link as LinkIcon,
  Hash
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdvancedBlogEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isEdit = !!id;

  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    readTime: '5 min read',
    published: false,
    tags: [] as string[],
    authorName: 'Admin'
  });

  useEffect(() => {
    if (isEdit) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`/api/admin/blogs`);
      if (res.ok) {
        const data = await res.json();
        const blog = data.blogs.find((b: any) => b._id === id);
        if (blog) {
          setFormData({
            title: blog.title || '',
            slug: blog.slug || '',
            excerpt: blog.excerpt || '',
            content: blog.content || '',
            coverImage: blog.coverImage || '',
            readTime: blog.readTime || '5 min read',
            published: blog.published || false,
            tags: blog.tags || [],
            authorName: blog.authorName || 'Admin'
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: isEdit ? prev.slug : title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    }));
  };

  const saveContent = async () => {
    if (!formData.title || !formData.content || !formData.excerpt) {
      alert('Validation Error: Title, Content, and Excerpt are required for institutional deployment.');
      return;
    }

    setIsSaving(true);
    try {
      const method = isEdit ? 'PATCH' : 'POST';
      const body = isEdit ? { id, ...formData } : formData;

      const res = await fetch('/api/admin/blogs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {
        alert('Institutional Intelligence Node Deactivated: Success');
        router.push('/admin/blogs');
        router.refresh();
      } else {
        throw new Error(data.error || 'Deployment failed');
      }
    } catch (err: any) {
      console.error('[SAVE_ERROR]:', err);
      alert(`Deployment Failure: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 text-brand-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Editorial Header */}
      <header className="h-16 border-b border-slate-200 flex items-center justify-between px-8 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-all">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="h-8 w-[1px] bg-slate-200" />
          <div>
             <h2 className="text-sm font-bold text-slate-900">
               {isEdit ? 'Editing Article' : 'New Article'}
             </h2>
             <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${formData.published ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{formData.published ? 'Published' : 'Draft'}</span>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg transition-all"
          >
            {isPreviewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {isPreviewMode ? 'Exit Preview' : 'Live Preview'}
          </button>
          <button 
            onClick={saveContent}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-soft hover:bg-slate-800 transition-all"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isEdit ? 'Save Changes' : 'Publish Article'}
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* Editor Panel */}
        <div className={`flex-1 flex flex-col overflow-y-auto ${isPreviewMode ? 'hidden' : 'block'}`}>
          <div className="max-w-4xl mx-auto w-full px-12 py-16 space-y-12">
            <section className="space-y-8">
               <input 
                 type="text" 
                 placeholder="Enter title..."
                 value={formData.title}
                 onChange={handleTitleChange}
                 className="text-4xl font-bold text-slate-900 placeholder:text-slate-200 focus:outline-none w-full bg-transparent border-l-4 border-transparent focus:border-brand-primary pl-4 transition-all"
               />

               <div className="flex flex-wrap items-center gap-4 border-y border-slate-100 py-4">
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                     <LinkIcon className="h-3.5 w-3.5 text-slate-400" />
                     <span className="text-xs font-semibold text-slate-400">/blogs/</span>
                     <input 
                       className="bg-transparent border-none p-0 text-xs font-bold text-slate-600 focus:outline-none min-w-[150px]"
                       value={formData.slug}
                       onChange={(e) => setFormData({...formData, slug: e.target.value})}
                     />
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                     <Clock className="h-3.5 w-3.5 text-slate-400" />
                     <input 
                       className="bg-transparent border-none p-0 text-xs font-bold text-slate-600 focus:outline-none w-20"
                       value={formData.readTime}
                       onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                     />
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                     <UserIcon className="h-3.5 w-3.5 text-slate-400" />
                     <input 
                       className="bg-transparent border-none p-0 text-xs font-bold text-slate-600 focus:outline-none w-20"
                       value={formData.authorName}
                       onChange={(e) => setFormData({...formData, authorName: e.target.value})}
                     />
                  </div>
               </div>
            </section>

            <section className="space-y-4">
               <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cover Image URL</h4>
               <div className="relative group rounded-3xl border border-slate-200 bg-slate-50 h-64 overflow-hidden flex items-center justify-center transition-all hover:border-brand-primary/30">
                  {formData.coverImage ? (
                    <img src={formData.coverImage} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center space-y-2">
                       <ImageIcon className="h-10 w-10 text-slate-200 mx-auto" />
                       <p className="text-xs font-bold text-slate-300 uppercase">Click to add image</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                     <p className="text-white text-xs font-bold uppercase tracking-wider">Update Image</p>
                  </div>
                  <input 
                    type="text"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                    placeholder="Enter image URL..."
                    className="absolute inset-x-8 bottom-8 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none opacity-0 group-hover:opacity-100 transition-all pointer-events-auto shadow-2xl"
                  />
               </div>
            </section>

            <section className="space-y-10 pb-32">
               <div className="space-y-4">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Summary Excerpt</h4>
                  <textarea 
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    placeholder="Enter summary..."
                    className="w-full text-lg font-semibold text-slate-600 focus:outline-none border-l-4 border-slate-50 focus:border-brand-primary pl-4 transition-all leading-relaxed placeholder:text-slate-100"
                  />
               </div>

               <div className="space-y-6">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Article Content</h4>
                  <textarea 
                    rows={20}
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="Start writing..."
                    className="w-full text-lg font-medium text-slate-800 focus:outline-none border-none resize-none leading-loose placeholder:text-slate-100"
                  />
               </div>
            </section>
          </div>
        </div>

        {/* Preview Panel */}
        {isPreviewMode && (
          <div className="flex-1 bg-slate-50 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full px-12 py-24 bg-white min-h-screen shadow-lg border-x border-slate-200">
               <div className="flex items-center gap-2 mb-8">
                  <span className="text-[11px] font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase tracking-wider">
                    {formData.tags[0] || 'Article'}
                  </span>
               </div>

               <h1 className="text-5xl font-bold text-slate-900 leading-tight mb-12">
                 {formData.title || 'Untitled Article'}
               </h1>

               {formData.coverImage && (
                 <div className="aspect-video rounded-3xl overflow-hidden mb-12 border border-slate-100">
                   <img src={formData.coverImage} className="w-full h-full object-cover" />
                 </div>
               )}

               <div className="flex items-center gap-6 mb-16 border-y border-slate-100 py-6">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center font-bold text-white shadow-soft">PK</div>
                     <div>
                        <p className="text-sm font-bold text-slate-900">{formData.authorName}</p>
                        <p className="text-xs font-semibold text-slate-400">Institutional Author</p>
                     </div>
                  </div>
                  <div className="h-8 w-[1px] bg-slate-100" />
                  <div>
                     <p className="text-sm font-bold text-slate-900 uppercase">MARCH 23, 2026</p>
                     <p className="text-xs font-semibold text-slate-400">Published Date</p>
                  </div>
               </div>

               <div className="text-slate-700 leading-loose whitespace-pre-wrap text-lg">
                  <p className="text-xl font-bold text-slate-500 mb-10 leading-relaxed border-l-4 border-slate-100 pl-8 font-serif italic">
                    {formData.excerpt}
                  </p>
                  {formData.content || 'Content preview will appear here...'}
               </div>
            </div>
          </div>
        )}

        {/* Sidebar Panel */}
        <aside className="w-80 border-l border-slate-200 bg-slate-50/50 p-8 space-y-10 overflow-y-auto max-lg:hidden">
           <div className="space-y-6">
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-3">Status & Visibility</h4>
              
              <div className="space-y-4">
                 <label className="flex items-center justify-between cursor-pointer group p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-brand-primary transition-all">
                    <div>
                       <p className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">Published</p>
                       <p className="text-[10px] text-slate-400 font-semibold">Visible on website</p>
                    </div>
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-lg border-slate-300 text-brand-primary focus:ring-brand-primary"
                      checked={formData.published}
                      onChange={(e) => setFormData({...formData, published: e.target.checked})}
                    />
                 </label>

                 <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 space-y-3">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Metadata Context</p>
                    <div className="flex items-center gap-2">
                       <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                       <span className="text-xs font-bold text-slate-600 tracking-tight">SEO Optimized</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-3">Categories & Tags</h4>
              <div className="space-y-4">
                 <div className="flex flex-wrap gap-2">
                    {['Guides', 'News', 'Webinars', 'Alerts', 'Research'].map(tag => (
                       <button 
                         key={tag}
                         onClick={() => {
                            const newTags = formData.tags.includes(tag) 
                               ? formData.tags.filter(t => t !== tag)
                               : [...formData.tags, tag];
                            setFormData({...formData, tags: newTags});
                         }}
                         className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                            formData.tags.includes(tag) 
                               ? 'bg-slate-900 text-white shadow-lg' 
                               : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-400 hover:text-slate-600'
                         }`}
                       >
                          {tag}
                       </button>
                    ))}
                 </div>
                 <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                    <input 
                       placeholder="Add custom tag..."
                       className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-brand-primary/20 transition-all shadow-sm"
                    />
                 </div>
              </div>
           </div>
        </aside>
      </main>
    </div>
  );
}

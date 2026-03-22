"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, User, MessageSquare, Loader2, Globe, GraduationCap, Info, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useChatStore } from '@/store';

interface Message {
  role: 'user' | 'ai';
  type: 'text' | 'universities' | 'courses' | 'steps';
  content: string | any[];
  timestamp: Date;
}

export const AIChatAssistant: React.FC = () => {
  const isOpen = useChatStore((state) => state.isOpen);
  const toggleChat = useChatStore((state) => state.toggleChat);
  const [isIdle, setIsIdle] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Idle pulse logic
  useEffect(() => {
    const timer = setTimeout(() => setIsIdle(true), 30000);
    return () => {
      clearTimeout(timer);
      setIsIdle(false);
    };
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getPageContext = () => {
    const slug = pathname.split('/').pop();
    if (pathname.includes('/discover/')) return `University Detail: ${slug}`;
    if (pathname.includes('/courses/')) return `Course Directory: ${slug}`;
    if (pathname.includes('/tests/')) return `Tests Directory: ${slug}`;
    if (pathname.includes('/dashboard')) return 'Dashboard';
    return 'General';
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg: Message = { role: 'user', type: 'text', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          context: { page: getPageContext() },
          profile: { gpa: 8.5, budget: 45000, ielts: 7.5 } // Mocked profile context
        })
      });

      if (!response.ok) {
        const text = await response.text();
        let errMsg = "API Connection Error";
        if (text.includes('<!DOCTYPE html>')) errMsg = `Server Configuration Error: ${response.status}`;
        
        setMessages(prev => [...prev, { role: 'ai', type: 'text', content: errMsg, timestamp: new Date() }]);
        setIsLoading(false);
        return;
      }

      if (!response.body) return;
      const reader = response.body.getReader();
      const decoder = new TextEncoder();
      let fullContent = '';
      
      setIsLoading(false);
      
      const aiMsg: Message = { role: 'ai', type: 'text', content: '', timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        fullContent += new TextDecoder().decode(value);
        
        // Dynamic parsing of JSON while streaming is difficult
        // We update the content of the last message
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          
          // Try to parse if it looks like complete JSON
          try {
            // Check if backend pushed HTML due to fatal exception
            if (fullContent.includes('<!DOCTYPE html>')) {
              lastMsg.content = "Fatal System Exception. The server returned raw HTML instead of JSON.";
            } else {
              const parsed = JSON.parse(fullContent);
              lastMsg.type = parsed.type || 'text';
              lastMsg.content = parsed.data || fullContent;
            }
          } catch (e) {
            // If not complete JSON, just show as text for now
            lastMsg.content = fullContent;
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Chat failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleChat}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-full max-w-[420px] h-full bg-white shadow-2xl z-[70] flex flex-col"
            >
               <div className="p-6 bg-nav-bg text-white flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center border border-white/10">
                        <Sparkles className="h-5 w-5 text-brand-accent" />
                     </div>
                     <div>
                        <div className="text-sm font-black tracking-tight">EduAI Assistant</div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-brand-accent flex items-center gap-1.5 border border-brand-accent/30 px-2 py-0.5 rounded-full mt-1">
                           <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse" />
                           Fine-Tuned
                        </div>
                     </div>
                  </div>
                  <button onClick={toggleChat} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                     <X className="h-5 w-5" />
                  </button>
               </div>

               <div className="px-6 py-3 bg-bg-base/50 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <Globe className="h-3.5 w-3.5 text-brand-primary" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">You're on: {getPageContext()}</span>
                  </div>
                  <span className="text-[10px] font-bold text-brand-primary">{messages.filter(m => m.role === 'user').length} / 20</span>
               </div>

               <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth" ref={scrollRef}>
                  {messages.length === 0 && (
                     <div className="space-y-6">
                        <div className="p-6 bg-brand-primary/5 rounded-3xl border border-brand-primary/10 space-y-3">
                           <div className="flex items-center gap-2 text-brand-primary">
                              <Info className="h-4 w-4" />
                              <span className="text-xs font-black uppercase tracking-widest text-brand-primary">Direct Assistance</span>
                           </div>
                           <p className="text-sm font-medium text-text-primary leading-relaxed">
                              Ask me about university rankings, specific course requirements, or visa success rates for your profile.
                           </p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-2">
                           {[
                             "Find me an MBA under $30k in USA",
                             "What are my chances in Canada?",
                             "Compare IELTS vs TOEFL criteria",
                             "View my PAI strengths & gaps"
                           ].map(p => (
                             <button key={p} onClick={() => setInput(p)} className="p-4 bg-white border border-border rounded-xl text-left text-xs font-bold text-text-primary hover:border-brand-primary hover:bg-brand-primary/5 transition-all flex items-center justify-between group shadow-sm">
                                {p}
                                <ChevronRight className="h-4 w-4 text-text-muted group-hover:translate-x-1 transition-transform" />
                             </button>
                           ))}
                        </div>
                     </div>
                  )}

                  {messages.map((msg, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, scale: 0.95 }} 
                      animate={{ opacity: 1, scale: 1 }}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-2`}
                    >
                       <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${
                         msg.role === 'user' 
                           ? 'bg-brand-primary text-white rounded-tr-none' 
                           : 'bg-white border-l-4 border-brand-primary text-text-primary rounded-tl-none border border-border'
                       }`}>
                          {msg.type === 'text' && (typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content))}
                          
                          {msg.type === 'steps' && Array.isArray(msg.content) && (
                            <div className="space-y-3">
                              {msg.content.map((step, idx) => (
                                <div key={idx} className="flex gap-3">
                                  <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center text-[10px] font-black text-brand-primary shrink-0">
                                    {idx + 1}
                                  </div>
                                  <span className="text-xs font-medium">{step}</span>
                                </div>
                              ))}
                            </div>
                          )}
                       </div>

                       {msg.role === 'ai' && (msg.type === 'universities' || msg.type === 'courses') && Array.isArray(msg.content) && (
                         <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
                            <div className="flex gap-4 min-w-max">
                               {msg.content.map((item, idx) => (
                                 <Link key={idx} href={msg.type === 'universities' ? `/discover/${item.slug || item.name.toLowerCase().replace(/\\s+/g, '-')}` : `/courses/${item.slug || item.name.toLowerCase().replace(/\\s+/g, '-')}`} className="block">
                                   <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="w-[280px] p-5 bg-white border border-border rounded-2xl shadow-lg hover:border-brand-primary cursor-pointer transition-all space-y-3 group h-full">
                                      <div className="flex items-center justify-between">
                                         <div className="w-10 h-10 rounded-xl bg-bg-base flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                            {msg.type === 'universities' ? '🏛️' : '📚'}
                                         </div>
                                         <span className="px-2 py-1 bg-brand-success/10 rounded-lg text-[8px] font-black uppercase text-brand-success border border-brand-success/20">
                                            {msg.type === 'universities' ? '88% Match' : 'Masters'}
                                         </span>
                                      </div>
                                      <div className="space-y-1">
                                         <h4 className="text-xs font-black text-text-primary leading-tight truncate group-hover:text-brand-primary transition-colors">{item.name}</h4>
                                         <p className="text-[10px] font-medium text-text-muted">{item.location || item.domain}</p>
                                      </div>
                                      <div className="pt-2 border-t border-border flex items-center justify-between mt-auto">
                                         <span className="text-[10px] font-black text-brand-primary">{item.fee || '$12k - $18k'}</span>
                                         <ChevronRight className="h-3 w-3 text-text-muted transition-transform group-hover:translate-x-1" />
                                      </div>
                                   </motion.div>
                                 </Link>
                               ))}
                            </div>
                         </div>
                       )}
                    </motion.div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                       <div className="bg-white border border-border rounded-2xl rounded-tl-none p-4 flex gap-1 items-center shadow-sm">
                          <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                       </div>
                    </div>
                  )}
               </div>

               <div className="p-6 bg-white border-t border-border shadow-2xl">
                  <div className="relative group">
                     <textarea 
                       value={input}
                       onChange={(e) => setInput(e.target.value)}
                       onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                       placeholder="Ask about admissions, visas, etc..."
                       className="w-full bg-bg-base/50 border border-border rounded-2xl py-4 pl-4 pr-14 text-sm font-medium text-text-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/10 transition-all resize-none min-h-[56px] max-h-32 shadow-inner"
                       rows={1}
                     />
                     <button 
                       onClick={sendMessage}
                       disabled={isLoading || !input.trim()}
                       className="absolute right-2 bottom-2 p-3 bg-brand-primary text-white rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                     >
                        <Send className="h-4 w-4" />
                     </button>
                  </div>
                  <p className="text-[9px] font-bold text-text-muted mt-3 text-center uppercase tracking-widest opacity-60">Enterprise AI Security Active</p>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

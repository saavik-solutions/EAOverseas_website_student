"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User, Bot, X, Maximize2, Minimize2, MessageSquare } from 'lucide-react';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface Props {
  paiAnalysis: any;
}

export const PAIHelpChat: React.FC<Props> = ({ paiAnalysis }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: `Hi! I'm your EduAI mentor. I've analyzed your PAI Report (Score: ${paiAnalysis?.overallScore || 0}%). How can I help you improve your profile or discuss your university options?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMsg }],
          context: { page: 'dashboard' },
          profile: paiAnalysis
        })
      });

      if (!response.ok) throw new Error('Failed to connect to AI');

      const reader = response.body?.getReader();
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      
      let aiContent = "";
      setMessages(prev => [...prev, { role: 'ai', content: "" }]);

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        aiContent += chunk;
        
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content = aiContent;
          return newMsgs;
        });
      }
    } catch (error) {
       setMessages(prev => [...prev, { role: 'ai', content: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isMinimized) {
    return (
      <motion.button
        layoutId="chat-window"
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-brand-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all"
      >
        <MessageSquare className="h-7 w-7" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-accent rounded-full animate-ping" />
      </motion.button>
    );
  }

  return (
    <motion.div
      layoutId="chat-window"
      className="card-premium bg-white border-2 border-brand-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden h-full min-h-[500px]"
    >
      {/* Header */}
      <div className="p-4 bg-brand-primary text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest">EduAI Mentor</h3>
            <p className="text-[9px] font-bold opacity-80">Connected to your PAI Report</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMinimized(true)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Minimize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 bg-bg-base/30 custom-scrollbar"
      >
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium ${
              m.role === 'user' 
                ? 'bg-brand-primary text-white rounded-tr-none' 
                : 'bg-white border border-border text-text-primary rounded-tl-none shadow-sm'
            }`}>
              <div className="flex items-center gap-2 mb-1 opacity-60">
                {m.role === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                <span className="text-[10px] font-black uppercase tracking-widest">{m.role === 'user' ? 'You' : 'EduAI'}</span>
              </div>
              <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white border border-border p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                <div className="flex gap-1">
                   <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" />
                   <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                   <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-border">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about your report..."
            className="w-full pl-4 pr-12 py-4 bg-bg-base border border-border rounded-xl font-bold text-sm focus:border-brand-primary outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-primary text-white rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-[9px] text-text-muted text-center mt-3 font-bold uppercase tracking-widest opacity-60">AI can be inaccurate. Confirm critical info.</p>
      </div>
    </motion.div>
  );
};

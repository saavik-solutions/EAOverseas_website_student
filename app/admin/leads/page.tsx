"use client";

import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Globe, 
  Clock,
  MoreVertical,
  ChevronDown,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LeadVaultPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admin/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const updateStatus = async (leadId: string, status: string) => {
    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, status })
      });
      fetchLeads();
    } catch (err) {
      alert('Status refinement failed.');
    }
  };

  const filteredLeads = leads.filter(l => 
    l.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    l.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Institutional Module Header */}
      <div className="pb-8 border-b border-slate-200">
         <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Lead Vault</h1>
         <p className="text-sm text-slate-500 mt-1">High-performance intelligence repository for prospective institutional student leads.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Workspace Toolbar */}
        <div className="px-8 py-5 bg-slate-50/50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                 type="text" 
                 placeholder="Search lead intelligence..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium w-80 focus:ring-2 focus:ring-slate-100 outline-none transition-all" 
              />
           </div>
           <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{filteredLeads.length} Leads Synchronized</div>
        </div>

        {/* Institutional Ledger */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-8 py-5">Prospect Identity</th>
                <th className="px-8 py-5">Origin Node</th>
                <th className="px-8 py-5">Contextual Intel</th>
                <th className="px-8 py-5">Lifecycle Status</th>
                <th className="px-8 py-5">Entry Date</th>
                <th className="px-8 py-5 text-right w-32">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 italic">
              {isLoading ? (
                [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan={6} className="h-20 bg-slate-50/20" /></tr>)
              ) : filteredLeads.length === 0 ? (
                <tr>
                   <td colSpan={6} className="py-24 text-center text-sm font-semibold text-slate-400">No prospective leads detected in institutional vault.</td>
                </tr>
              ) : filteredLeads.map((lead) => (
                <tr key={lead._id} className="hover:bg-slate-50/50 transition-all group border-l-2 border-transparent hover:border-slate-900 not-italic">
                  <td className="px-8 py-5">
                     <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-slate-600 transition-colors">{lead.fullName}</p>
                        <div className="flex items-center gap-3">
                           <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                             <Mail className="h-3 w-3" /> {lead.email}
                           </p>
                           <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                             <Phone className="h-3 w-3" /> {lead.phone || 'N/A'}
                           </p>
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-5">
                     <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase">
                        <Globe className="h-3.5 w-3.5 text-slate-400" />
                        {lead.country || 'Global Ingress'}
                     </div>
                  </td>
                  <td className="px-8 py-5">
                     <div className="max-w-[180px]">
                        <p className="text-[11px] font-bold text-slate-700 truncate">{lead.university || 'General Discovery'}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 truncate">{lead.program || 'No Program Specified'}</p>
                     </div>
                  </td>
                  <td className="px-8 py-5">
                     <select 
                       value={lead.status || 'new'} 
                       onChange={(e) => updateStatus(lead._id, e.target.value)}
                       className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all cursor-pointer outline-none ${
                        lead.status === 'converted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        lead.status === 'lost' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                        'bg-blue-50 text-blue-600 border-blue-100'
                       }`}
                     >
                        <option value="new">New Lead</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                     </select>
                  </td>
                  <td className="px-8 py-5">
                     <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                        <Clock className="h-3.5 w-3.5" />
                        {new Date(lead.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                     </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                     <button className="p-2.5 hover:bg-slate-100 text-slate-300 hover:text-slate-900 rounded-xl transition-all shadow-sm active:translate-y-[1px]">
                        <MoreVertical className="h-4.5 w-4.5" />
                     </button>
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

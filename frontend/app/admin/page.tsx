"use client";

import React, { useEffect, useState } from 'react';
import { 
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/admin/metrics');
        if (res.ok) {
          const data = await res.json();
          setMetrics(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const stats = [
    { 
      label: 'Active Users', 
      value: metrics?.totalUsers || '0', 
      trend: metrics?.userGrowth > 0 ? `+${metrics.userGrowth}` : '0', 
      icon: 'Users', 
      color: 'bg-indigo-500', 
      desc: 'Institutional accounts' 
    },
    { 
      label: 'Feed Signals', 
      value: metrics?.totalPosts || '0', 
      trend: 'Universal', 
      icon: 'Radio', 
      color: 'bg-amber-500', 
      desc: 'Global announcements' 
    },
    { 
      label: 'Community Engagement', 
      value: metrics?.totalCommunityPosts || '0', 
      trend: 'Live Monitoring', 
      icon: 'MessageSquare', 
      color: 'bg-emerald-500', 
      desc: 'User-generated posts' 
    },
    { 
      label: 'Network Status', 
      value: 'OPERATIONAL', 
      trend: '99.9%', 
      icon: 'Activity', 
      color: 'bg-rose-500', 
      desc: 'Security node active' 
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-10 w-10 text-brand-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-[1600px] mx-auto">
      {/* Welcome Mat */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Platform Overview</h1>
          <p className="text-slate-500 mt-1 font-medium">Real-time performance and student activity metrics.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <Calendar className="h-4 w-4 text-slate-400 mr-2" />
          <span className="text-slate-400 uppercase tracking-wider">Sync Status:</span>
          <span className="text-emerald-500 uppercase tracking-wider ml-1">Live</span>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-brand-primary/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-xl ${stat.color} text-white shadow-lg shadow-${stat.color.split('-')[1]}-200`}>
                <DynamicIcon name={stat.icon} className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100 uppercase tracking-widest">
                {stat.trend}
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            <div className="mt-4 pt-4 border-t border-slate-50">
              <p className="text-[11px] font-medium text-slate-400 italic">{stat.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Network Growth Visualization */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-lg font-bold text-slate-900 tracking-tight">Network Velocity</h4>
              <p className="text-sm text-slate-500 font-medium">Student acquisition over the last 30 days</p>
            </div>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 pt-4">
            {metrics?.dailyGrowth?.map((day: any, i: number) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                 <div 
                   className="w-full bg-slate-100 rounded-lg relative group transition-all"
                   style={{ height: `${(day.count / (metrics.maxDaily || 1)) * 100}%`, minHeight: '4px' }}
                 >
                    <div className="absolute inset-x-0 bottom-0 bg-brand-primary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" style={{ height: '100%' }} />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                       {day.count} New Students
                    </div>
                 </div>
                 <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">{day.date}</span>
              </div>
            )) || <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold italic">No telemetry data available for this sector</div>}
          </div>
        </div>

        {/* Tactical Feed Monitor */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary blur-[120px] opacity-20" />
           <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
                    <TrendingUp className="h-5 w-5 text-brand-primary" />
                 </div>
                 <h4 className="text-sm font-bold uppercase tracking-wider">Protocol Status</h4>
              </div>
              
              <div className="space-y-6">
                 <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Database Node</span>
                       <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Connected</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-400 w-full" />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                       <span className="text-xs font-medium opacity-80 italic">Global Broadcast Ledger: Active</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                       <span className="text-xs font-medium opacity-80 italic">Student Telemetry Sync: Stable</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <AlertCircle className="h-4 w-4 text-amber-400" />
                       <span className="text-xs font-medium opacity-80 italic">Maintenance Window: T+48 Hours</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

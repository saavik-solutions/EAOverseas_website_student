"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Trash2, 
  Search, 
  User,
  ShieldCheck,
  Mail,
  GraduationCap,
  Calendar,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DeleteConfirmationModal } from '@/components/ui/DeleteConfirmationModal';

export default function StudentDirectoryPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Deletion Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/admin/students');
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const confirmDeleteStudent = (userId: string) => {
    setStudentToDelete(userId);
    setDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    if (!studentToDelete) return;
    setIsDeleting(true);
    try {
      await fetch('/api/admin/students', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: studentToDelete })
      });
      await fetchStudents();
      setDeleteModalOpen(false);
      setStudentToDelete(null);
    } catch (err) {
      alert('Termination Failed.');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredStudents = students.filter(s => 
    s.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <DeleteConfirmationModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={executeDelete}
        title="Delete Student Record"
        description="Are you sure you want to permanently delete this student record across all institutional clusters? This action cannot be reversed."
        isDeleting={isDeleting}
      />
      {/* Institutional Module Header */}
      <div className="pb-8 border-b border-slate-200">
         <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Student Directory</h1>
         <p className="text-sm text-slate-500 mt-1">Audit, manage, and verify the institutional student population.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Workspace Toolbar */}
        <div className="px-8 py-5 bg-slate-50/50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
           <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                 type="text" 
                 placeholder="Search student identity..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium w-80 focus:ring-2 focus:ring-slate-100 outline-none transition-all" 
              />
           </div>
           <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{filteredStudents.length} Verified Records</div>
        </div>

        {/* Institutional Ledger */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-8 py-5">Student Identity</th>
                <th className="px-8 py-5">Registry Status</th>
                <th className="px-8 py-5">Academic Interest</th>
                <th className="px-8 py-5">Registration Date</th>
                <th className="px-8 py-5 text-right w-32">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                [1,2,3].map(i => <tr key={i} className="animate-pulse"><td colSpan={5} className="h-20 bg-slate-50/20" /></tr>)
              ) : filteredStudents.length === 0 ? (
                <tr>
                   <td colSpan={5} className="py-24 text-center text-sm font-semibold text-slate-400">No verified student records in institutional registry.</td>
                </tr>
              ) : filteredStudents.map((student) => (
                <tr key={student._id} className="hover:bg-slate-50/50 transition-all group border-l-2 border-transparent hover:border-slate-900">
                  <td className="px-8 py-5">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center font-bold text-white text-xs shadow-sm">
                           {student.fullName?.substring(0, 2).toUpperCase() || 'ST'}
                        </div>
                        <div>
                           <p className="text-sm font-bold text-slate-900">{student.fullName}</p>
                           <div className="flex items-center gap-3 mt-0.5">
                              <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                                <Mail className="h-3 w-3" /> {student.email}
                              </p>
                              {student.isEmailVerified && (
                                <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-500 uppercase tracking-tight">
                                  <ShieldCheck className="h-3 w-3" /> Verified
                                </span>
                              )}
                           </div>
                        </div>
                     </div>
                  </td>
                  <td className="px-8 py-5">
                     <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-500 text-[10px] font-bold uppercase rounded-lg shadow-sm">
                        {student.role || 'Student'}
                     </span>
                  </td>
                  <td className="px-8 py-5">
                     <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                        {student.programPreference || 'General Academic'}
                     </div>
                  </td>
                  <td className="px-8 py-5">
                     <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(student.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                     </div>
                  </td>
                  <td className="px-8 py-5">
                     <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/students/${student._id}`}
                          className="p-2.5 hover:bg-slate-100 text-slate-400 hover:text-brand-primary rounded-xl transition-all shadow-sm active:translate-y-[1px]"
                        >
                          <Eye className="h-4.5 w-4.5" />
                        </Link>
                        <button 
                          onClick={() => confirmDeleteStudent(student._id)}
                          className="p-2.5 hover:bg-rose-50 text-slate-300 hover:text-rose-500 rounded-xl transition-all shadow-sm active:translate-y-[1px]"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
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

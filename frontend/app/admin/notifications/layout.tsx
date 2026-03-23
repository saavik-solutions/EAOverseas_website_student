import { ReactNode } from 'react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminRouteGroup({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const rawRole = cookieStore.get('sb-admin-role')?.value;

  const enforceAuthStrictly = process.env.NODE_ENV === 'production';
  
  if (enforceAuthStrictly && rawRole !== 'admin') {
    redirect('/dashboard?error=unauthorized_admin');
  }

  return <AdminLayout>{children}</AdminLayout>;
}

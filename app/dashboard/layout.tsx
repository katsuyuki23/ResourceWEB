'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthProvider, useAuth } from '@/components/auth/AuthProvider';
import { DashboardSidebar, DashboardHeader } from '@/components/layout/DashboardSidebar';
import { notifications } from '@/data/mockData';
import { Loader2 } from 'lucide-react';

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('panti_admin_user');
    if (!storedUser && !isLoading) {
      router.push('/auth');
    }
  }, [isLoading, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-emerald-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  const storedUser = localStorage.getItem('panti_admin_user');
  if (!user && !storedUser) {
    return null;
  }

  // Don't show sidebar on login page
  if (pathname === '/auth') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-emerald-50/30">
      <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className={[
        'transition-all duration-300',
        // We don't have access to collapsed state here, but this is simplified
        'lg:ml-64'
      ].join(' ')}>
        <DashboardHeader setSidebarOpen={setSidebarOpen} notifications={notifications} />
        
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </AuthProvider>
  );
}

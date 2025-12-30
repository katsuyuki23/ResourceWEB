'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Heart,
  Baby,
  Gift,
  Receipt,
  FileText,
  Newspaper,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  MoonStar,
  Bell,
  Search,
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    permission: 'read'
  },
  {
    title: 'Kelola User',
    href: '/dashboard/users',
    icon: Users,
    permission: 'manage_users'
  },
  {
    title: 'Kelola Donatur',
    href: '/dashboard/donatur',
    icon: Heart,
    permission: 'read'
  },
  {
    title: 'Data Anak',
    href: '/dashboard/anak',
    icon: Baby,
    permission: 'read'
  },
  {
    title: 'Input Donasi',
    href: '/dashboard/donasi',
    icon: Gift,
    permission: 'create'
  },
  {
    title: 'Input Pengeluaran',
    href: '/dashboard/pengeluaran',
    icon: Receipt,
    permission: 'create'
  },
  {
    title: 'Laporan Keuangan',
    href: '/dashboard/laporan',
    icon: FileText,
    permission: 'export'
  },
  {
    title: 'Berita/Pengumuman',
    href: '/dashboard/berita',
    icon: Newspaper,
    permission: 'read'
  }
];

export function DashboardSidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout, hasPermission } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/auth';
  };

  const filteredMenu = menuItems.filter(item => 
    hasPermission(item.permission)
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen bg-gradient-to-b from-emerald-800 to-emerald-900 transition-all duration-300 ease-in-out flex flex-col',
          isCollapsed ? 'w-20' : 'w-64',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-emerald-700/50">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className={cn(
              'flex items-center justify-center bg-white/10 rounded-xl transition-all',
              isCollapsed ? 'w-10 h-10' : 'w-12 h-12'
            )}>
              <MoonStar className={cn('text-white', isCollapsed ? 'w-5 h-5' : 'w-7 h-7')} />
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <h1 className="text-lg font-bold text-white truncate">Panti Asuhan</h1>
                <p className="text-xs text-emerald-300 truncate">Santri Al-Falah</p>
              </div>
            )}
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden text-emerald-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collapse Toggle (Desktop) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white rounded-full items-center justify-center text-emerald-800 shadow-lg hover:bg-emerald-50 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {filteredMenu.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                      isActive
                        ? 'bg-white/10 text-white shadow-lg'
                        : 'text-emerald-200 hover:bg-white/5 hover:text-white'
                    )}
                    title={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className={cn('w-5 h-5 flex-shrink-0', isCollapsed && 'mx-auto')} />
                    {!isCollapsed && (
                      <span className="font-medium truncate">{item.title}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Section */}
        <div className="p-3 border-t border-emerald-700/50">
          {user && (
            <div className={cn(
              'flex items-center gap-3 p-2 rounded-lg bg-emerald-900/50',
              isCollapsed && 'justify-center'
            )}>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full border-2 border-emerald-400"
              />
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-xs text-emerald-300 capitalize">{user.role}</p>
                </div>
              )}
              {!isCollapsed && (
                <button
                  onClick={handleLogout}
                  className="p-2 text-emerald-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  notifications: { id: string; title: string; message: string; type: string; read: boolean }[];
}

export function DashboardHeader({ setSidebarOpen, notifications }: HeaderProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Search */}
          <div className="hidden sm:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari..."
                className="w-64 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Settings */}
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors hidden sm:flex">
            <Settings className="w-5 h-5" />
          </button>

          {/* User Avatar (Mobile) */}
          <div className="sm:hidden">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

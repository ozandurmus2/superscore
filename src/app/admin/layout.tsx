'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  Shield,
  LayoutDashboard,
  MessageSquare,
  Building2,
  Users,
  Star,
  Settings,
  Menu,
  X,
  LogOut,
} from 'lucide-react';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Panel', live: true },
  { href: '/admin/sikayetler', icon: MessageSquare, label: 'Sikayetler', live: false },
  { href: '/admin/markalar', icon: Building2, label: 'Markalar', live: false },
  { href: '/admin/kullanicilar', icon: Users, label: 'Kullanicilar', live: false },
  { href: '/admin/degerlendirmeler', icon: Star, label: 'Degerlendirmeler', live: false },
  { href: '/admin/ayarlar', icon: Settings, label: 'Ayarlar', live: false },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function check() {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (!authUser) {
        router.push('/giris');
        return;
      }
      const { data } = await supabase.from('users').select('role').eq('id', authUser.id).single();
      if (!data || (data as { role: string }).role !== 'super_admin') {
        router.push('/');
        return;
      }
      setAuthorized(true);
    }
    check();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  function isActive(href: string) {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  }

  const sidebarContent = (
    <>
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-green-500/20 flex items-center justify-center">
            <Shield className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight">Superscore</span>
            <p className="text-[11px] text-gray-400 -mt-0.5">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p className="px-3 pt-3 pb-1.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
          Menu
        </p>
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                active
                  ? 'bg-white/15 text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/8'
              }`}
            >
              <item.icon className={`h-[18px] w-[18px] ${active ? 'text-green-400' : ''}`} />
              <span className="flex-1">{item.label}</span>
              {item.live && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-red-300 w-full px-3 py-2.5 rounded-lg hover:bg-white/8 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Cikis Yap
        </button>
      </div>
    </>
  );

  if (!authorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B1F3B]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-[260px] bg-[#1B1F3B] text-white flex-col fixed h-full z-30">
        {sidebarContent}
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#1B1F3B] text-white px-4 h-14 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-400" />
          <span className="font-bold text-sm">Superscore Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-[260px] bg-[#1B1F3B] text-white h-full flex flex-col pt-14 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-[260px] pt-14 lg:pt-0 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px]">{children}</div>
      </main>
    </div>
  );
}

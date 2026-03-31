'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Shield, LayoutDashboard, Building2, MessageSquare, Users, Brain, Settings, Menu, X, LogOut } from 'lucide-react';
import type { User } from '@/types';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Panel' },
  { href: '/admin/markalar', icon: Building2, label: 'Markalar' },
  { href: '/admin/sikayetler', icon: MessageSquare, label: 'Şikayetler' },
  { href: '/admin/kullanicilar', icon: Users, label: 'Kullanıcılar' },
  { href: '/admin/dogrulama', icon: Brain, label: 'AI Doğrulama' },
  { href: '/admin/ayarlar', icon: Settings, label: 'Ayarlar' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function check() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) { router.push('/giris'); return; }
      const { data } = await supabase.from('users').select('role').eq('id', authUser.id).single();
      if (!data || (data as { role: string }).role !== 'super_admin') router.push('/');
    }
    check();
  }, []);

  const handleSignOut = async () => { await supabase.auth.signOut(); window.location.href = '/'; };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex w-64 bg-[#1B1F3B] text-white flex-col fixed h-full">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-green-400" />
            <span className="text-lg font-bold">Superscore</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Yönetim Paneli</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-white/20 text-white' : 'text-gray-300 hover:bg-white/10'}`}>
                <item.icon className="h-5 w-5" /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleSignOut} className="flex items-center gap-2 text-sm text-red-300 hover:text-red-200 w-full px-3 py-2 rounded-lg hover:bg-white/10">
            <LogOut className="h-4 w-4" /> Çıkış Yap
          </button>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#1B1F3B] text-white px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2"><Shield className="h-6 w-6 text-green-400" /><span className="font-bold">Admin</span></div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
      </div>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <div className="w-64 bg-[#1B1F3B] text-white h-full p-4 pt-16" onClick={(e) => e.stopPropagation()}>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${pathname === item.href ? 'bg-white/20' : 'text-gray-300'}`}>
                  <item.icon className="h-5 w-5" /> {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0"><div className="p-6 lg:p-8">{children}</div></main>
    </div>
  );
}

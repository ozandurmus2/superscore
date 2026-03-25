'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Shield, LayoutDashboard, PenSquare, FileText, Star, Bell, Settings, Menu, X, LogOut } from 'lucide-react';
import type { User } from '@/types';

const navItems = [
  { href: '/panel', icon: LayoutDashboard, label: 'Panel' },
  { href: '/panel/sikayet-yaz', icon: PenSquare, label: 'Şikayet Yaz' },
  { href: '/panel/sikayetlerim', icon: FileText, label: 'Şikayetlerim' },
  { href: '/panel/yorumlarim', icon: Star, label: 'Yorumlarım' },
  { href: '/panel/bildirimler', icon: Bell, label: 'Bildirimler' },
  { href: '/panel/ayarlar', icon: Settings, label: 'Ayarlar' },
];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data } = await supabase.from('users').select('*').eq('id', authUser.id).single();
        if (data) setUser(data as User);
      } else {
        setIsGuest(true);
      }
    }
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  // Guest mode - show simplified layout for /panel/sikayet-yaz
  if (isGuest && pathname === '/panel/sikayet-yaz') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-[#1B1F3B]" />
            <span className="font-bold text-[#1B1F3B]">Superscore</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/giris" className="text-sm text-gray-600 hover:text-[#1B1F3B]">Giriş Yap</Link>
            <Link href="/kayit" className="text-sm bg-[#1B1F3B] text-white px-4 py-1.5 rounded-lg hover:bg-[#2a2f5a]">Üye Ol</Link>
          </div>
        </div>
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">{children}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col fixed h-full">
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-[#1B1F3B]" />
            <span className="text-lg font-bold text-[#1B1F3B]">Superscore</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/panel' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-[#1B1F3B] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          {user && (
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#1B1F3B] flex items-center justify-center text-white text-sm font-medium">
                {user.full_name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.full_name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          )}
          <button onClick={handleSignOut} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 w-full px-3 py-2 rounded-lg hover:bg-red-50">
            <LogOut className="h-4 w-4" /> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-[#1B1F3B]" />
          <span className="font-bold text-[#1B1F3B]">Superscore</span>
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <div className="w-64 bg-white h-full p-4 pt-16" onClick={(e) => e.stopPropagation()}>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'bg-[#1B1F3B] text-white' : 'text-gray-600'}`}>
                    <item.icon className="h-5 w-5" /> {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

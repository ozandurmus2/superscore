'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Shield, LayoutDashboard, MessageSquare, Star, BarChart3, Code, Users, CreditCard, Settings, Menu, X, LogOut } from 'lucide-react';
import type { Brand } from '@/types';

const navItems = [
  { href: '/marka-panel', icon: LayoutDashboard, label: 'Panel' },
  { href: '/marka-panel/sikayetler', icon: MessageSquare, label: 'Şikayetler' },
  { href: '/marka-panel/yorumlar', icon: Star, label: 'Yorumlar' },
  { href: '/marka-panel/istatistikler', icon: BarChart3, label: 'İstatistikler' },
  { href: '/marka-panel/widget', icon: Code, label: 'Widget' },
  { href: '/marka-panel/ekip', icon: Users, label: 'Ekip' },
  { href: '/marka-panel/abonelik', icon: CreditCard, label: 'Abonelik' },
  { href: '/marka-panel/ayarlar', icon: Settings, label: 'Ayarlar' },
];

export default function BrandPanelLayout({ children }: { children: React.ReactNode }) {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/giris'); return; }

      // First check user role
      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'brand_admin') { router.push('/panel'); return; }

      // Then get brand membership
      const { data: member } = await supabase
        .from('brand_members')
        .select('brand_id')
        .eq('user_id', user.id)
        .single();

      if (!member) { router.push('/panel'); return; }

      // Get brand details separately
      const { data: brandData } = await supabase
        .from('brands')
        .select('*')
        .eq('id', member.brand_id)
        .single();

      if (brandData) setBrand(brandData as Brand);
    }
    load();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col fixed h-full">
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-[#1B1F3B]" />
            <span className="text-lg font-bold text-[#1B1F3B]">Superscore</span>
          </Link>
          {brand && <p className="text-sm text-gray-500 mt-2 truncate">{brand.name}</p>}
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/marka-panel' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-[#1B1F3B] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                <item.icon className="h-5 w-5" /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button onClick={handleSignOut} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 w-full px-3 py-2 rounded-lg hover:bg-red-50">
            <LogOut className="h-4 w-4" /> Çıkış Yap
          </button>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2"><Shield className="h-6 w-6 text-[#1B1F3B]" /><span className="font-bold text-[#1B1F3B]">Superscore</span></Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
      </div>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setSidebarOpen(false)}>
          <div className="w-64 bg-white h-full p-4 pt-16" onClick={(e) => e.stopPropagation()}>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${pathname === item.href ? 'bg-[#1B1F3B] text-white' : 'text-gray-600'}`}>
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

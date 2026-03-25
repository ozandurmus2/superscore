'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X, Bell, User as UserIcon, LogOut, ChevronDown } from 'lucide-react';
import type { User } from '@/types';

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single();
        if (data) setUser(data as User);
      }
    }
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const getDashboardLink = () => {
    if (!user) return '/panel';
    if (user.role === 'super_admin') return '/admin';
    if (user.role === 'brand_admin') return '/marka-panel';
    return '/panel';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-[#1B1F3B]" />
          <span className="text-xl font-bold text-[#1B1F3B]">Superscore</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/markalar" className="text-sm font-medium text-gray-600 hover:text-[#1B1F3B] transition-colors">
            Markalar
          </Link>
          <Link href="/sikayetler" className="text-sm font-medium text-gray-600 hover:text-[#1B1F3B] transition-colors">
            Şikayetler
          </Link>
          <Link href="/nasil-calisir" className="text-sm font-medium text-gray-600 hover:text-[#1B1F3B] transition-colors">
            Nasıl Çalışır
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link href={`${getDashboardLink()}/bildirimler`}>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-[#1B1F3B] flex items-center justify-center text-white text-sm font-medium">
                    {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.full_name}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg py-1 z-50">
                    <Link
                      href={getDashboardLink()}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <UserIcon className="h-4 w-4" /> Panel
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" /> Çıkış Yap
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link href="/giris">
                <Button variant="ghost">Giriş Yap</Button>
              </Link>
              <Link href="/kayit">
                <Button>Ücretsiz Başla</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-3">
          <Link href="/markalar" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMenuOpen(false)}>Markalar</Link>
          <Link href="/sikayetler" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMenuOpen(false)}>Şikayetler</Link>
          <Link href="/nasil-calisir" className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMenuOpen(false)}>Nasıl Çalışır</Link>
          <hr />
          {user ? (
            <>
              <Link href={getDashboardLink()} className="block text-sm font-medium text-gray-600 py-2" onClick={() => setMenuOpen(false)}>Panel</Link>
              <button onClick={handleSignOut} className="block text-sm font-medium text-red-600 py-2">Çıkış Yap</button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link href="/giris" className="flex-1"><Button variant="outline" className="w-full">Giriş Yap</Button></Link>
              <Link href="/kayit" className="flex-1"><Button className="w-full">Ücretsiz Başla</Button></Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

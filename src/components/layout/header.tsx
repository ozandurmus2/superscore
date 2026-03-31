'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import {
  Bell, Search, Menu, X, LogOut, Settings, Star, PenSquare,
  Grid3X3, HelpCircle, UserCircle, ChevronDown, ChevronRight,
  MessageSquareText, Zap, BarChart3, TrendingUp, Building2, Rocket,
  BookOpen,
} from 'lucide-react';
import type { User } from '@/types';

/* ─── Resources menu data ────────────────────────────────────────────────── */
const RESOURCES_MENU = [
  { label: 'Blog', href: '/blog' },
  { label: 'Kılavuzlar ve raporlar', href: '/business/kaynaklar/kilavuzlar' },
  { label: 'Web seminerleri ve videolar', href: '/business/kaynaklar/videolar' },
  { label: 'Yardım Merkezi', href: '/help' },
  { label: 'Ortaklar: yönlendirme programı', href: '/business/kaynaklar/ortaklar' },
  { label: 'Entegrasyonlar', href: '/business/ozellikler/entegrasyonlar' },
];

/* ─── Features menu data ─────────────────────────────────────────────────── */
const FEATURES_MENU = [
  {
    title: 'Değerlendirme Davetleri',
    items: [
      { label: 'Hizmet değerlendirmeleri', href: '/business/ozellikler/hizmet-degerlendirmeleri' },
      { label: 'Ürün yorumları', href: '/business/ozellikler/urun-yorumlari' },
      { label: 'QR Değerlendirme', href: '/business/ozellikler/qr-degerlendirme' },
      { label: 'Yorum davetleri', href: '/business/ozellikler/yorum-davetleri' },
    ],
  },
  {
    title: 'Geri Bildirim Yönetimi',
    items: [
      { label: 'Marka profil sayfası', href: '/business/ozellikler/profil-sayfasi' },
      { label: 'Yorum yanıtlama', href: '/business/ozellikler/yorum-yanitlama' },
      { label: 'Çözüm Merkezi', href: '/business/ozellikler/cozum-merkezi' },
    ],
  },
  {
    title: 'Dönüşüm Araçları',
    items: [
      { label: 'SEO & AI Keşfi', href: '/business/ozellikler/seo-ai-kesfi' },
      { label: 'Superscore widget\'ları', href: '/business/ozellikler/widgetlar' },
      { label: 'Güven rozetleri', href: '/business/ozellikler/guven-rozetleri' },
      { label: 'Sosyal medya araçları', href: '/business/ozellikler/sosyal-medya' },
      { label: 'Entegrasyonlar', href: '/business/ozellikler/entegrasyonlar' },
    ],
  },
  {
    title: 'İçgörüler & Analitik',
    items: [
      { label: 'Rakip Analizi', href: '/business/ozellikler/rakip-analizi' },
      { label: 'Sektör Sıralaması', href: '/business/ozellikler/sektor-siralamasi' },
      { label: 'Yorum içgörüleri', href: '/business/ozellikler/yorum-icgoruleri' },
      { label: 'Veri ve analitik', href: '/business/ozellikler/veri-analitik' },
      { label: 'Yorum etiketleme', href: '/business/ozellikler/yorum-etiketleme' },
    ],
  },
];

/* ─── Solutions menu data ─────────────────────────────────────────────────── */
const SOLUTIONS_MENU = {
  byGoal: {
    title: 'İş hedefiyle',
    items: [
      { label: 'Geri bildirimlerle etkileşim kurun', href: '/business/geri-bildirim', icon: MessageSquareText },
      { label: 'Dönüşümleri hızlandırın', href: '/business/donusum', icon: Zap },
      { label: 'Bilgilerle gelişin', href: '/business/bilgiler', icon: BarChart3 },
      { label: 'Gelir artışını sağlayın', href: '/business/gelir-artisi', icon: TrendingUp },
    ],
  },
  bySize: {
    title: 'İşletme büyüklüğüne göre',
    items: [
      { label: 'Küçük ve büyüyen işletmeler', href: '/business/kucuk-isletmeler', icon: Rocket },
      { label: 'İşletmeler', href: '/business/isletmeler', icon: Building2 },
    ],
  },
};

export function Header() {
  const pathname = usePathname();
  const isBusinessPage = pathname?.startsWith('/business');
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileSolutions, setMobileSolutions] = useState(false);
  const [mobileFeatures, setMobileFeatures] = useState(false);
  const [mobileResources, setMobileResources] = useState(false);

  const closeAllMenus = () => { setSolutionsOpen(false); setFeaturesOpen(false); setResourcesOpen(false); };
  const dropdownRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data } = await supabase.from('users').select('*').eq('id', authUser.id).single();
        if (data) setUser(data as User);
      }
    }
    getUser();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'super_admin') return '/admin';
    if (user.role === 'brand_admin') return '/marka-panel';
    return `/users/${user.id}`;
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#1b1a1b]">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image src="/logo/White_SS.png" alt="Superscore" width={140} height={36} className="h-8 w-auto" priority />
          </Link>

          {/* Desktop Nav - Center */}
          <nav className="hidden lg:flex items-center gap-1 ml-8">
            {isBusinessPage ? (
              <>
                {/* Çözümler dropdown trigger */}
                <button
                  type="button"
                  onMouseEnter={() => { closeAllMenus(); setSolutionsOpen(true); }}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors rounded-lg"
                >
                  Çözümler
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${solutionsOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Özellikler dropdown trigger */}
                <button
                  type="button"
                  onMouseEnter={() => { closeAllMenus(); setFeaturesOpen(true); }}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors rounded-lg"
                >
                  Özellikler
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${featuresOpen ? 'rotate-180' : ''}`} />
                </button>

                <Link href="/sikayet-yaz" onMouseEnter={closeAllMenus} className="px-3 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors rounded-lg">
                  Şikayet Yaz
                </Link>
                <Link href="/kategoriler" onMouseEnter={closeAllMenus} className="px-3 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors rounded-lg">
                  Kategoriler
                </Link>

                {/* Kaynaklar dropdown trigger */}
                <button
                  type="button"
                  onMouseEnter={() => { closeAllMenus(); setResourcesOpen(true); }}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors rounded-lg"
                >
                  Kaynaklar
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${resourcesOpen ? 'rotate-180' : ''}`} />
                </button>
              </>
            ) : (
              <>
                <Link href="/sikayet-yaz" className="px-3 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors rounded-lg">
                  Şikayet Yaz
                </Link>
                <Link href="/kategoriler" className="px-3 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors rounded-lg">
                  Kategoriler
                </Link>
                <Link href="/blog" className="px-3 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors rounded-lg">
                  Blog
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {/* Notification Bell */}
                <Link href={`${getDashboardLink()}/bildirimler`}>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Bell className="h-5 w-5 text-[#819cf3]" />
                  </button>
                </Link>

                {/* User Avatar + Name */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/10 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-[#00b67a] flex items-center justify-center text-white text-sm font-bold">
                      {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-sm font-medium text-gray-200 max-w-[100px] truncate">{user.full_name?.split(' ')[0]}</span>
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#1b1a1b] shadow-2xl z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-700/50">
                        <p className="text-sm font-medium text-white">{user.full_name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                      <Link href={`/users/${user.id}`} className="block px-4 py-3 text-sm text-white hover:bg-[#a5c5fa] hover:text-black transition-colors" onClick={() => setDropdownOpen(false)}>
                        Yorumlarım
                      </Link>
                      <Link href="/users/settings" className="block px-4 py-3 text-sm text-white hover:bg-[#a5c5fa] hover:text-black transition-colors" onClick={() => setDropdownOpen(false)}>
                        Ayarlarım
                      </Link>
                      <Link href="/help" className="block px-4 py-3 text-sm text-white hover:bg-[#a5c5fa] hover:text-black transition-colors" onClick={() => setDropdownOpen(false)}>
                        Yardım
                      </Link>
                      <button onClick={handleSignOut} className="block w-full text-left px-4 py-3 text-sm text-white hover:bg-[#a5c5fa] hover:text-black transition-colors">
                        Çıkış yap
                      </button>
                    </div>
                  )}
                </div>

                {/* For Businesses Button */}
                <Link href="/business">
                  <button className="ml-2 px-5 py-2 text-sm font-medium text-black bg-[#819cf3] border-none rounded-full hover:bg-[#a5c5fa] transition-all duration-200">
                    Markalar İçin
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/giris" className="text-sm font-medium text-white hover:text-gray-300 transition-colors px-3 py-2">
                  Giriş Yap
                </Link>
                <Link href="/kayit" className="text-sm font-medium text-white hover:text-gray-300 transition-colors px-3 py-2">
                  Kayıt Ol
                </Link>
                <Link href="/business">
                  <button className="ml-2 px-5 py-2 text-sm font-medium text-black bg-[#819cf3] border-none rounded-full hover:bg-[#a5c5fa] transition-all duration-200">
                    Markalar İçin
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Icons */}
          <div className="flex lg:hidden items-center gap-2">
            <Link href={user ? `${getDashboardLink()}/bildirimler` : '/giris'}>
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Bell className="h-5 w-5 text-[#819cf3]" />
              </button>
            </Link>
            <Link href="/markalar">
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <Search className="h-5 w-5 text-[#819cf3]" />
              </button>
            </Link>
            <button
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <X className="h-5 w-5 text-[#819cf3]" />
              ) : (
                <Menu className="h-5 w-5 text-[#819cf3]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Solutions Dropdown Panel */}
      <div
        className="hidden lg:flex fixed left-0 right-0 z-40 justify-center pointer-events-none"
        style={{ top: 56 }}
      >
        <div
          onMouseEnter={() => setSolutionsOpen(true)}
          onMouseLeave={() => setSolutionsOpen(false)}
          className="pointer-events-auto relative"
          style={{ width: 620 }}
        >
          {/* Triangle arrow */}
          <div
            className="flex justify-center -mt-[9px]"
            style={{
              opacity: solutionsOpen ? 1 : 0,
              transition: 'opacity 200ms ease',
            }}
          >
            <div className="w-[18px] h-[18px] bg-white rotate-45 -mb-[9px] relative z-10" />
          </div>

          {/* Panel body */}
          <div
            style={{
              maxHeight: solutionsOpen ? 500 : 0,
              opacity: solutionsOpen ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 800ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="bg-white rounded-b-[20px] shadow-[0_25px_80px_rgba(0,0,0,0.15)]">
              <div className="grid grid-cols-2 gap-12 px-10 pt-8 pb-10">
                {/* Left: İş hedefiyle */}
                <div>
                  <h3
                    className="font-bold text-[#1b1a1b] pb-3 border-b border-gray-200"
                    style={{
                      fontSize: 16,
                      opacity: solutionsOpen ? 1 : 0,
                      transform: solutionsOpen ? 'translateY(0)' : 'translateY(6px)',
                      transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 150ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 150ms',
                    }}
                  >
                    {SOLUTIONS_MENU.byGoal.title}
                  </h3>
                  <ul className="mt-4 space-y-0.5">
                    {SOLUTIONS_MENU.byGoal.items.map((item, i) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setSolutionsOpen(false)}
                          className="block py-[10px] text-[#1b1a1b] hover:text-[#3c57bc] transition-colors"
                          style={{
                            fontSize: 14,
                            opacity: solutionsOpen ? 1 : 0,
                            transform: solutionsOpen ? 'translateY(0)' : 'translateY(8px)',
                            transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${280 + i * 60}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${280 + i * 60}ms`,
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: İşletme büyüklüğüne göre */}
                <div>
                  <h3
                    className="font-bold text-[#1b1a1b] pb-3 border-b border-gray-200"
                    style={{
                      fontSize: 16,
                      opacity: solutionsOpen ? 1 : 0,
                      transform: solutionsOpen ? 'translateY(0)' : 'translateY(6px)',
                      transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 200ms',
                    }}
                  >
                    {SOLUTIONS_MENU.bySize.title}
                  </h3>
                  <ul className="mt-4 space-y-0.5">
                    {SOLUTIONS_MENU.bySize.items.map((item, i) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setSolutionsOpen(false)}
                          className="block py-[10px] text-[#1b1a1b] hover:text-[#3c57bc] transition-colors"
                          style={{
                            fontSize: 14,
                            opacity: solutionsOpen ? 1 : 0,
                            transform: solutionsOpen ? 'translateY(0)' : 'translateY(8px)',
                            transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${320 + i * 60}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${320 + i * 60}ms`,
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Dropdown Panel */}
      <div
        className="hidden lg:flex fixed left-0 right-0 z-40 justify-center pointer-events-none"
        style={{ top: 56 }}
      >
        <div
          onMouseEnter={() => setFeaturesOpen(true)}
          onMouseLeave={() => setFeaturesOpen(false)}
          className="pointer-events-auto relative"
          style={{ width: 720 }}
        >
          {/* Triangle arrow */}
          <div
            className="flex justify-center -mt-[9px]"
            style={{
              opacity: featuresOpen ? 1 : 0,
              transition: 'opacity 200ms ease',
            }}
          >
            <div className="w-[18px] h-[18px] bg-white rotate-45 -mb-[9px] relative z-10" />
          </div>

          {/* Panel body */}
          <div
            style={{
              maxHeight: featuresOpen ? 600 : 0,
              opacity: featuresOpen ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 800ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="bg-white rounded-b-[20px] shadow-[0_25px_80px_rgba(0,0,0,0.15)]">
              <div className="grid grid-cols-2 gap-x-12 gap-y-8 px-10 pt-8 pb-10">
                {FEATURES_MENU.map((category, catIdx) => (
                  <div key={category.title}>
                    <h3
                      className="font-bold text-[#1b1a1b] pb-3 border-b border-gray-200"
                      style={{
                        fontSize: 16,
                        opacity: featuresOpen ? 1 : 0,
                        transform: featuresOpen ? 'translateY(0)' : 'translateY(6px)',
                        transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${100 + catIdx * 50}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${100 + catIdx * 50}ms`,
                      }}
                    >
                      {category.title}
                    </h3>
                    <ul className="mt-3 space-y-0.5">
                      {category.items.map((item, i) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={() => setFeaturesOpen(false)}
                            className="block py-[9px] text-[#1b1a1b] hover:text-[#3c57bc] transition-colors"
                            style={{
                              fontSize: 14,
                              opacity: featuresOpen ? 1 : 0,
                              transform: featuresOpen ? 'translateY(0)' : 'translateY(8px)',
                              transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${200 + catIdx * 40 + i * 50}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${200 + catIdx * 40 + i * 50}ms`,
                            }}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Dropdown Panel */}
      <div
        className="hidden lg:flex fixed left-0 right-0 z-40 justify-center pointer-events-none"
        style={{ top: 56 }}
      >
        <div
          onMouseEnter={() => setResourcesOpen(true)}
          onMouseLeave={() => setResourcesOpen(false)}
          className="pointer-events-auto relative"
          style={{ width: 340 }}
        >
          <div
            className="flex justify-center -mt-[9px]"
            style={{
              opacity: resourcesOpen ? 1 : 0,
              transition: 'opacity 200ms ease',
            }}
          >
            <div className="w-[18px] h-[18px] bg-white rotate-45 -mb-[9px] relative z-10" />
          </div>

          <div
            style={{
              maxHeight: resourcesOpen ? 500 : 0,
              opacity: resourcesOpen ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 800ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="bg-white rounded-b-[20px] shadow-[0_25px_80px_rgba(0,0,0,0.15)]">
              <ul className="px-8 pt-7 pb-8 space-y-0.5">
                {RESOURCES_MENU.map((item, i) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setResourcesOpen(false)}
                      className="block py-[10px] text-[#1b1a1b] hover:text-[#3c57bc] transition-colors"
                      style={{
                        fontSize: 14,
                        opacity: resourcesOpen ? 1 : 0,
                        transform: resourcesOpen ? 'translateY(0)' : 'translateY(8px)',
                        transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${150 + i * 50}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${150 + i * 50}ms`,
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Slide-in Menu - Right side */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-1/2 max-w-[280px] bg-[#1b1a1b] shadow-2xl transition-transform lg:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
          transitionDuration: '400ms',
        }}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-end p-4 border-b border-gray-700">
          <button onClick={() => setMenuOpen(false)} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
            <X className="h-5 w-5 text-[#819cf3]" />
          </button>
        </div>

        {/* For Businesses Button */}
        <div className="px-4 pt-4 pb-2">
          <Link href="/business" onClick={() => setMenuOpen(false)}>
            <button className="w-full px-4 py-2.5 text-sm font-medium text-black bg-[#819cf3] rounded-full hover:bg-[#a5c5fa] transition-all duration-200">
              Markalar İçin
            </button>
          </Link>
        </div>

        <div className="border-b border-gray-700 my-2" />

        {/* User Info */}
        {user && (
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#00b67a] flex items-center justify-center text-white font-bold">
              {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{user.full_name}</p>
              <p className="text-xs text-gray-400">TR</p>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <nav className="px-4 py-2 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          {user ? (
            <>
              <MenuLink href={`/users/${user.id}`} icon={Star} label="Yorumlarım" onClick={() => setMenuOpen(false)} />
              <MenuLink href="/users/settings" icon={Settings} label="Ayarlarım" onClick={() => setMenuOpen(false)} />
            </>
          ) : null}

          {isBusinessPage ? (
            <>
              {/* Çözümler - expandable */}
              <button
                onClick={() => setMobileSolutions(v => !v)}
                className="flex items-center justify-between w-full px-2 py-3 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-[#819cf3]" />
                  Çözümler
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${mobileSolutions ? 'rotate-180' : ''}`} />
              </button>
              {mobileSolutions && (
                <div className="ml-7 space-y-0.5 pb-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 px-2 pt-1 pb-1">İş hedefiyle</p>
                  {SOLUTIONS_MENU.byGoal.items.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-2 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 px-2 pt-2 pb-1">Büyüklüğe göre</p>
                  {SOLUTIONS_MENU.bySize.items.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-2 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Özellikler - expandable */}
              <button
                onClick={() => setMobileFeatures(v => !v)}
                className="flex items-center justify-between w-full px-2 py-3 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Grid3X3 className="h-4 w-4 text-[#819cf3]" />
                  Özellikler
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${mobileFeatures ? 'rotate-180' : ''}`} />
              </button>
              {mobileFeatures && (
                <div className="ml-7 space-y-0.5 pb-1">
                  {FEATURES_MENU.map(cat => (
                    <div key={cat.title}>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 px-2 pt-2 pb-1">{cat.title}</p>
                      {cat.items.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMenuOpen(false)}
                          className="block px-2 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              <MenuLink href="/sikayet-yaz" icon={PenSquare} label="Şikayet Yaz" onClick={() => setMenuOpen(false)} />
              <MenuLink href="/kategoriler" icon={Grid3X3} label="Kategoriler" onClick={() => setMenuOpen(false)} />

              {/* Kaynaklar - expandable */}
              <button
                onClick={() => setMobileResources(v => !v)}
                className="flex items-center justify-between w-full px-2 py-3 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-4 w-4 text-[#819cf3]" />
                  Kaynaklar
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${mobileResources ? 'rotate-180' : ''}`} />
              </button>
              {mobileResources && (
                <div className="ml-7 space-y-0.5 pb-1">
                  {RESOURCES_MENU.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block px-2 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <MenuLink href="/sikayet-yaz" icon={PenSquare} label="Şikayet Yaz" onClick={() => setMenuOpen(false)} />
              <MenuLink href="/kategoriler" icon={Grid3X3} label="Kategoriler" onClick={() => setMenuOpen(false)} />
              <MenuLink href="/blog" icon={BookOpen} label="Blog" onClick={() => setMenuOpen(false)} />
            </>
          )}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          {user ? (
            <button
              onClick={() => { handleSignOut(); setMenuOpen(false); }}
              className="flex items-center gap-3 text-sm text-[#819cf3] hover:text-[#a5c5fa] transition-colors w-full py-2"
            >
              <LogOut className="h-4 w-4" /> Çıkış Yap →
            </button>
          ) : (
            <div className="space-y-2">
              <Link href="/giris" onClick={() => setMenuOpen(false)}>
                <button className="w-full py-2.5 text-sm font-medium text-white bg-[#00b67a] rounded-lg hover:bg-[#00a06a] transition-colors">
                  Giriş Yap
                </button>
              </Link>
              <Link href="/kayit" onClick={() => setMenuOpen(false)}>
                <button className="w-full py-2.5 text-sm font-medium text-gray-300 border border-gray-600 rounded-lg hover:border-gray-400 hover:text-white transition-colors">
                  Kayıt Ol
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Menu Link Component
function MenuLink({ href, icon: Icon, label, onClick }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-2 py-3 text-sm font-medium text-gray-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
    >
      <Icon className="h-4 w-4 text-[#819cf3]" />
      {label}
    </Link>
  );
}

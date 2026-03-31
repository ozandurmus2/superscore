'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import {
  Home, Star, Send, Share2, BarChart3, LayoutGrid,
  SlidersHorizontal, Menu, X, LogOut,
  ChevronRight, Bell, ArrowLeft, Gift, CheckCircle,
} from 'lucide-react';
import type { Brand } from '@/types';

/* ─── Arrow icon (okl.svg inline) ─── */
function OklIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.192 7.533 8.277 3.66 8.944 3 14 8l-5.056 5-.667-.66 3.915-3.873H2v-.934h10.192Z"/>
    </svg>
  );
}

/* ─── Types ─── */
type NavChild = { href: string; label: string };
type NavGroup = { label: string; items: NavChild[] };
type NavSection =
  | { kind: 'link'; href: string; label: string }
  | { kind: 'group'; label: string; items: NavChild[] };

type NavItem = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children?: NavChild[];    // legacy flat list → Davetiyeler, Ayarlar genel bakış
  groups?: NavGroup[];      // legacy grouped → Ayarlar
  sections?: NavSection[];  // ordered mix → Analitik, Paylaş, Entegrasyonlar
};

/* ─── Submenu group (collapsible) ─── */
function SubmenuGroup({ group, pathname, onNavigate }: {
  group: NavGroup;
  pathname: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(true);
  if (group.items.length === 0) {
    return (
      <div className="mt-2">
        <button
          className="w-full flex items-center justify-between px-2 py-2 text-xs font-bold uppercase tracking-wider text-[#0e291d] hover:opacity-70"
          onClick={() => setOpen(v => !v)}
        >
          {group.label}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-3 h-3 ${open ? '' : 'rotate-180'}`}>
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      </div>
    );
  }
  return (
    <div className="mt-2">
      <button
        className="w-full flex items-center justify-between px-2 py-2 text-xs font-bold uppercase tracking-wider text-[#0e291d] hover:opacity-70"
        onClick={() => setOpen(v => !v)}
      >
        {group.label}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-3 h-3 ${open ? '' : 'rotate-180'}`}>
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
      {open && (
        <div className="ml-2 mt-1 space-y-0.5" style={{ borderLeft: '2px solid rgba(0,0,0,0.15)', paddingLeft: 8 }}>
          {group.items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium"
                style={{ background: isActive ? 'rgba(0,0,0,0.12)' : 'transparent', color: '#0e291d' }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,0,0,0.07)'; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Plus Deneme Modalı ─── */
function PlusTrialModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between px-6 pt-6 pb-4">
          <p className="text-base font-bold text-[#1b1a1b] pr-4 leading-snug">
            14 günlük ücretsiz Plus deneme sürümünün kilidini açınız.
          </p>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 flex-shrink-0">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="mx-6 mb-4 rounded-xl overflow-hidden" style={{ background: '#fefce8' }}>
          <div className="flex gap-6 p-6 items-center">
            <div className="flex-shrink-0 w-36 flex items-center justify-center">
              <svg width="120" height="160" viewBox="0 0 120 160" fill="none">
                <ellipse cx="58" cy="95" rx="52" ry="58" fill="#fde047" opacity="0.6"/>
                <rect x="30" y="20" width="60" height="110" rx="8" fill="#1b1a1b"/>
                <rect x="33" y="28" width="54" height="94" rx="4" fill="white"/>
                <circle cx="42" cy="37" r="4" fill="#e2e8f0"/>
                <rect x="50" y="34" width="28" height="3" rx="1.5" fill="#e2e8f0"/>
                <rect x="50" y="39" width="18" height="2" rx="1" fill="#e2e8f0"/>
                <rect x="36" y="50" width="10" height="10" rx="2" fill="#00b67a"/>
                <rect x="48" y="50" width="10" height="10" rx="2" fill="#00b67a"/>
                <rect x="60" y="50" width="10" height="10" rx="2" fill="#00b67a"/>
                <rect x="72" y="50" width="10" height="10" rx="2" fill="#00b67a"/>
                <rect x="84" y="50" width="7" height="10" rx="2" fill="#e2e8f0"/>
                <rect x="36" y="65" width="45" height="3" rx="1.5" fill="#e2e8f0"/>
                <rect x="36" y="71" width="35" height="3" rx="1.5" fill="#e2e8f0"/>
                <rect x="36" y="77" width="40" height="3" rx="1.5" fill="#e2e8f0"/>
                <circle cx="44" cy="93" r="5" fill="#f87171"/>
                <circle cx="62" cy="93" r="5" fill="#94a3b8"/>
                <circle cx="60" cy="136" r="5" fill="#374151"/>
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#1b1a1b] leading-tight mb-3">
                Güven oluşturmak artık çok daha kolay.
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                İşletmenizin büyümesinin önemli olduğunu biliyoruz. Ücretsiz Plus deneme sürümüyle, daha fazla davetiyeye, pazarlama araçlarına ve işletmenizin performansını takip etmek için verilere erişebilirsiniz.
              </p>
              <ul className="space-y-2">
                {['200 inceleme daveti', 'Görüntü ve video oluşturma araçları', 'İndirilebilir pazarlama materyalleri', "8 web sitesi widget'ı"].map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-[#1b1a1b]">
                    <CheckCircle className="w-4 h-4 text-[#0e291d] flex-shrink-0" />
                    <span><strong>{item.split(' ')[0]}</strong> {item.slice(item.indexOf(' ') + 1)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 pb-6">
          <Link href="/marka-panel/abonelik" onClick={onClose} className="px-6 py-2.5 bg-[#c7d2f5] text-[#3c57bc] text-sm font-semibold rounded-full hover:bg-[#b8c4f0]">
            Diğer planları keşfedin
          </Link>
          <Link href="/marka-panel/abonelik" onClick={onClose} className="px-6 py-2.5 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2c47ac]">
            Ücretsiz deneyin
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Plan box (sidebar bottom) ─── */
function PlanBox({ plan, trialEndsAt, onOpenModal }: { plan: string | null; trialEndsAt: string | null; onOpenModal: () => void }) {
  const isPaid = plan && plan !== 'free_trial';
  const planLabel = (p: string | null) => {
    if (!p || p === 'free_trial') return null;
    if (p === 'starter') return 'Starter';
    if (p === 'pro') return 'Plus';
    if (p === 'enterprise') return 'Enterprise';
    return p;
  };
  const trialDaysLeft = trialEndsAt ? Math.max(0, Math.ceil((new Date(trialEndsAt).getTime() - Date.now()) / 86_400_000)) : null;

  if (isPaid) {
    const label = planLabel(plan);
    return (
      <div className="mx-3 mb-3 rounded-xl p-4" style={{ background: 'rgba(132,235,177,0.15)', border: '1px solid rgba(132,235,177,0.25)' }}>
        <p className="text-xs font-bold text-[#84ebb1] uppercase tracking-wider mb-0.5">{label} Plan</p>
        <p className="text-[11px] leading-relaxed" style={{ color: '#6ab890' }}>
          {label} planının tüm özelliklerine erişebilirsiniz.
        </p>
        <button onClick={onOpenModal} className="mt-2 text-[11px] font-semibold underline underline-offset-2" style={{ color: '#84ebb1' }}>
          Planları keşfedin
        </button>
      </div>
    );
  }
  return (
    <div className="mx-3 mb-3 rounded-xl p-4" style={{ background: 'rgba(132,235,177,0.15)', border: '1px solid rgba(132,235,177,0.25)' }}>
      <div className="flex items-center gap-2 mb-2">
        <Gift className="w-4 h-4 flex-shrink-0" style={{ color: '#84ebb1' }} />
        <p className="text-sm font-bold" style={{ color: '#c8f0d8' }}>Plus&apos;ı ücretsiz deneyin</p>
      </div>
      <p className="text-[11px] leading-relaxed mb-2" style={{ color: '#6ab890' }}>
        {trialDaysLeft !== null && trialDaysLeft > 0
          ? `${trialDaysLeft} gün ücretsiz Plus deneme sürümünün kilidini açınız.`
          : '14 günlük ücretsiz Plus deneme sürümünün kilidini açınız.'}
      </p>
      <button onClick={onOpenModal} className="text-[11px] font-semibold underline underline-offset-2" style={{ color: '#84ebb1' }}>
        Bana daha fazla bilgi verin.
      </button>
    </div>
  );
}

/* ─── Page title ─── */
function getPageTitle(pathname: string, brandName?: string): string {
  if (pathname === '/marka-panel') return brandName ? `${brandName} için son duruma genel bakış` : 'Genel Bakış';
  if (pathname.startsWith('/marka-panel/urun-yorumlari')) return 'Ürün Yorumları';
  if (pathname.startsWith('/marka-panel/ucuncu-taraf')) return 'Üçüncü Taraf Değerlendirmeleri';
  if (pathname.startsWith('/marka-panel/degerlendirmeler')) return 'Değerlendirmeler';
  if (pathname.startsWith('/marka-panel/sikayetler')) return 'Şikayetler';
  if (pathname.startsWith('/marka-panel/yorumlar')) return 'Yorumları Yönetin';
  if (pathname.startsWith('/marka-panel/paylasim')) return 'Paylaş ve Tanıt';
  if (pathname.startsWith('/marka-panel/analitik')) return 'Analitik';
  if (pathname.startsWith('/marka-panel/entegrasyonlar')) return 'Entegrasyonlar';
  if (pathname.startsWith('/marka-panel/ayarlar')) return 'Ayarlar';
  if (pathname.startsWith('/marka-panel/davetiyeler/eposta')) return 'E-posta Şablonu';
  if (pathname.startsWith('/marka-panel/davetiyeler/widget')) return 'Widget Kurulumu';
  if (pathname.startsWith('/marka-panel/davetiyeler/olustur')) return 'Davetiye Oluştur';
  if (pathname.startsWith('/marka-panel/davetiyeler')) return 'Davetiyeler';
  if (pathname.startsWith('/marka-panel/abonelik')) return 'Abonelik';
  if (pathname.startsWith('/marka-panel/checkout')) return 'Checkout';
  return 'Panel';
}

const SIDEBAR_W = 240;

export default function BrandPanelLayout({ children }: { children: React.ReactNode }) {
  const [brand, setBrand] = useState<Brand | null>(null);
  const [userInitials, setUserInitials] = useState('');
  const [reviewCount, setReviewCount] = useState(0);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const [showTrialModal, setShowTrialModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const submenuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/giris'); return; }
      const { data: profile } = await supabase.from('users').select('role, full_name').eq('id', user.id).single();
      if (profile?.full_name) {
        const parts = (profile.full_name as string).trim().split(' ');
        setUserInitials(parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : parts[0].slice(0, 2).toUpperCase());
      } else if (user.email) {
        setUserInitials(user.email.slice(0, 2).toUpperCase());
      }
      if (profile?.role !== 'brand_admin') { router.push('/'); return; }
      const { data: member } = await supabase.from('brand_members').select('brand_id').eq('user_id', user.id).single();
      if (!member) { router.push('/'); return; }
      const { data: brandData } = await supabase.from('brands').select('*').eq('id', member.brand_id).single();
      if (brandData) {
        setBrand(brandData as Brand);
        const { count } = await supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('brand_id', member.brand_id);
        setReviewCount(count ?? 0);
      }
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ─── Nav items (built dynamically so reviewCount updates) ─── */
  const navItems: NavItem[] = [
    { href: '/marka-panel', icon: Home, label: 'Ev' },
    {
      href: '/marka-panel/yorumlar',
      icon: Star,
      label: `Yorumları yönetin (${reviewCount})`,
      children: [
        { href: '/marka-panel/yorumlar',           label: 'Tüm Yorumlar' },
        { href: '/marka-panel/degerlendirmeler',    label: 'Değerlendirmeler' },
        { href: '/marka-panel/sikayetler',          label: 'Şikayetler' },
        { href: '/marka-panel/ucuncu-taraf',        label: 'Üçüncü Taraf Değerlendirmeleri' },
        { href: '/marka-panel/urun-yorumlari',      label: 'Ürün Yorumları' },
      ],
    },
    {
      href: '/marka-panel/davetiyeler',
      icon: Send,
      label: 'Davetiyeler',
      children: [
        { href: '/marka-panel/davetiyeler', label: 'Genel Bakış' },
        { href: '/marka-panel/davetiyeler/olustur', label: 'Davet yöntemleri' },
        { href: '/marka-panel/davetiyeler/eposta', label: 'E-posta şablonları' },
        { href: '/marka-panel/davetiyeler/durum', label: 'Davet durumu' },
      ],
    },
    {
      href: '/marka-panel/paylasim',
      icon: Share2,
      label: 'Paylaş ve tanıt',
      sections: [
        { kind: 'group', label: "Web sitesi widget'ları", items: [
          { href: '/marka-panel/paylasim/widget', label: "Tüm widget'lar" },
          { href: '/marka-panel/paylasim/widget/ozellestir', label: 'Özelleştirmek' },
          { href: '/marka-panel/paylasim/widget/temeller', label: 'Temeller' },
          { href: '/marka-panel/paylasim/widget/topla', label: 'Yorumları topla' },
          { href: '/marka-panel/paylasim/widget/musteri', label: 'Müşteri Yorumları' },
          { href: '/marka-panel/paylasim/widget/urun', label: 'Ürün incelemeleri' },
        ]},
        { kind: 'group', label: "E-posta widget'ları", items: [
          { href: '/marka-panel/paylasim/eposta/imza', label: 'TrustBox İmzası' },
          { href: '/marka-panel/paylasim/eposta/bulten', label: 'TrustBox Bülteni' },
        ]},
        { kind: 'group', label: 'Sosyal', items: [
          { href: '/marka-panel/paylasim/sosyal/baglan', label: 'Bağlan ve paylaş' },
          { href: '/marka-panel/paylasim/sosyal/goruntu', label: 'Görüntü Oluşturucu' },
          { href: '/marka-panel/paylasim/sosyal/video', label: 'Video Oluşturucu' },
          { href: '/marka-panel/paylasim/sosyal/varliklar', label: 'Pazarlama varlıkları' },
        ]},
      ],
    },
    {
      href: '/marka-panel/analitik',
      icon: BarChart3,
      label: 'Analitik',
      sections: [
        { kind: 'group', label: 'Performans', items: [
          { href: '/marka-panel/analitik', label: 'Genel Bakış' },
          { href: '/marka-panel/analitik/trustscore', label: "TrustScore'dan elde edilen bilgiler" },
          { href: '/marka-panel/analitik/hizmet', label: 'Hizmet değerlendirmeleri' },
          { href: '/marka-panel/analitik/davetiyeler', label: 'Davetiyeler' },
        ]},
        { kind: 'link', href: '/marka-panel/analitik/bulgular', label: 'İnceleme bulguları' },
        { kind: 'group', label: 'Nişanlanmak', items: [] },
      ],
    },
    {
      href: '/marka-panel/entegrasyonlar',
      icon: LayoutGrid,
      label: 'Entegrasyonlar',
      sections: [
        { kind: 'link', href: '/marka-panel/entegrasyonlar/e-ticaret', label: 'E-ticaret' },
        { kind: 'link', href: '/marka-panel/entegrasyonlar/odeme-crm', label: 'Ödeme ve CRM' },
        { kind: 'link', href: '/marka-panel/entegrasyonlar/gelistiriciler', label: 'Geliştiriciler' },
        { kind: 'link', href: '/marka-panel/entegrasyonlar/pazarlama', label: 'Pazarlama' },
        { kind: 'link', href: '/marka-panel/entegrasyonlar/musteri-destegi', label: 'Müşteri desteği' },
      ],
    },
    {
      href: '/marka-panel/ayarlar',
      icon: SlidersHorizontal,
      label: 'Ayarlar',
      children: [{ href: '/marka-panel/ayarlar', label: 'Genel Bakış' }],
      groups: [
        { label: 'Davetiye ayarları', items: [
          { href: '/marka-panel/ayarlar/eposta-ayarlari', label: 'E-posta ayarları' },
          { href: '/marka-panel/ayarlar/zaman-teslimat', label: 'Zaman ve teslimat' },
          { href: '/marka-panel/ayarlar/yasal-uyari', label: 'Yasal uyarı' },
          { href: '/marka-panel/ayarlar/tuketici-gizliligi', label: 'Tüketici gizliliği' },
        ]},
        { label: 'İş ortamları', items: [
          { href: '/marka-panel/ayarlar/kullanicilar', label: 'Kullanıcılar' },
          { href: '/marka-panel/ayarlar/veri-onayi', label: 'Veri onayı' },
        ]},
        { label: 'Herkese açık profil ayarları', items: [
          { href: '/marka-panel/ayarlar/profil-sayfasi', label: 'Profil sayfası' },
          { href: '/marka-panel/ayarlar/kategoriler', label: 'Kategoriler' },
          { href: '/marka-panel/ayarlar/konumlar', label: 'Konumlar' },
          { href: '/marka-panel/ayarlar/referans-numarasi', label: 'Referans numarası' },
        ]},
        { label: 'Kişisel ayarlar', items: [
          { href: '/marka-panel/ayarlar/kisisel-hesap', label: 'Kişisel hesap' },
          { href: '/marka-panel/ayarlar/eposta-bildirimleri', label: 'E-posta bildirimleri' },
          { href: '/marka-panel/ayarlar/cerezler', label: 'Çerezler' },
        ]},
      ],
    },
  ];

  // Track mobile breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close submenu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (submenuRef.current && !submenuRef.current.contains(e.target as Node)) {
        const sidebar = document.getElementById('brand-sidebar');
        if (sidebar && sidebar.contains(e.target as Node)) return;
        setActiveSubmenu(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleNavClick = (item: NavItem) => {
    if (item.children?.length || item.groups?.length || item.sections?.length) {
      setActiveSubmenu(prev => prev === item.href ? null : item.href);
    } else {
      setActiveSubmenu(null);
    }
  };

  const currentSubmenuItem = navItems.find(i => i.href === activeSubmenu && (i.children?.length || i.groups?.length || i.sections?.length));
  const mobileSubItem = navItems.find(i => i.href === mobileSub && (i.children?.length || i.groups?.length || i.sections?.length));

  /* ─── Sidebar nav item ─── */
  function renderSidebarItem(item: NavItem) {
    const isExact = pathname === item.href;
    const isParent = item.href !== '/marka-panel' && pathname.startsWith(item.href);
    const isActive = isExact || isParent;
    const isSubmenuOpen = activeSubmenu === item.href;
    const hasChildren = !!(item.children?.length || item.groups?.length || item.sections?.length);

    // Active: full-width pill, right side flat, touches right edge (notch effect)
    const activeItemStyle = {
      borderRadius: '999px 0 0 999px',
      background: 'white',
      color: '#0e291d',
      width: '100%',
      marginLeft: '0px',
    };
    // Hover: same shape as active but green — full width, flat right side
    const hoverEnterStyle = {
      borderRadius: '999px 0 0 999px',
      background: '#84ebb1',
      color: '#0e291d',
      width: '100%',
      marginLeft: '0px',
    };
    const defaultStyle = {
      borderRadius: '10px',
      background: 'transparent',
      color: '#fcfbf3',
      width: '100%',
      marginLeft: '0px',
    };
    const submenuOpenStyle = {
      borderRadius: '999px 0 0 999px',
      background: '#84ebb1',
      color: '#0e291d',
      width: '100%',
      marginLeft: '0px',
    };

    const currentStyle = isActive ? activeItemStyle : isSubmenuOpen ? submenuOpenStyle : defaultStyle;

    const inner = (
      <>
        <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
        <span className="flex-1 text-left truncate">{item.label}</span>
        {hasChildren && (
          <OklIcon className="h-3.5 w-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100" />
        )}
      </>
    );

    return (
      <div key={item.href} className="relative">
        {isActive && (
          <span aria-hidden="true" className="absolute pointer-events-none"
            style={{ top: -16, right: 0, width: 16, height: 16, zIndex: 10, background: 'radial-gradient(circle at bottom left, transparent 70%, #0e291d 71%)' }} />
        )}
        {hasChildren ? (
          <button
            onClick={() => handleNavClick(item)}
            className="group flex items-center gap-2.5 px-4 py-2.5 text-sm text-left"
            style={{ ...currentStyle, fontWeight: 450, display: 'flex' }}
            onMouseEnter={e => {
              if (!isActive && !isSubmenuOpen) Object.assign((e.currentTarget as HTMLElement).style, { ...hoverEnterStyle, fontWeight: '450', display: 'flex' });
            }}
            onMouseLeave={e => {
              if (!isActive && !isSubmenuOpen) Object.assign((e.currentTarget as HTMLElement).style, { ...defaultStyle, fontWeight: '450', display: 'flex' });
            }}
          >
            {inner}
          </button>
        ) : (
          <Link
            href={item.href}
            onClick={() => setActiveSubmenu(null)}
            className="group flex items-center gap-2.5 px-4 py-2.5 text-sm"
            style={{ ...currentStyle, fontWeight: 450, display: 'flex' }}
            onMouseEnter={e => {
              if (!isActive) Object.assign((e.currentTarget as HTMLElement).style, { ...hoverEnterStyle, fontWeight: '450', display: 'flex' });
            }}
            onMouseLeave={e => {
              if (!isActive) Object.assign((e.currentTarget as HTMLElement).style, { ...defaultStyle, fontWeight: '450', display: 'flex' });
            }}
          >
            {inner}
          </Link>
        )}
        {isActive && (
          <span aria-hidden="true" className="absolute pointer-events-none"
            style={{ bottom: -16, right: 0, width: 16, height: 16, zIndex: 10, background: 'radial-gradient(circle at top left, transparent 70%, #0e291d 71%)' }} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex overflow-x-hidden" style={{ background: '#f9f8f5' }}>

      {/* ─── Desktop Sidebar ─── */}
      <aside
        id="brand-sidebar"
        className="hidden lg:flex flex-col fixed top-0 left-0 h-full z-30"
        style={{ width: SIDEBAR_W, background: '#0e291d' }}
      >
        {/* Logo */}
        <div className="px-5 h-16 flex items-center flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Link href="/">
            <Image src="/logo/White_SS.png" alt="Superscore" width={120} height={32} className="h-7 w-auto" />
          </Link>
        </div>

        {/* Brand selector */}
        {brand && (
          <div className="px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#84ebb1' }}>Marka Paneli</p>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-white truncate">{brand.name}</p>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="#84ebb1" className="flex-shrink-0"><path d="M0 0l5 6 5-6z"/></svg>
            </div>
            {brand.website && (
              <p className="text-xs truncate mt-0.5" style={{ color: '#6ab890' }}>{brand.website.replace(/^https?:\/\//, '')}</p>
            )}
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 pl-3 pr-0 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map(item => renderSidebarItem(item))}
        </nav>

        {/* Plan box */}
        <PlanBox plan={brand?.subscription_plan ?? null} trialEndsAt={brand?.trial_ends_at ?? null} onOpenModal={() => setShowTrialModal(true)} />

        {/* Sign out */}
        <div className="px-3 pb-4 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl"
            style={{ color: '#fcfbf3', fontWeight: 450 }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#84ebb1';
              (e.currentTarget as HTMLButtonElement).style.color = '#0e291d';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = '#fcfbf3';
            }}
          >
            <LogOut className="h-5 w-5" /> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* ─── Desktop Submenu Flyout ─── */}
      {currentSubmenuItem && (
        <div
          ref={submenuRef}
          className="hidden lg:flex flex-col fixed top-0 h-full z-20 overflow-y-auto"
          style={{ left: SIDEBAR_W, width: 280, background: '#64d794' }}
        >
          <div className="h-16 flex items-center px-6 flex-shrink-0" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
            <p className="text-xs font-bold uppercase tracking-widest text-[#0e291d]">
              {currentSubmenuItem.label.replace(/\s*\(\d+\)/, '')}
            </p>
          </div>
          <nav className="px-4 py-3">
            {/* Sections (ordered mix of links and groups) */}
            {currentSubmenuItem.sections ? (
              currentSubmenuItem.sections.map((section, idx) => {
                if (section.kind === 'link') {
                  const isChildActive = pathname === section.href;
                  return (
                    <Link
                      key={`${section.href}-${idx}`}
                      href={section.href}
                      onClick={() => setActiveSubmenu(null)}
                      className="group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold mb-1"
                      style={{ background: isChildActive ? '#0e291d' : 'transparent', color: isChildActive ? 'white' : '#0e291d' }}
                      onMouseEnter={e => { if (!isChildActive) (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,0,0,0.08)'; }}
                      onMouseLeave={e => { if (!isChildActive) (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                    >
                      {section.label}
                      <OklIcon className="h-3.5 w-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100" />
                    </Link>
                  );
                } else {
                  return (
                    <SubmenuGroup
                      key={`${section.label}-${idx}`}
                      group={section}
                      pathname={pathname}
                      onNavigate={() => setActiveSubmenu(null)}
                    />
                  );
                }
              })
            ) : (
              <>
                {/* Legacy: flat children */}
                {currentSubmenuItem.children?.map((child) => {
                  const isChildActive = pathname === child.href;
                  return (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setActiveSubmenu(null)}
                      className="group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold mb-1"
                      style={{ background: isChildActive ? '#0e291d' : 'transparent', color: isChildActive ? 'white' : '#0e291d' }}
                      onMouseEnter={e => { if (!isChildActive) (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(0,0,0,0.08)'; }}
                      onMouseLeave={e => { if (!isChildActive) (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; }}
                    >
                      {child.label}
                      <ChevronRight className="h-4 w-4 flex-shrink-0 opacity-0 group-hover:opacity-100" />
                    </Link>
                  );
                })}
                {/* Legacy: grouped children */}
                {currentSubmenuItem.groups?.map((group) => (
                  <SubmenuGroup key={group.label} group={group} pathname={pathname} onNavigate={() => setActiveSubmenu(null)} />
                ))}
              </>
            )}
          </nav>
        </div>
      )}

      {/* ─── Mobile Top Bar ─── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4" style={{ background: '#0e291d' }}>
        <div className="flex items-center gap-1.5 min-w-0">
          {brand ? (
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold leading-tight truncate">{brand.name}</p>
              {brand.website && <p className="text-xs leading-tight truncate" style={{ color: '#84ebb1' }}>{brand.website.replace(/^https?:\/\//, '')}</p>}
            </div>
          ) : (
            <Link href="/"><Image src="/logo/White_SS.png" alt="Superscore" width={100} height={28} className="h-6 w-auto" /></Link>
          )}
          <button className="ml-1 flex-shrink-0" style={{ color: '#84ebb1' }}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M0 0l5 6 5-6z"/></svg>
          </button>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: '#1f4030' }}>
            <Bell className="h-5 w-5" style={{ color: '#84ebb1' }} />
          </button>
          {brand && (
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: '#84ebb1', color: '#0e291d' }}>
              {(brand.name || 'B').slice(0, 2).toUpperCase()}
            </div>
          )}
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'white' }} onClick={() => { setMobileOpen(v => !v); setMobileSub(null); }}>
            {mobileOpen ? <X className="h-5 w-5 text-[#0e291d]" /> : <Menu className="h-5 w-5 text-[#0e291d]" />}
          </button>
        </div>
      </div>

      {/* ─── Mobile Menu ─── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40" style={{ background: '#64d794', top: 56 }}>
          <div className="relative h-full overflow-hidden">
            <div className="absolute inset-0 flex flex-col" style={{ transform: mobileSub ? 'translateX(-100%)' : 'translateX(0)', transition: 'transform 300ms ease-in-out' }}>
              {brand && (
                <div className="px-5 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0e291d] mb-0.5">Marka Paneli</p>
                  <p className="text-sm font-bold text-[#0e291d] truncate">{brand.name}</p>
                </div>
              )}
              <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/marka-panel' && pathname.startsWith(item.href));
                  const hasChild = !!(item.children?.length || item.groups?.length || item.sections?.length);
                  return (
                    <div key={item.href}>
                      {hasChild ? (
                        <button
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left"
                          style={{ background: isActive ? 'rgba(0,0,0,0.12)' : 'transparent', color: '#0e291d' }}
                          onClick={() => setMobileSub(item.href)}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          <span className="flex-1">{item.label}</span>
                          <ChevronRight className="h-5 w-5 flex-shrink-0" />
                        </button>
                      ) : (
                        <Link href={item.href} onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold"
                          style={{ background: isActive ? 'rgba(0,0,0,0.12)' : 'transparent', color: '#0e291d' }}
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          {item.label}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </nav>
              <div className="px-4 pb-6 flex-shrink-0" style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: 12 }}>
                <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#0e291d] w-full">
                  <LogOut className="h-5 w-5" /> Çıkış Yap
                </button>
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col" style={{ transform: mobileSub ? 'translateX(0)' : 'translateX(100%)', background: '#84ebb1', transition: 'transform 300ms ease-in-out' }}>
              <div className="px-4 py-4 flex items-center gap-3 flex-shrink-0" style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <button className="flex items-center gap-2 text-sm font-bold text-[#0e291d]" onClick={() => setMobileSub(null)}>
                  <ArrowLeft className="h-5 w-5" /> Geri
                </button>
                {mobileSubItem && (
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0e291d] ml-auto">
                    {mobileSubItem.label.replace(/\s*\(\d+\)/, '')}
                  </p>
                )}
              </div>
              <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {mobileSubItem?.children?.map((child) => {
                  const isChildActive = pathname === child.href;
                  return (
                    <Link key={child.href} href={child.href} onClick={() => { setMobileOpen(false); setMobileSub(null); }}
                      className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold"
                      style={{ background: isChildActive ? 'rgba(0,0,0,0.1)' : 'transparent', color: '#0e291d' }}
                    >
                      {child.label}
                      <ChevronRight className="h-5 w-5" />
                    </Link>
                  );
                })}
                {mobileSubItem?.sections?.map((section, idx) => {
                  if (section.kind === 'link') {
                    const isChildActive = pathname === section.href;
                    return (
                      <Link key={`${section.href}-${idx}`} href={section.href} onClick={() => { setMobileOpen(false); setMobileSub(null); }}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold"
                        style={{ background: isChildActive ? 'rgba(0,0,0,0.1)' : 'transparent', color: '#0e291d' }}
                      >
                        {section.label}
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                    );
                  } else {
                    return section.items.map(item => {
                      const isChildActive = pathname === item.href;
                      return (
                        <Link key={item.href} href={item.href} onClick={() => { setMobileOpen(false); setMobileSub(null); }}
                          className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold"
                          style={{ background: isChildActive ? 'rgba(0,0,0,0.1)' : 'transparent', color: '#0e291d' }}
                        >
                          {item.label}
                        </Link>
                      );
                    });
                  }
                })}
                {/* Legacy: groups */}
                {mobileSubItem?.groups?.map((group) => (
                  <div key={group.label}>
                    <p className="px-4 pt-4 pb-1 text-[10px] font-bold uppercase tracking-widest text-[#0e291d]/50">{group.label}</p>
                    {group.items.map((item) => {
                      const isChildActive = pathname === item.href;
                      return (
                        <Link key={item.href} href={item.href} onClick={() => { setMobileOpen(false); setMobileSub(null); }}
                          className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold"
                          style={{ background: isChildActive ? 'rgba(0,0,0,0.1)' : 'transparent', color: '#0e291d' }}
                        >
                          {item.label}
                          <ChevronRight className="h-5 w-5" />
                        </Link>
                      );
                    })}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* ─── Main Content ─── */}
      <main
        className="flex-1 min-h-screen transition-[margin-left] duration-200 min-w-0"
        style={{ marginLeft: isMobile ? 0 : (currentSubmenuItem ? SIDEBAR_W + 280 : SIDEBAR_W) }}
      >
        {/* Desktop top bar */}
        <div className="hidden lg:flex h-16 bg-white items-center justify-between px-8 sticky top-0 z-10" style={{ borderBottom: '1px solid #e5e7eb' }}>
          <p className="text-lg font-bold text-[#1b1a1b]">{getPageTitle(pathname, brand?.name)}</p>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
            </button>
            <button className="relative w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center" style={{ background: '#e53e3e', minWidth: 16 }}>5</span>
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ml-1" style={{ background: '#52b37f', color: 'white' }}>
              {userInitials || '??'}
            </button>
          </div>
        </div>
        <div className="p-4 lg:p-8 pt-[72px] lg:pt-8 overflow-x-hidden">
          <div className="w-full max-w-6xl mx-auto">{children}</div>
        </div>
      </main>

      <PlusTrialModal open={showTrialModal} onClose={() => setShowTrialModal(false)} />
    </div>
  );
}

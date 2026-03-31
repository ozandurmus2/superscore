'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, MessageSquareText, Zap, BarChart3, TrendingUp, Building2, Rocket } from 'lucide-react';

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

const RESOURCES_MENU = [
  { label: 'Blog', href: '/blog' },
  { label: 'Kılavuzlar ve raporlar', href: '/business/kaynaklar/kilavuzlar' },
  { label: 'Web seminerleri ve videolar', href: '/business/kaynaklar/videolar' },
  { label: 'Yardım Merkezi', href: '/help' },
  { label: 'Ortaklar: yönlendirme programı', href: '/business/kaynaklar/ortaklar' },
  { label: 'Entegrasyonlar', href: '/business/ozellikler/entegrasyonlar' },
];

const navItems = [
  { label: 'Fiyatlandırma', href: '/business/fiyatlandirma' },
];

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileSolutions, setMobileSolutions] = useState(false);
  const [mobileFeatures, setMobileFeatures] = useState(false);
  const [mobileResources, setMobileResources] = useState(false);

  const closeAll = () => { setSolutionsOpen(false); setFeaturesOpen(false); setResourcesOpen(false); };

  return (
    <div className="min-h-screen">
      {/* Business Header */}
      <header className="bg-[#1b1a1b] sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/business" className="flex items-center gap-2">
            <Image src="/logo/White_SS.png" alt="Superscore" width={140} height={32} className="h-7 w-auto" />
            <span className="text-white/60 text-sm font-medium border-l border-white/20 pl-2 ml-1">For Business</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Çözümler dropdown trigger */}
            <button
              type="button"
              onMouseEnter={() => { closeAll(); setSolutionsOpen(true); }}
              className="flex items-center gap-1 text-white/80 text-sm font-medium hover:text-white transition-colors"
            >
              Çözümler
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${solutionsOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Özellikler dropdown trigger */}
            <button
              type="button"
              onMouseEnter={() => { closeAll(); setFeaturesOpen(true); }}
              className="flex items-center gap-1 text-white/80 text-sm font-medium hover:text-white transition-colors"
            >
              Özellikler
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${featuresOpen ? 'rotate-180' : ''}`} />
            </button>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={closeAll}
                className="text-white/80 text-sm font-medium hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {/* Kaynaklar dropdown trigger */}
            <button
              type="button"
              onMouseEnter={() => { closeAll(); setResourcesOpen(true); }}
              className="flex items-center gap-1 text-white/80 text-sm font-medium hover:text-white transition-colors"
            >
              Kaynaklar
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${resourcesOpen ? 'rotate-180' : ''}`} />
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/business/giris" className="text-white/80 text-sm font-medium hover:text-white transition-colors">
              Giriş yapmak
            </Link>
            <Link href="/business/kayit">
              <button className="px-5 py-2 text-sm font-medium text-[#1b1a1b] bg-white rounded-full hover:bg-gray-100 transition-colors border border-white">
                Ücretsiz hesap oluşturun
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button type="button" onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#1b1a1b] border-t border-white/10 px-4 py-6 space-y-2">
            {/* Çözümler accordion */}
            <button
              type="button"
              onClick={() => setMobileSolutions(v => !v)}
              className="flex items-center justify-between w-full text-white/80 text-base font-medium hover:text-white py-2"
            >
              Çözümler
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileSolutions ? 'rotate-180' : ''}`} />
            </button>
            {mobileSolutions && (
              <div className="pl-4 space-y-1 pb-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 pt-1 pb-1">İş hedefiyle</p>
                {SOLUTIONS_MENU.byGoal.items.map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block text-white/60 text-sm py-1.5 hover:text-white">
                    {item.label}
                  </Link>
                ))}
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 pt-2 pb-1">Büyüklüğe göre</p>
                {SOLUTIONS_MENU.bySize.items.map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block text-white/60 text-sm py-1.5 hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Özellikler accordion */}
            <button
              type="button"
              onClick={() => setMobileFeatures(v => !v)}
              className="flex items-center justify-between w-full text-white/80 text-base font-medium hover:text-white py-2"
            >
              Özellikler
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileFeatures ? 'rotate-180' : ''}`} />
            </button>
            {mobileFeatures && (
              <div className="pl-4 space-y-1 pb-2">
                {FEATURES_MENU.map(cat => (
                  <div key={cat.title}>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 pt-2 pb-1">{cat.title}</p>
                    {cat.items.map(item => (
                      <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block text-white/60 text-sm py-1.5 hover:text-white">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block text-white/80 text-base font-medium hover:text-white py-2">
                {item.label}
              </Link>
            ))}

            {/* Kaynaklar accordion */}
            <button
              type="button"
              onClick={() => setMobileResources(v => !v)}
              className="flex items-center justify-between w-full text-white/80 text-base font-medium hover:text-white py-2"
            >
              Kaynaklar
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileResources ? 'rotate-180' : ''}`} />
            </button>
            {mobileResources && (
              <div className="pl-4 space-y-1 pb-2">
                {RESOURCES_MENU.map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block text-white/60 text-sm py-1.5 hover:text-white">
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <hr className="border-white/10" />
            <Link href="/business/giris" className="block text-white/80 text-base py-2">Giriş yapmak</Link>
            <Link href="/business/kayit">
              <button className="w-full px-5 py-3 text-sm font-medium text-[#1b1a1b] bg-white rounded-full mt-2">
                Ücretsiz hesap oluşturun
              </button>
            </Link>
          </div>
        )}
      </header>

      {/* Solutions Dropdown Panel */}
      <div
        className="hidden lg:flex fixed left-0 right-0 z-40 justify-center pointer-events-none"
        style={{ top: 64 }}
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
        style={{ top: 64 }}
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
        style={{ top: 64 }}
      >
        <div
          onMouseEnter={() => setResourcesOpen(true)}
          onMouseLeave={() => setResourcesOpen(false)}
          className="pointer-events-auto relative"
          style={{ width: 340 }}
        >
          {/* Triangle arrow */}
          <div
            className="flex justify-center -mt-[9px]"
            style={{
              opacity: resourcesOpen ? 1 : 0,
              transition: 'opacity 200ms ease',
            }}
          >
            <div className="w-[18px] h-[18px] bg-white rotate-45 -mb-[9px] relative z-10" />
          </div>

          {/* Panel body */}
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

      {/* Content */}
      <main>{children}</main>

      {/* Business Footer */}
      <footer className="bg-[#1b1a1b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-[#c0bec2] text-sm font-medium mb-4">Ürünler</h4>
              <ul className="space-y-3">
                <li><Link href="/business" className="text-white text-sm hover:underline">Superscore İş</Link></li>
                <li><Link href="/business/fiyatlandirma" className="text-white text-sm hover:underline">Fiyatlandırma</Link></li>
                <li><Link href="/business#ozellikler" className="text-white text-sm hover:underline">Özellikler</Link></li>
                <li><Link href="/business#widget" className="text-white text-sm hover:underline">Widget</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#c0bec2] text-sm font-medium mb-4">Kaynaklar</h4>
              <ul className="space-y-3">
                <li><Link href="/nasil-calisir" className="text-white text-sm hover:underline">Nasıl Çalışır</Link></li>
                <li><Link href="/business#cozumler" className="text-white text-sm hover:underline">Çözümler</Link></li>
                <li><Link href="/kategoriler" className="text-white text-sm hover:underline">Kategoriler</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#c0bec2] text-sm font-medium mb-4">Şirket</h4>
              <ul className="space-y-3">
                <li><Link href="/nasil-calisir" className="text-white text-sm hover:underline">Hakkımızda</Link></li>
                <li><Link href="#" className="text-white text-sm hover:underline">Kariyer</Link></li>
                <li><Link href="#" className="text-white text-sm hover:underline">İletişim</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#c0bec2] text-sm font-medium mb-4">Yasal</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-white text-sm hover:underline">Gizlilik Politikası</Link></li>
                <li><Link href="#" className="text-white text-sm hover:underline">Kullanım Koşulları</Link></li>
                <li><Link href="#" className="text-white text-sm hover:underline">KVKK</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <Image src="/logo/White_SS.png" alt="Superscore" width={120} height={28} className="h-6 w-auto" />
            <p className="text-sm text-white/40">&copy; 2026 Superscore. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, Circle, Clock, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

/* ── Phase data ── */
type TaskStatus = 'done' | 'in-progress' | 'planned';
interface Task { label: string; status: TaskStatus; detail?: string }
interface Phase {
  id: string;
  phase: string;
  title: string;
  color: string;
  bgLight: string;
  timeline: string;
  progress: number;
  tasks: Task[];
}

const PHASES: Phase[] = [
  {
    id: 'p1',
    phase: 'Faz 1',
    title: 'Temel Altyapı & MVP',
    color: '#04da8b',
    bgLight: '#d9fbed',
    timeline: 'Q1 2025',
    progress: 95,
    tasks: [
      { label: 'Next.js 16 + React 19 + TypeScript altyapısı', status: 'done' },
      { label: 'Supabase veritabanı şeması (users, brands, complaints, reviews)', status: 'done' },
      { label: 'Supabase Auth entegrasyonu (müşteri + marka + admin rolleri)', status: 'done' },
      { label: 'SuperScore algoritması (çözüm oranı, yanıt süresi, müşteri puanı)', status: 'done' },
      { label: 'Tailwind CSS 4 + özel font sistemi (Superscore Bold/Sans)', status: 'done' },
      { label: 'Responsive header (B2C / Business ayrımı)', status: 'done' },
      { label: 'Footer bileşeni', status: 'done' },
      { label: 'Radix UI bileşen kütüphanesi entegrasyonu', status: 'done' },
      { label: 'Yardımcı fonksiyonlar (tarih, slug, renk, şikayet numarası)', status: 'done' },
      { label: 'Environment & deployment yapılandırması', status: 'in-progress', detail: 'Production deployment hazırlıkları devam ediyor' },
    ],
  },
  {
    id: 'p2',
    phase: 'Faz 2',
    title: 'Tüketici Deneyimi (B2C)',
    color: '#819cf3',
    bgLight: '#e8edfd',
    timeline: 'Q1 – Q2 2025',
    progress: 85,
    tasks: [
      { label: 'Ana sayfa (hero, arama, kategori slider, nasıl çalışır)', status: 'done' },
      { label: 'Marka listeleme & detay sayfası (SuperScore badge, yorumlar)', status: 'done' },
      { label: 'Şikayet yazma formu (çoklu adım, kategori seçimi)', status: 'done' },
      { label: 'Şikayet listeleme & detay sayfası (yanıt akışı)', status: 'done' },
      { label: 'Değerlendirme verme sayfası', status: 'done' },
      { label: 'Kategori & alt kategori sayfaları', status: 'done' },
      { label: 'Kullanıcı profil sayfası', status: 'done' },
      { label: 'Nasıl çalışır sayfası', status: 'done' },
      { label: 'Yardım merkezi sayfası', status: 'done' },
      { label: 'B2C giriş & kayıt sayfaları (yeni tasarım)', status: 'done' },
      { label: 'Tüketici paneli (şikayetlerim, yorumlarım, bildirimler, ayarlar)', status: 'done' },
      { label: 'StarRating bileşeni (özel yıldız ikonu)', status: 'done' },
      { label: 'Blog sistemi', status: 'planned', detail: 'İçerik yönetimi ve blog yazıları' },
      { label: 'Gelişmiş arama & filtreleme', status: 'planned', detail: 'Yapay zeka destekli arama' },
    ],
  },
  {
    id: 'p3',
    phase: 'Faz 3',
    title: 'Marka Paneli (B2B Dashboard)',
    color: '#f95a98',
    bgLight: '#fce4ee',
    timeline: 'Q1 – Q2 2025',
    progress: 80,
    tasks: [
      { label: 'Marka dashboard (genel bakış, metrikler)', status: 'done' },
      { label: 'Şikayet yönetimi (listeleme, detay, yanıtlama)', status: 'done' },
      { label: 'Değerlendirme & yorum yönetimi', status: 'done' },
      { label: 'Ekip yönetimi (roller, davetler)', status: 'done' },
      { label: 'İstatistikler sayfası', status: 'done' },
      { label: 'Analitik modülü (TrustScore, hizmet, davetiyeler, bulgular)', status: 'done' },
      { label: 'Widget özelleştirme & paylaşım (6 alt sayfa)', status: 'done' },
      { label: 'Sosyal medya paylaşım (bağlan, görüntü, video, varlıklar)', status: 'done' },
      { label: 'E-posta entegrasyonu (imza, bülten)', status: 'done' },
      { label: 'Davetiye sistemi (oluştur, e-posta, widget, durum)', status: 'done' },
      { label: 'Entegrasyonlar (e-ticaret, ödeme/CRM, geliştiriciler, pazarlama)', status: 'done' },
      { label: 'Ayarlar (profil, veri onayı, konumlar, e-posta, gizlilik vb.)', status: 'done' },
      { label: 'Abonelik & ödeme sistemi', status: 'done' },
      { label: 'Ürün yorumları modülü', status: 'done' },
      { label: 'Üçüncü taraf entegrasyonlar sayfası', status: 'done' },
      { label: 'Marka giriş sayfası (business/giris)', status: 'done' },
      { label: 'Marka kayıt + domain doğrulama', status: 'done' },
      { label: 'Gerçek zamanlı bildirim sistemi', status: 'in-progress', detail: 'WebSocket / Supabase Realtime' },
      { label: 'Rakip kıyaslama dashboard', status: 'planned', detail: 'Rakip verilerini canlı karşılaştırma' },
    ],
  },
  {
    id: 'p4',
    phase: 'Faz 4',
    title: 'Yapay Zeka & Otomasyon',
    color: '#fe7a1a',
    bgLight: '#ffede3',
    timeline: 'Q2 – Q3 2025',
    progress: 45,
    tasks: [
      { label: 'OpenAI API entegrasyonu', status: 'done' },
      { label: 'Yapay zeka içerik moderasyonu (uygunsuz içerik tespiti)', status: 'done' },
      { label: 'Yapay zeka çözüm önerileri (suggest-resolution)', status: 'done' },
      { label: 'Belge analizi & otomatik doğrulama', status: 'done' },
      { label: 'Otomatik çözüm cron job (auto-resolve)', status: 'done' },
      { label: 'Yapay zeka duygu analizi (sentiment analysis)', status: 'in-progress', detail: 'Yorum ve şikayetlerdeki duygu tonu tespiti' },
      { label: 'Yapay zeka yorum yanıt önerileri (marka tarafı)', status: 'in-progress', detail: 'Markanın ses tonuna uygun otomatik yanıt' },
      { label: 'Tema tespiti & trend analizi', status: 'planned', detail: 'Şikayetlerdeki tekrarlayan temaları otomatik gruplama' },
      { label: 'Yapay zeka destekli arama (AEO - Answer Engine Optimization)', status: 'planned' },
      { label: 'Akıllı yorum davetiye zamanlaması', status: 'planned', detail: 'Müşteri davranışına göre en uygun zaman tespiti' },
      { label: 'Sahte yorum tespiti', status: 'planned', detail: 'Pattern recognition ile sahte yorumları filtreleme' },
      { label: 'Otomatik kategorizasyon', status: 'planned', detail: 'Şikayetleri otomatik kategorilere ayırma' },
    ],
  },
  {
    id: 'p5',
    phase: 'Faz 5',
    title: 'İş Geliştirme Sayfaları (B2B Marketing)',
    color: '#04da8b',
    bgLight: '#d9fbed',
    timeline: 'Q2 2025',
    progress: 90,
    tasks: [
      { label: 'Business ana sayfa (/business)', status: 'done' },
      { label: 'Çözümler: Geri bildirim, Dönüşüm, Bilgiler, Gelir artışı', status: 'done' },
      { label: 'Çözümler: Küçük işletmeler, İşletmeler', status: 'done' },
      { label: 'Özellik: Hizmet değerlendirmeleri', status: 'done' },
      { label: 'Özellik: Ürün yorumları (e-ticaret entegrasyon banneri)', status: 'done' },
      { label: 'Özellik: QR Değerlendirme (Türkiye\'de bir ilk)', status: 'done' },
      { label: 'Özellik: Yorum davetleri (4 yöntem)', status: 'done' },
      { label: 'Özellik: SEO & Yapay Zeka Keşfi (AEO)', status: 'done' },
      { label: 'Özellik: Widget\'lar', status: 'done' },
      { label: 'Özellik: Sosyal medya araçları', status: 'done' },
      { label: 'Özellik: Entegrasyonlar (sipariş doğrulama, API)', status: 'done' },
      { label: 'Özellik: Profil sayfası özelleştirme', status: 'done' },
      { label: 'Özellik: Yorum yanıtlama (yapay zeka destekli)', status: 'done' },
      { label: 'Özellik: Çözüm Merkezi', status: 'done' },
      { label: 'Özellik: Rakip Analizi', status: 'done' },
      { label: 'Özellik: Sektör Sıralaması & Rozet', status: 'done' },
      { label: 'Özellik: Veri & Analitik', status: 'done' },
      { label: 'Özellik: Güven rozetleri', status: 'planned' },
      { label: 'Özellik: Pazarlama materyalleri', status: 'planned' },
      { label: 'Özellik: Yorum içgörüleri', status: 'planned' },
      { label: 'Özellik: Yorum etiketleme', status: 'planned' },
      { label: 'Fiyatlandırma sayfası', status: 'planned' },
      { label: 'Demo rezervasyon sistemi', status: 'planned' },
    ],
  },
  {
    id: 'p6',
    phase: 'Faz 6',
    title: 'Admin Panel & Moderasyon',
    color: '#1b1a1b',
    bgLight: '#f0f0f0',
    timeline: 'Q2 – Q3 2025',
    progress: 60,
    tasks: [
      { label: 'Admin dashboard (genel istatistikler)', status: 'done' },
      { label: 'Marka yönetimi (listeleme, düzenleme)', status: 'done' },
      { label: 'Şikayet yönetimi (moderasyon, durum değiştirme)', status: 'done' },
      { label: 'Kullanıcı yönetimi (listeleme, rol değiştirme)', status: 'done' },
      { label: 'Doğrulama paneli (marka doğrulama)', status: 'done' },
      { label: 'Ayarlar sayfası', status: 'done' },
      { label: 'Paket yönetimi (abonelik planları CRUD)', status: 'planned', detail: 'Planları oluşturma, düzenleme, özellik kilitleme' },
      { label: 'İçerik moderasyon kuyruğu', status: 'planned', detail: 'Yapay zeka tarafından flaglenen içerikler' },
      { label: 'Sistem logları & audit trail', status: 'planned' },
      { label: 'Toplu işlemler (bulk actions)', status: 'planned' },
    ],
  },
  {
    id: 'p7',
    phase: 'Faz 7',
    title: 'E-Ticaret Entegrasyonları',
    color: '#f95a98',
    bgLight: '#fce4ee',
    timeline: 'Q3 2025',
    progress: 10,
    tasks: [
      { label: 'Entegrasyon altyapı tasarımı (API gateway)', status: 'done' },
      { label: 'Trendyol sipariş senkronizasyonu', status: 'planned', detail: 'Sipariş doğrulama, otomatik davet' },
      { label: 'Hepsiburada entegrasyonu', status: 'planned' },
      { label: 'N11 entegrasyonu', status: 'planned' },
      { label: 'İkasta e-ticaret entegrasyonu', status: 'planned', detail: 'Widget sürükle-bırak, sipariş doğrulama' },
      { label: 'Shopify entegrasyonu', status: 'planned' },
      { label: 'WooCommerce entegrasyonu', status: 'planned' },
      { label: 'Webhook bildirimleri sistemi', status: 'planned' },
      { label: 'Toplu davet API\'si', status: 'planned' },
      { label: 'Google Seller Ratings entegrasyonu', status: 'planned' },
    ],
  },
  {
    id: 'p8',
    phase: 'Faz 8',
    title: 'Büyüme & Ölçeklendirme',
    color: '#fe7a1a',
    bgLight: '#ffede3',
    timeline: 'Q3 – Q4 2025',
    progress: 5,
    tasks: [
      { label: 'QR kod oluşturma & yazdırma sistemi', status: 'planned', detail: 'Fiziksel lokasyonlar için QR kod' },
      { label: 'SMS bildirim sistemi (Netgsm / Twilio)', status: 'planned' },
      { label: 'E-posta şablon motoru (davet, bildirim, rapor)', status: 'planned' },
      { label: 'Çoklu dil desteği (EN, DE, AR)', status: 'planned' },
      { label: 'Mobil uygulama (React Native / PWA)', status: 'planned' },
      { label: 'CDN & performans optimizasyonu', status: 'planned' },
      { label: 'SEO meta tag & structured data (JSON-LD)', status: 'planned' },
      { label: 'Google Analytics 4 & event tracking', status: 'planned' },
      { label: 'A/B testing altyapısı', status: 'planned' },
      { label: 'Stripe / iyzico ödeme entegrasyonu', status: 'planned' },
      { label: 'White-label widget embed sistemi', status: 'planned' },
      { label: 'Public API & developer portal', status: 'planned' },
    ],
  },
];

/* ── helpers ── */
function statusIcon(status: TaskStatus) {
  switch (status) {
    case 'done': return <CheckCircle2 className="w-5 h-5 text-[#04da8b] flex-shrink-0" />;
    case 'in-progress': return <Clock className="w-5 h-5 text-[#fe7a1a] flex-shrink-0 animate-pulse" />;
    case 'planned': return <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />;
  }
}

function statusLabel(status: TaskStatus) {
  switch (status) {
    case 'done': return 'Tamamlandı';
    case 'in-progress': return 'Devam Ediyor';
    case 'planned': return 'Planlandı';
  }
}

/* ── overall stats ── */
function calcOverall() {
  let total = 0, done = 0, inProgress = 0;
  PHASES.forEach(p => {
    p.tasks.forEach(t => {
      total++;
      if (t.status === 'done') done++;
      if (t.status === 'in-progress') inProgress++;
    });
  });
  const percent = Math.round(((done + inProgress * 0.5) / total) * 100);
  return { total, done, inProgress, planned: total - done - inProgress, percent };
}

export default function RoadmapPage() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>('p1');
  const overall = calcOverall();

  return (
    <div className="min-h-screen bg-[#f3f0ed]">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#1b1a1b] relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-[#04da8b] opacity-10" />
        <div className="absolute -bottom-10 -left-10 w-[200px] h-[200px] rounded-[40px] bg-[#819cf3] opacity-10 rotate-12" />
        <div className="absolute top-1/2 right-[20%] w-[150px] h-[150px] bg-[#f95a98] opacity-5 rotate-45" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 max-w-5xl relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Image src="/logo/White_SS.png" alt="Superscore" width={160} height={40} className="h-9 w-auto" />
            </div>
            <p className="text-sm font-semibold text-[#04da8b] tracking-widest uppercase mb-4">Product Roadmap 2025</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Türkiye&apos;nin güven platformunu<br className="hidden sm:block" /> birlikte inşa ediyoruz.
            </h1>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-10">
              Superscore, tüketicilerin güvenle alışveriş yapmasını ve markaların itibarlarını şeffaf bir şekilde yönetmesini sağlayan yapay zeka destekli bir güven platformudur.
            </p>

            {/* Overall Progress */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Genel İlerleme</h2>
                <span className="text-3xl sm:text-4xl font-extrabold text-[#04da8b]">%{overall.percent}</span>
              </div>
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mb-5">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${overall.percent}%`,
                    background: 'linear-gradient(90deg, #04da8b, #819cf3, #f95a98)',
                  }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-[#04da8b]">{overall.done}</div>
                  <div className="text-xs text-white/40">Tamamlandı</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-[#fe7a1a]">{overall.inProgress}</div>
                  <div className="text-xs text-white/40">Devam Ediyor</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-extrabold text-white/30">{overall.planned}</div>
                  <div className="text-xs text-white/40">Planlandı</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PHASES ═══ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-5xl">
        <div className="space-y-4">
          {PHASES.map((phase) => {
            const isExpanded = expandedPhase === phase.id;
            const doneCount = phase.tasks.filter(t => t.status === 'done').length;
            const inProgressCount = phase.tasks.filter(t => t.status === 'in-progress').length;

            return (
              <div key={phase.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Phase Header */}
                <button
                  onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                  className="w-full flex items-center gap-4 sm:gap-6 p-5 sm:p-6 hover:bg-gray-50/50 transition-colors text-left"
                >
                  {/* Phase badge */}
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: phase.bgLight }}
                  >
                    <span className="text-xs sm:text-sm font-extrabold" style={{ color: phase.color }}>{phase.phase}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-extrabold text-[#1b1a1b] truncate">{phase.title}</h3>
                      <span className="hidden sm:inline-block text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex-shrink-0">{phase.timeline}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[200px]">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${phase.progress}%`, backgroundColor: phase.color }} />
                      </div>
                      <span className="text-sm font-bold flex-shrink-0" style={{ color: phase.color }}>%{phase.progress}</span>
                      <span className="text-xs text-gray-400 flex-shrink-0 hidden sm:inline">
                        {doneCount}/{phase.tasks.length} görev
                      </span>
                    </div>
                  </div>

                  {/* Expand icon */}
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {/* Task List */}
                {isExpanded && (
                  <div className="border-t border-gray-100 px-5 sm:px-6 py-4 space-y-1">
                    {phase.tasks.map((task, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-3 py-2.5 px-3 rounded-lg transition-colors ${
                          task.status === 'done' ? 'bg-[#d9fbed]/30' :
                          task.status === 'in-progress' ? 'bg-[#ffede3]/30' : 'hover:bg-gray-50'
                        }`}
                      >
                        {statusIcon(task.status)}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm leading-relaxed ${
                            task.status === 'done' ? 'text-[#1b1a1b]' :
                            task.status === 'in-progress' ? 'text-[#1b1a1b] font-medium' : 'text-gray-500'
                          }`}>
                            {task.label}
                          </p>
                          {task.detail && (
                            <p className="text-xs text-gray-400 mt-0.5">{task.detail}</p>
                          )}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${
                          task.status === 'done' ? 'bg-[#04da8b]/10 text-[#04da8b]' :
                          task.status === 'in-progress' ? 'bg-[#fe7a1a]/10 text-[#fe7a1a]' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {statusLabel(task.status)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ TECH STACK ═══ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 max-w-5xl">
        <div className="bg-[#1b1a1b] rounded-2xl p-8 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-8 text-center">Teknoloji Yığını</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Next.js 16', category: 'Framework' },
              { name: 'React 19', category: 'UI' },
              { name: 'TypeScript', category: 'Dil' },
              { name: 'Supabase', category: 'Veritabanı' },
              { name: 'OpenAI', category: 'Yapay Zeka' },
              { name: 'Tailwind 4', category: 'Stil' },
            ].map(tech => (
              <div key={tech.name} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <p className="text-sm font-bold text-white">{tech.name}</p>
                <p className="text-[10px] text-white/40 mt-1">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ KEY METRICS ═══ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 max-w-5xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { value: '100+', label: 'Sayfa', color: '#04da8b' },
            { value: '11', label: 'API Endpoint', color: '#819cf3' },
            { value: '22+', label: 'Bileşen', color: '#f95a98' },
            { value: '40+', label: 'Marka Panel Sayfası', color: '#fe7a1a' },
          ].map(m => (
            <div key={m.label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl sm:text-4xl font-extrabold mb-1" style={{ color: m.color }}>{m.value}</div>
              <div className="text-sm text-gray-500">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SUPERSCORE UNIQUE ═══ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1b1a1b] mb-2 text-center">Superscore&apos;u Benzersiz Kılan</h2>
          <p className="text-sm text-gray-500 text-center mb-8">Türkiye pazarına özel, rakiplerden farklı özellikler</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'QR Kod Değerlendirme', desc: 'Fiziksel lokasyonlarda anlık yorum toplama. Türkiye\'de bir ilk.', status: 'done' as TaskStatus },
              { title: 'Çözüm Merkezi', desc: 'Yapay zeka destekli şikayet çözüm sistemi. Belge doğrulama ile otomatik kapatma.', status: 'done' as TaskStatus },
              { title: 'Sektör Sıralaması & Rozet', desc: 'İşletmelerin sektörlerinde otomatik sıralanması ve güven rozetleri.', status: 'done' as TaskStatus },
              { title: 'Sipariş Doğrulama', desc: 'E-ticaret entegrasyonu ile sadece gerçek müşterilerden yorum toplama.', status: 'planned' as TaskStatus },
              { title: 'SuperScore Algoritması', desc: '0-100 arası güven puanı. Çözüm oranı, yanıt süresi, müşteri memnuniyeti.', status: 'done' as TaskStatus },
              { title: 'Türk Pazar Yeri Entegrasyonu', desc: 'Trendyol, Hepsiburada, N11 ve İkasta ile hazır entegrasyon.', status: 'planned' as TaskStatus },
            ].map(f => (
              <div key={f.title} className="flex items-start gap-3 p-4 rounded-xl bg-[#f7f5f0]">
                {statusIcon(f.status)}
                <div>
                  <h3 className="text-sm font-bold text-[#1b1a1b] mb-1">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

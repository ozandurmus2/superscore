'use client';

import Link from 'next/link';
import { ArrowRight, Download, TrendingUp, Share2, Lock } from 'lucide-react';

// ── platform logos (inline SVG placeholders styled as colored tiles) ─────────
const PLATFORMS = [
  { name: 'Google',      color: '#4285f4', letter: 'G' },
  { name: 'Amazon',      color: '#ff9900', letter: 'A' },
  { name: 'Trendyol',    color: '#f27a1a', letter: 'T' },
  { name: 'Hepsiburada', color: '#ff6000', letter: 'H' },
  { name: 'N11',         color: '#782af4', letter: 'N' },
  { name: 'Tripadvisor', color: '#00af87', letter: 'TA' },
];

// ── testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: 'Ürün yorumları sayesinde müşterilerimiz hangi ürünlerden daha fazla almamız ve hangilerini kaldırmamız gerektiğini bize söylüyor. Bu yorumlar, müşterilerimize yardımcı oldukları kadar, doğru ürünleri seçmemize de yardımcı oluyor.',
    author: 'Ann Riemer',
    role: 'Legeakademiet Kurucusu ve Ortağı',
  },
  {
    quote: 'Superscore yorumları sayesinde müşterilerinizin neleri sevip neleri sevmediği ve ne istedikleri konusunda inanılmaz bir fikir ediniyorsunuz. Bu bilgiler, yol haritamızı belirlemede son derece yardımcı oluyor.',
    author: 'Jillian Ross',
    role: 'Setmore\'da Marka Yöneticisi',
  },
  {
    quote: 'Olumsuz bir deneyimi olumluya çevirebilme fırsatı çok önemlidir. Müşterilerimizin hiçbirinin kendilerini değersiz hissetmelerini istemiyoruz.',
    author: 'Garreth Knowd',
    role: 'Flowers.ie\'nin sahibi',
  },
];

// ── feature list ──────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Download,
    title: 'Tüm yorumlarınızı tek bir yerde toplayın.',
    desc: 'Diğer sitelerde topladığınız yorumları Superscore\'a kolayca aktarın.',
  },
  {
    icon: TrendingUp,
    title: 'Site içi dönüşüm oranını artırın',
    desc: 'Arama performansını iyileştirmek ve sitenize daha fazla trafik çekmek için güvenilir üçüncü taraf yorumlarından yararlanın.',
  },
  {
    icon: Share2,
    title: 'Erişim alanınızı genişletin',
    desc: 'Superscore\'da sizinle aynı ürünleri satan diğer işletmelerle yorumlarınızı paylaşın.',
  },
];

// ── how-it-works steps ────────────────────────────────────────────────────────
const HOW_STEPS = [
  {
    num: '01',
    title: 'Platformu bağlayın',
    desc: 'Google, Amazon, Trendyol gibi platformları Superscore\'a entegre edin.',
  },
  {
    num: '02',
    title: 'Yorumlar otomatik aktarılır',
    desc: 'Entegrasyon tamamlandıktan sonra mevcut ve yeni yorumlar otomatik olarak çekilir.',
  },
  {
    num: '03',
    title: 'Profilde ve widget\'ta görünür',
    desc: 'Aktarılan yorumlar marka profilinizde ve web sitenize yerleştirdiğiniz widgetta gösterilir.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
export default function UcuncuTarafPage() {
  return (
    <div className="w-full max-w-5xl space-y-6">

      {/* ── Plus lock banner ── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#3c57bc]/10 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4 text-[#3c57bc]" />
            </div>
            <p className="text-sm text-[#1b1a1b] leading-snug">
              <strong>Bu özellik Plus</strong> planının bir parçasıdır — erişmek için hesabınızı yükseltin.
            </p>
          </div>
          <Link
            href="/marka-panel/abonelik"
            className="px-5 py-2.5 rounded-full text-sm font-bold text-white shrink-0 transition-opacity hover:opacity-90"
            style={{ background: '#0e291d' }}
          >
            Erişim için yükseltin.
          </Link>
        </div>
      </div>

      {/* ── Hero card (screenshot-matching layout) ── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* Left: product image on mint bg */}
          <div
            className="md:w-[380px] shrink-0 flex items-center justify-center p-6 sm:p-8 min-h-[200px] sm:min-h-[280px]"
            style={{ background: 'linear-gradient(135deg, #d4f4e2 0%, #b8ecd4 100%)' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://businessapp.b2b.trustpilot.com/product-reviews/8ba5901f52a792b763ce.png"
              alt="Üçüncü Taraf Değerlendirmeleri"
              className="w-full max-w-[280px] h-auto object-contain drop-shadow-xl"
            />
          </div>

          {/* Right: copy */}
          <div className="flex-1 p-5 sm:p-7 md:p-10 flex flex-col justify-center">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 self-start mb-4 px-3 py-1.5 rounded-full text-xs font-semibold text-white" style={{ background: '#3c6473' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              Üçüncü Taraf Değerlendirmeleri
            </span>

            <h2 className="text-xl md:text-2xl font-bold text-[#1b1a1b] mb-3 leading-snug">
              Ürünlerinize daha fazla ilgi çekin.
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Üçüncü taraf yorumları, Üçüncü Taraf Değerlendirmeleri eklentisinin bir parçasıdır.
              Size şu olanakları sağlar:
            </p>

            <div className="space-y-5 mb-8">
              {FEATURES.map(f => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#d4f4e2' }}>
                    <f.icon className="w-4 h-4" style={{ color: '#0e7a50' }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1b1a1b] mb-0.5">{f.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/marka-panel/abonelik"
              className="self-start inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: '#0e291d' }}
            >
              Erişim için yükseltin.
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── How it works ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7 md:p-10">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-6">Nasıl çalışır?</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_STEPS.map(s => (
            <div key={s.num} className="flex flex-col gap-3">
              <span className="text-3xl font-bold text-gray-100">{s.num}</span>
              <p className="text-sm font-bold text-[#1b1a1b]">{s.title}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Platforms ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7 md:p-10">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-5">Desteklenen platformlar</p>
        <div className="flex flex-wrap gap-3">
          {PLATFORMS.map(p => (
            <div
              key={p.name}
              className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ background: p.color }}
              >
                {p.letter}
              </div>
              <span className="text-sm font-medium text-[#1b1a1b]">{p.name}</span>
              <span className="text-[10px] text-gray-400 border border-gray-200 rounded-full px-2 py-0.5">Yakında</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Testimonials ── */}
      <div>
        <p className="text-sm font-bold text-center text-[#1b1a1b] mb-5">
          Diğer işletmelerin söyledikleri şöyle:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TESTIMONIALS.map(t => (
            <div key={t.author} className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between gap-5">
              <p className="text-sm text-gray-600 leading-relaxed">
                &ldquo; {t.quote} &rdquo;
              </p>
              <div>
                <p className="text-xs font-bold text-[#1b1a1b]">{t.author}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <p className="text-base font-bold text-[#1b1a1b] mb-1">
            Üçüncü taraf yorumlarını bugün entegre etmeye başlayın.
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            Plus planına geçerek tüm platformlardan otomatik yorum aktarımını etkinleştirin.
          </p>
        </div>
        <Link
          href="/marka-panel/abonelik"
          className="shrink-0 px-7 py-3 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90 flex items-center gap-2"
          style={{ background: '#0e291d' }}
        >
          Planları inceleyin
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}

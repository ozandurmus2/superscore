'use client';

import Link from 'next/link';
import { Lock, Scale, Download, TrendingUp, ShoppingBag, Star, CheckCircle2, ArrowRight } from 'lucide-react';

/* ── Feature items matching screenshot ─────────────────────────────────────── */
const FEATURES = [
  {
    icon: Scale,
    title: 'İnceleme daveti dönüşümünü takip et',
    desc: 'Gönderilen davetiye sayısına kıyasla, kaç müşterinin ürün yorumu yazdığını takip edin.',
    color: '#52b37f',
  },
  {
    icon: Download,
    title: 'Stratejinizi geliştirmek için değerlendirme verilerini kullanın.',
    desc: 'Ürün yorum verilerini kolayca dışa aktararak müşterilerinizin ürünlerinizle nasıl etkileşim kurduğunu daha detaylı inceleyebilirsiniz.',
    color: '#52b37f',
  },
  {
    icon: TrendingUp,
    title: 'İnceleme eğilimlerini anlayın',
    desc: 'Ürün değerlendirme verilerine bakın ve zaman içinde nasıl değiştiğini keşfedin.',
    color: '#52b37f',
  },
];

/* ── E-commerce integrations ────────────────────────────────────────────────── */
const ECOMMERCE = [
  { name: 'Trendyol',    color: '#f27a1a', letter: 'T', soon: false },
  { name: 'Hepsiburada', color: '#ff6000', letter: 'H', soon: false },
  { name: 'Amazon',      color: '#ff9900', letter: 'A', soon: true  },
  { name: 'N11',         color: '#782af4', letter: 'N', soon: true  },
  { name: 'Shopify',     color: '#96bf48', letter: 'S', soon: true  },
  { name: 'WooCommerce', color: '#7f54b3', letter: 'W', soon: true  },
];

const GOOGLE_SOURCES = [
  { name: 'Google Maps',    letter: 'G', color: '#4285f4', soon: true },
  { name: 'Google Shopping',letter: 'GS', color: '#34a853', soon: true },
];

/* ── Testimonials ───────────────────────────────────────────────────────────── */
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

export default function UrunYorumlariPage() {
  return (
    <div className="space-y-6 pb-12">

      {/* ── Plus lock banner ─────────────────────────────────────────────────── */}
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

      {/* ── Hero card (matches screenshot) ──────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* Left: product image on mint bg */}
          <div
            className="md:w-[380px] shrink-0 flex items-center justify-center p-6 sm:p-10 min-h-[200px] sm:min-h-[320px]"
            style={{ background: 'linear-gradient(135deg, #d4f4e2 0%, #b8ecd4 100%)' }}
          >
            <img
              src="https://businessapp.b2b.trustpilot.com/product-reviews/f701ce63d52d0c3bb089.png"
              alt="Ürün Yorumları"
              className="w-full max-w-[260px] h-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Right: content */}
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4 self-start">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                style={{ background: '#1b1a1b' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#52b37f] shrink-0" />
                Ürün Yorumları Eklentisi
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-[#1b1a1b] leading-snug mb-2">
              Verilerle yorumlarınızdan daha fazla verim alın.
            </h2>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Davetiye verileri, Ürün Yorumları eklentisinin bir parçasıdır. Size şu olanakları sağlar:
            </p>

            {/* Features */}
            <div className="space-y-4 mb-6">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: '#d4f4e2' }}
                  >
                    <f.icon className="w-4 h-4" style={{ color: '#0e291d' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1b1a1b] leading-snug">{f.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/marka-panel/abonelik"
              className="self-start px-6 py-3 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ background: '#0e291d' }}
            >
              Erişim için yükseltin.
            </Link>
          </div>
        </div>
      </div>

      {/* ── E-commerce integrations ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
        <div className="flex items-center gap-2 mb-1">
          <ShoppingBag className="w-5 h-5 text-[#52b37f]" />
          <h3 className="text-base font-bold text-[#1b1a1b]">E-Ticaret Entegrasyonları</h3>
        </div>
        <p className="text-sm text-gray-500 mb-5 leading-relaxed">
          E-ticaret altyapınızla entegre olun; müşterilerinizin platform üzerindeki ürün yorumlarını otomatik olarak Superscore&apos;a aktarın. Tüm yorumlarınız tek bir yerde, filtrelenmiş ve analiz edilmeye hazır.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {ECOMMERCE.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100"
              style={{ background: '#fafafa' }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                style={{ background: p.color }}
              >
                {p.letter}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#1b1a1b] truncate">{p.name}</p>
                {p.soon ? (
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Yakında</span>
                ) : (
                  <span className="text-[10px] font-semibold text-[#52b37f] uppercase tracking-wider">Aktif</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Google Reviews integration ───────────────────────────────────────── */}
      <div className="rounded-2xl border border-gray-200 overflow-hidden" style={{ background: '#f0f7ff' }}>
        <div className="p-5 sm:p-7">
          <div className="flex items-start gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ background: '#4285f4' }}
            >
              G
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1b1a1b]">Google Yorumları Entegrasyonu</h3>
              <p className="text-xs text-gray-500 mt-0.5">Yakında geliyor</p>
            </div>
            <span
              className="ml-auto px-3 py-1 rounded-full text-xs font-bold text-white shrink-0"
              style={{ background: '#3c57bc' }}
            >
              Çok Yakında
            </span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Google Maps ve Google Alışveriş&apos;teki yorumlarınızı doğrudan Superscore&apos;a çekin. Tüm platformlardaki yorumlarınızı tek panelden yönetin, yanıtlayın ve analiz edin.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Google Maps yorumlarını otomatik senkronize et',
              'Google Alışveriş ürün yorumlarını çek',
              'Tüm yorumlara tek panelden yanıt ver',
              'Google skor değişimlerini takip et',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4285f4] shrink-0" />
                <span className="text-xs text-[#1b1a1b]">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-gray-500">Bu özellik Plus planı kapsamında sunulacaktır.</p>
            <Link
              href="/marka-panel/abonelik"
              className="flex items-center gap-1.5 text-sm font-semibold text-[#3c57bc] hover:underline"
            >
              Plus&apos;a yükselt <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── How it works ────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7">
        <h3 className="text-base font-bold text-[#1b1a1b] mb-5">Nasıl çalışır?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { step: '1', title: 'Platformu bağla', desc: 'E-ticaret altyapınızı veya Google hesabınızı birkaç tıkla Superscore\'a bağlayın.' },
            { step: '2', title: 'Yorumlar aktarılsın', desc: 'Mevcut ve yeni yorumlar otomatik olarak Superscore paneline yansır.' },
            { step: '3', title: 'Yönet ve analiz et', desc: 'Tüm yorumlarınızı tek ekrandan filtreleyin, yanıtlayın ve içgörü elde edin.' },
          ].map((s) => (
            <div key={s.step} className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ background: '#52b37f' }}
              >
                {s.step}
              </div>
              <div>
                <p className="text-sm font-bold text-[#1b1a1b]">{s.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Testimonials ────────────────────────────────────────────────────── */}
      <div>
        <p className="text-center text-base font-bold text-[#1b1a1b] mb-4">Diğer işletmelerin söyledikleri şöyle:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.author} className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col gap-4">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#52b37f] text-[#52b37f]" />
                ))}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-xs font-bold text-[#1b1a1b]">{t.author}</p>
                <p className="text-[11px] text-gray-400">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ──────────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl p-6 sm:p-8 text-center"
        style={{ background: 'linear-gradient(135deg, #0e291d 0%, #1a4030 100%)' }}
      >
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
          Tüm yorumlarınızı tek çatı altında toplayın
        </h3>
        <p className="text-sm text-[#84ebb1] mb-5 leading-relaxed max-w-md mx-auto">
          E-ticaret platformlarınız ve Google'daki tüm yorumları Superscore'a aktarın. Plus planıyla erişin.
        </p>
        <Link
          href="/marka-panel/abonelik"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-opacity hover:opacity-90"
          style={{ background: '#52b37f', color: '#0e291d' }}
        >
          Plus&apos;a geç <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}

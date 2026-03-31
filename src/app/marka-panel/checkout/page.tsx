'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

/* ─── Date helpers ─── */
function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}
function fmtLong(d: Date) {
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}
function fmtShort(d: Date) {
  return `${d.getDate()}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

/* ─── Inline icons ─── */
function KilitIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 flex-shrink-0 mt-0.5" aria-hidden="true">
      <path d="M7.5 10.25v2.5h1v-2.5h-1Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M6.055 1.805A2.75 2.75 0 0 1 10.75 3.75v.45h1v-.45a3.75 3.75 0 0 0-7.5 0V7H2v9h12V7H5.25V3.75c0-.73.29-1.429.805-1.945ZM3 15V8h10v7H3Z" />
    </svg>
  );
}
function AlertIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 flex-shrink-0 mt-0.5" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="m4 9.236-1 2V12h10v-.764l-1-2V6a4 4 0 0 0-8 0v3.236ZM14 11v2H2v-2l1-2V6a5 5 0 0 1 10 0v3l1 2ZM6 14a2 2 0 1 0 4 0H9a1 1 0 1 1-2 0H6Z" />
      <path d="M7.5 0h1v1h-1V0Z" />
    </svg>
  );
}
function SmileIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 flex-shrink-0 mt-0.5" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M5.5 6.475a.5.5 0 0 0-.5.5H4a1.5 1.5 0 0 1 3 0H6a.5.5 0 0 0-.5-.5Zm5 0a.5.5 0 0 0-.5.5H9a1.5 1.5 0 0 1 3 0h-1a.5.5 0 0 0-.5-.5ZM2.842 9.5h10.316l-.176.634C12.377 12.306 10.394 14 8 14s-4.377-1.694-4.982-3.866L2.842 9.5Zm1.371 1C4.878 11.957 6.328 13 8 13c1.672 0 3.122-1.043 3.787-2.5H4.213Z" />
    </svg>
  );
}

function TikSmall() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 flex-shrink-0 text-gray-400" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.723 5.69 7.12 11.56 4.008 8.45l.707-.707 2.388 2.388L12 5l.723.69Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.05 3.05a7 7 0 1 0 9.9 9.9 7 7 0 0 0-9.9-9.9Zm-.707 10.607A8 8 0 1 1 13.657 2.343 8 8 0 0 1 2.343 13.657Z" />
    </svg>
  );
}

/* ─── Plan price config ─── */
const PLAN_CONFIG: Record<string, { name: string; monthly: number; yearly: number; monthlyStr: string; yearlyStr: string }> = {
  plus: { name: 'Plus', monthly: 129, yearly: 99, monthlyStr: '129,00', yearlyStr: '99,00' },
  premium: { name: 'Premium', monthly: 279, yearly: 229, monthlyStr: '279,00', yearlyStr: '229,00' },
  enterprise: { name: 'Gelişmiş', monthly: 479, yearly: 399, monthlyStr: '479,00', yearlyStr: '399,00' },
};

/* ══════════════════════════
   LOADING SCREEN (video)
══════════════════════════ */
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true), 3000);
    const t2 = setTimeout(() => onDone(), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div
      className="max-w-4xl mx-auto"
      style={{ opacity: fade ? 0 : 1, transition: 'opacity 0.5s ease' }}
    >
      <div
        className="rounded-2xl border border-gray-100 overflow-hidden"
        style={{ background: '#f9f8f5' }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 p-8 lg:p-12">
          {/* Video */}
          <div className="flex-shrink-0 rounded-2xl overflow-hidden" style={{ width: 200, height: 150 }}>
            <video
              autoPlay muted playsInline
              className="w-full h-full object-cover"
              suppressHydrationWarning
            >
              <source src="/videos/productSelectedAnimation.mp4" type="video/mp4" />
            </video>
          </div>
          {/* Text */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl lg:text-4xl font-black text-[#1b1a1b] leading-tight mb-3">
              Yeni planınız<br />oluşturuluyor...
            </h2>
            <p className="text-gray-500 text-base">
              Birkaç saniye içinde ödeme sayfasına yönlendirileceksiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════
   CHECKOUT FORM
══════════════════════════ */
function CheckoutContent() {
  const searchParams = useSearchParams();
  const planKey = searchParams.get('plan') || 'plus';
  const isTrial = searchParams.get('trial') === 'true';
  const plan = PLAN_CONFIG[planKey] || PLAN_CONFIG.plus;

  const [loading, setLoading] = useState(true);
  const [billing, setBilling] = useState<'annual' | 'monthly'>('annual');
  const [t1, setT1] = useState(false);
  const [t2, setT2] = useState(false);
  const [business, setBusiness] = useState('');

  const today = new Date();
  const trialEnd = addDays(today, 14);
  const trialEndLong = fmtLong(trialEnd);
  const trialEndShort = fmtShort(trialEnd);

  const annualTotal = plan.yearly * 12;
  const monthlyTotal = plan.monthly * 12;
  const total = billing === 'annual' ? annualTotal : monthlyTotal;
  const totalStr = total.toLocaleString('tr-TR', { minimumFractionDigits: 2 });
  const monthlyRateStr = billing === 'annual' ? plan.yearlyStr : plan.monthlyStr;

  const canStart = t1 && t2;

  if (loading) {
    return <LoadingScreen onDone={() => setLoading(false)} />;
  }

  return (
    <div
      className="max-w-5xl mx-auto space-y-5"
      style={{ animation: 'fadeIn 0.5s ease' }}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {/* ── Top Banner ── */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-0">
          {/* Left: image + title */}
          <div className="flex items-center gap-5 px-6 py-5 lg:border-r border-b lg:border-b-0 border-gray-100" style={{ minWidth: 0 }}>
            <div
              className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden flex-shrink-0 border-4"
              style={{ borderColor: '#ffe500' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://businessapp.b2b.trustpilot.com/subscription/e4b59e6daf979fee79be.webp"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Başlamak üzeresiniz</p>
              <h1 className="text-xl font-black text-[#1b1a1b] leading-tight">
                {isTrial ? <>Ücretsiz {plan.name}<br />deneme sürümü</> : <>{plan.name}<br />Planı</>}
              </h1>
            </div>
          </div>

          {/* Right: 3 bullet points */}
          <div className="flex-1 px-6 py-5 space-y-3">
            <div className="flex items-start gap-3">
              <KilitIcon />
              <p className="text-sm text-[#1b1a1b]">
                14 günlük ücretsiz {plan.name} deneme sürümünün kilidini açtınız.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <AlertIcon />
              <p className="text-sm text-[#1b1a1b]">
                7 gün sonra size yenileme hatırlatıcısı göndereceğiz.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <SmileIcon />
              <p className="text-sm text-[#1b1a1b]">
                Süresi dolmadan iptal etmediğiniz takdirde, ücretli planınız {trialEndLong} tarihinde başlayacaktır.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">

        {/* LEFT: Forms */}
        <div className="flex-1 w-full space-y-5">

          {/* Business search */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-[#1b1a1b] mb-5">İşletme araması</h2>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">İşletme adı</label>
            <div className="relative">
              <input
                type="text"
                value={business}
                onChange={e => setBusiness(e.target.value)}
                placeholder="Aramak"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#3c57bc] pr-10"
              />
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 absolute right-3 top-3.5 text-gray-400">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" strokeLinecap="round" />
              </svg>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-right">
              Tarafından desteklenmektedir{' '}
              <span className="font-bold text-gray-600">dun</span>
              <span className="text-gray-400">&amp;</span>
              <span className="font-bold text-gray-600">bradstreet</span>
            </p>
          </div>

          {/* Payment info — blurred with star overlay */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[#1b1a1b]">Ödeme bilgileri</h2>
              <div className="flex items-center gap-2">
                {/* Card logos */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/visa.svg" alt="Visa" className="h-6 w-auto" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/mastercard.svg" alt="Mastercard" className="h-6 w-auto" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/amex.svg" alt="American Express" className="h-6 w-auto" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/secureform.svg" alt="Güvenli form" className="h-5 w-auto ml-1" />
              </div>
            </div>

            {/* Blurred form + star overlay */}
            <div className="relative">
              {/* Blurred fields (non-interactive) */}
              <div style={{ filter: 'blur(3.5px)', pointerEvents: 'none', userSelect: 'none' }} aria-hidden="true">
                <label className="block text-sm font-medium text-gray-600 mb-1">Name on card</label>
                <div className="border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-gray-50 h-11" />
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Card number</label>
                    <div className="border border-gray-300 rounded-lg px-3 py-3 bg-gray-50 h-11" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Expires (Month/Year)</label>
                    <div className="border border-gray-300 rounded-lg px-3 py-3 bg-gray-50 h-11 flex items-center gap-1">
                      <div className="flex-1 bg-gray-200 rounded h-4" />
                      <span className="text-gray-300">/</span>
                      <div className="flex-1 bg-gray-200 rounded h-4" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Security Code</label>
                    <div className="border border-gray-300 rounded-lg px-3 py-3 bg-gray-50 h-11" />
                  </div>
                </div>
              </div>

              {/* Star overlay — static, no animation */}
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl" style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(2px)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo/star_icon.png" alt="" className="w-14 h-14" />
                <p className="font-black text-[#1b1a1b] mt-3 text-center text-base">
                  Kart bilgisi girmenize gerek yok!
                </p>
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-[#1b1a1b] mb-5">Şartlar ve Koşullar</h2>
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={t1}
                  onChange={e => setT1(e.target.checked)}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#3c57bc]"
                />
                <span className="text-sm text-[#1b1a1b] leading-relaxed">
                  <Link href="#" className="text-[#3c57bc] underline">Superscore&apos;un Satış ve İşletmeler için Kullanım Şartları</Link>
                  {' '}ve Gizlilik Politikası&apos;nı okudum ve kabul ediyorum.
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={t2}
                  onChange={e => setT2(e.target.checked)}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#3c57bc]"
                />
                <span className="text-sm text-[#1b1a1b] leading-relaxed">
                  Bu ücretsiz deneme sürümünün, hesap ayarlarımda bulunan iptal işlemini tamamlayarak{' '}
                  <strong>{trialEndShort}</strong> tarihine kadar iptal etmediğim takdirde otomatik olarak ücretli
                  aboneliğe dönüşeceğini ve ödeme yöntemimden{' '}
                  <strong>{totalStr} €</strong> tutarında ücret alınacağını kabul ve onaylıyorum.
                  Bu şartlar ile İşletmeler için Kullanım Şartları arasında herhangi bir çelişki
                  olması durumunda, bu şartlar öncelikli olacaktır.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT: Order summary (sticky on desktop, normal on mobile) */}
        <div className="w-full lg:w-80 lg:flex-shrink-0 lg:sticky lg:top-20" style={{ maxHeight: 'calc(100vh - 84px)', overflowY: 'auto' }}>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
            <h2 className="text-xl font-bold text-[#1b1a1b]">Sipariş özeti</h2>

            {/* Info box */}
            <div className="rounded-xl p-4 text-sm" style={{ background: '#dbeafe' }}>
              <p className="font-bold text-[#1b1a1b] mb-2">12 aylık taahhüt</p>
              <p className="text-gray-600 leading-relaxed text-xs">
                Ücretsiz deneme süresi sona erdikten sonra, otomatik olarak 12 aylık bir aboneliğe
                kaydolacaksınız ve yenilemeyi kapatmadığınız sürece abonelik yıllık olarak
                yenilenecektir. Deneme süresi sona erdikten sonra faturalandırılmamak için{' '}
                <strong>{trialEndLong}</strong> tarihinden önce planlar ve faturalandırma
                sayfasından aboneliğinizi iptal edebilirsiniz.
              </p>
            </div>

            {/* Billing selector */}
            <div className="mt-2">
              {/* Badge row */}
              <div className="grid grid-cols-2 mb-1">
                <div />
                <div className="flex justify-center">
                  <span
                    className="text-[10px] font-black px-2 py-0.5 rounded-full whitespace-nowrap"
                    style={{ background: '#9ff6d3', border: '1.5px solid #1b1a1b', color: '#1b1a1b' }}
                  >
                    %9 tasarruf edin
                  </span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl overflow-hidden text-sm">
                {/* Headers */}
                <div className="grid grid-cols-2 border-b border-gray-200">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 border-r border-gray-200">
                    Maliyeti dağıtın
                  </div>
                  <div className="px-3 py-2 text-xs font-semibold" style={{ color: '#3c57bc' }}>
                    Tam ödeme yapın
                  </div>
                </div>

                {/* Radio options */}
                <div className="grid grid-cols-2">
                  <label
                    className="flex flex-col items-center px-2 py-3 cursor-pointer border-r border-gray-200 hover:bg-gray-50"
                    onClick={() => setBilling('monthly')}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: billing === 'monthly' ? '#3c57bc' : '#d1d5db' }}
                      >
                        {billing === 'monthly' && <div className="w-2 h-2 rounded-full" style={{ background: '#3c57bc' }} />}
                      </div>
                      <span className="text-sm font-black text-[#1b1a1b] whitespace-nowrap">{plan.monthlyStr} €</span>
                    </div>
                    <span className="text-[11px] text-gray-400 whitespace-nowrap">{(plan.monthly * 12).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} €/yıl</span>
                  </label>

                  <label
                    className="flex flex-col items-center px-2 py-3 cursor-pointer hover:bg-blue-50"
                    style={{ background: billing === 'annual' ? '#eff6ff' : undefined }}
                    onClick={() => setBilling('annual')}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: billing === 'annual' ? '#3c57bc' : '#d1d5db' }}
                      >
                        {billing === 'annual' && <div className="w-2 h-2 rounded-full" style={{ background: '#3c57bc' }} />}
                      </div>
                      <span className="text-sm font-black text-[#1b1a1b] whitespace-nowrap">{annualTotal.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} €</span>
                    </div>
                    <span className="text-[11px] text-gray-400 whitespace-nowrap">{plan.yearlyStr} €/ay</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Ara toplam</span>
                <span className="font-bold text-[#1b1a1b]">{totalStr} €</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-[#1b1a1b]">Toplam</span>
                <span className="text-[#1b1a1b]">{totalStr} €</span>
              </div>
            </div>

            <div className="space-y-1.5 text-sm border-t border-gray-100 pt-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Şimdi teslim edilecek</span>
                <span className="font-bold text-[#1b1a1b]">€0,00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Son teslim tarihi {trialEndShort}</span>
                <span className="font-bold text-[#1b1a1b]">{totalStr} €</span>
              </div>
            </div>

            {/* Footer notes */}
            <div className="space-y-1.5 border-t border-gray-100 pt-3">
              <div className="flex items-start gap-2">
                <TikSmall />
                <p className="text-xs text-gray-500">Ücretsiz deneme süresi sona erdikten sonra faturalandırma başlar.</p>
              </div>
              <div className="flex items-start gap-2">
                <TikSmall />
                <p className="text-xs text-gray-500">
                  {trialEndShort} Fatura kesilmemesi için tarihinden önce iptal edin.
                </p>
              </div>
            </div>

            {/* CTA button */}
            <button
              disabled={!canStart}
              className="w-full py-3.5 rounded-full text-sm font-bold transition-all"
              style={{
                background: canStart ? '#0e291d' : '#e5e7eb',
                color: canStart ? '#ffffff' : '#9ca3af',
                cursor: canStart ? 'pointer' : 'not-allowed',
              }}
            >
              {isTrial ? 'Ücretsiz deneme sürümümü başlat' : 'Satın almayı tamamla'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════
   PAGE EXPORT
══════════════════════════ */
export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-12 flex items-center justify-center">
          <p className="text-gray-400">Yükleniyor...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}

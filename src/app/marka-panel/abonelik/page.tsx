'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/* ─── Tik icon ─── */
function TikIcon({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width={size} height={size} aria-hidden="true" style={{ flexShrink: 0 }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.723 5.69 7.12 11.56 4.008 8.45l.707-.707 2.388 2.388L12 5l.723.69Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.05 3.05a7 7 0 1 0 9.9 9.9 7 7 0 0 0-9.9-9.9Zm-.707 10.607A8 8 0 1 1 13.657 2.343 8 8 0 0 1 2.343 13.657Z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width={14} height={14} className="inline-block ml-1 opacity-40" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm9-2.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 7h2v5H7V7Z" />
    </svg>
  );
}

/* ─── Plan button ─── */
function PlanButton({
  children, defaultBg = 'transparent', hoverBg, pressBg,
  textColor = '#1b1a1b', borderColor = '#1b1a1b', small = false, onClick,
}: {
  children: React.ReactNode; defaultBg?: string; hoverBg: string; pressBg: string;
  textColor?: string; borderColor?: string; small?: boolean; onClick?: () => void;
}) {
  const [s, setS] = useState<'idle' | 'hover' | 'press'>('idle');
  const bg = s === 'press' ? pressBg : s === 'hover' ? hoverBg : defaultBg;
  const border = s === 'idle' ? borderColor : 'transparent';
  return (
    <button
      className={`w-full rounded-full border font-bold ${small ? 'py-2 text-xs' : 'py-3 text-sm'}`}
      style={{ background: bg, color: textColor, borderColor: border }}
      onMouseEnter={() => setS('hover')} onMouseLeave={() => setS('idle')}
      onMouseDown={() => setS('press')} onMouseUp={() => setS('hover')}
      onClick={onClick}
    >{children}</button>
  );
}

function FeatureText({ text, boldWords }: { text: string; boldWords: string[] }) {
  const parts: React.ReactNode[] = [];
  let remaining = text; let k = 0;
  const hits: { idx: number; word: string }[] = [];
  boldWords.forEach(w => { const idx = remaining.indexOf(w); if (idx !== -1) hits.push({ idx, word: w }); });
  hits.sort((a, b) => a.idx - b.idx);
  hits.forEach(({ word }) => {
    const idx = remaining.indexOf(word); if (idx === -1) return;
    if (idx > 0) parts.push(<span key={k++}>{remaining.slice(0, idx)}</span>);
    parts.push(<strong key={k++}>{word}</strong>);
    remaining = remaining.slice(idx + word.length);
  });
  if (remaining) parts.push(<span key={k++}>{remaining}</span>);
  return <>{parts}</>;
}

/* ─── Plan definitions ─── */
interface PlanPrimaryBtn { label: string; hoverBg: string; pressBg: string; }
interface PlanSecondaryBtn { label: string; bg: string; textColor: string; hoverBg: string; pressBg: string; }
interface Plan {
  key: string; name: string; topBg: string; bottomBg: string; badge?: string;
  price: { monthly: string | null; yearly: string | null };
  isCurrent?: boolean; subheading: string; features: string[]; boldWords: string[];
  primaryBtn?: PlanPrimaryBtn; secondaryBtn?: PlanSecondaryBtn; learnMore?: string;
}

const plans: Plan[] = [
  {
    key: 'free', name: 'Özgür', topBg: '#dcdcd4', bottomBg: '#f3f0ec',
    price: { monthly: null, yearly: null }, isCurrent: true,
    subheading: "Superscore'u denemek isteyen şirketler için:",
    features: ['Ayda 50 adet değerlendirme daveti.', 'Organik yorumları toplamak için Superscore logosunu içeren 1 adet widget.', 'Profil sayfası özelleştirmesi sınırlıdır.'],
    boldWords: ['50 adet', '1 adet'],
  },
  {
    key: 'plus', name: 'Artı', topBg: '#ffe500', bottomBg: '#fffbd6', badge: 'TAVSİYE EDİLEN',
    price: { monthly: '129', yearly: '99' },
    subheading: 'Müşterilerinizle bağlantı kurun ve itibarınızı geliştirin:',
    features: ['Müşterilerden geri bildirim almak için ayda 200 adet değerlendirme daveti gönderiliyor.', "İnceleme sayınızı ve yıldız puanınızı görüntülemek için 8 web sitesi widget'ı.", 'Profilinizde markanızı tanıtmak için temel HTML profil özelleştirmesi.'],
    boldWords: ['200 adet', "8 web sitesi widget'ı", 'temel HTML'],
    primaryBtn: { label: 'Şimdi yükseltin', hoverBg: '#f6efc8', pressBg: '#e4d690' },
    secondaryBtn: { label: 'Ücretsiz deneyin', bg: '#1b1a1b', textColor: '#ffffff', hoverBg: '#725619', pressBg: '#5a4110' },
    learnMore: "Plus'ı tam olarak inceleyin",
  },
  {
    key: 'premium', name: 'Premium', topBg: '#04da8d', bottomBg: '#d1f9ea',
    price: { monthly: '279', yearly: '229' },
    subheading: 'En iyi yorum içeriklerinizi sergileyin ve satışlarınızı artırın:',
    features: ['Ayda 500 yorum daveti göndererek yorum sayınızı artırmanıza yardımcı oluyoruz.', "Web sitenizde en iyi yorumlarınızı sergilemek için 18 web sitesi widget'ı.", 'Özel varlıklar oluşturun ve gelişmiş analizleri keşfedin.'],
    boldWords: ['500 yorum', "18 web sitesi widget'ı", 'Özel varlıklar'],
    primaryBtn: { label: 'Şimdi yükseltin', hoverBg: '#caefdd', pressBg: '#8fd4b5' },
    learnMore: "Premium'un tüm özelliklerini inceleyin.",
  },
  {
    key: 'enterprise', name: 'Gelişmiş', topBg: '#f9ea93', bottomBg: '#fddce5',
    price: { monthly: '479', yearly: '399' },
    subheading: 'Pazar lideri olarak yeni fırsatların kilidini açın:',
    features: ["Müşterilerden yüksek miktarda geri bildirim almak için ayda 5000 adet değerlendirme daveti gönderiyoruz.", "Tüm widget kütüphanesine erişin ve kendi özel widget'larınızı oluşturun.", 'Sektörünüzdeki trendleri ve konuları öne çıkaran kapsamlı pazar analizleri.'],
    boldWords: ['5000 adet', "özel widget'larınızı", 'kapsamlı pazar analizleri'],
    primaryBtn: { label: 'Şimdi yükseltin', hoverBg: '#f4d1dc', pressBg: '#d9a5b3' },
    learnMore: 'Gelişmiş özelliklerin tamamını inceleyin.',
  },
];

/* ─── Comparison table data ─── */
type CellVal = null | true | string;
interface CompFeature { label: string; info?: boolean; values: [CellVal, CellVal, CellVal, CellVal]; }
interface CompSection { title: string; features: CompFeature[]; }

const compSections: CompSection[] = [
  {
    title: 'Yorumları inceleyin',
    features: [
      { label: 'Aylık inceleme davetiyeleri', values: ['50', '200', '500', '5000'] },
      { label: 'Eski müşteriler için davetiyeler', info: true, values: ['50', '200', '500', '5000'] },
      { label: 'Yorumlar Google Mağaza Puanlaması için değerlendirilir.', values: [true, true, true, true] },
    ],
  },
  {
    title: 'Satışları artırın',
    features: [
      { label: 'Widget kütüphanesi', values: ['1 widget', '8 widget', '18 widget', '20 adet widget'] },
      { label: 'Sosyal medyada yayınla', values: [null, true, true, true] },
      { label: 'Video içerik oluşturun', values: [null, true, true, true] },
      { label: 'Ortak markalı varlıklar', values: [null, true, true, true] },
      { label: 'HTML özelleştirmesi', values: [null, true, true, true] },
      { label: 'Profilde teklifleri göster', values: [null, null, true, true] },
      { label: 'Varlık oluşturucu', values: [null, null, true, true] },
      { label: 'API özelleştirmesi', info: true, values: [null, null, 'Ayriyeten', 'Ayriyeten'] },
      { label: 'Widget özelleştirmesi', values: [null, null, null, true] },
      { label: 'Esnek widget', values: [null, null, null, true] },
    ],
  },
  {
    title: 'Bilgi toplayın',
    features: [
      { label: 'Analitik genel bakış', info: true, values: [true, true, true, true] },
      { label: 'TrustScore tahmini', values: [null, null, true, true] },
      { label: 'Analitik gezgini', values: [null, null, true, true] },
      { label: 'Tahminler oluşturun', values: [null, null, null, true] },
      { label: 'Pazar analizleri', info: true, values: [null, null, null, null] },
      { label: 'Yapay zeka inceleme özetleri', info: true, values: [null, null, null, null] },
      { label: 'Ziyaretçi görüşleri', values: [null, null, null, null] },
    ],
  },
  {
    title: 'Yönetmek ve desteklemek',
    features: [
      { label: 'Kullanıcı koltukları', values: ['1', '3', '10', '20'] },
      { label: 'Çok kanallı destek', values: [null, true, true, true] },
      { label: 'Kişiselleştirilmiş destek', values: [null, null, null, null] },
    ],
  },
];

const faqItems = [
  { q: 'Her plana hangi ürünler dahildir?', a: "Her plan; hizmet değerlendirmesi davetiyeleri, Superscore profil sayfası ve temel analitik içermektedir. Ücretli planlar ek widget'lar, gelişmiş analitik ve pazarlama araçlarına erişim sağlar.", open: true },
  { q: "Enterprise'ın maliyeti ne kadar olacak?", a: 'Gelişmiş plan fiyatlandırması, işletmenizin ihtiyaçlarına ve kullanım ölçeğine göre özelleştirilebilir. Fiyat teklifi almak için satış ekibimizle iletişime geçebilirsiniz.', open: false },
  { q: 'Bir plana ne kadar süreyle bağlı kalacağım?', a: 'Aylık planlarda herhangi bir zamanda iptal edebilirsiniz. Yıllık planlarda yıllık sözleşme geçerlidir ve %9 indirim uygulanır. İptal işlemi mevcut dönemin sonunda geçerli olur.', open: false },
  { q: 'Yeni ücretli planımla destek alabilecek miyim?', a: 'Evet! Ücretli planlara geçtiğinizde çok kanallı destek hizmetine erişebilirsiniz. Gelişmiş plan kullanıcıları kişiselleştirilmiş destek ve öncelikli müşteri hizmetlerinden de yararlanabilir.', open: false },
];

function CompCell({ val }: { val: CellVal }) {
  if (val === null) return <span className="text-gray-300 text-lg">—</span>;
  if (val === true) return <TikIcon size={18} />;
  return <span className="text-sm text-[#1b1a1b] font-medium">{val}</span>;
}

/* ─── Toggle ─── */
function Toggle({ yearly, onToggle }: { yearly: boolean; onToggle: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3">
      <span className="text-sm font-semibold" style={{ color: !yearly ? '#1b1a1b' : '#9ca3af' }}>Aylık</span>
      <button
        onClick={onToggle}
        aria-label="Aylık / Yıllık seç"
        className="relative w-12 h-[26px] rounded-full flex-shrink-0"
        style={{ background: '#1b1a1b', boxShadow: '0 0 0 2.5px #8b5cf6' }}
      >
        <span className="absolute top-[3px] w-5 h-5 rounded-full bg-white shadow" style={{ left: yearly ? '23px' : '3px', transition: 'left 0.18s ease' }} />
      </button>
      <span className="text-sm font-semibold" style={{ color: yearly ? '#1b1a1b' : '#9ca3af' }}>Yıllık</span>
      <span
        className="text-xs font-bold px-2 md:px-3 py-1 rounded-full border-2 border-[#1b1a1b]"
        style={{ background: '#9ff6d3', color: '#1b1a1b', opacity: yearly ? 1 : 0, transition: 'opacity 0.2s' }}
      >
        %9 tasarruf edin
      </span>
    </div>
  );
}

/* ─── FAQ ─── */
function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between px-4 md:px-6 py-4 md:py-5 text-left gap-3">
        <span className="font-semibold text-[#1b1a1b] text-sm md:text-base">{q}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 flex-shrink-0 text-[#1b1a1b]" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="px-4 md:px-6 pb-4 md:pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100">
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Expert button ─── */
function ExpertButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? '#eff1f4' : '#e3e8f4', color: hovered ? '#2e2f2a' : '#3d52b4' }}
      className="w-full md:w-auto flex-shrink-0 px-6 py-3 rounded-full text-sm font-semibold"
    >
      Bir uzmanla konuşun
    </button>
  );
}

const COL = '180px repeat(4, 1fr)';

/* ═══════ PAGE ═══════ */
export default function AbonelikPage() {
  const [yearly, setYearly] = useState(true);
  const toggle = () => setYearly(v => !v);
  const router = useRouter();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 md:space-y-5">

      {/* ══ Hero ══ */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-8 items-start lg:items-center px-4 md:px-8 pt-5 md:pt-8 pb-4 md:pb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#1b1a1b] leading-tight mb-3 md:mb-5">
              Büyümenizi destekleyecek<br className="hidden md:block" /> mükemmel planı seçin.
            </h1>
            <p className="text-sm font-bold text-[#1b1a1b] mb-2 leading-relaxed">
              Tüketicilerin %89&apos;u satın alma işlemi yapmadan önce çevrimiçi yorumları kontrol ediyor. *
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              İşletmeniz için doğru planı seçin ve müşteri yorumlarının gücünü kullanarak güven oluşturun.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://businessapp.b2b.trustpilot.com/upgrade/796265bc2ae0f843c95b.png"
            alt="Superscore ile büyüyün"
            className="rounded-2xl w-full lg:w-64 xl:w-72 h-36 md:h-44 lg:h-48 object-cover"
          />
        </div>
        <div className="flex items-center justify-center px-4 pb-5 md:pb-8">
          <Toggle yearly={yearly} onToggle={toggle} />
        </div>
      </div>

      {/* ══ Plan Cards ══ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {plans.map(plan => {
          const price = yearly ? plan.price.yearly : plan.price.monthly;
          return (
            <div key={plan.key} className="rounded-2xl overflow-hidden flex flex-col shadow-sm">
              {/* Top */}
              <div className="p-4 md:p-5 flex flex-col" style={{ background: plan.topBg }}>
                {plan.badge && (
                  <div className="flex justify-center mb-2 md:mb-3">
                    <span className="text-[10px] font-black text-[#1b1a1b] border-2 border-[#1b1a1b] rounded-full px-4 py-1 tracking-widest">{plan.badge}</span>
                  </div>
                )}
                <h2 className="text-2xl md:text-3xl font-black text-[#1b1a1b] text-center mb-1">{plan.name}</h2>
                {price ? (
                  <>
                    <p className="text-2xl md:text-3xl font-black text-[#1b1a1b] text-center mb-1">€{price}</p>
                    <p className="text-[11px] text-center text-[#1b1a1b]/60 leading-snug">
                      Aylık olarak, yıllık plana göre<br />yıllık faturalandırılır.
                    </p>
                  </>
                ) : plan.isCurrent ? (
                  <p className="text-sm font-bold text-center text-[#1b1a1b]">Mevcut planınız</p>
                ) : null}
              </div>
              {/* Bottom */}
              <div className="p-4 md:p-5 flex-1 flex flex-col" style={{ background: plan.bottomBg }}>
                {(plan.primaryBtn || plan.secondaryBtn) && (
                  <div className="space-y-2 mb-4">
                    {plan.primaryBtn && (
                      <PlanButton hoverBg={plan.primaryBtn.hoverBg} pressBg={plan.primaryBtn.pressBg} onClick={() => router.push(`/marka-panel/checkout?plan=${plan.key}`)}>
                        {plan.primaryBtn.label}
                      </PlanButton>
                    )}
                    {plan.secondaryBtn && (
                      <PlanButton
                        defaultBg={plan.secondaryBtn.bg} hoverBg={plan.secondaryBtn.hoverBg}
                        pressBg={plan.secondaryBtn.pressBg} textColor={plan.secondaryBtn.textColor}
                        borderColor={plan.secondaryBtn.bg}
                        onClick={() => router.push(`/marka-panel/checkout?plan=${plan.key}&trial=true`)}
                      >
                        {plan.secondaryBtn.label}
                      </PlanButton>
                    )}
                  </div>
                )}
                <p className="text-sm font-bold text-[#1b1a1b] mb-3 leading-snug">{plan.subheading}</p>
                <ul className="space-y-2.5 flex-1">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#1b1a1b] leading-relaxed">
                      <TikIcon /><span><FeatureText text={f} boldWords={plan.boldWords} /></span>
                    </li>
                  ))}
                </ul>
                {plan.learnMore && (
                  <div className="mt-4 pt-3 border-t border-black/10">
                    <Link href="#" className="text-sm font-semibold text-[#1b1a1b] underline underline-offset-2 hover:opacity-70">
                      {plan.learnMore}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ══ Feature Comparison — desktop only ══ */}
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100" style={{ overflow: 'clip' }}>
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 px-6 py-6 border-b border-gray-100">
          <h2 className="text-2xl font-black text-[#1b1a1b]">Her özelliği ayrıntılı olarak karşılaştırın.</h2>
          <Toggle yearly={yearly} onToggle={toggle} />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div style={{ minWidth: 640 }}>

            {/* Sticky plan headers — only sticky on lg (overflow-x breaks sticky on mobile) */}
            <div className="lg:sticky lg:top-16 z-10 bg-white border-b border-gray-100">
              <div className="grid" style={{ gridTemplateColumns: COL }}>
                <div className="p-3 md:p-4" />
                {plans.map(plan => {
                  const price = yearly ? plan.price.yearly : plan.price.monthly;
                  return (
                    <div key={plan.key} className="p-2 md:p-3 text-center" style={{ background: plan.topBg }}>
                      <h3 className="text-base md:text-xl font-black text-[#1b1a1b] mb-0.5">{plan.name}</h3>
                      <p className="text-sm md:text-lg font-black text-[#1b1a1b] mb-0.5">{price ? `${price} €` : '0 €'}</p>
                      {plan.isCurrent
                        ? <p className="text-[10px] text-[#1b1a1b]/60 mb-1">Başlangıç</p>
                        : <p className="text-[10px] text-[#1b1a1b]/60 mb-1">yıllık faturalandırılır.</p>
                      }
                      {plan.primaryBtn && (
                        <div className="space-y-1">
                          <PlanButton small hoverBg={plan.primaryBtn.hoverBg} pressBg={plan.primaryBtn.pressBg}>
                            {plan.primaryBtn.label}
                          </PlanButton>
                          {plan.secondaryBtn && (
                            <PlanButton small defaultBg={plan.secondaryBtn.bg} hoverBg={plan.secondaryBtn.hoverBg}
                              pressBg={plan.secondaryBtn.pressBg} textColor={plan.secondaryBtn.textColor} borderColor={plan.secondaryBtn.bg}>
                              {plan.secondaryBtn.label}
                            </PlanButton>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Feature rows */}
            {compSections.map(section => (
              <div key={section.title}>
                <div className="grid border-b border-gray-100" style={{ gridTemplateColumns: COL }}>
                  <div className="px-4 md:px-5 py-2 md:py-3">
                    <span className="text-xs md:text-sm font-bold text-[#1b1a1b]">{section.title}</span>
                  </div>
                  {plans.map(plan => <div key={plan.key} style={{ background: plan.bottomBg }} />)}
                </div>
                {section.features.map((feat, fi) => (
                  <div key={fi} className="grid border-b border-gray-100 last:border-b-0" style={{ gridTemplateColumns: COL }}>
                    <div className="px-4 md:px-5 py-3 flex items-center">
                      <span className="text-xs md:text-sm text-[#1b1a1b]">{feat.label}{feat.info && <InfoIcon />}</span>
                    </div>
                    {plans.map((plan, pi) => (
                      <div key={pi} className="px-2 md:px-3 py-3 flex items-center justify-center" style={{ background: plan.bottomBg }}>
                        <CompCell val={feat.values[pi]} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ FAQ ══ */}
      <div className="bg-white rounded-2xl border border-gray-100 px-4 md:px-8 py-5 md:py-8">
        <h2 className="text-xl md:text-3xl font-black text-[#1b1a1b] mb-4 md:mb-6">Sıkça Sorulan Sorular</h2>
        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} defaultOpen={item.open} />
          ))}
        </div>
      </div>

      {/* ══ Bottom CTA ══ */}
      <div className="rounded-2xl px-4 md:px-8 py-5 md:py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8" style={{ background: '#fcfbf4' }}>
        <div>
          <h3 className="text-base md:text-lg font-bold text-[#1b1a1b] mb-1">
            Hâlâ hangi planın size uygun olduğundan emin değil misiniz?
          </h3>
          <p className="text-sm text-gray-500">
            İşletmeniz hakkında bize daha fazla bilgi verin, uzmanlarımız size en uygun planı önerebilir.
          </p>
        </div>
        <ExpertButton />
      </div>

    </div>
  );
}

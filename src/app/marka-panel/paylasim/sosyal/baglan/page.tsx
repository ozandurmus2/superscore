import Link from 'next/link';

export default function SosyalBaglanPage() {
  const platforms = [
    { name: 'Facebook', color: '#1877F2', initial: 'f' },
    { name: 'Instagram', color: '#E1306C', initial: 'in' },
    { name: 'Twitter / X', color: '#000000', initial: 'X' },
    { name: 'LinkedIn', color: '#0077B5', initial: 'in' },
  ];

  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Preview */}
        <div className="w-full lg:flex-1 rounded-2xl overflow-hidden border border-gray-200 bg-[#f8f7f2]">
          <div className="p-6 md:p-10 flex items-center justify-center min-h-[280px]">
            <div className="w-full max-w-xs space-y-3">
              <div className="bg-white rounded-xl shadow-sm p-4 space-y-3">
                {/* Score display */}
                <div className="flex items-center gap-2">
                  <img src="/logo/star_icon.png" alt="" width={20} height={20} style={{ objectFit: 'contain' }} />
                  <div>
                    <div className="text-xs font-bold text-gray-800">Mükemmel · 4.8</div>
                    <div className="flex gap-px">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-3 rounded-sm" style={{ background: '#04da8d' }} />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Platform buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map(p => (
                    <button key={p.name} className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg border border-gray-200 text-[9px] font-bold text-gray-700">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0" style={{ background: p.color }}>
                        {p.initial[0]}
                      </span>
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade card */}
        <div className="w-full lg:w-80 flex-shrink-0 rounded-2xl border border-gray-200 bg-white p-6 space-y-5">
          <div>
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3" style={{ background: '#f0fdf4', color: '#15803d' }}>
              Plus planı gerektirir
            </span>
            <h2 className="text-xl font-bold text-[#1b1a1b] leading-snug mb-2">
              Bağlan ve Paylaş
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              TrustScore&apos;unuzu ve en iyi yorumlarınızı sosyal medyada tek tıkla paylaşın.
            </p>
          </div>

          <ul className="space-y-3">
            {[
              'Facebook, Instagram, X ve LinkedIn paylaşımı',
              'Otomatik oluşturulan sosyal medya görselleri',
              'Zamanlayıcı ile otomatik paylaşım',
              'Marka rengi ve logo özelleştirme',
              'Paylaşım performans takibi',
            ].map(item => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#04da8d' }}>
                  <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-sm text-[#1b1a1b]">{item}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/marka-panel/abonelik"
            className="block w-full text-center py-3 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90"
            style={{ background: '#0e291d' }}
          >
            Plus planına geç
          </Link>
        </div>
      </div>
    </div>
  );
}

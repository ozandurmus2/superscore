import Link from 'next/link';

export default function SosyalGoruntuPage() {
  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Preview */}
        <div className="w-full lg:flex-1 rounded-2xl overflow-hidden border border-gray-200 bg-[#f8f7f2]">
          <div className="p-6 md:p-10 flex items-center justify-center min-h-[300px]">
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {/* Social card mockups */}
              {[
                { bg: '#0e291d', text: 'white' },
                { bg: '#3c57bc', text: 'white' },
                { bg: '#ffffff', text: '#1b1a1b' },
                { bg: '#04da8d', text: '#0e291d' },
              ].map((style, i) => (
                <div key={i} className="rounded-xl p-3 space-y-2 shadow-sm" style={{ background: style.bg }}>
                  <div className="flex items-center gap-1.5">
                    <img src="/logo/star_icon.png" alt="" width={14} height={14} style={{ objectFit: 'contain', opacity: style.bg === '#0e291d' ? 1 : 0.9 }} />
                    <div className="h-2 w-12 rounded-full" style={{ background: style.bg === '#ffffff' ? '#d1d5db' : 'rgba(255,255,255,0.4)' }} />
                  </div>
                  <div className="flex gap-px">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="w-3 h-3 rounded-sm" style={{ background: style.bg === '#04da8d' ? '#0e291d' : '#04da8d' }} />
                    ))}
                  </div>
                  <div className="h-1.5 w-3/4 rounded-full" style={{ background: style.bg === '#ffffff' ? '#d1d5db' : 'rgba(255,255,255,0.3)' }} />
                  <div className="h-1.5 w-1/2 rounded-full" style={{ background: style.bg === '#ffffff' ? '#e5e7eb' : 'rgba(255,255,255,0.2)' }} />
                </div>
              ))}
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
              Görüntü Oluşturucu
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Yorumlarınızı ve TrustScore&apos;unuzu öne çıkaran şık sosyal medya görselleri oluşturun.
            </p>
          </div>

          <ul className="space-y-3">
            {[
              'Hazır şablonlarla anında görsel oluşturma',
              'Marka rengi ve logo özelleştirme',
              'Instagram, Facebook ve LinkedIn boyutları',
              'Yorum seçimi ve özelleştirme',
              'Yüksek çözünürlüklü PNG/JPG indirme',
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

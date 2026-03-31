import Link from 'next/link';

export default function SosyalVideoPage() {
  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Preview */}
        <div className="w-full lg:flex-1 rounded-2xl overflow-hidden border border-gray-200 bg-[#f8f7f2]">
          <div className="p-6 md:p-10 flex items-center justify-center min-h-[300px]">
            <div className="w-full max-w-xs space-y-3">
              {/* Video frame mockup */}
              <div className="rounded-xl overflow-hidden shadow-md aspect-video relative" style={{ background: '#0e291d' }}>
                {/* Stars animation placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4">
                  <img src="/logo/star_icon.png" alt="" width={28} height={28} style={{ objectFit: 'contain' }} />
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-5 h-5 rounded-sm flex items-center justify-center" style={{ background: '#04da8d' }}>
                        <svg viewBox="0 0 10 10" fill="white" style={{ width: 12, height: 12 }}>
                          <path d="M5 1.2l.9 2 2.2.3-1.6 1.5.4 2.2L5 6.2 3.1 7.2l.4-2.2L2 3.5l2.2-.3z" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <div className="text-white text-[10px] font-bold">Mükemmel · 4.8/5</div>
                  <div className="h-2 w-2/3 rounded-full bg-white/20" />
                  <div className="h-2 w-1/2 rounded-full bg-white/10" />
                </div>
                {/* Play button */}
                <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <svg viewBox="0 0 12 12" fill="white" className="w-3 h-3 ml-0.5">
                    <path d="M3 2l7 4-7 4V2z" />
                  </svg>
                </div>
              </div>
              {/* Format badges */}
              <div className="flex gap-2">
                {['16:9', '9:16', '1:1'].map(f => (
                  <span key={f} className="text-[10px] font-bold px-2 py-1 rounded-lg border border-gray-200 bg-white text-gray-600">{f}</span>
                ))}
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
              Video Oluşturucu
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Yorumlarınızı animasyonlu videolara dönüştürün ve sosyal medyada öne çıkın.
            </p>
          </div>

          <ul className="space-y-3">
            {[
              'Animasyonlu yorum videoları oluşturma',
              'Instagram Reels ve TikTok formatları',
              'Marka özelleştirme ve logo ekleme',
              'Müzik ve ses efekti desteği',
              'MP4 ve GIF formatında indirme',
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

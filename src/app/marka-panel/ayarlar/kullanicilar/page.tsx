'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';

const features = [
  '8 widget, yıldız puanınızı ve yorum sayınızı sergilemenin 8 farklı yolu.',
  'Ayda 200 yorum davetiyle çevrimiçi itibarınızı anında artırın.',
  'Superscore marka varlıklarını indirerek sosyal kanıtınızı her zamankinden daha güçlü hale getirebilirsiniz.',
  'TrustScore analizleri, işletmenizi geliştirmeniz gereken alanları kolayca belirlemenizi sağlar.',
  'Profilinizi HTML kullanarak özelleştirin ve markanızı ve işletmenizi yeni müşterilere sergileyin.',
];

/* ─── Review mockup (Trustpilot-style) ─── */
function ReviewMockup() {
  return (
    <div className="flex gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 w-full max-w-md mx-auto">
      {/* Left: brand sidebar */}
      <div className="w-28 flex-shrink-0">
        <div className="bg-[#1b1a1b] rounded-lg px-3 py-2 mb-3 flex items-center gap-1.5">
          <div className="w-3 h-3 bg-[#00b67a] rounded-sm flex items-center justify-center">
            <svg className="w-2 h-2 text-white" viewBox="0 0 10 10" fill="currentColor">
              <path d="M5 1l1.18 2.39 2.64.38-1.91 1.86.45 2.63L5 7l-2.36 1.26.45-2.63L1.18 3.77l2.64-.38z"/>
            </svg>
          </div>
          <span className="text-white text-[9px] font-bold">Superscore</span>
        </div>
        <div className="space-y-1.5">
          <div className="text-[9px] text-gray-500 font-medium">Şirket Adı</div>
          <div className="text-[8px] text-gray-400">Reviews 1.8</div>
          <div className="flex gap-0.5">
            {[1,2].map(s => <div key={s} className="w-3 h-3 bg-[#00b67a] rounded-sm" />)}
            {[3,4,5].map(s => <div key={s} className="w-3 h-3 bg-gray-200 rounded-sm" />)}
          </div>
          <div className="w-6 h-6 rounded-full bg-gray-200 mt-2" />
          <div className="space-y-1 mt-2">
            <div className="h-1.5 bg-gray-200 rounded w-full" />
            <div className="h-1.5 bg-gray-200 rounded w-4/5" />
          </div>
        </div>
      </div>

      {/* Right: review card */}
      <div className="flex-1 min-w-0">
        {/* Reviewer */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0">
            W
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#1b1a1b]">William Huntley</p>
            <p className="text-[8px] text-gray-400">2 reviews</p>
          </div>
        </div>
        {/* Stars + date */}
        <div className="flex items-center gap-2 mb-1.5">
          <div className="flex gap-0.5">
            {[1,2,3,4].map(s => <div key={s} className="w-3.5 h-3.5 bg-[#00b67a] rounded-sm" />)}
            <div className="w-3.5 h-3.5 bg-gray-200 rounded-sm" />
          </div>
          <span className="text-[8px] text-gray-400">May 4, 2019</span>
        </div>
        <p className="text-[10px] font-bold text-[#1b1a1b] mb-1">Good service, slightly long delivery</p>
        <p className="text-[8px] text-gray-500 leading-relaxed mb-2">
          Thanks for the good services. The delivery time could be better though.
        </p>
        {/* Reply box */}
        <div className="border-l-2 border-[#3c57bc] pl-2 py-1 bg-gray-50 rounded-r">
          <p className="text-[9px] font-bold text-[#1b1a1b] mb-0.5">Reply from Şirket</p>
          <p className="text-[8px] text-gray-400 mb-0.5">→ May 4, 2019</p>
          <p className="text-[8px] text-gray-500 leading-relaxed">
            Thank you for your kind words and valuable feedback. We will look into how to make the delivery better next time.
          </p>
          <p className="text-[8px] text-gray-500 mt-1">Best regards,<br />Şirket</p>
        </div>
      </div>
    </div>
  );
}

export default function KullanicilarPage() {
  return (
    <div className="max-w-5xl mx-auto">
    <div className="flex gap-6 items-start">

      {/* ─── Left card ─── */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {/* Mockup area */}
        <div className="p-8 pb-4">
          <ReviewMockup />
        </div>

        {/* Text */}
        <div className="px-8 pb-8 text-center">
          <h2 className="text-xl font-bold text-[#1b1a1b] mb-2">
            Ekip üyeleriniz için rolleri ve yetkileri yönetin.
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Ekip arkadaşlarınıza roller atayın ve Superscore hesabınızın hangi alanlarına erişebileceklerini kontrol edin.
          </p>
        </div>
      </div>

      {/* ─── Right card ─── */}
      <div className="w-80 flex-shrink-0 bg-white rounded-2xl border border-gray-200 p-6">
        <p className="text-base font-semibold text-[#1b1a1b] leading-snug mb-4">
          Bu özellik <strong>Plus</strong> planının bir parçasıdır, bu nedenle erişmek için hesabınızı yükseltmeniz gerekecektir.
        </p>

        <div className="border-t border-gray-200 mb-4" />

        <p className="text-sm text-gray-600 mb-4">Bu ve diğer satış artırıcı araçlara tam erişim sağlayın:</p>

        <ul className="space-y-3 mb-6">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#0e291d] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-white" />
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {/* Bold the first word/phrase */}
                {f.includes('widget') ? (
                  <><strong>8 widget</strong>{f.slice(7)}</>
                ) : f.includes('200') ? (
                  <><strong>Ayda 200</strong>{f.slice(7)}</>
                ) : f.includes('Superscore') ? (
                  <><strong>Superscore</strong>{f.slice(10)}</>
                ) : f.includes('TrustScore') ? (
                  <><strong>TrustScore</strong>{f.slice(10)}</>
                ) : f}
              </p>
            </li>
          ))}
        </ul>

        <Link
          href="/marka-panel/abonelik"
          className="w-full flex items-center justify-center py-3.5 bg-[#0e291d] text-white text-sm font-semibold rounded-full hover:bg-[#1a3d2b] transition-colors"
        >
          Şimdi yükseltin
        </Link>
      </div>

    </div>
    </div>
  );
}

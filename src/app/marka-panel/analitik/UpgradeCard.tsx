import Link from 'next/link';

const features = [
  '8 widget, yıldız puanınızı ve yorum sayınızı sergilemenin 8 farklı yolu.',
  'Ayda 200 yorum davetiyle çevrimiçi itibarınızı anında artırın.',
  'Trustpilot marka varlıklarını indirerek sosyal kanıtınızı her zamankinden daha güçlü hale getirebilirsiniz.',
  'TrustScore analizleri, işletmenizi geliştirmeniz gereken alanları kolayca belirlemenizi sağlar.',
  'Profilinizi HTML kullanarak özelleştirin ve markanızı ve işletmenizi yeni müşterilere sergileyin.',
];

export default function UpgradeCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
      <p className="text-sm font-bold text-[#1b1a1b] leading-snug">
        Bu özellik <strong>Plus</strong> planının bir parçasıdır , bu nedenle erişmek için hesabınızı yükseltmeniz gerekecektir.
      </p>
      <hr className="border-gray-200" />
      <p className="text-sm text-[#1b1a1b]">Bu ve diğer satış artırıcı araçlara tam erişim sağlayın:</p>
      <ul className="space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-[#1b1a1b]">
            <span
              className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
              style={{ background: '#04da8d' }}
            >
              <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
                <path
                  d="M2 6l3 3 5-5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/marka-panel/abonelik"
        className="mt-2 w-full py-3 rounded-full text-sm font-bold text-white text-center"
        style={{ background: '#0e291d' }}
      >
        Şimdi yükseltin
      </Link>
    </div>
  );
}

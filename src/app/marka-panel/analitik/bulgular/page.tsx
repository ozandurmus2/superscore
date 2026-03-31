import Link from 'next/link';

const features = [
  <>
    Müşteri etkileşim noktalarının tümüne ekleyebileceğiniz <strong>18 özelleştirilebilir widget</strong> ile daha da fazla müşteri kazanın.
  </>,
  <>
    <strong>5.000 adet</strong> özelleştirilebilir yorum davetiyesi – yüksek sayıda yorum alın ve kusursuz bir itibar kazanın.
  </>,
  <>
    Özel Güven Puanı tahminleri oluşturun – önemli bilgiler, Güven Puanınızı nasıl yükselteceğinizi tam olarak gösteriyor.
  </>,
  <>
    Detaylı inceleme bulguları ve duygu analizi, işletmenizi stratejik olarak nasıl geliştireceğinizi gösteriyor.
  </>,
  <>
    İnceleme davetlerini ve hatırlatıcılarını özelleştirerek inceleme toplama sürecinizi önemli ölçüde hızlandırın.
  </>,
];

export default function BulgularPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="w-full flex flex-col lg:flex-row gap-5">
        {/* Left card */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-6 md:p-8 flex flex-col items-center text-center">
          <div
            className="w-full rounded-2xl bg-gradient-to-br from-green-100 to-emerald-50 flex items-center justify-center mb-6"
            style={{ minHeight: 260 }}
          >
            <div className="text-center">
              <div className="text-6xl mb-3">📊</div>
              <p className="text-sm font-semibold text-gray-500">Duygu Analizi</p>
            </div>
          </div>
          <h2 className="font-black text-xl md:text-2xl text-[#1b1a1b] mb-3 leading-snug">
            Müşteri yorumlarınızdan eyleme dönüştürülebilir bilgiler edinmek için yükseltme yapın.
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Müşterilerinizin yorumlarında ele alınan konuların yapay zekâ destekli analizinden yararlanarak, onların sizin güçlü ve zayıf yönleriniz hakkındaki düşüncelerini daha iyi anlayın.
          </p>
        </div>

        {/* Right card */}
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-4">
          <p className="text-sm font-bold text-[#1b1a1b] leading-snug">
            Bu özellik <strong>Gelişmiş</strong> planının bir parçasıdır , bu nedenle erişmek için hesabınızı yükseltmeniz gerekecektir.
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
      </div>
    </div>
  );
}

import UpgradeCard from '../UpgradeCard';

export default function HizmetPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left card */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-5 md:p-8 flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://businessapp.b2b.trustpilot.com/analytics/31d4c577edf9ac78e513.png"
            className="w-full max-w-sm rounded-xl mb-6 object-contain"
            alt="Hizmet analitik önizleme"
          />
          <h2 className="font-black text-xl md:text-2xl text-[#1b1a1b] mb-3">
            Müşteri geri bildirim analizinin tüm potansiyelini ortaya çıkarmak için yükseltin.
          </h2>
          <p className="text-sm text-gray-500">
            İnceleme puanlarından yanıt oranlarına kadar, itibarınızı büyütmenize ve dönüşümlerinizi artırmanıza yardımcı olacak performans verilerine erişmek için yükseltin.
          </p>
        </div>

        {/* Right card */}
        <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
          <UpgradeCard />
        </div>
      </div>
    </div>
  );
}

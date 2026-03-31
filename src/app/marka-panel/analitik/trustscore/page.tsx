import UpgradeCard from '../UpgradeCard';

export default function TrustScorePage() {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left card */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-5 md:p-8 flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://businessapp.b2b.trustpilot.com/analytics/11434f6d102a11fc4643.png"
            className="w-full max-w-sm rounded-xl mb-6 object-contain"
            alt="TrustScore analitik önizleme"
          />
          <h2 className="font-black text-xl md:text-2xl text-[#1b1a1b] mb-3">
            TrustScore&apos;unuzu neyin etkilediğini anlamak için güncellemeyi yapın.
          </h2>
          <p className="text-sm text-gray-500">
            TrustScore&apos;unuzu etkileyen değerlendirme trendlerini inceleyin ve puanınızın nereye doğru ilerleyebileceğine bir göz atın.
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

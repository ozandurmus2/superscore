import UpgradeCard from '../UpgradeCard';

export default function DavetiyelerPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left card */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-5 md:p-8 flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://businessapp.b2b.trustpilot.com/analytics/37462c4404d350c0422c.png"
            className="w-full max-w-sm rounded-xl mb-6 object-contain"
            alt="Davetiyeler analitik önizleme"
          />
          <h2 className="font-black text-xl md:text-2xl text-[#1b1a1b] mb-3">
            Davetiyelerin yorumlara nasıl dönüştüğünü anlamak için yükseltin.
          </h2>
          <p className="text-sm text-gray-500">
            Trend verileri ve şablon karşılaştırma analitiği ile davetiyelerin yorumlara dönüşümünü neyin yönlendirdiğini görün.
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

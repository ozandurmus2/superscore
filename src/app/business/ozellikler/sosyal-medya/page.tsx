import Link from 'next/link';
import Image from 'next/image';

/* ── images ── */
const HERO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F2apoeCzdzNjONfdLablXjN%2F216bc8648fd02585afc1b46d2abc710a%2FENG_-_Social_Media_Tools_2_-_Green.png&w=1920&q=75';
const IMG_PAYLAS = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F7kiaLKUCfzu6ScQxEE2JFA%2F56691d4430d8e8bed71e1f8d5de9229a%2FMarketing_Assets_-_collection_-_Beige_-_Web_page_564x564.png&w=1200&q=75';
const IMG_GORSELLER = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2FC3e8qxj1SRmvnWpMxoJN0%2F06d4578d98bcf4dfc2ef098cb75d307b%2FENG_-_Social_Media_Tools_1_-_Stone.png&w=1920&q=75';
const IMG_KAMPANYA = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5LnEqt0LtFeSVSRV70Pt5p%2F62a32f069a8d3a0be27d3b0afaa8fe60%2FSocial_Media_Tools_4_-_Green.png&w=1920&q=75';
const IMG_CASE = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2FmFAc7EpaeoUkllUX6EsZg%2Fba70c21ad37994ab8d4a1d4e6b61db9f%2FCase-image-min.png&w=3840&q=75';

/* ── alternating sections ── */
const SECTIONS = [
  {
    tag: 'Yorum Paylaşımı',
    title: 'Müşteri yorumlarını sosyal medyada kolayca paylaşın.',
    desc: 'En iyi yorumlarınızı tek tıklamayla sosyal medya hesaplarınızda paylaşın. Superscore, yorumlarınızı Instagram, Facebook, X (Twitter) ve LinkedIn için otomatik olarak göz alıcı görsellere dönüştürür.',
    img: IMG_PAYLAS,
    reverse: false,
  },
  {
    tag: 'Hazır Görseller',
    title: 'Her platform için optimize edilmiş görseller.',
    desc: 'Her sosyal medya platformuna uygun boyut ve formatta hazır görseller oluşturun. Marka renklerinize, logonuza ve tercih ettiğiniz tasarım stiline göre özelleştirilebilir şablonlarla profesyonel içerikler üretin.',
    img: IMG_GORSELLER,
    reverse: true,
  },
  {
    tag: 'Sosyal Kampanyalar',
    title: 'Yorumlarınızla sosyal medya kampanyaları oluşturun.',
    desc: 'Müşteri memnuniyetini sergileyen sosyal medya kampanyaları planlayın ve yönetin. Yapay zeka destekli içerik önerileri ile en etkili yorumları seçin ve paylaşım takvimi oluşturun.',
    img: IMG_KAMPANYA,
    reverse: false,
  },
  {
    tag: 'Sosyal Kanıt',
    title: 'Sosyal medyada güvenilirliğinizi artırın.',
    desc: 'Sosyal medya profillerinize Superscore puanınızı ve yıldız derecelendirmenizi ekleyin. Potansiyel müşterileriniz sizi sosyal medyada keşfettiğinde, güvenilirliğinizi anında görsünler.',
    img: IMG_CASE,
    reverse: true,
  },
];

/* ── extra features ── */
const EXTRAS = [
  {
    title: 'Otomatik Paylaşım',
    desc: 'Belirlediğiniz kriterlere uyan yorumlar geldiğinde otomatik olarak sosyal medya hesaplarınızda paylaşılsın. Minimum yıldız sayısı, anahtar kelime ve konu filtreleri ile tam kontrol sizde.',
  },
  {
    title: 'Çoklu Platform Desteği',
    desc: 'Instagram, Facebook, X (Twitter), LinkedIn ve daha fazlası. Tüm sosyal medya hesaplarınızı Superscore\'a bağlayın ve tek panelden yönetin.',
  },
  {
    title: 'Performans Analizi',
    desc: 'Sosyal medyada paylaşılan yorumlarınızın etkileşim oranlarını, tıklama sayılarını ve dönüşüm etkisini takip edin. Hangi yorumların en çok ilgi çektiğini öğrenin.',
  },
];

/* ── how it works steps ── */
const STEPS = [
  {
    num: '1',
    title: 'Yorumlarınızı seçin',
    desc: 'En yüksek puanlı veya en etkili yorumlarınızı seçin ya da yapay zeka önerilerine güvenin.',
  },
  {
    num: '2',
    title: 'Tasarımınızı oluşturun',
    desc: 'Markanıza uygun şablonlardan birini seçin veya özel tasarımınızı oluşturun.',
  },
  {
    num: '3',
    title: 'Platformunuzu seçin',
    desc: 'Instagram, Facebook, X, LinkedIn veya tüm platformlarda aynı anda paylaşın.',
  },
  {
    num: '4',
    title: 'Paylaşın veya planlayın',
    desc: 'Hemen paylaşın veya en uygun zaman için paylaşım planlayın. Otomatik paylaşım kuralları da oluşturabilirsiniz.',
  },
];

export default function SosyalMedyaPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#04da8b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-semibold text-[#1b1a1b]/60 mb-2">Sosyal Medya Araçları</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Yorumlarınızı sosyal medyada parlatın
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Müşteri yorumlarınızı güçlü sosyal medya içeriklerine dönüştürün. Göz alıcı görseller oluşturun, paylaşın ve markanızın güvenilirliğini her platformda sergileyin.
              </p>
              <Link
                href="/business/demo"
                className="inline-block px-7 py-3.5 bg-[#1b1a1b] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors"
              >
                Demo rezervasyonu yapın
              </Link>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-[300px] sm:w-[380px] lg:w-[460px]">
                <Image src={HERO_IMG} alt="Superscore Sosyal Medya Araçları" width={960} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STAT BANNER ═══ */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-4xl">
          <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">Biliyor musun?</p>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#1b1a1b] leading-tight mb-2">
            Sosyal medyada müşteri yorumu paylaşan markaların etkileşim oranları ortalama %47 daha yüksek. Güvenilir yorumlar, takipçilerinizi müşteriye dönüştürür.
          </h2>
          <p className="text-sm text-[#1b1a1b]/50">* Superscore kullanıcı verileri ve sektör araştırmalarına dayanmaktadır.</p>
        </div>
      </section>

      {/* ═══ ALTERNATING SECTIONS ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 max-w-6xl space-y-20 lg:space-y-32">
          {SECTIONS.map((s, i) => (
            <div key={i} className={`flex flex-col ${s.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}>
              <div className="flex-1 text-center lg:text-left">
                <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">{s.tag}</p>
                <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                  {s.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                  {s.desc}
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-[280px] sm:w-[360px] lg:w-[440px]">
                  <Image src={s.img} alt={s.title} width={880} height={700} className="w-full h-auto" unoptimized />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ EK ÖZELLİKLER ═══ */}
      <section className="bg-[#1b1a1b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-10 sm:mb-14">
            Ek Özellikler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXTRAS.map(e => (
              <div key={e.title} className="text-center">
                <h3 className="text-base font-bold text-white mb-3">{e.title}</h3>
                <p className="text-[13px] text-white/60 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NASIL ÇALIŞIR ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Nasıl çalışır?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#04da8b]/10">
                  <span className="text-2xl font-extrabold text-[#04da8b]">{s.num}</span>
                </div>
                <h3 className="text-base font-bold text-[#1b1a1b] mb-2">
                  {s.num}. {s.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#04da8b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] mb-6 leading-tight">
            Yorumlarınızı sosyal medyada güce dönüştürün.
          </h2>
          <Link href="/business/demo" className="inline-block px-8 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors">
            Demo rezervasyonu yapın
          </Link>
        </div>
      </section>
    </div>
  );
}

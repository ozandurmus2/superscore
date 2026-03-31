import Link from 'next/link';
import Image from 'next/image';

/* ── images ── */
const HERO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F78aHflaS9Vr5P9uW1PaWQF%2Fdf4c3be3d05966cc38fc61ee57c41501%2FENG_-_Customise_Profile_Orange.png&w=1920&q=75';
const IMG_BRAND = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F2DNnlEnjod4X2fg8B9UTiA%2F0a41d8d8e04c0b71a5426f1774d36d15%2FBrand-aligned_design.png&w=1080&q=75';
const IMG_COMPETE = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F6cjQmUtKfM7rLAWs9FF2tR%2Fedd5df7c880c343fba06077a53b1f3dc%2FCompetitve_edge.png&w=1080&q=75';
const IMG_SEO = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F3moReSgIMvme9ox6fWxeVf%2Fe5e4bfcfe4898e90680175d1f242216d%2FENG_-_Review_SEO_1_-_Orange.png&w=1920&q=75';
const IMG_PROMO = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F7rDPOBciNMH5mgHXvCIcPJ%2F0af093b8e2115365c87de3f8bc2b1709%2FENG_-__Create_Promotion_Stone_copy.png&w=1920&q=75';

/* ── alternating sections ── */
const SECTIONS = [
  {
    tag: 'Markayla uyumlu tasarım',
    title: 'İşletmenizi etkili bir şekilde tanıtın.',
    desc: 'Profilinizi özelleştirerek markanızı gerçekten temsil eden güçlü bir ilk izlenim bırakın. Logo, kapak görseli, marka renkleri ve açıklama ile profilinizi tamamen kendinize ait hale getirin.',
    img: IMG_BRAND,
    reverse: false,
  },
  {
    tag: 'Rekabet avantajı',
    title: 'Markanızın her zaman ön planda olduğundan emin olun.',
    desc: 'Profil sayfanızda rakiplerinizden bahsetmeyi gizlemeyi seçerek, ziyaretçilerinizin yalnızca sizin sunduğunuz ürün ve hizmetlere odaklanmasını sağlayabilirsiniz.',
    img: IMG_COMPETE,
    reverse: true,
  },
  {
    tag: 'Geliştirilmiş görünürlük',
    title: 'Markanızın daha fazla kişi tarafından görülmesini sağlayın.',
    desc: 'SEO\'nuzu güçlendirin ve markanızın çevrimiçi görünürlüğünü artırmak için, dünya genelinde web sitelerinin en üst %1\'inde yer alan Superscore\'un güçlü alan adı otoritesinden yararlanın.',
    img: IMG_SEO,
    reverse: false,
  },
];

/* ── related features ── */
const RELATED = [
  {
    title: 'SEO & Yapay Zeka Keşfi',
    desc: 'Arama sonuçlarında en üst sıralara çıkın. Hem ücretli hem de organik aramalarda markanızın görünürlüğünü artırın ve Superscore yorumlarıyla sitenize daha fazla trafik çekin.',
    link: '/business/ozellikler/seo-ai-kesfi',
  },
  {
    title: 'Sosyal Medya Araçları',
    desc: 'Güveni her sosyal ağda paylaşın. Superscore yorumlarınızı sosyal medyada otomatik olarak paylaşın ve en iyi yorumlarınızı dikkat çekici görsellere dönüştürün.',
    link: '/business/ozellikler/sosyal-medya',
  },
  {
    title: 'Pazarlama Materyalleri',
    desc: 'Superscore yorumlarının gücü, web sitenizin sınırlarının çok ötesine uzanır. Görüntülü reklamlar, yeniden hedefleme reklamları, broşürler ve basılı medya ile güvenilirlik katın.',
    link: '/business/ozellikler/pazarlama-materyalleri',
  },
];

export default function ProfilSayfasiPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#fe7a1a]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-semibold text-[#1b1a1b]/60 mb-2">Profil sayfası özelleştirmesi</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Potansiyel müşterilere en iyi ilk izlenimi verin.
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                İşletmenizi potansiyel müşterilerinize öne çıkaran kişiselleştirilmiş bir profille marka bilinirliğinizi artırın ve daha etkili dönüşümler elde edin.
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
                <Image src={HERO_IMG} alt="Superscore Profil Sayfası" width={960} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STAT BANNER ═══ */}
      <section className="bg-[#ffede3] border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-4xl">
          <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">Biliyor musun?</p>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#1b1a1b] leading-tight mb-2">
            Her ay milyonlarca kişi Superscore&apos;u ziyaret ediyor; bu da profilinizi markanızı potansiyel müşterilere sergilemek için mükemmel bir yer haline getiriyor.
          </h2>
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

      {/* ═══ TANITIM ALANI (kahverengi) ═══ */}
      <section className="bg-[#412612]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 max-w-6xl">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-semibold text-white/50 mb-2">Tanıtım alanı</p>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-white leading-tight mb-4">
                Önemli anlarda ilgiyi çekin
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-md mx-auto lg:mx-0">
                Profilinizi kullanarak güncel promosyonları ve teklifleri sergileyin ve müşterilerin satın alma düşüncesiyle yola çıktıkları anda dikkatlerini çeken dinamik bir pazarlama aracına dönüştürün.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-[280px] sm:w-[360px] lg:w-[440px]">
                <Image src={IMG_PROMO} alt="Tanıtım alanı" width={960} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BU DA İLGİNİZİ ÇEKEBİLİR ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Bu da ilginizi çekebilir.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RELATED.map(r => (
              <div key={r.title} className="text-center">
                <div className="w-full h-48 bg-[#f7f5f0] rounded-xl mb-5 flex items-center justify-center">
                  <span className="text-sm text-gray-400">Görsel</span>
                </div>
                <h3 className="text-lg font-bold text-[#1b1a1b] mb-2">{r.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-3">{r.desc}</p>
                <Link href={r.link} className="text-sm font-semibold text-[#1b1a1b] underline underline-offset-4 hover:text-[#fe7a1a] transition-colors">
                  Devamını oku
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#fe7a1a]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] mb-6 leading-tight">
            Yorumların tüm potansiyelini ortaya çıkarmaya hazır mısınız?
          </h2>
          <Link href="/business/demo" className="inline-block px-8 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors mb-3">
            Demo rezervasyonu yapın
          </Link>
          <br />
          <Link href="/business/fiyatlandirma" className="text-sm font-semibold text-[#1b1a1b] underline underline-offset-4 hover:text-white transition-colors">
            Fiyat planlarımızı inceleyin.
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { Search, Globe, ShoppingCart, Share2, Star } from 'lucide-react';

/* ── images ── */
const HERO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F4eLcR525UqgULrD9Kud74l%2F6b50ffb61670508c866a62d75d933447%2FReview_SEO-_Jumbotron.png&w=1920&q=75';
const IMG_DISCOVER = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F6S8RCKONusgYlnKSysZBQP%2F9fef97575f80d41e61ca7e5a14683f72%2F1-Turn_your_profile_page_into_a_driver_of_free_traffic_-_Review_SEO_page.png&w=1080&q=75';
const IMG_GOOGLE = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F6UCAmHVM9jqlYxHQXatofn%2F52b02078d93e138bae16bddb30e55438%2F2-Improve_Google_Ads_and_Google_Shopping_performance_-_Review_SEO_page.png&w=1080&q=75';
const IMG_ORGANIC = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F3g77Xwy2eot2G0cmDBQHAI%2F8c78e4f8da4d54be846aa00f41ceaa5d%2F3-Boost_organic_traffic_with_star_ratings_-_Review_SEO_page_EN.png&w=1080&q=75';

const ICON_1 = 'https://images.ctfassets.net/wonkqgvit51x/4FTIUjImw6N2aOnmCGaCQ0/cecb9c97aa20e34c2dce63d4db222d35/Green_icon_1.svg';
const ICON_2 = 'https://images.ctfassets.net/wonkqgvit51x/4l1AawpP54G1IdOHKS2W9e/f0dc9fc55e92fa335bf2a9a03ddc89ba/Green_icon_2.svg';
const ICON_3 = 'https://images.ctfassets.net/wonkqgvit51x/3G45pkSyrC0RumlUIYoiMI/723ff387e841ce0b4006bf841ee80570/Green_icon_3.svg';

/* ── alternating sections ── */
const SECTIONS = [
  {
    tag: 'Keşfedilin',
    title: 'Önemli olan yerlerde var olun.',
    desc: 'Başarılı bir yapay zeka arama stratejisinin anahtarı güvendir. Superscore\'un yüksek otoritesini avantajınıza kullanın ve sizinle müşterileriniz arasında duran yapay zeka sistemlerinin dikkatini çekecek güvenilir bir itibar oluşturun.',
    extra: 'Tüketicilerin güvenebileceği küresel bir platform oluşturmak için on yıllarımızı harcadık. Faydalanmak için yapmanız gereken tek şey düzenli olarak yorum toplamak, profilinizi optimize etmek ve geri bildirimlere göre hareket etmektir.',
    img: IMG_DISCOVER,
    reverse: false,
  },
  {
    tag: 'Organik arama sıralaması',
    title: 'Profil sayfanızı ücretsiz trafik kaynağına dönüştürün.',
    desc: 'Superscore\'da kazandığınız yorumlar, oluşturduğumuz web varlığımızla desteklenmekte olup, resmi profilinizin arama sonuçlarının ilk sayfasında sürekli olarak yer almasına ve değerli potansiyel müşteriler yakalamanıza yardımcı olur.',
    extra: 'Potansiyel müşteriler Superscore sayfanıza ulaştıklarında, büyük olasılıkla doğrudan web sitenize tıklayacaklardır; bu da size %500\'e kadar daha fazla ücretsiz yönlendirme trafiği kazandırabilir.',
    img: IMG_ORGANIC,
    reverse: true,
  },
  {
    tag: 'Erişimi artırın',
    title: 'Google\'daki varlığınızı en üst düzeye çıkarın.',
    desc: 'Resmi bir Google İnceleme Ortağı olarak Superscore, müşteri geri bildirimlerinizin Google ekosisteminde anında somut sonuçlar doğurmasını sağlar.',
    extra: 'Yıldız puanınızın Google reklamlarında edinme maliyetini düşürdüğünü, doğrulanmış yorumların Google Mağaza Puanınızı artırdığını ve ürün yorumlarının Google Alışveriş listelemelerinizin fark edilmesini sağladığını izleyin.',
    img: IMG_GOOGLE,
    reverse: false,
  },
];

/* ── 3 steps ── */
const STEPS = [
  {
    icon: ICON_1,
    title: 'Superscore profilinizi optimize edin.',
    desc: 'Şirketiniz hakkında güncel bilgiler ekleyerek ve yorumlar toplayarak, müşterilerin sizi tanımasına yardımcı olmakla kalmaz, aynı zamanda hem yapay zeka hem de geleneksel arama sonuçlarında daha görünür hale gelebilirsiniz.',
  },
  {
    icon: ICON_2,
    title: 'Google Mağaza Puanlamalarına hak kazanın',
    desc: 'Nitelikli olmak için, işletmenizin Google\'ın mağaza derecelendirme puanını güvenle hesaplayabilmesi için son beş yılda yeterli sayıda benzersiz yoruma sahip olması gerekir; bu nedenle mümkün olduğunca çok yorum toplamaya özen gösterin.',
  },
  {
    icon: ICON_3,
    title: 'Sitenize İnceleme widget\'ları ekleyin.',
    desc: 'Web sitenizde Superscore ürün yorumlarını widget olarak sergilemek, arama sonuçlarında zengin snippet yıldızları oluşturabilir. Ayrıca, anahtar kelime aramalarınızı güçlendirmek için yorum içeriğini sitenize ekleyebilirsiniz.',
  },
];

/* ── star power features ── */
const STAR_FEATURES = [
  {
    title: 'Google Alışveriş Entegrasyonu',
    desc: 'Google Alışveriş kampanyalarınız varsa, Superscore ürün listelerinize yıldızlar ekleyerek size daha fazla güvenilirlik, trafik ve satış sağlar. Alışveriş feed\'inizde herhangi bir değişiklik yapmanızı gerektirmeyen entegrasyon aracımızla alışveriş kampanya sonuçlarınızı hızla iyileştirin.',
  },
  {
    title: 'Arama Motoru Yorumları',
    desc: 'Arama reklamlarınıza yıldızlar ekleyerek rakiplerinizden sıyrılın. Arama motoru yorumları, reklamlarınızı daha çekici hale getirebilir ve tıklama oranını (CTR) ve satışları artırabilir.',
  },
  {
    title: 'Sosyal Paylaşım',
    desc: 'Superscore\'un Görsel Oluşturucu aracını kullanarak en sevdiğiniz yorumları tüm sosyal ağlarda paylaşın. En iyi yorumlarınızı hızlı ve kolay bir şekilde sosyal medyada dikkat çeken görsellere dönüştürün.',
  },
];

/* ── related ── */
const RELATED = [
  {
    title: 'Hizmet Değerlendirmeleri',
    desc: 'Her iki saniyede bir yeni bir yorum yazılıyor. Superscore\'da yorum toplamak, mevcut ve gelecekteki müşterilerinize işletmenizle ilgili diğer alışveriş yapanların deneyimlerini öğrenmeleri için bir yer sağlar.',
    href: '/business/ozellikler/hizmet-degerlendirmeleri',
    color: '#f5d553',
  },
  {
    title: '"Sepete Ekle"yi kolay bir seçim haline getirin.',
    desc: 'Alışveriş yapmayı düşünenlerin güvenini kazanmak için siteniz genelinde ürün yorumlarını paylaşın. Yorumları markanızın görünümüne ve hissiyatına uygun hale getirin ve müşteri fotoğrafları ile ürün özelliklerini ekleyin.',
    href: '/business/ozellikler/urun-yorumlari',
    color: '#52b37f',
  },
  {
    title: 'Yerel müşterilerle bağlantı kurun',
    desc: 'Konumlarınız hakkında daha fazla bilgi edinin ve konuma özel yorumlar toplayarak tüm mağazalarınıza yeni müşteri çekin. QR kod ile anında yorum toplayın.',
    href: '/business/ozellikler/qr-degerlendirme',
    color: '#3c57bc',
  },
];

export default function SeoAiKesfiPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#04da8b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Arama sonuçlarında öne çıkın
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Güvenilir üçüncü taraf verileriyle yapay zeka görünürlüğünü artırın ve özgün yorum içerikleriyle SEO ve organik trafiği iyileştirin.
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
                <Image src={HERO_IMG} alt="SEO ve Yapay Zeka Keşfi" width={960} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STAT BANNER ═══ */}
      <section className="bg-[#d9fbed]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-4xl">
          <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">Biliyor musun?</p>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#1b1a1b] leading-tight mb-2">
            Yapay zeka destekli arama yapan ziyaretçilerin dönüşüm gerçekleştirme olasılığı, geleneksel arama yapanlara göre 4,4 kat daha yüksek.
          </h2>
          <p className="text-sm text-[#1b1a1b]/50 underline">* SEMRush&apos;ın 2025 tarihli bir araştırmasına göre</p>
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
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 max-w-md mx-auto lg:mx-0">
                  {s.desc}
                </p>
                {s.extra && (
                  <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto lg:mx-0">
                    {s.extra}
                  </p>
                )}
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

      {/* ═══ 3 STEPS ═══ */}
      <section className="bg-[#d9fbed]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Üç adımda geleneksel ve yapay zeka arama görünürlüğünü iyileştirin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Image src={s.icon} alt="" width={56} height={56} className="w-14 h-14" unoptimized />
                </div>
                <h3 className="text-base font-bold text-[#1b1a1b] mb-3">{s.title}</h3>
                <p className="text-[13px] text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ YILDIZ GÜCÜ ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Yıldız gücünüzü keşfedin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STAR_FEATURES.map(f => (
              <div key={f.title} className="text-center">
                <h3 className="text-base font-bold text-[#1b1a1b] mb-3">{f.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ YAPAY ZEKA AVANTAJI ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <div className="bg-gradient-to-br from-[#1b1a1b] to-[#2d2d2d] rounded-3xl p-8 sm:p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-[#52b37f]/20 rounded-full px-4 py-1.5 mb-6">
                <Search className="w-4 h-4 text-[#52b37f]" />
                <span className="text-xs font-bold text-[#52b37f]">Yapay Zeka Optimizasyonu</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Yanıt Motoru Optimizasyonu (AEO) ile geleceğe hazır olun
              </h2>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-6">
                Geleneksel SEO, işletmenizin arama sonuçlarında görünmesine yardımcı olurken, AEO yapay zeka tarafından oluşturulan yanıtlarda görünmesine yardımcı olur. ChatGPT, Gemini ve diğer yapay zeka araçları güvenilir platformlardaki verileri kullanır — Superscore profiliniz bu verilerin merkezindedir.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-extrabold text-[#52b37f]">4.4x</p>
                  <p className="text-xs text-white/50 mt-1">Daha yüksek dönüşüm oranı</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-extrabold text-[#f5d553]">%500</p>
                  <p className="text-xs text-white/50 mt-1">Ücretsiz yönlendirme trafiği</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-extrabold text-[#3c57bc]">%35</p>
                  <p className="text-xs text-white/50 mt-1">Daha fazla tıklama oranı</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BÜYÜME ÇÖZÜMLER ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10">
            Büyümenin her aşaması için çözümler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RELATED.map(r => (
              <div key={r.title} className="text-center">
                <div className="rounded-2xl overflow-hidden mb-4 aspect-[16/10] flex items-center justify-center" style={{ backgroundColor: r.color }}>
                  <Star className="w-12 h-12 text-white/80" fill="currentColor" />
                </div>
                <h3 className="text-sm font-bold text-[#1b1a1b] mb-2">{r.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed mb-3">{r.desc}</p>
                <Link href={r.href} className="text-[13px] font-semibold text-[#3c57bc] hover:underline">
                  Devamını oku
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#52b37f]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-3xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-6 leading-tight">
            Arama sonuçlarında öne çıkmak ve yapay zeka aramalarında görünür olmak ister misiniz?
          </h2>
          <Link href="/business/demo" className="inline-block px-8 py-3.5 bg-[#1b1a1b] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors">
            Demo rezervasyonu yapın
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingCart, Star, Camera, Search, BarChart3,
  Zap, Palette, ShoppingBag, Link2, Settings, ArrowRight,
} from 'lucide-react';

/* ── image urls ── */
const HERO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F2IJyniLdzqsR4pM2pNVJTt%2F0e5fc2e930ae2ded3d0242642c8da4af%2FProduct_reviews-_Jumbotron.png&w=1920&q=75';
const IMG_BUYERS = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F67B5XbquhqbBcuZW7JzcUn%2Fa971aa8ca5226869f5e5afdc4e587b15%2F1-Turn_browsers_into_buyers_-_Product_reviews_page.png&w=1080&q=75';
const IMG_PHOTOS = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F20WbcBhyQyx42OU0G7FF9k%2Fa6dc78565843e7972265f6b5421e897f%2F4-Show_off_customer_photos_-_Product_reviews_page.png&w=1080&q=75';
const IMG_SEARCH = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F4cSg7oSv4QRdjky8MGkE1P%2Ffe074af0129fad36e4e08f556d99db61%2F2-Stand_out_in_search_results_-_Product_reviews_page.png&w=1080&q=75';
const IMG_DISCOVER = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5yCb5VVV45NyV9Wb2JM0xL%2F9aca691450c45446737f20730555f50a%2F3-Discover_which_products_work_and_why_-_Product_reviews_page.png&w=1080&q=75';

/* ── alternating sections ── */
const SECTIONS = [
  {
    tag: 'Satışları artırın',
    title: 'Ziyaretçileri alıcıya dönüştürün',
    desc: 'Ürün yorumlarını sitenizde, alan adlarınızda ve ağımızda paylaşarak, alışveriş yapmayı düşünenlerin güvenini artırın. Trendyol, Hepsiburada ve N11 gibi platformlardaki yorumlar otomatik olarak Superscore profilinize yansır.',
    extra: 'Biliyor muydunuz? Ürün yorumları, üretici açıklamalarından 12 kat daha güvenilir.',
    link: { text: 'Devamını oku →', href: '/business/donusum' },
    img: IMG_BUYERS,
    imgAlt: 'Ziyaretçileri alıcıya dönüştürün',
    reverse: false,
  },
  {
    tag: 'Kullanıcı tarafından oluşturulan içerik',
    title: 'Müşteri fotoğraflarını sergileyin',
    desc: 'Marka mesajlarının her yerde olduğu bir dünyada, kullanıcı tarafından oluşturulan içerik, sosyal kanıtı bir üst seviyeye taşıyor. Müşteriler ürün yorumlarına gerçek fotoğraflar eklediğinde, diğer alışveriş yapanların ürünü satın alma olasılığı daha yüksek oluyor.',
    extra: 'Tüketiciler, diğer tüketicilerden gelen içeriklerin markalardan gelen içeriklere göre 2 kat daha güvenilir olduğunu düşünüyor.',
    link: null,
    img: IMG_PHOTOS,
    imgAlt: 'Müşteri fotoğrafları',
    reverse: true,
  },
  {
    tag: 'SEO\'yu iyileştirin',
    title: 'Arama sonuçlarında öne çıkın',
    desc: 'Ürün yorumları, arama sonuçlarında tüm ürün sayfalarınızda yıldızları göstererek insanların sitenize dikkatini çeker. Ürün yorumları ayrıca daha fazla içerik sağlar ve aynı ürünlere sahip işletmeler arasında paylaşılabilir, böylece sitenizin SEO\'sunu iyileştirebilecek daha fazla anahtar kelime elde edersiniz.',
    extra: 'Arama sonuçlarında sitenizin yanında yer alan zengin snippet yıldızları, sitenize %35\'e kadar daha fazla tıklama getirebilir.',
    link: { text: 'Devamını oku →', href: '/business/ozellikler/seo-ai-kesfi' },
    img: IMG_SEARCH,
    imgAlt: 'Arama sonuçları',
    reverse: false,
  },
  {
    tag: 'Öğrenin ve gelişin',
    title: 'Hangi ürünlerin işe yaradığını ve nedenini keşfedin.',
    desc: 'Sürekli gelişen ürün yelpazenizle müşterilerinizin geri gelmesini sağlayın. Özelleştirilebilir ürün özellikleri, ürünlerinizi müşterilerinizin bakış açısından anlamanıza yardımcı olur.',
    extra: null,
    link: null,
    img: IMG_DISCOVER,
    imgAlt: 'Ürün analizi',
    reverse: true,
  },
];

/* ── extra features ── */
const EXTRA_FEATURES = [
  {
    icon: Zap,
    title: 'Kolay kurulum',
    desc: 'Sadece birkaç tıklamayla ürün yorumları toplamaya başlayın. E-ticaret entegrasyonları ve ürün yorumu paylaşımı, siteniz için ürün yorumları almaya başlamayı kolaylaştırır.',
    link: { text: 'Tüm entegrasyonlarımızı inceleyin.', href: '/business/ozellikler/entegrasyonlar' },
  },
  {
    icon: Palette,
    title: 'Markanıza özel tasarım',
    desc: 'Güçlü API\'ler, ürün yorumlarınızın web sitenizdeki kendi marka kimliğinizle kusursuz bir şekilde uyum sağlaması için özel entegrasyonlar oluşturmanıza olanak tanır.',
    link: null,
  },
  {
    icon: ShoppingBag,
    title: 'E-Ticaret entegrasyonu',
    desc: 'Trendyol, Hepsiburada, N11, Amazon ve Shopify mağazalarınızdaki ürün yorumları otomatik olarak Superscore profilinize yansır. İkasta, WooCommerce ve diğer altyapılarla da entegre olun.',
    link: null,
  },
];

/* ── integrations ── */
const INTEGRATIONS = [
  'Trendyol', 'Hepsiburada', 'N11',
  'Shopify', 'WooCommerce', 'İkasta',
];

export default function UrunYorumlariPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#f5d553]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-semibold text-[#1b1a1b]/60 mb-2">Ürün İncelemeleri</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                &quot;Sepete Ekle&quot;yi kolay bir seçim haline getirin.
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Superscore ürün yorumları, ürün sayfalarınızın SEO&apos;sunu iyileştirirken, müşterilerinize &quot;Şimdi Satın Al&quot; düğmesine tıklamaları için gereken güveni de sağlar. Trendyol, Hepsiburada ve N11 yorumları otomatik olarak yansır.
              </p>
              <Link
                href="/business/demo"
                className="inline-block px-7 py-3.5 bg-[#1b1a1b] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors"
              >
                Demo alın
              </Link>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-[280px] sm:w-[340px] lg:w-[420px]">
                <Image src={HERO_IMG} alt="Ürün yorumları" width={960} height={960} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STAT BANNER ═══ */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-4xl">
          <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">Biliyor musun?</p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1b1a1b] leading-tight mb-2">
            Tüketicilerin %79&apos;u ürün yorumlarına kişisel tavsiyeler kadar güveniyor.
          </h2>
          <Link href="https://www.shopify.com" className="text-sm font-semibold text-[#1b1a1b]/50 hover:underline inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">
            Shopify&apos;a göre <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ═══ ALTERNATING SECTIONS ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 max-w-6xl space-y-20 lg:space-y-32">
          {SECTIONS.map((s, i) => {
            const textSide = (
              <div key={`t-${i}`} className="flex-1 text-center lg:text-left">
                <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">{s.tag}</p>
                <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                  {s.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 max-w-md mx-auto lg:mx-0">
                  {s.desc}
                </p>
                {s.extra && (
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 max-w-md mx-auto lg:mx-0">
                    {s.extra}
                  </p>
                )}
                {s.link && (
                  <Link href={s.link.href} className="text-sm font-semibold text-[#3c57bc] hover:underline inline-flex items-center gap-1">
                    {s.link.text}
                  </Link>
                )}
              </div>
            );
            const imgSide = (
              <div key={`i-${i}`} className="flex-1 flex justify-center">
                <div className="relative w-[280px] sm:w-[360px] lg:w-[440px]">
                  <Image src={s.img} alt={s.imgAlt} width={880} height={700} className="w-full h-auto" unoptimized />
                </div>
              </div>
            );
            return (
              <div key={i} className={`flex flex-col ${s.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}>
                {s.reverse ? <>{imgSide}{textSide}</> : <>{textSide}{imgSide}</>}
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ E-TİCARET ENTEGRASYON BANNER ═══ */}
      <section className="bg-[#f5d553]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-5xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Link2 className="w-5 h-5 text-[#1b1a1b]" />
                <span className="text-sm font-bold text-[#1b1a1b]">Otomatik Senkronizasyon</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1b1a1b] mb-3">
                E-ticaret platformlarındaki ürün yorumları Superscore&apos;a otomatik yansır
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Trendyol, Hepsiburada, N11 ve diğer e-ticaret platformlarındaki mağazanıza ait ürün yorumları otomatik olarak Superscore profilinize entegre edilir. İkasta, Shopify ve WooCommerce altyapılı mağazalarınız da dahil — tek bir panelden tüm ürün yorumlarınızı yönetin.
              </p>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-3">
                {['Trendyol', 'Hepsiburada', 'N11', 'İkasta', 'Shopify', 'WooCommerce'].map(name => (
                  <div key={name} className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-xs sm:text-sm font-bold text-[#1b1a1b]">{name}</span>
                    <div className="mt-1 text-[10px] text-green-600 font-semibold">
                      {['Trendyol', 'Hepsiburada', 'N11'].includes(name) ? 'Aktif' : 'Yakında'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ EXTRA FEATURES ═══ */}
      <section className="bg-[#1b1a1b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center mb-10 sm:mb-14">
            Ek özellikler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXTRA_FEATURES.map(f => (
              <div key={f.title} className="bg-white/10 backdrop-blur rounded-2xl p-6 sm:p-7 text-center">
                <h3 className="text-base font-bold text-white mb-3">{f.title}</h3>
                <p className="text-[13px] text-white/60 leading-relaxed mb-4">{f.desc}</p>
                {f.link && (
                  <Link href={f.link.href} className="text-[13px] font-semibold text-[#52b37f] hover:underline">
                    {f.link.text}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INTEGRATIONS ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1b1a1b] mb-10">
            Mevcut araçlarınızla kolayca entegre oluyoruz.
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
            {INTEGRATIONS.map(name => (
              <div key={name} className="flex items-center justify-center h-16 sm:h-20">
                <span className="text-lg sm:text-xl font-bold text-[#1b1a1b]/70">{name}</span>
              </div>
            ))}
          </div>
          <Link
            href="/business/ozellikler/entegrasyonlar"
            className="inline-block px-6 py-3 border-2 border-[#1b1a1b] text-sm font-bold text-[#1b1a1b] rounded-full hover:bg-[#1b1a1b] hover:text-white transition-colors"
          >
            Tüm entegrasyonları görüntüle
          </Link>
        </div>
      </section>

      {/* ═══ SUPERSCORE AVANTAJI ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-12">
            Superscore avantajı
          </h2>
          <div className="space-y-16 lg:space-y-20">
            {/* Advantage 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
              <div className="flex-1">
                <div className="bg-[#52b37f]/10 rounded-2xl p-6 flex items-center justify-center aspect-[4/3]">
                  <div className="text-center">
                    <Star className="w-12 h-12 text-[#52b37f] mx-auto mb-3" fill="#52b37f" />
                    <p className="text-4xl font-extrabold text-[#1b1a1b]">4.8</p>
                    <p className="text-sm text-gray-500 mt-1">Ortalama Superscore puanı</p>
                    <div className="flex gap-1 justify-center mt-2">
                      {[1,2,3,4,5].map(s => (
                        <div key={s} className={`w-5 h-5 rounded ${s <= 4 ? 'bg-[#52b37f]' : 'bg-[#8acd41]'}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1b1a1b] mb-3">Eşsiz erişim ve ölçek</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Türkiye&apos;nin en kapsamlı müşteri geri bildirim platformuyuz. E-ticaret platformları, Google yorumları ve doğrudan müşteri değerlendirmelerini tek bir çatı altında topluyoruz. Her gün binlerce yeni yorum ekleniyor.
                </p>
              </div>
            </div>

            {/* Advantage 2 */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-14">
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1b1a1b] mb-3">Yapay Zeka destekli analiz</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Ürün yorumlarınızı yapay zeka ile analiz ediyoruz. Duygu analizi, tema çıkarımı ve trend tespiti ile hangi ürünlerinizin neden sevildiğini veya eleştirildiğini anında anlayın. Rakip ürünlerle karşılaştırmalı analiz yapın.
                </p>
              </div>
              <div className="flex-1">
                <div className="bg-[#3c57bc]/10 rounded-2xl p-6 flex items-center justify-center aspect-[4/3]">
                  <div className="text-center space-y-3">
                    <div className="bg-white rounded-xl p-4 shadow-sm inline-block">
                      <p className="text-xs text-gray-500">Duygu Analizi</p>
                      <p className="text-2xl font-extrabold text-[#52b37f]">+85%</p>
                      <p className="text-[10px] text-gray-400">Pozitif</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm inline-block ml-4">
                      <p className="text-xs text-gray-500">Temalar</p>
                      <p className="text-2xl font-extrabold text-[#3c57bc]">12</p>
                      <p className="text-[10px] text-gray-400">Tespit edildi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advantage 3 */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
              <div className="flex-1">
                <div className="bg-[#f5d553]/20 rounded-2xl p-6 flex items-center justify-center aspect-[4/3]">
                  <div className="text-center space-y-2">
                    {['Trendyol', 'Hepsiburada', 'N11'].map(p => (
                      <div key={p} className="bg-white rounded-lg px-4 py-2 shadow-sm inline-flex items-center gap-2 mx-1">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm font-bold text-[#1b1a1b]">{p}</span>
                        <span className="text-[10px] text-green-600">Senkronize</span>
                      </div>
                    ))}
                    <div className="mt-2">
                      <ArrowRight className="w-5 h-5 text-[#1b1a1b] mx-auto" />
                      <div className="bg-[#1b1a1b] text-white rounded-lg px-4 py-2 inline-block mt-1">
                        <span className="text-sm font-bold">Superscore</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1b1a1b] mb-3">Otomatik senkronizasyon</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Trendyol, Hepsiburada, N11 ve İkasta mağazalarınızdaki ürün yorumları otomatik olarak Superscore profilinize yansır. Manuel veri girişine gerek yok — entegrasyonunuzu kurun ve yorumlar anlık senkronize olsun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#f5d553]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] mb-6 leading-tight">
            Ürün yorumlarını toplamaya bugün başlayın.
          </h2>
          <Link href="/business/demo" className="inline-block px-8 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors">
            Demo rezervasyonu yapın
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import { Code, Settings, Star, Smartphone } from 'lucide-react';

/* ── images ── */
const HERO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F7MZ6K0GS5by9dOANFXSqs8%2Fc72dfe7cf4be7436d4f6694ef93f9074%2FENG_-_Trustpilot_widgets_4_-_Green.png&w=1920&q=75';
const IMG_FLEX = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F1ARWBLZKq2GYV9LqpFkVp2%2F153a6fd2111066582b725c3d5c0cb803%2FFlex_widget_-_Dark_Review_Snippet_-_Beige_-_Web_page_564x564.png&w=1200&q=75';
const IMG_HIGHLIGHT = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F72g9KALR9r6YoXsmgqjc8t%2Ffb38b1ebd06eb37a390d3ff2dc93012a%2FENG_-_Review_Highlights_-_text_background_-_Web_page_564x564.png&w=1200&q=75';
const IMG_TRUSTBOX = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2Fw1cb5nRwspO14hAPMs4a6%2F0851c5746cfc0939fe5b9d20f845d44b%2FENG_-_Trustpilot_widgets_1_-_Stone.png&w=1920&q=75';
const IMG_EMAIL = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F7GSCoMjMsMrujibcZTC5X1%2F44af1da345bf8cd7eac5091836dec714%2FENG_-_Trustpilot_widgets_2_-_Stone.png&w=1920&q=75';
const IMG_API = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F2dvVY47PAa6i00azMMAyxt%2F8e361fb204d34e9cefc000a1528074af%2FENG_-_Trustpilot_widgets_3_-_Green.png&w=1920&q=75';

/* ── alternating sections ── */
const SECTIONS = [
  {
    tag: 'Esnek widget',
    title: 'Web sitenizin her köşesine güven getirin.',
    desc: 'Widget\'ları boyut, renk ve güven sinyallerine göre kolayca özelleştirerek web sitenizin herhangi bir sayfasına uyacak ve markanızla uyumlu hale getirebilirsiniz. Güven puanınızı, yorum hacminizi veya kelime puanınızı vurgulamayı seçebilir, hatta son veya favori yorumları görüntüleyebilirsiniz.',
    img: IMG_FLEX,
    reverse: false,
  },
  {
    tag: 'İncelemenin öne çıkan noktaları',
    title: 'İlgili müşteri teklifleriyle dönüşümleri hızlandırın.',
    desc: 'Web sitenizin müşteri yolculuğunun önemli noktalarında, işletmenizin güçlü yönlerini vurgulayan yapay zeka destekli konulara göre gruplandırılmış alıntıları otomatik olarak görüntüleyin; örneğin, ödeme sırasında hızlı teslimat hakkındaki yorumları sergileyin.',
    img: IMG_HIGHLIGHT,
    reverse: true,
  },
  {
    tag: 'Güven Kutuları',
    title: 'Sitenizdeki dönüşüm oranlarını ve satışları artırın.',
    desc: 'Sitenize Superscore widget\'ları ekleyerek dönüşüm oranlarınızı artırın, sepet büyüklüğünü artırın ve sepet terkini azaltın. Müşterilerinize güven verin ve satın alma kararlarını kolaylaştırın.',
    img: IMG_TRUSTBOX,
    reverse: false,
  },
  {
    tag: 'E-posta Pazarlaması',
    title: 'Her e-postada gerçek yüzünüzü gösterin.',
    desc: 'E-posta imzanız ve e-posta pazarlama kampanyalarınız için dinamik Superscore widget\'ları, büyük fark yaratabilecek ekstra bir güvenilirlik katıyor. Müşterilerinize her iletişimde güveninizi sergileyin.',
    img: IMG_EMAIL,
    reverse: true,
  },
  {
    tag: 'Ekran API\'si',
    title: 'Özel bir yorum ekranı oluşturun',
    desc: 'Benzersiz bir şey mi yaratmak istiyorsunuz? Superscore\'un API\'si ile sitenizde yorumlarınızın özel bir görünümünü oluşturabilir ve yıldızlarınızın parlamasını sağlayabilirsiniz. Tamamen markanıza uygun tasarım.',
    img: IMG_API,
    reverse: false,
  },
];

/* ── extra features ── */
const EXTRAS = [
  {
    title: 'Hedeflenen Widget',
    desc: 'Müşterilerinize onlar için en alakalı yorumları gösterin. Hedefli widget, sitenizde yalnızca etiketlediğiniz yorumları görüntüler.',
  },
  {
    title: 'Duyarlı tasarım',
    desc: 'Tüm widget\'lar duyarlıdır. Farklı ekran boyutlarına uyum sağlarlar ve sayfanız için farklı yükseklik ve genişlik özelliklerine göre yapılandırılabilirler.',
  },
  {
    title: 'Ürün Özellik Derecelendirmeleri',
    desc: 'Ürün Özellik Derecelendirmeleri, müşterilerinize ürünleriniz hakkında daha ayrıntılı bir bakış açısı sunarak ne satın alacaklarına karar vermelerini kolaylaştırır.',
  },
];

/* ── how it works steps ── */
const STEPS = [
  {
    icon: '/logo/Helmet_icon.svg',
    title: 'Widget\'ınızı seçin.',
    desc: 'Filtreler, sitenize en uygun olanı bulana kadar farklı widget türleri arasında gezinmenize yardımcı olur.',
  },
  {
    icon: '/logo/icon_options.svg',
    title: 'Widget\'ınızı yapılandırın',
    desc: 'Açık veya koyu sürümler arasından seçim yapın, filtreleri inceleyin, SEO seçeneklerini değerlendirin ve siteniz için uygun genişlik ve yüksekliği belirleyin.',
  },
  {
    icon: '/logo/Icon_code.svg',
    title: 'Kodu alın',
    desc: 'Tek bir tıklamayla Superscore, tasarladığınız widget için kodu oluşturur. Kopyalayıp yapıştırmanız yeterli.',
  },
  {
    icon: '/logo/laptop-1802_U4Ak_gI5xk__1_.svg',
    title: 'Widget\'ınızı uygulayın.',
    desc: 'Eğer bir e-ticaret entegrasyonu kullanıyorsanız, widget\'ınızı sitenize sürükleyip bırakabilirsiniz. Aksi takdirde, HTML kodunu kopyalayıp sitenizin BODY bölümüne yapıştırmanız yeterlidir.',
  },
];

export default function WidgetlarPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#04da8b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-semibold text-[#1b1a1b]/60 mb-2">Superscore widget&apos;ları</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Doğru yerde, doğru zamanda yapılan yorumlar
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Müşteri yorumlarını web sitenizde sergileyerek gelire dönüştürün; böylece alışveriş yapanlar sipariş onay sayfasına ulaşmak için ihtiyaç duydukları her şeye sahip olurlar.
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
                <Image src={HERO_IMG} alt="Superscore Widget'ları" width={960} height={700} className="w-full h-auto" unoptimized />
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
            Ziyaretçilerin %73,6&apos;sı, sitelerinde Superscore yorumları gösteren bir web sitesinden alışveriş yapma olasılıklarının daha yüksek olduğunu söylüyor.
          </h2>
          <p className="text-sm text-[#1b1a1b]/50">* 4.027 ziyaretçiyle yapılan dahili ankete dayanmaktadır.</p>
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
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                  <Image src={s.icon} alt="" width={48} height={48} className="w-12 h-12" />
                </div>
                <h3 className="text-base font-bold text-[#1b1a1b] mb-2">
                  {i + 1}. {s.title}
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
            Sitenize bugün güvenilir yorumlar ekleyin.
          </h2>
          <Link href="/business/demo" className="inline-block px-8 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors">
            Demo rezervasyonu yapın
          </Link>
        </div>
      </section>
    </div>
  );
}

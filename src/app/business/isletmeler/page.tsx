import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp, Shield, BarChart3, Search, Brain, Target,
  Users, Plug, Eye, MessageSquareText, GitCompare, LineChart,
} from 'lucide-react';

const HERO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F1p7f3tY59fFWqF2Wobq86j%2F13db2c4b5be8e277129aee19ecb7fb55%2FHero_harness_trust.png&w=3840&q=75';
const AI_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F57Az8I0ZdcizEZfKeJ90rC%2Fd45fc17d650df4d2ae51f9671aa08195%2FOur_business_model.png&w=3840&q=75';
const METRICS_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5DZj569YgWDb4H1xhH4IM0%2F6ce073a1b012e1decf1cee8b1c8cce5a%2FR_Go_beyond_traditional_customer_metrics.png&w=3840&q=75';
const INSIGHTS_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5sBEubK5MiQaqXXfz372r2%2F16bb9816cad5a2d971bf1d30e7e2c546%2FR_Uncover_insights_to_differentiate.png&w=3840&q=75';
const TEAMS_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F6pu7RXIJBheXKarG9lrS73%2F214c714d90e3423a35261ba5eb773455%2FR_Align_teams_with_a_shared_source_of_truth.png&w=3840&q=75';

const ICON_STATS = [
  {
    img: '/logo/imgi_60_rating-2852_w_dkOlV_nNQ.png',
    text: 'Yöneticilerin %90\'ı müşterilerin şirketlerine son derece güvendiğine inanırken, tüketicilerin yalnızca %30\'u gerçekten aynı görüşte.',
  },
  {
    icon: BarChart3,
    text: 'Tüketicilerin %40\'ı, güvenmedikleri bir şirketten alışveriş yapmayı bıraktı.',
  },
  {
    img: '/logo/lighthouse_icon.svg',
    text: 'Tüketicilerin %58\'i artık ürün veya hizmet önerileri için geleneksel arama motorlarının yerini yapay zeka araçlarıyla alıyor.',
  },
  {
    img: '/logo/imgi_61_sales-performance-up-2332_GGTh9s3vGqO.png',
    text: 'Tüketicilerin, Superscore puanı yüksek olan bir markaya güvenme ve o markadan alışveriş yapma olasılığı %72 daha yüksek.',
  },
];

const STAT_CARDS = [
  {
    value: '%57',
    desc: 'Tüketicilerin beş yıldızlı bir Superscore reklamına tıklama olasılığı daha yüksek',
    title: 'Keşfedilebilir olun ve dönüşüm oranlarını artırın.',
    text: 'Gerçek müşteri hikayelerini kalite ve güvenilirlik kanıtı olarak kullanarak, kalabalık bir pazarda markanızı farklılaştırın. Superscore yorumları ve derecelendirmeleri, SEO ve AEO\'yu iyileştirir ve ücretli ve organik kanallarda dönüşüm oranlarını ve etkileşimi artırır.',
  },
  {
    value: '%23',
    desc: 'Web sitelerinde Superscore bulunan şirketlerin dönüşüm artışı',
    title: 'Müşteri deneyimini (CX) farklılaştırıcı bir unsur haline getirin.',
    text: 'Mükemmel müşteri deneyiminizin sadece bir iddia olmadığını, kamuoyunda fark yaratan bir unsur olduğunu kanıtlayın. Superscore puanlarını ve yorumlarını entegre ederek, marka vaadinizi kamuoyu önünde doğrulayabilir, böylece güven kazanabilir ve kalıcı sadakat oluşturabilirsiniz.',
  },
  {
    value: '%83',
    desc: 'Tüketicilerin olumsuz yorumlara yanıt veren işletmelere güvenme olasılığı daha yüksek',
    title: 'İtibar riskini azaltın',
    text: 'Gerçek zamanlı geri bildirimleri izleyerek ve bunlara yanıt vererek çevrimiçi itibarınızı proaktif olarak yönetin. Platformumuz, olumsuz algıların krize dönüşmeden önce ele alınmasına yardımcı olmak için erken uyarılar sağlar.',
  },
];

const DECISIONS = [
  {
    img: METRICS_IMG,
    title: 'Geleneksel müşteri ölçütlerinin ötesine geçin',
    desc: 'NPS ve CSAT gibi ölçütler değerli olsa da, genellikle müşteri duyarlılığının ardındaki daha derin "neden"i gözden kaçıran sınırlı bir anlık görüntüdür. Superscore, müşterilerinizin kendi sözleriyle neye önem verdiklerini ortaya koyan sürekli ve güncel bir içgörü akışı sağlar.',
  },
  {
    img: INSIGHTS_IMG,
    title: 'Farklılaşmanızı sağlayacak içgörüler keşfedin.',
    desc: 'Geleneksel araştırmaların ötesine geçerek müşterileriniz için gerçekten önemli olan konular hakkında gerçek zamanlı bilgi edinin. Piyasa trendlerini ve algılarını ortaya çıkarın ve rakiplerinizin nerede yetersiz kaldığını belirleyin.',
  },
  {
    img: TEAMS_IMG,
    title: 'Ekipleri ortak bir bilgi kaynağı etrafında bir araya getirin.',
    desc: 'Merkezi ve bağımsız bir müşteri bilgi kaynağı sağlayarak içsel engelleri ortadan kaldırın. Bu, pazarlamadan operasyonlara kadar tüm ekipleri bir araya getirerek iç verimliliği ve müşterileriniz için daha tutarlı ve bağlantılı bir deneyim sağlar.',
  },
];

const GROWTH_FEATURES = [
  {
    title: 'Yapay zeka aramasında keşfedilebilir olmak',
    desc: 'LLM\'ler ve arama motorları tarafından tercih edilen üçüncü taraf değerlendirmeleriyle AEO stratejinizi yönlendirin ve en önemli yerlerde etkili bir şekilde görünmenizi sağlayın.',
  },
  {
    title: 'Eyleme dönüştürülebilir bilgiler',
    desc: 'Gösterge panelleri, duygu analizi ve tematik etiketleme ile neredeyse gerçek zamanlı, nitelikli müşteri, pazar ve rekabet içgörüleri elde edin.',
    link: { label: 'Bilgilerle gelişin', href: '/business/bilgiler' },
  },
  {
    title: 'Tüm kanallar için güven sinyalleri',
    desc: 'Superscore widget\'ları ile puanlarınızı, yıldızlarınızı ve yorumlarınızı reklamlara, arama sonuçlarına ve sitenize kolayca yerleştirerek dönüşüm oranlarını artırın.',
    link: { label: 'Dönüşümleri hızlandırın', href: '/business/donusum' },
  },
];

const ADVANTAGES = [
  {
    img: '/logo/imgi_61_sales-performance-up-2332_GGTh9s3vGqO.png',
    title: 'Eşsiz erişim ve ölçek',
    desc: 'Türkiye\'nin en büyük bağımsız müşteri geri bildirim platformuyuz. Binlerce işletmeden yüz binlerce yorum topladık. Her gün yeni yorumlar ekliyoruz.',
  },
  {
    img: '/logo/lighthouse_icon.svg',
    title: 'Geliştirilmiş AEO',
    desc: 'Eşsiz alan otoritemiz ve müşteri memnuniyetini sergileme biçimimiz, görünürlüğünüzü artırmanıza ve yapay zeka aramalarında keşfedilebilir olmanıza yardımcı olmamızı sağlar.',
  },
  {
    img: '/logo/imgi_60_rating-2852_w_dkOlV_nNQ.png',
    title: 'En güvenilir bağımsız platform',
    desc: 'Biz açık bir platformuz, işletmelerin kontrolünde değiliz ve yayınlamadan önce tüm yorumların %100\'ünü otomatik teknolojimizden geçiriyoruz.',
  },
  {
    icon: Eye,
    title: 'Eşsiz içgörüler',
    desc: 'Eşsiz müşteri ve pazar istihbaratı sunuyoruz. Ölçeğimiz sayesinde sadece yorum toplamakla kalmazsınız; duygu durumunu anlar, rakiplerinizle karşılaştırma yapar ve iş performansınızı sürekli iyileştirirsiniz.',
  },
];

export default function IsletmelerPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-[3.2rem] font-extrabold text-[#1b1a1b] leading-tight mb-4 italic">
                Güveni büyüme için kullanın.
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Yapay zeka destekli keşif ortamında öne çıkın. Superscore, işletmenizi büyütmek için ihtiyaç duyduğunuz güveni oluşturmanıza, ölçeklendirmenize ve etkinleştirmenize yardımcı olur.
              </p>
              <Link
                href="/business/demo"
                className="inline-block px-8 py-4 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors"
              >
                Demo rezervasyonu yapın
              </Link>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-[320px] sm:w-[440px] lg:w-[560px]">
                <Image src={HERO_IMG} alt="İşletme dashboard" width={1920} height={1080} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ AI SECTION ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 flex justify-center">
              <div className="relative w-[280px] sm:w-[380px] lg:w-[460px]">
                <Image src={AI_IMG} alt="Yapay zeka aramaları" width={920} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-5">
                Markanız yapay zeka aramalarında görünür mü?
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                <p>
                  Tüketicilerin markaları keşfetme ve seçme biçimi temelden değişti. Tüketiciler, sizin iddialarınızdan ziyade, markanız hakkında akranlarının söylediklerine güveniyor.
                </p>
                <p>
                  Görünür, kamuoyu nezdinde kanıt eksikliği, markanızın bulunmasını zorlaştırır ve alıcılar için tereddüt yaratır; bu da doğrudan geliri etkiler.
                </p>
                <p>
                  Bu nedenle, görünür, üçüncü taraf güven sinyalleri artık markaların nasıl keşfedildiğinin merkezinde yer alıyor. <strong>Yanıt Motoru Optimizasyonu (AEO)</strong> stratejiniz ve yapay zeka tarafından oluşturulan yanıtlardaki görünürlüğünüz için de çok önemlidir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ICON STATS ═══ */}
      <section className="bg-[#1b1a1b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ICON_STATS.map((s, i) => (
              <div key={i} className="text-center">
                {s.img ? (
                  <Image src={s.img} alt="" width={48} height={48} className="w-12 h-12 mx-auto mb-4 object-contain invert" unoptimized />
                ) : s.icon ? (
                  <s.icon className="w-12 h-12 mx-auto mb-4 text-white" strokeWidth={1.2} />
                ) : null}
                <p className="text-sm text-white/80 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STAT CARDS - 3 yeşil kart ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Daha fazla müşteri kazanın ve mevcut müşterilerinizi koruyun.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {STAT_CARDS.map((c, i) => (
              <div key={i} className="text-center">
                <div className="bg-[#04da8d] rounded-2xl p-8 mb-6 min-h-[160px] flex flex-col items-center justify-center">
                  <p className="text-4xl sm:text-5xl font-extrabold text-[#1b1a1b] mb-2">{c.value}</p>
                  <p className="text-xs sm:text-sm text-[#1b1a1b]/70 leading-snug">{c.desc}</p>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1b1a1b] mb-3 leading-snug">{c.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BETTER DECISIONS ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] text-center mb-12 sm:mb-16">
            Superscore ile daha iyi kararlar alın.
          </h2>
          <div className="space-y-16 lg:space-y-24">
            {DECISIONS.map((d, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-14`}>
                <div className="flex-1 flex justify-center">
                  <div className="relative w-[280px] sm:w-[360px] lg:w-[460px]">
                    <Image src={d.img} alt={d.title} width={920} height={700} className="w-full h-auto" unoptimized />
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1b1a1b] mb-3 leading-tight">{d.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GROWTH ENGINE ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Müşteri yorumları büyümenin motoru olarak
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {GROWTH_FEATURES.map((f, i) => (
              <div key={i}>
                <h3 className="text-base sm:text-lg font-bold text-[#1b1a1b] mb-2">{f.title}</h3>
                <p className="text-[13px] sm:text-sm text-gray-500 leading-relaxed mb-2">{f.desc}</p>
                {f.link && (
                  <Link href={f.link.href} className="text-sm font-semibold text-[#3c57bc] hover:underline">
                    {f.link.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUPERSCORE AVANTAJI ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] text-center mb-12 sm:mb-16">
            Superscore avantajı
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {ADVANTAGES.map((a, i) => (
              <div key={i} className="text-center">
                {a.img ? (
                  <Image src={a.img} alt="" width={48} height={48} className="w-12 h-12 mx-auto mb-4 object-contain" unoptimized />
                ) : a.icon ? (
                  <a.icon className="w-12 h-12 mx-auto mb-4 text-[#1b1a1b]" strokeWidth={1.2} />
                ) : null}
                <h3 className="text-sm sm:text-base font-bold text-[#1b1a1b] mb-2">{a.title}</h3>
                <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ENTEGRASYONLAR ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] mb-3">
            Sorunsuz entegrasyonlar
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Mevcut teknoloji altyapınıza önceden entegre edilmiş çözümler ve güçlü bir API ile sizi hızla faaliyete geçiriyoruz. İnceleme davetlerini otomatikleştirebilir ve zaten çalıştığınız yerde incelemelere yanıt verebilirsiniz.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-xl mx-auto mb-8">
            {['Trendyol', 'Hepsiburada', 'N11', 'Shopify', 'WooCommerce', 'Amazon'].map(name => (
              <div key={name} className="flex items-center justify-center h-16 bg-white rounded-xl px-4 shadow-sm">
                <span className="text-sm sm:text-base font-bold text-[#1b1a1b]">{name}</span>
              </div>
            ))}
          </div>
          <Link href="/business/entegrasyonlar" className="inline-block px-6 py-2.5 border-2 border-[#1b1a1b] text-sm font-bold text-[#1b1a1b] rounded-full hover:bg-[#1b1a1b] hover:text-white transition-colors">
            Tüm entegrasyonları görüntüle
          </Link>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#1b1a1b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-tight">
            Kurumsal güveninizi ölçekleyin
          </h2>
          <p className="text-sm sm:text-base text-white/50 mb-8 leading-relaxed">
            Superscore ile müşteri güvenini işletmenizin büyüme motoruna dönüştürün. Kurumsal çözümlerimizi keşfedin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/business/demo" className="px-8 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors w-full sm:w-auto">
              Demo rezervasyonu yapın
            </Link>
            <Link href="/business/fiyatlandirma" className="px-8 py-3.5 border-2 border-white/30 text-white text-sm font-bold rounded-full hover:border-white transition-colors w-full sm:w-auto">
              Tüm planları keşfedin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';
import {
  Shield, TrendingUp, BarChart3, Search, Sparkles, Brain,
  QrCode, Megaphone, Users, BadgeCheck, Star, MessageSquareText,
} from 'lucide-react';

const HERO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F2Mvt3VxEn8SwSce2zwPiBM%2F0c2add6ef666a12b164a648c64321f20%2FHero.png&w=1200&q=75';

const CROWD_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F45AwnEdYjOvDlYwjHvTZ8u%2Fad0963aa96bb3c1ed5135402f0c77148%2FR_Stand_out_from_the_crowd.png&w=1200&q=75';
const RETENTION_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F2JE9jIm72sePBqrbp2UddD%2F9243d577c273a1c7321608944c0594a9%2FR_Customer_retention.png&w=1200&q=75';

const WORD_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F66z5jgzblMVKlrogd7WeW5%2F52669ad2967dea736732543df757e9a9%2FWord_of_mouth_image.png&w=640&q=75';
const BUDGET_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F3y1chz8aOSb6a8iSG1n8uC%2Ff5a6cb0ca90cd9904ddf947a202eb669%2FBuilt_for_any_budget.png&w=640&q=75';
const HARDWORK_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2FsgRoPD8NQe1z10HtFbxkc%2Fa682e6a9690f233821f9410189c3edef%2FHard_work_amplified.png&w=640&q=75';

const REACH_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F6lyH6TQ4pilrDpNWWA0u2j%2F5264c69f484d63fa192e414b848f987c%2FR_-_Unparalleled_reach_and_scale.png&w=1200&q=75';
const AEO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F1nwuGlunwp3eHoGcRm63KW%2Fda31974fbf5d847b29465bcab0994043%2FR_-_Enhanced_AEO.png&w=1200&q=75';
const INSIGHTS_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F6qENjEA12TgEQhj6Jn5oCo%2Fcfdf535370db6d307e8dbaa65f57aedb%2FR_-_Unique_insights.png&w=1200&q=75';

const STORY_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F49W82YDSSxwoUXZHXyfFkG%2F584ff051469968beae6a4695ef1afbbc%2FR_Lawfully.png&w=1200&q=75';
const TRUST_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F1JCSQUS9mXxlg4GCuqEtQ7%2F4f6ef0f68333d1d62789187fab396596%2FR_Trust_sells.png&w=1200&q=75';

const STATS = [
  {
    img: '/logo/imgi_60_rating-2852_w_dkOlV_nNQ.png',
    title: 'Tüketicilerin 10\'da 7\'si Superscore puanına güveniyor.',
    desc: 'Superscore\'da yüksek bir puan, tüketicilerin bir markadan alışveriş yapma olasılığını %71 artırıyor.',
  },
  {
    img: '/logo/imgi_61_sales-performance-up-2332_GGTh9s3vGqO.png',
    title: 'Tüketicilerin %58\'i artık geleneksel arama motorlarının yerini yapay zeka araçlarıyla alıyor.',
    desc: 'Ürün veya hizmet önerileri için, görünürlük açısından Superscore\'daki herkese açık yorumlar şarttır.',
  },
  {
    img: '/logo/lighthouse_icon.svg',
    title: 'Kullanıcıların %50\'sinden fazlası Superscore\'un kendilerine zaman kazandırdığı konusunda hemfikir.',
    desc: 'Ankete katılan kullanıcıların %58\'i, Superscore analizlerinin temel ölçütleri tek bir yerde sunarak zaman kazandırdığı konusunda hemfikir.',
  },
];

const THREE_CARDS = [
  {
    img: WORD_IMG,
    title: 'Ağızdan ağıza yayılan, heyecan verici bir pazarlama stratejisi.',
    desc: 'Müşterilerinizin sizin için olumlu yorumlar yaymasına izin verin. Superscore yorumları, güven oluşturan ve yapay zeka arama sonuçlarında görünürlüğü artırmaya yardımcı olabilecek sosyal kanıt için idealdir.',
  },
  {
    img: BUDGET_IMG,
    title: 'Her bütçeye uygun olarak üretildi.',
    desc: 'Büyük bir bütçeye gerek kalmadan büyük etki yaratın: En iyi yorumlarınızı çevrimiçi veya çevrimdışı her yerde sergileyin. Widget\'larını kullanarak web sitenizde Superscore puanınızı vurgulayın.',
  },
  {
    img: HARDWORK_IMG,
    title: 'Sıkı çalışma, gücü artırır.',
    desc: 'E-ticaret entegrasyonlarımızla ekiplerinize yardımcı olun. Birden fazla yanıtı yönetin ve olumsuz yorumlara daha hızlı müdahale edin. Ekiplerinizin her müşteri etkileşiminde öne çıkmasına yardımcı olun.',
  },
];

const ADVANTAGES = [
  {
    img: REACH_IMG,
    title: 'Eşsiz erişim ve ölçek',
    desc: 'Türkiye\'nin en güvenilir müşteri geri bildirim platformuyuz. Binlerce işletme ve yüz binlerce yorum ile markanızı güçlendirin. Her gün yeni yorumlar yazılıyor.',
  },
  {
    img: AEO_IMG,
    title: 'Geliştirilmiş AEO',
    desc: 'Alanımızdaki güçlü otoritemiz ve müşteri memnuniyetini sergilememiz, görünürlüğünüzü artırmanıza ve yapay zeka aramalarında keşfedilebilir olmanıza yardımcı olduğumuz anlamına gelir.',
  },
  {
    img: INSIGHTS_IMG,
    title: 'Eşsiz içgörüler',
    desc: 'Eşsiz müşteri ve pazar istihbaratından yararlanın. Ölçeğimiz sayesinde sadece yorum toplamakla kalmazsınız; performansınızı sürekli olarak iyileştiren bilinçli kararlar almanıza yardımcı olur.',
  },
];

const INTEGRATIONS = [
  'Trendyol', 'Hepsiburada', 'N11', 'Shopify', 'WooCommerce', 'Amazon',
];

export default function KucukIsletmelerPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Güveni ivmeye dönüştürün
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                İster işe yeni başlıyor olun ister zaten yolda olun, Superscore küçük ve büyüyen işletmelere yapay zeka arama çağında güvenle büyümeleri ve görünürlüklerini artırmaları için gereken araçları sunar.
              </p>
              <Link
                href="/business/kayit"
                className="inline-block px-7 py-3.5 bg-[#1b1a1b] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors"
              >
                Ücretsiz başlayın
              </Link>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-[320px] sm:w-[400px] lg:w-[520px]">
                <Image src={HERO_IMG} alt="Dashboard" width={1200} height={800} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ALTERNATING SECTIONS ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 max-w-6xl">
          {/* Kalabalığın arasından sıyrılın */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 mb-20 lg:mb-28">
            <div className="flex-1 flex justify-center">
              <div className="relative w-[280px] sm:w-[360px] lg:w-[440px]">
                <Image src={CROWD_IMG} alt="Kalabalığın arasından sıyrılın" width={880} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-3">
                <Sparkles className="w-6 h-6 text-[#04da8d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Kalabalığın arasından sıyrılın
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0 mb-4">
                Müşterilerin markaları seçme ve keşfetme biçiminde temel bir değişim yaşandı. Keşif, arama motorlarından ve ücretli reklamlardan yapay zeka tarafından oluşturulan yanıtlara doğru kayıyor.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0 mb-4">
                <strong>Yanıt Motoru Optimizasyonu (AEO) devreye giriyor:</strong> SEO&apos;nun bir sonraki evrimi. Geleneksel SEO, işletmenizin arama sonuçlarında görünmesine yardımcı olurken, AEO yapay zeka tarafından oluşturulan yanıtlarda görünmesine yardımcı olur.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                Superscore gibi güvenilir ve yapılandırılmış platformlarda güçlü ve kamuoyuna açık bir varlığa sahip olmak, markanızın görünür, güvenilir olmasını ve yapay zeka yanıtlarında doğru şekilde temsil edilmesini sağlar.
              </p>
            </div>
          </div>

          {/* Müşteri sadakati */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Müşteri sadakati
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                Müşteriler dinlendiklerini ve önemsendiklerini hissettiklerinde sadık kalırlar. Superscore, otomatik veri toplama yöntemleriyle her aşamada bağlantı kurmanıza yardımcı olur ve hizmet değerlendirmelerinin toplanmasını kolaylaştırır. Bu, her müşteri etkileşimini dinleme, öğrenme ve uzun vadeli sadakat kazanma fırsatına dönüştürür.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-[280px] sm:w-[360px] lg:w-[480px]">
                <Image src={RETENTION_IMG} alt="Müşteri sadakati" width={960} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <Image src={s.img} alt="" width={48} height={48} className="w-12 h-12 mx-auto mb-4 object-contain" unoptimized />
                <h3 className="text-base sm:text-lg font-bold text-[#1b1a1b] leading-snug mb-2">{s.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SIZE ÖZEL ÇÖZÜMÜMÜZ ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Size özel çözümümüz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {THREE_CARDS.map((c, i) => (
              <div key={i} className="text-center">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-[#f7f5f0]">
                  <Image src={c.img} alt={c.title} fill className="object-cover" unoptimized />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1b1a1b] mb-3 leading-snug">{c.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUPERSCORE AVANTAJI ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] text-center mb-12 sm:mb-16">
            Superscore avantajı
          </h2>
          <div className="space-y-16 lg:space-y-24">
            {ADVANTAGES.map((a, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-14`}>
                <div className="flex-1 flex justify-center">
                  <div className="relative w-[280px] sm:w-[360px] lg:w-[460px]">
                    <Image src={a.img} alt={a.title} width={920} height={700} className="w-full h-auto" unoptimized />
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1b1a1b] mb-3">{a.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ENTEGRASYONLAR ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] mb-3">
            Sorunsuz entegrasyonlar
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Mevcut teknoloji altyapınıza önceden entegre edilmiş çözümler ve güçlü bir API ile sizi hızla faaliyete geçiriyoruz. İnceleme davetlerini otomatikleştirebilir ve zaten çalıştığınız yerde incelemelere yanıt verebilirsiniz.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 max-w-xl mx-auto mb-8">
            {INTEGRATIONS.map(name => (
              <div key={name} className="flex items-center justify-center h-16 bg-[#f7f5f0] rounded-xl px-4">
                <span className="text-sm sm:text-base font-bold text-[#1b1a1b]">{name}</span>
              </div>
            ))}
          </div>
          <Link href="/business/entegrasyonlar" className="inline-block px-6 py-2.5 border-2 border-[#1b1a1b] text-sm font-bold text-[#1b1a1b] rounded-full hover:bg-[#1b1a1b] hover:text-white transition-colors">
            Tüm entegrasyonları görüntüle
          </Link>
        </div>
      </section>

      {/* ═══ BAŞARI HİKAYESİ ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            <div className="flex-1 flex justify-center">
              <div className="relative w-[280px] sm:w-[360px] lg:w-[440px]">
                <Image src={STORY_IMG} alt="Başarı hikayesi" width={880} height={700} className="w-full h-auto rounded-2xl" unoptimized />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <span className="text-sm text-gray-400 font-medium mb-2 block">Müşteri hikayesi</span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1b1a1b] mb-4 leading-tight">
                Superscore puanı sadece 12 ay içinde 4,2&apos;den 4,8&apos;e yükseldi.
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                &ldquo;Müşterilerimize öncelik veriyoruz ve her zaman onlara karşı doğru davranmak istiyoruz. Bu değeri sunma konusunda gerçekten öne çıkan bir şirket olduğumuzu gösterebiliyoruz ve bunun kanıtı Superscore&apos;da mevcut.&rdquo;
              </p>
              <p className="text-sm font-semibold text-[#1b1a1b] mb-4">CEO, Örnek Şirket</p>
              <Link href="#" className="text-sm font-semibold text-[#3c57bc] hover:underline">
                Vaka incelemesini okuyun →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ GÜVEN SATAR ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-6">
                Güven satar. Gelin size nasıl olduğunu gösterelim.
              </h2>
              <ul className="space-y-3 text-sm sm:text-base text-gray-600 mb-6 text-left max-w-md mx-auto lg:mx-0">
                <li className="flex items-start gap-2">
                  <span className="text-[#04da8d] font-bold mt-0.5">•</span>
                  <span>Tüm müşterilerinizi işletmenizi değerlendirmeye davet edin.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#04da8d] font-bold mt-0.5">•</span>
                  <span>
                    <Link href="/business/geri-bildirim" className="text-[#3c57bc] underline font-medium">Müşterilerinizin geri bildirimleriyle etkileşim kurarak</Link> onları dinlediğinizi gösterin. Satın alma yolculuğunun her aşamasında dönüşümleri hızlandırmak için müşteri referanslarını sosyal kanıt olarak kullanın.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#04da8d] font-bold mt-0.5">•</span>
                  <span>
                    Stratejinizi <Link href="/business/bilgiler" className="text-[#3c57bc] underline font-medium">bilgi ve verilerle</Link> destekleyerek başarıya ulaşın.
                  </span>
                </li>
              </ul>
              <Link href="/business" className="text-sm font-semibold text-[#3c57bc] hover:underline">
                Daha fazlasını keşfedin →
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-[280px] sm:w-[360px] lg:w-[440px]">
                <Image src={TRUST_IMG} alt="Güven satar" width={880} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#1b1a1b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-tight">
            Küçük adımlarla büyük güven inşa edin
          </h2>
          <p className="text-sm sm:text-base text-white/50 mb-8 leading-relaxed">
            Superscore&apos;un ücretsiz planıyla bugün başlayın. Markanızı büyütün, müşteri güvenini kazanın.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/business/kayit" className="px-8 py-3.5 bg-[#04da8d] text-[#1b1a1b] text-sm font-bold rounded-full hover:bg-[#03c47e] transition-colors w-full sm:w-auto">
              Ücretsiz başlayın
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

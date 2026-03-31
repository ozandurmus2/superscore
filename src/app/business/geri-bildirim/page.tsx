import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles, Tag, Inbox, MessageSquare, Clock, Flag,
  Shield, Zap, BarChart3, Bot,
} from 'lucide-react';

const HERO_IMAGE = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F2z31JMLpyW1Z8A74TvA2zp%2Fe3b89c333c826ad15663003f28aec9a7%2FENG_-_Learn_from_Reviews_2_-_Yellow.png&w=3840&q=75';

const SECTION_IMAGE_1 = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F3D3HBKBI9PhGS8w9b6TaYY%2Fefb644181b488905a8e274f357163173%2FENG_-__Learn_from_reviews_4_-_Yellow.png&w=3840&q=75';

const SECTION_IMAGE_2 = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F6x3J5SZCq8DVvyGO14UAMN%2F8e42a42cc3eeae0d1daff59f9a19385e%2FENG_-_Respond_to_reviews_4_-_Yellow.png&w=3840&q=75';

const BOTTOM_IMAGE_1 = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5G2U58smbDf2vCEM4xH4QS%2F3f2a392f833642947e52261b9a4f21ef%2FENG_-_Trustpilot_widgets_4_-_Pink__1_.png&w=3840&q=75';

const BOTTOM_IMAGE_2 = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5CrPbTGQwDsGFPTSSLMkFj%2F787f5b981e308f79a575ca2a363dc5d7%2FENG_-_Company_details_-_Orange.png&w=3840&q=75';

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Yapay zeka destekli inceleme yanıtları',
    desc: 'Empati kurabilen, marka kimliğine uygun yanıtları büyük ölçekte oluşturun.',
    color: '#e8d5c4',
    iconColor: '#c4956a',
  },
  {
    icon: Tag,
    title: 'Etiketleme ve filtrelemeyi inceleyin',
    desc: 'Geri bildirimleri düzenleyin, temaları ortaya çıkarın ve son derece hedefli araçlar oluşturun.',
    color: '#d4edda',
    iconColor: '#52b37f',
  },
  {
    icon: Inbox,
    title: 'Hizmet değerlendirmeleri gelen kutusu',
    desc: 'Tüm müşteri geri bildirimlerini tek bir gelen kutusundan yönetin.',
    color: '#f5e6cc',
    iconColor: '#d4a053',
  },
  {
    icon: MessageSquare,
    title: 'Yorumlara yanıt verme entegrasyonları',
    desc: 'İnceleme yanıtlarını kendi CRM veya destek sisteminiz içinde yönetin.',
    color: '#d4e5f7',
    iconColor: '#5b8db8',
  },
  {
    icon: Clock,
    title: 'Yanıt verileri ve etkileşim metrikleri',
    desc: 'Müşteri etkileşimini artırmak için ortalama yanıt oranını ve yanıt süresini takip edin.',
    color: '#e0d8f0',
    iconColor: '#8b6fbf',
  },
  {
    icon: Flag,
    title: 'Yorumları işaretle',
    desc: 'İçerik bütünlüğü değerlendirmesi için şüpheli yorumları işaretleyin.',
    color: '#fde8d0',
    iconColor: '#e8945a',
  },
  {
    icon: Bot,
    title: 'Yapay Zeka sahte yorum tespiti',
    desc: 'Yapay zeka ile sahte ve spam yorumları otomatik olarak tespit edin ve filtreleyin.',
    color: '#fce4ec',
    iconColor: '#e57373',
  },
  {
    icon: Shield,
    title: 'Çözüm Merkezi',
    desc: 'Şikayetleri belge doğrulama ile çözün, markanızın güvenilirlik puanını yükseltin.',
    color: '#e0f2f1',
    iconColor: '#4db6ac',
  },
  {
    icon: Zap,
    title: 'Otomatik yanıt şablonları',
    desc: 'Yapay zeka destekli, duruma göre önerilen akıllı yanıt şablonlarıyla zamandan tasarruf edin.',
    color: '#fff9c4',
    iconColor: '#f9a825',
  },
];

export default function GeriBildirimPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO - Yellow Banner ═══ */}
      <section className="bg-[#f5d553]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left - Text */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Müşteri geri bildirimleriyle etkileşim kurun.
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Müşterilerinize onları dinlediğinizi göstermek için yorumlara yanıt verin ve geri bildirimlerini gelecekteki stratejilerinize yansıtın.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                <Link
                  href="/business/fiyatlandirma"
                  className="px-7 py-3.5 bg-[#1b1a1b] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors w-full sm:w-auto text-center"
                >
                  Tüm planlara göz atın
                </Link>
                <Link
                  href="/business/demo"
                  className="px-7 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors w-full sm:w-auto text-center"
                >
                  Demo rezervasyonu yapın
                </Link>
              </div>
            </div>
            {/* Right - Image */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-[280px] sm:w-[340px] lg:w-[420px]">
                <Image
                  src={HERO_IMAGE}
                  alt="Müşteri geri bildirimleri"
                  width={840}
                  height={840}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 1 - Olumsuz deneyimleri olumluya çevirin ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 max-w-6xl">
          {/* Row 1: Text left, Image right */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-20 lg:mb-32">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Olumsuz deneyimleri olumluya çevirin
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                Tüketiciler, onları dinleyen ve onlara yardımcı olan şirketlere saygı duyarlar.
                Olumsuz yorumlara yanıt vermeye başlayın; müşterilerinizin deneyimini iyileştirme
                konusundaki kararlılığınız göz ardı edilmeyecektir.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-[300px] sm:w-[380px] lg:w-[460px]">
                <Image
                  src={SECTION_IMAGE_1}
                  alt="Yorumlar zaman grafiği"
                  width={920}
                  height={700}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Row 2: Image left, Text right */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 flex justify-center">
              <div className="relative w-[300px] sm:w-[380px] lg:w-[460px]">
                <Image
                  src={SECTION_IMAGE_2}
                  alt="Yorum yanıtlama"
                  width={920}
                  height={700}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                İşletmenizi en iyi şekilde tanıtın.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                Olumlu ya da olumsuz geri bildirimlerle ilgilenerek, potansiyel alıcılara
                önemseyen bir işletme olduğunuzu göstereceksiniz. Bu, rakipleriniz yerine
                sizi seçmeleri için yeterli olabilir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2 - Feature Cards Grid ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Geri bildirimlerle etkileşime geçmeye başlayın.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {FEATURES.map(f => (
              <div
                key={f.title}
                className="bg-[#f7f5f0] rounded-2xl p-6 sm:p-7 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: f.color }}
                >
                  <f.icon className="w-5 h-5" style={{ color: f.iconColor }} />
                </div>
                <h3 className="text-[15px] font-bold text-[#1b1a1b] mb-2 leading-snug">{f.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3 - Two Column Bottom ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14 max-w-3xl mx-auto leading-tight">
            Müşteri geri bildirimleriyle etkileşim kurmak, güven oluşturmanın, büyümenin ve gelişmenin yollarından sadece biridir.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {/* Card 1 */}
            <div className="text-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-[#f0d9e0]">
                <Image
                  src={BOTTOM_IMAGE_1}
                  alt="Superscore widget'ları"
                  fill
                  className="object-contain p-4"
                  unoptimized
                />
              </div>
              <p className="text-sm sm:text-base text-[#1b1a1b] font-medium leading-relaxed mb-3 max-w-sm mx-auto">
                Satış işlemini müşterilerinize bırakın. Sosyal kanıt, satın alma yolculuğunun her aşamasında dönüşümleri hızlandırır.
              </p>
              <Link
                href="/business/donusum"
                className="text-sm font-semibold text-[#3c57bc] hover:underline inline-flex items-center gap-1"
              >
                Sosyal kanıt kullanarak dönüşümleri hızlandırın →
              </Link>
            </div>
            {/* Card 2 */}
            <div className="text-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-[#f5dcc8]">
                <Image
                  src={BOTTOM_IMAGE_2}
                  alt="Rakip analizi"
                  fill
                  className="object-contain p-4"
                  unoptimized
                />
              </div>
              <p className="text-sm sm:text-base text-[#1b1a1b] font-medium leading-relaxed mb-3 max-w-sm mx-auto">
                Müşteri geri bildirimlerinin boşa gitmesine izin vermeyin. Başarıya ulaşmak için stratejinizi içgörüler ve verilerle destekleyin.
              </p>
              <Link
                href="/business/bilgiler"
                className="text-sm font-semibold text-[#3c57bc] hover:underline inline-flex items-center gap-1"
              >
                Elde edilen bilgilerden yararlanarak iş stratejinizi geliştirin →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA - Yellow Banner ═══ */}
      <section className="bg-[#f5d553]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] mb-3 leading-tight">
            Hangi planın size uygun olduğundan emin değil misiniz?
          </h2>
          <p className="text-sm sm:text-base text-[#1b1a1b]/60 mb-8 leading-relaxed">
            İşletmeniz için mükemmel Superscore planını bulun. Özellikleri, fiyatları ve avantajları karşılaştırarak size en uygun olanı seçin.
          </p>
          <Link
            href="/business/fiyatlandirma"
            className="inline-block px-8 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors"
          >
            Tüm planları keşfedin
          </Link>
        </div>
      </section>
    </div>
  );
}

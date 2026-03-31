import Link from 'next/link';
import Image from 'next/image';
import {
  Eye, MessageCircleQuestion, Star, BarChart3, GitCompare, LineChart,
  TrendingUp, Target, Brain,
} from 'lucide-react';

const HERO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5CrPbTGQwDsGFPTSSLMkFj%2F787f5b981e308f79a575ca2a363dc5d7%2FENG_-_Company_details_-_Orange.png&w=1920&q=75';

const SEC_IMG_1 = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F1TginVFF0qKXU8lJyZsyvN%2F9d31ca88d776347d90c30cc1fad80c9c%2FENG_-_My_competitors_-_Orange.png&w=1920&q=75';

const SEC_IMG_2 = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5aINcdhrzBkXnefirlaFph%2Fd63839f904cb6b2f71a699cc43b81701%2FENG_-_Review_Insights_4_-_Orange.png&w=1920&q=75';

const SEC_IMG_3 = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F3gqON1ui35uX0bopwO9OF%2Ff429967665caff9d0d7fbf1f84d719bb%2FENG_-_Review_Insights_5_-_Orange.png&w=1920&q=75';

const BTM_IMG_1 = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F2z31JMLpyW1Z8A74TvA2zp%2Fe3b89c333c826ad15663003f28aec9a7%2FENG_-_Learn_from_Reviews_2_-_Yellow.png&w=1920&q=75';

const BTM_IMG_2 = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5G2U58smbDf2vCEM4xH4QS%2F3f2a392f833642947e52261b9a4f21ef%2FENG_-_Trustpilot_widgets_4_-_Pink__1_.png&w=1920&q=75';

const STATS = [
  {
    icon: TrendingUp,
    text: 'Superscore kullanan kuruluşlar %401\'lik bir yatırım getirisi elde ediyor.',
    source: '(Forrester)',
  },
  {
    icon: Target,
    text: 'Veriye dayalı işletmeler her yıl ortalama %30 oranında büyüyor.',
    source: '(Forrester)',
  },
];

const FEATURES = [
  {
    icon: Eye,
    title: 'Ziyaretçi görüşleri',
    desc: 'Yeni müşterilerin dikkatini çekmek için size kimlerin baktığına dikkat edin.',
    color: '#fce4ec',
    iconColor: '#e57373',
  },
  {
    icon: MessageCircleQuestion,
    title: 'Takip incelemesi',
    desc: 'Değerlendiricilerinizden gizli çoktan seçmeli sorularla daha fazla geri bildirim isteyin.',
    color: '#e8d5c4',
    iconColor: '#c4956a',
  },
  {
    icon: Star,
    title: 'İnceleme özeti',
    desc: 'İncelemelerinizin düzenli olarak yapay zeka tarafından oluşturulan özetlerini alın; bu özetlerde temalar vurgulanır ve önerilen eylemler belirtilir.',
    color: '#fff9c4',
    iconColor: '#f9a825',
  },
  {
    icon: BarChart3,
    title: 'Pazar analizleri',
    desc: 'Pazarınızdaki benzer şirketler arasında trendleri, konuları ve performansı karşılaştırın.',
    color: '#fde8d0',
    iconColor: '#e8945a',
  },
  {
    icon: GitCompare,
    title: 'Rakip analizleri',
    desc: 'Markanızı beş rakiple karşılaştırarak değerlendirin.',
    color: '#e0d8f0',
    iconColor: '#8b6fbf',
  },
  {
    icon: LineChart,
    title: 'Analitik gezgini',
    desc: 'İnceleme verilerinizdeki eğilimleri ve fırsatları kolayca ortaya çıkarın.',
    color: '#d4edda',
    iconColor: '#52b37f',
  },
  {
    icon: Brain,
    title: 'Yapay Zeka duygu analizi',
    desc: 'Müşteri yorumlarındaki duygu tonunu yapay zeka ile analiz edin, trendleri anlık takip edin.',
    color: '#d4e5f7',
    iconColor: '#5b8db8',
  },
  {
    icon: Target,
    title: 'Sektör Sıralaması',
    desc: 'Sektörünüzdeki konumunuzu görün, rakiplerinize göre nerede olduğunuzu anlayın.',
    color: '#e0f2f1',
    iconColor: '#4db6ac',
  },
];

export default function BilgilerPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO - Orange Banner ═══ */}
      <section className="bg-[#fe7a1a]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Elde edilen bilgilerden yararlanarak iş stratejinizi geliştirin.
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Müşteri geri bildirimi en büyük varlıklarınızdan biridir. Başarıya ulaşmak için stratejinizi içgörüler ve verilerle destekleyin.
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
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative w-[280px] sm:w-[340px] lg:w-[420px]">
                <Image src={HERO_IMG} alt="İş stratejisi analizi" width={840} height={840} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="bg-[#fef0e6]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <s.icon className="w-10 h-10 mx-auto mb-3 text-[#1b1a1b]" strokeWidth={1.5} />
                <p className="text-base sm:text-lg font-bold text-[#1b1a1b] leading-snug mb-1">{s.text}</p>
                <span className="text-sm text-[#1b1a1b]/50 underline">{s.source}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ALTERNATING SECTIONS ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 max-w-6xl">
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-20 lg:mb-32">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Rakiplerinizin gözden kaçırdığı içgörülere ulaşın.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                Müşteri içgörüleri, değerlendirme trendleri ve dönüşüm metrikleri size yeni büyüme yolları keşfetme fırsatları sunar. Güçlü bir rekabet avantajı elde etmek için Superscore&apos;un tüm içgörü yeteneklerinden yararlanın.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-[300px] sm:w-[380px] lg:w-[460px]">
                <Image src={SEC_IMG_1} alt="Rakip analizi" width={920} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 mb-20 lg:mb-32">
            <div className="flex-1 flex justify-center">
              <div className="relative w-[300px] sm:w-[380px] lg:w-[460px]">
                <Image src={SEC_IMG_2} alt="Dinamik içgörüler" width={920} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Veriye dayalı, güvenilir kararlar alın.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                Müşterilerinizin size söylediklerini dinleyerek stratejik kararların sonuçlarını daha doğru bir şekilde tahmin edin.
              </p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                İnceleme performansını anlayın
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                Geri bildirimlerinizin ne kadar geniş bir kitleye ulaştığını keşfedin. Yorumların nereden geldiğini, davetiyelerinizin performansını ve profil sayfanızın ne kadar trafik aldığını görün.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-[300px] sm:w-[380px] lg:w-[460px]">
                <Image src={SEC_IMG_3} alt="İnceleme performansı" width={920} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURE CARDS ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Stratejinizi geliştirmek için içgörülerden yararlanmaya başlayın.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-[#f7f5f0] rounded-2xl p-6 sm:p-7 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: f.color }}>
                  <f.icon className="w-5 h-5" style={{ color: f.iconColor }} />
                </div>
                <h3 className="text-[15px] font-bold text-[#1b1a1b] mb-2 leading-snug">{f.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TWO COLUMN BOTTOM ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14 max-w-3xl mx-auto leading-tight">
            İş stratejinizi geliştirmek için içgörülerden yararlanmak, güven oluşturmanın, büyümenin ve iyileşmenin yollarından sadece biridir.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            <div className="text-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-[#f5d553]">
                <Image src={BTM_IMG_1} alt="Geri bildirim yönetimi" fill className="object-contain p-4" unoptimized />
              </div>
              <p className="text-sm sm:text-base text-[#1b1a1b] font-medium leading-relaxed mb-3 max-w-sm mx-auto">
                Müşterilerinize onları dinlediğinizi göstermek için yorumlara yanıt verin ve geri bildirimlerini gelecekteki stratejilerinize yansıtın.
              </p>
              <Link href="/business/geri-bildirim" className="text-sm font-semibold text-[#3c57bc] hover:underline inline-flex items-center gap-1">
                Müşteri geri bildirimleriyle etkileşim kurun →
              </Link>
            </div>
            <div className="text-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-[#f0d9e0]">
                <Image src={BTM_IMG_2} alt="Dönüşüm araçları" fill className="object-contain p-4" unoptimized />
              </div>
              <p className="text-sm sm:text-base text-[#1b1a1b] font-medium leading-relaxed mb-3 max-w-sm mx-auto">
                Satış işlemini müşterilerinize bırakın. Sosyal kanıt, satın alma yolculuğunun her aşamasında dönüşümleri hızlandırır.
              </p>
              <Link href="/business/donusum" className="text-sm font-semibold text-[#3c57bc] hover:underline inline-flex items-center gap-1">
                Sosyal kanıt kullanarak dönüşümleri hızlandırın →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#fe7a1a]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] mb-3 leading-tight">
            Hangi planın size uygun olduğundan emin değil misiniz?
          </h2>
          <p className="text-sm sm:text-base text-[#1b1a1b]/60 mb-8 leading-relaxed">
            İşletmeniz için mükemmel Superscore planını bulun. Özellikleri, fiyatları ve avantajları karşılaştırarak size en uygun olanı seçin.
          </p>
          <Link href="/business/fiyatlandirma" className="inline-block px-8 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors">
            Tüm planları keşfedin
          </Link>
        </div>
      </section>
    </div>
  );
}

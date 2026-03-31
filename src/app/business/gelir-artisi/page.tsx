import Link from 'next/link';
import Image from 'next/image';
import {
  TrendingUp, Star, Users, ShoppingCart, Megaphone, BarChart3,
  BadgeCheck, QrCode, Shield, GitCompare, Target, MessageSquareText,
  Repeat2, ArrowUpRight, Zap, Brain,
} from 'lucide-react';

const ROI_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F3CEWVtnFQTTyBEmar7OdTG%2F167023ad44ed65dbd5165b4630cabfe5%2FROI_Stats.png&w=1200&q=75';
const CHART_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F6ojBtNgtal8K81iG0PGJbF%2F7e3bbd16f587844d1d745ab182a3bc7e%2FArtboard_2_-_DT.png&w=1920&q=75';

const BTM_IMG_1 = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F2z31JMLpyW1Z8A74TvA2zp%2Fe3b89c333c826ad15663003f28aec9a7%2FENG_-_Learn_from_Reviews_2_-_Yellow.png&w=1920&q=75';
const BTM_IMG_2 = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5G2U58smbDf2vCEM4xH4QS%2F3f2a392f833642947e52261b9a4f21ef%2FENG_-_Trustpilot_widgets_4_-_Pink__1_.png&w=1920&q=75';

const GROWTH_PILLARS = [
  {
    icon: MessageSquareText,
    title: 'Gerçek Yorumlarla Güven İnşa Edin',
    desc: 'Doğrulanmış müşteri yorumları, potansiyel alıcıların satın alma kararını %72 oranında hızlandırır. Gerçek deneyimler, en güçlü pazarlama aracınızdır.',
    color: '#e0f7e9',
    iconColor: '#04da8d',
  },
  {
    icon: Shield,
    title: 'Şikayetleri Gelire Dönüştürün',
    desc: 'Çözülen her şikayet, kaybedilmek üzere olan bir müşteriyi sadık bir savunucuya dönüştürür. Belge doğrulama sistemiyle şikayetleri şeffaf şekilde çözün.',
    color: '#e0f2f1',
    iconColor: '#26a69a',
  },
  {
    icon: Repeat2,
    title: 'Yeniden Pazarlama Gücü',
    desc: 'Yüksek Superscore puanınızı reklamlarınızda, e-postalarınızda ve sosyal medyada kullanın. Güven rozeti ile dönüşüm oranınızı %35\'e kadar artırın.',
    color: '#fff3e0',
    iconColor: '#f57c00',
  },
  {
    icon: QrCode,
    title: 'QR Değerlendirme ile Anında Geri Bildirim',
    desc: 'Mağazanıza, restoranınıza veya ofisinizdeki QR kodlar sayesinde müşteriler anında yorum bırakır. Daha fazla yorum = daha yüksek güvenilirlik = daha fazla satış.',
    color: '#f3e5f5',
    iconColor: '#9c27b0',
  },
  {
    icon: GitCompare,
    title: 'Rakip Analizi ile Stratejik Konumlanma',
    desc: 'Rakiplerinizin zayıf noktalarını keşfedin, güçlü yönlerinizi öne çıkarın. Sektörünüzde fark yaratarak müşteri kazanım maliyetinizi düşürün.',
    color: '#e8eaf6',
    iconColor: '#5c6bc0',
  },
  {
    icon: Target,
    title: 'Sektör Liderliği Rozeti',
    desc: 'Sektörünüzde üst sıralarda yer aldığınızı gösteren rozetler ile markanızın otoritesini pekiştirin. Lider markaları müşteriler %3 kat daha fazla tercih eder.',
    color: '#fce4ec',
    iconColor: '#e91e63',
  },
];

const REVENUE_STATS = [
  { value: '%72', label: 'Yorumlar sayesinde satın alma kararı hızlanıyor' },
  { value: '%35', label: 'Güven rozeti ile dönüşüm artışı' },
  { value: '%89', label: 'Müşteriler satın almadan önce yorum okuyor' },
  { value: '3x', label: 'Çözülen şikayetlerden müşteri geri dönüşü' },
];

const FEATURES = [
  {
    icon: BarChart3,
    title: 'Gelir Analitik Paneli',
    desc: 'Yorumların ve Superscore puanınızın satışlarınıza etkisini gerçek zamanlı takip edin.',
    color: '#e0f7e9',
    iconColor: '#04da8d',
  },
  {
    icon: BadgeCheck,
    title: 'Güven Rozetleri',
    desc: 'Web sitenize, e-postalarınıza ve reklamlarınıza güven rozetleri ekleyerek dönüşümleri artırın.',
    color: '#e8eaf6',
    iconColor: '#5c6bc0',
  },
  {
    icon: Megaphone,
    title: 'Sosyal Kanıt Pazarlama',
    desc: 'En iyi yorumlarınızı otomatik olarak sosyal medya içeriklerine dönüştürün.',
    color: '#fff3e0',
    iconColor: '#f57c00',
  },
  {
    icon: Brain,
    title: 'Yapay Zeka Duygu Analizi',
    desc: 'Müşteri memnuniyetindeki trendleri yapay zeka ile analiz edin, sorunları büyümeden çözün.',
    color: '#e3f2fd',
    iconColor: '#42a5f5',
  },
  {
    icon: Zap,
    title: 'Otomatik Yanıt Şablonları',
    desc: 'Yapay zeka destekli yanıt önerileri ile müşteri iletişim sürenizi %80 kısaltın.',
    color: '#fff9c4',
    iconColor: '#f9a825',
  },
  {
    icon: ArrowUpRight,
    title: 'Dönüşüm Optimizasyonu',
    desc: 'Hangi yorum türlerinin satışa en çok katkı sağladığını keşfedin ve stratejinizi optimize edin.',
    color: '#fce4ec',
    iconColor: '#e91e63',
  },
];

export default function GelirArtisiPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#04da8d]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Müşteri güvenini gelire dönüştürün.
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Gerçek yorumlar, çözülen şikayetler ve şeffaf puanlama ile müşteri güvenini inşa edin. Güven arttıkça gelir de artar.
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
                <Image src={ROI_IMG} alt="ROI istatistikleri" width={600} height={600} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="bg-[#1b1a1b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {REVENUE_STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-[#04da8d] mb-1">{s.value}</p>
                <p className="text-xs sm:text-sm text-white/60 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GROWTH PILLARS - 6 büyük kart ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] text-center mb-4">
            Gelir artışının 6 temel direği
          </h2>
          <p className="text-sm sm:text-base text-gray-500 text-center mb-10 sm:mb-14 max-w-2xl mx-auto">
            Superscore&apos;un sunduğu araçlarla müşteri güvenini inşa edin, sadakati artırın ve gelirinizi büyütün.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {GROWTH_PILLARS.map(p => (
              <div key={p.title} className="bg-[#f7f5f0] rounded-2xl p-6 sm:p-7 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: p.color }}>
                  <p.icon className="w-6 h-6" style={{ color: p.iconColor }} />
                </div>
                <h3 className="text-base font-bold text-[#1b1a1b] mb-2 leading-snug">{p.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CHART SECTION ═══ */}
      <section className="bg-[#f7f5f0]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mb-20 lg:mb-28">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Her yorum, gelirinize katkı sağlar.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0 mb-6">
                Müşterilerinizin %89&apos;u satın alma öncesi yorumları okuyor. Daha fazla pozitif yorum, daha yüksek dönüşüm oranı demektir. Superscore ile yorum toplama sürecinizi otomatikleştirin.
              </p>
              <div className="flex flex-col gap-3 max-w-sm mx-auto lg:mx-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#e0f7e9] flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-[#04da8d]" />
                  </div>
                  <span className="text-sm text-[#1b1a1b] font-medium">Organik yorum artışı takibi</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#fff3e0] flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4 text-[#f57c00]" />
                  </div>
                  <span className="text-sm text-[#1b1a1b] font-medium">Puan trendi analizi</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#e8eaf6] flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-[#5c6bc0]" />
                  </div>
                  <span className="text-sm text-[#1b1a1b] font-medium">Müşteri kazanım kaynakları</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-[300px] sm:w-[380px] lg:w-[480px]">
                <Image src={CHART_IMG} alt="Gelir grafiği" width={960} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 flex justify-center">
              <div className="relative w-[300px] sm:w-[380px] lg:w-[460px]">
                <Image src={ROI_IMG} alt="Yatırım getirisi" width={600} height={600} className="w-full h-auto" unoptimized />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Yatırımınızın geri dönüşünü ölçün.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0">
                Superscore&apos;un işletmenize sağladığı gerçek değeri görün. Müşteri memnuniyeti artışı, şikayet çözüm oranı ve yorum sayısındaki büyüme doğrudan gelirinize yansır. Raporlama paneli ile ROI&apos;nizi anlık takip edin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS - Gelir Döngüsü ═══ */}
      <section className="bg-[#04da8d]/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] text-center mb-4">
            Gelir artış döngüsü
          </h2>
          <p className="text-sm sm:text-base text-gray-500 text-center mb-10 sm:mb-14 max-w-xl mx-auto">
            Superscore ile oluşturduğunuz güven döngüsü, sürdürülebilir gelir artışı sağlar.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Yorum Toplayın', desc: 'QR kod, e-posta davetleri ve otomatik hatırlatmalarla müşteri yorumlarını toplayın.', icon: ShoppingCart },
              { step: '02', title: 'Güven İnşa Edin', desc: 'Gerçek yorumlar ve şeffaf Superscore puanınız ile marka güvenilirliğinizi artırın.', icon: Shield },
              { step: '03', title: 'Dönüşüm Artırın', desc: 'Güven rozetleri, widget\'lar ve sosyal kanıt ile web sitenizin dönüşüm oranını yükseltin.', icon: TrendingUp },
              { step: '04', title: 'Geliri Büyütün', desc: 'Artan güven ve dönüşüm ile sürdürülebilir gelir artışı elde edin.', icon: BarChart3 },
            ].map(s => (
              <div key={s.step} className="bg-white rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-[#04da8d] flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold text-[#04da8d] tracking-wider mb-2 block">{s.step}</span>
                <h3 className="text-base font-bold text-[#1b1a1b] mb-2">{s.title}</h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURE CARDS ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Gelir artışı için araçlarınız hazır.
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
            Gelir artışı sağlamak, güven oluşturmanın, büyümenin ve gelişmenin yollarından sadece biridir.
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
      <section className="bg-[#04da8d]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] mb-3 leading-tight">
            Gelirinizi artırmaya bugün başlayın
          </h2>
          <p className="text-sm sm:text-base text-[#1b1a1b]/60 mb-8 leading-relaxed">
            İşletmeniz için mükemmel Superscore planını bulun. Güven inşa edin, dönüşümleri artırın ve gelirinizi büyütün.
          </p>
          <Link href="/business/fiyatlandirma" className="inline-block px-8 py-3.5 bg-[#1b1a1b] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors">
            Tüm planları keşfedin
          </Link>
        </div>
      </section>
    </div>
  );
}

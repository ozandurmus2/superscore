import Link from 'next/link';
import Image from 'next/image';

/* ── images ── */
const HERO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F1Hmd3HNoiR8hhIbmO6JTF7%2F4585d437a9ec9194712ac01795910ffa%2FENG_-_Dashboard_and_Analytics_1_-_Pink.png&w=1920&q=75';
const IMG_ANALYTICS = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F66ZhX7n3jWs6klLn5ZqRV7%2F73d637daaf147c1d0d06dbab69b53f73%2FENG_-_Flex_widget_-_Repeat_pattern_-_Pink_-_Web_page_564x564.png&w=1200&q=75';
const IMG_DASHBOARD = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2FPeF5t8FgLwcZyHfguREFI%2F2bd2de3037218d7b9cf9c12b5dbbda6e%2FENG_-_Dashboard_and_Analytics_5_-_Pink.png&w=1920&q=75';
const IMG_PERFORMANCE = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5bRd2uUDtWb2bWTZdxNhnW%2F166befd820e949dd469e3b4583a0ae56%2FENG_-__Dashboard_and_Analytics_2_-_Pink.png&w=1920&q=75';
const IMG_ORGANIC = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5bRd2uUDtWb2bWTZdxNhnW%2F166befd820e949dd469e3b4583a0ae56%2FENG_-__Dashboard_and_Analytics_2_-_Pink.png&w=1920&q=75';
const IMG_FORECAST = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F5M8GZBndqXmVSjDjDMkXbd%2F5bf7c0d8e1d03524794cc3b48a65a4b6%2FENG_-_Dashboard_and_Analytics_4_-_Stone.png&w=1920&q=75';

/* ── alternating sections ── */
const SECTIONS = [
  {
    tag: 'Analitik gezgini',
    title: 'En önemli trendleri ve fırsatları kolayca ortaya çıkarın.',
    desc: 'Widget\'ınızın, aramanızın, profilinizin ve Güven Puanınızın performansını tek bir yerden analiz edin. Sahip olduğunuz verilerden keşfedilmemiş fırsatları ortaya çıkarın ve paylaşın.',
    img: IMG_ANALYTICS,
    reverse: false,
    bg: 'bg-white',
  },
  {
    tag: 'Kontrol Paneli',
    title: 'Performans değerlendirmeleriniz için merkez ofisiniz.',
    desc: 'Performans metriklerine tek bakışta ulaşın ve müşterilerinizle tek bir yerden etkileşim kurun. İnceleme daveti performansını izleyin ve daha fazla geri bildirim toplamak için stratejinizi buna göre ayarlayın; çünkü daha fazla inceleme, yatırım getirisinde daha fazla fırsat anlamına gelir.',
    img: IMG_DASHBOARD,
    reverse: true,
    bg: 'bg-white',
  },
  {
    tag: 'Performans Verileri',
    title: 'İnceleme verilerinizi inceleyin.',
    desc: 'Müşterilerinizin memnuniyetini zaman içinde yorumlarda ölçerek onları mutlu tutun. İş stratejinizi en iyi şekilde destekleyen alanlardaki performansı anlamak için yorum etiketlerine göre bölümlendirilmiş analizleri inceleyin.',
    img: IMG_PERFORMANCE,
    reverse: false,
    bg: 'bg-white',
  },
  {
    tag: 'Organik Erişim',
    title: 'Yorumlarınızın arama sonuçlarını nasıl etkilediğini tam olarak görün.',
    desc: 'Google arama sonuçlarında işletme profil sayfanızın aldığı gösterimleri, sıralamayı ve tıklama oranını görüntüleyin ve zaman içindeki değişiklikleri takip edin. En çok kullanılan arama terimlerini görüntüleyerek müşterilerinizin sizi nasıl bulduğuna dair eksiksiz bir genel bakış elde edin.',
    img: IMG_ORGANIC,
    reverse: true,
    bg: 'bg-[#f95a98]',
  },
  {
    tag: 'Superscore Analitiği',
    title: 'Superscore\'daki performansınızı takip edin ve geliştirin.',
    desc: 'Müşterileriniz bugün dünden daha mı mutlu? Superscore Analytics, derecelendirmeler, yıldız dağılımı, yorum sayısı ve Güven Puanı dahil olmak üzere performansınızdaki değişiklikleri izlemek için bir dizi gösterge paneli içerir.',
    img: IMG_FORECAST,
    reverse: false,
    bg: 'bg-[#f95a98]',
  },
];

/* ── related features ── */
const RELATED = [
  {
    title: 'İnceleme Bulguları',
    desc: 'Daha derin müşteri içgörüleri elde edin ve temel geri bildirim eğilimleri ve müşteri duygularına dair anlayışınızı geliştirin.',
    link: '/business/ozellikler/yorum-icgoruleri',
  },
  {
    title: 'İnceleme Etiketleri',
    desc: 'Etiketleri kullanarak geri bildirimleri hızlıca kategorize edin ve değerlendirme yönetimini kolaylaştırarak yanıt stratejilerinizi geliştirin.',
    link: '/business/ozellikler/yorum-etiketleme',
  },
  {
    title: 'Platform Güvenlik Önlemleri',
    desc: 'Özel olarak geliştirdiğimiz sahtekarlık tespit yazılımımız ve tam zamanlı İçerik Bütünlüğü Ekibimiz, markanızı ve platformumuzu sahte yorumlardan korumaya yardımcı olur.',
    link: '/business/guvenlik',
  },
];

export default function VeriAnalitikPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#f95a98]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-semibold text-[#1b1a1b]/60 mb-2">Kontrol Paneli ve Analitik</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                İnceleme verilerinizi yakından takip edin.
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Müşteri yorumlarınızın ardındaki verileri detaylı bir şekilde inceleyerek, müşteri geri bildirimlerinden en iyi şekilde yararlanmanız ve müşteri odaklı bir işletme kurmanız için gereken bilgileri size sunacağız.
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
                <Image src={HERO_IMG} alt="Superscore Kontrol Paneli ve Analitik" width={960} height={700} className="w-full h-auto" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STAT BANNER ═══ */}
      <section className="bg-[#fce4ee] border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-4xl">
          <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">Biliyor musun?</p>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#1b1a1b] leading-tight mb-2">
            Superscore&apos;a her ay yüz binlerce yeni yorum geliyor — bu da analiz edilecek çok fazla içerik demek!
          </h2>
        </div>
      </section>

      {/* ═══ ALTERNATING SECTIONS ═══ */}
      {SECTIONS.map((s, i) => (
        <section key={i} className={s.bg}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 max-w-6xl">
            <div className={`flex flex-col ${s.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-16`}>
              <div className="flex-1 text-center lg:text-left">
                <p className={`text-sm font-semibold ${s.bg === 'bg-white' ? 'text-[#1b1a1b]/50' : 'text-[#1b1a1b]/60'} mb-2`}>{s.tag}</p>
                <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold text-[#1b1a1b] leading-tight mb-4">
                  {s.title}
                </h2>
                <p className={`text-sm sm:text-base ${s.bg === 'bg-white' ? 'text-gray-600' : 'text-[#1b1a1b]/70'} leading-relaxed max-w-md mx-auto lg:mx-0`}>
                  {s.desc}
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-[280px] sm:w-[360px] lg:w-[440px]">
                  <Image src={s.img} alt={s.title} width={960} height={700} className="w-full h-auto" unoptimized />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ═══ MÜŞTERİ YORUMU ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-14">
            <div className="w-full md:w-[400px] h-[240px] bg-[#f7f5f0] rounded-xl flex items-center justify-center shrink-0">
              <span className="text-sm text-gray-400">Müşteri Görseli</span>
            </div>
            <div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic mb-4">
                &quot;Veri meraklısı biri olarak Superscore&apos;daki en sevdiğim özellik, kesinlikle Kontrol Paneli ve istatistik modülü. Geri bildirimlerinizle ilgili neler olup bittiğini çok hızlı bir şekilde görebileceğiniz, sadece birçok istatistiğe ve bilgiye kolayca ulaşabileceğiniz bir yer olmakla kalmıyor... aynı zamanda tam olarak neler olduğunu anlamayı da çok kolaylaştırıyor.&quot;
              </p>
              <p className="text-sm font-bold text-[#1b1a1b]">Superscore Kullanıcısı</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BU DA İLGİNİZİ ÇEKEBİLİR ═══ */}
      <section className="bg-white border-t">
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
                <Link href={r.link} className="text-sm font-semibold text-[#1b1a1b] underline underline-offset-4 hover:text-[#f95a98] transition-colors">
                  Devamını oku
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#f95a98]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] mb-3 leading-tight">
            Bugün değerlendirme verilerinizi inceleyin.
          </h2>
          <p className="text-sm text-[#1b1a1b]/60 mb-6">Ücretsiz demo için kaydolun</p>
          <Link href="/business/demo" className="inline-block px-8 py-3.5 bg-[#3c57bc] text-white text-sm font-bold rounded-full hover:bg-[#2f4699] transition-colors">
            Demo rezervasyonu yapın
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import Image from 'next/image';

/* ── images ── */
const HERO_IMG = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F3xQg68xtjXNC5yjnl8mCSO%2F659b9675b518e4e3b7b8beacadef0f8f%2FReview_Spotlight_video_thumbnail.jpg&w=640&q=75';
const IMG_INSIGHTS = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F1GqLdPLjOJzMVNKhGiadr8%2F0800b239c5f13cd6e073271c296388d9%2FAutomated_insights.png&w=1080&q=75';
const IMG_ACTIONS = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F4fwwLczJ3JCEebRkyYvP8z%2F41f4d1592eabcda3dc75e1a1f38a0048%2FActions_identifed.png&w=1080&q=75';
const IMG_VOICE = 'https://business.trustpilot.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fwonkqgvit51x%2F2h796IKDpGrDzIj4iOq0aP%2F57d709fa81aab3c5a391d6f0e9b125c2%2FVoice_of_the_customer.png&w=1080&q=75';

/* ── alternating sections ── */
const SECTIONS = [
  {
    tag: 'Otomatikleştirilmiş içgörüler',
    title: 'Tüm zor işler sizin için hallediliyor.',
    desc: 'Çözüm Merkezi, son müşteri şikayetlerinin içeriğini hızlı bir şekilde özetlemek ve yorumlarda ortak olan temaları belirlemek için üretken yapay zekadan yararlanır. Hangi konularda sorun yaşandığını anında görün.',
    img: IMG_INSIGHTS,
    reverse: false,
    bg: 'bg-white',
  },
  {
    tag: 'Belirlenen eylemler',
    title: 'Müşteri memnuniyetine giden bir yol haritası çizin.',
    desc: 'Müşterilerinizin ihtiyaçlarını proaktif bir şekilde nasıl karşılayacağınızı gösteren özetler ve önerilen eylemler içeren haftalık ve aylık raporlar alın. Yapay zeka, şikayetleri kategorize eder ve çözüm önerileri sunar.',
    img: IMG_ACTIONS,
    reverse: true,
    bg: 'bg-[#04da8b]',
  },
  {
    tag: 'Müşterinin sesi',
    title: 'Kendi sözleriyle',
    desc: 'Her tema için orijinal yorumlara doğrudan bağlantılı olarak en fazla beş temsili alıntıya göz atın ve müşterilerinizin paylaştığı temel duygular hakkında daha derin bir fikir edinin.',
    img: IMG_VOICE,
    reverse: false,
    bg: 'bg-[#04da8b]',
  },
];

/* ── çözüm süreci ── */
const PROCESS = [
  {
    num: '1',
    title: 'Şikayet tespit edilir',
    desc: 'Yapay zeka, gelen yorumları analiz eder ve olumsuz deneyimleri otomatik olarak tespit eder. Duygu analizi ile şikayetin ciddiyetini belirler.',
  },
  {
    num: '2',
    title: 'Kategorize edilir',
    desc: 'Şikayetler konularına göre (teslimat, ürün kalitesi, müşteri hizmetleri vb.) otomatik olarak gruplandırılır ve önceliklendirilir.',
  },
  {
    num: '3',
    title: 'Çözüm önerilir',
    desc: 'Yapay zeka, benzer şikayetlerin nasıl çözüldüğüne bakarak en etkili çözüm önerilerini sunar. Önceki başarılı yanıtlardan öğrenir.',
  },
  {
    num: '4',
    title: 'Takip edilir',
    desc: 'Çözüm süreci baştan sona izlenir. Müşteriye yanıt verildiğinde, memnuniyet durumu takip edilir ve raporlanır.',
  },
];

/* ── yapay zeka özellikleri ── */
const AI_FEATURES = [
  {
    title: 'Duygu Analizi',
    desc: 'Her yorumun duygusal tonunu analiz edin. Kızgınlık, hayal kırıklığı, memnuniyet gibi duyguları otomatik olarak tespit edin ve acil müdahale gerektiren yorumları önceliklendirin.',
  },
  {
    title: 'Tema Tespiti',
    desc: 'Yapay zeka, yüzlerce yorumu tarayarak tekrarlayan sorunları ve temaları otomatik olarak belirler. Teslimat gecikmeleri, ürün hasarları veya müşteri hizmetleri gibi konuları gruplar.',
  },
  {
    title: 'Akıllı Önceliklendirme',
    desc: 'Şikayetleri ciddiyetine, tekrar sıklığına ve potansiyel etkisine göre otomatik olarak önceliklendirin. En kritik sorunları ilk siz çözün.',
  },
  {
    title: 'Otomatik Yanıt Önerileri',
    desc: 'Her şikayet için markanızın ses tonuna uygun, kişiselleştirilmiş yanıt önerileri alın. Yapay zeka, önceki başarılı yanıtlarınızdan öğrenerek daha iyi öneriler sunar.',
  },
  {
    title: 'Trend Raporları',
    desc: 'Haftalık ve aylık raporlarla şikayet trendlerini takip edin. Hangi sorunlar artıyor, hangileri azalıyor? Veriye dayalı kararlar alın.',
  },
  {
    title: 'Çözüm Performansı',
    desc: 'Ortalama çözüm süresi, müşteri memnuniyet oranı ve tekrar şikayet oranı gibi metrikleri takip edin. Ekibinizin performansını ölçün.',
  },
];

export default function CozumMerkeziPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#04da8b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-semibold text-[#1b1a1b]/60 mb-2">Çözüm Merkezi</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Gerçek iyileştirme fırsatlarını belirleyin.
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Müşterilerinizin ne söylediğini izleyen yapay zeka teknolojisiyle şikayet yönetiminizi kolaylaştırın ve her sorunu tek tek elle inceleme zahmetinden kurtulun.
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
                <Image src={HERO_IMG} alt="Superscore Çözüm Merkezi" width={640} height={480} className="w-full h-auto rounded-xl" unoptimized />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STAT BANNER ═══ */}
      <section className="bg-[#d9fbed] border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 max-w-4xl">
          <p className="text-sm font-semibold text-[#1b1a1b]/50 mb-2">Biliyor musun?</p>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#1b1a1b] leading-tight mb-2">
            Haftalık değerlendirme özetimiz, müşteri geri bildirimlerindeki temalara dayanarak işletmenizi geliştirmeniz gereken önemli alanları vurgulamaktadır.
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
                  <Image src={s.img} alt={s.title} width={880} height={700} className="w-full h-auto" unoptimized />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ═══ YAPAY ZEKA ÖZELLİKLERİ ═══ */}
      <section className="bg-[#1b1a1b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-sm font-semibold text-white/50 mb-2">Yapay Zeka Destekli</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Şikayetleri fırsata çeviren yapay zeka
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
              Superscore&apos;un yapay zeka motoru, müşteri şikayetlerini analiz eder, kategorize eder ve çözüm önerileri sunar. Manuel inceleme sürecini otomatikleştirerek zamandan tasarruf edin.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_FEATURES.map(f => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[13px] text-white/60 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ÇÖZÜM SÜRECİ ═══ */}
      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Nasıl çalışır?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#04da8b]/10">
                  <span className="text-2xl font-extrabold text-[#04da8b]">{s.num}</span>
                </div>
                <h3 className="text-base font-bold text-[#1b1a1b] mb-2">
                  {s.num}. {s.title}
                </h3>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SUPERSCORE FARKI ═══ */}
      <section className="bg-[#d9fbed]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Neden Superscore Çözüm Merkezi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#04da8b] mb-2">%78</div>
              <h3 className="text-base font-bold text-[#1b1a1b] mb-2">Daha Hızlı Çözüm</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Yapay zeka destekli otomatik kategorize ve önceliklendirme sayesinde şikayetleri ortalama %78 daha hızlı çözün.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#04da8b] mb-2">%45</div>
              <h3 className="text-base font-bold text-[#1b1a1b] mb-2">Tekrar Şikayet Azalması</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Kök neden analizi ile aynı sorunların tekrar yaşanmasını önleyin. Proaktif iyileştirmelerle müşteri memnuniyetini artırın.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#04da8b] mb-2">%92</div>
              <h3 className="text-base font-bold text-[#1b1a1b] mb-2">Müşteri Geri Kazanımı</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Hızlı ve etkili çözüm süreçleri sayesinde şikayetçi müşterilerin %92&apos;sini tekrar kazanın.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#04da8b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] mb-6 leading-tight">
            Şikayetleri fırsata çevirmeye hazır mısınız?
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

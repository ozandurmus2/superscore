import Link from 'next/link';
import Image from 'next/image';

/* ── alternating sections ── */
const SECTIONS = [
  {
    tag: 'Sektör sıralaması',
    title: 'Sektörünüzde nerede olduğunuzu görün.',
    desc: 'Superscore, işletmenizi aynı sektördeki diğer firmalarla otomatik olarak karşılaştırır. Puan ortalamanız, yorum hacminiz ve müşteri memnuniyetiniz bazında sektördeki konumunuzu anlık olarak takip edin.',
    img: null,
    reverse: false,
  },
  {
    tag: 'Yapay zeka destekli sınıflandırma',
    title: 'Doğru sektörde, doğru rakiplerle karşılaştırılın.',
    desc: 'Yapay zeka, işletmenizin faaliyet alanını analiz ederek sizi en uygun sektör kategorisine yerleştirir. Yanlış karşılaştırmalardan kaçının, gerçek rakiplerinizle kıyaslanın.',
    img: null,
    reverse: true,
  },
  {
    tag: 'Rozet sistemi',
    title: 'Sektör rozetinizle güvenilirliğinizi sergileyin.',
    desc: 'Sektörünüzde üst sıralarda yer aldığınızda, profilinizde ve web sitenizde gösterebileceğiniz özel rozetler kazanın. "Sektöründe En İyi %10" veya "Sektör Lideri" rozetleri müşteri güvenini artırır.',
    img: null,
    reverse: false,
  },
  {
    tag: 'Trend takibi',
    title: 'Sektördeki değişimleri ilk siz fark edin.',
    desc: 'Sektörünüzdeki puan ortalamalarının, yorum hacimlerinin ve müşteri beklentilerinin zaman içindeki değişimini izleyin. Trendleri önceden görerek stratejinizi buna göre şekillendirin.',
    img: null,
    reverse: true,
  },
];

/* ── avantajlar ── */
const FEATURES = [
  {
    title: 'Otomatik Sektör Eşleştirme',
    desc: 'İşletmenizin sektörünü yapay zeka belirler. Manuel kategori seçimi gerekmez, sistem sizi en doğru sektör grubuna otomatik olarak yerleştirir.',
  },
  {
    title: 'Canlı Sıralama',
    desc: 'Sıralama anlık olarak güncellenir. Yeni bir yorum aldığınızda veya puanınız değiştiğinde, sektördeki konumunuz otomatik olarak yeniden hesaplanır.',
  },
  {
    title: 'Sektör Rozeti',
    desc: 'Üst sıralarda yer alan işletmeler özel rozetler kazanır. Bu rozetleri profilinizde, web sitenizde ve pazarlama materyallerinizde kullanabilirsiniz.',
  },
  {
    title: 'Karşılaştırmalı Raporlar',
    desc: 'Haftalık ve aylık raporlarla sektördeki konumunuzu, trendleri ve rakiplerinizin hareketlerini detaylı olarak inceleyin.',
  },
  {
    title: 'Alt Kategori Analizi',
    desc: 'Ana sektör sıralamasının yanı sıra alt kategorilerde de performansınızı takip edin. Niş alanınızda lider olun.',
  },
  {
    title: 'Hedef Belirleme',
    desc: 'Sektör ortalamasına veya belirli bir sıralamaya ulaşmak için hedefler belirleyin. İlerlemenizi görselleştirin ve ekibinizi motive edin.',
  },
];

/* ── nasıl çalışır ── */
const STEPS = [
  {
    num: '1',
    title: 'Sektörünüz belirlenir',
    desc: 'Yapay zeka, işletmenizin faaliyet alanını analiz ederek sizi doğru sektör kategorisine yerleştirir.',
  },
  {
    num: '2',
    title: 'Veriler analiz edilir',
    desc: 'Superscore puanı, yorum sayısı, müşteri memnuniyeti ve yanıt oranı gibi metrikler hesaplanır.',
  },
  {
    num: '3',
    title: 'Sıralama oluşturulur',
    desc: 'Sektörünüzdeki tüm işletmeler performanslarına göre sıralanır ve konumunuz belirlenir.',
  },
  {
    num: '4',
    title: 'Rozetinizi kazanın',
    desc: 'Üst sıralarda yer aldığınızda sektör rozeti kazanırsınız. Profilinizde ve sitenizde sergileyin.',
  },
];

export default function SektorSiralamasiPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="bg-[#f95a98]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-semibold text-[#1b1a1b]/60 mb-2">Sektör Sıralaması & Rozet</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1b1a1b] leading-tight mb-4">
                Sektörünüzde öne çıkın, rozetinizi kazanın.
              </h1>
              <p className="text-base sm:text-lg text-[#1b1a1b]/70 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Sektörünüzdeki diğer işletmelerle karşılaştırılın, güçlü yönlerinizi keşfedin ve üst sıralarda yer alarak güvenilirlik rozetleri kazanın.
              </p>
              <Link
                href="/business/demo"
                className="inline-block px-7 py-3.5 bg-[#1b1a1b] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors"
              >
                Demo rezervasyonu yapın
              </Link>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              {/* Görsel sonra eklenecek */}
              <div className="relative w-[300px] sm:w-[380px] lg:w-[460px] h-[280px] sm:h-[340px] bg-[#f95a98]/30 rounded-2xl flex flex-col items-center justify-center gap-4 p-8">
                <div className="bg-white rounded-xl shadow-lg p-5 w-full max-w-[320px]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-400">Sektör Sıralaması</span>
                    <span className="text-xs font-bold text-[#f95a98]">E-Ticaret</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { rank: 1, name: 'İşletme A', score: '4.8', active: false },
                      { rank: 2, name: 'Sizin İşletmeniz', score: '4.7', active: true },
                      { rank: 3, name: 'İşletme C', score: '4.5', active: false },
                    ].map(r => (
                      <div key={r.rank} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${r.active ? 'bg-[#f95a98]/10 border border-[#f95a98]/30' : 'bg-gray-50'}`}>
                        <span className={`text-sm font-extrabold ${r.active ? 'text-[#f95a98]' : 'text-gray-400'}`}>#{r.rank}</span>
                        <span className={`text-sm font-bold flex-1 ${r.active ? 'text-[#1b1a1b]' : 'text-gray-600'}`}>{r.name}</span>
                        <span className="text-sm font-bold text-[#1b1a1b]">{r.score}</span>
                      </div>
                    ))}
                  </div>
                </div>
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
            Sektörel rozet taşıyan işletmelerin profil sayfalarına gelen tıklama oranı, rozetsiz işletmelere göre ortalama %34 daha yüksek.
          </h2>
          <p className="text-sm text-[#1b1a1b]/50">* Superscore kullanıcı verileri ve sektör araştırmalarına dayanmaktadır.</p>
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
                {/* Görseller sonra eklenecek */}
                <div className="relative w-[280px] sm:w-[360px] lg:w-[440px] h-[220px] sm:h-[280px] bg-[#f7f5f0] rounded-xl flex items-center justify-center">
                  <span className="text-sm text-gray-400">Görsel</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ ÖZELLİKLER ═══ */}
      <section className="bg-[#1b1a1b]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-6xl">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Sektör Sıralaması Özellikleri
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
              Yapay zeka destekli sektör sıralaması sistemiyle rekabet avantajı kazanın ve müşterilerinize güvenilirliğinizi kanıtlayın.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
                <p className="text-[13px] text-white/60 leading-relaxed">{f.desc}</p>
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
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#f95a98]/10">
                  <span className="text-2xl font-extrabold text-[#f95a98]">{s.num}</span>
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
      <section className="bg-[#fce4ee]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1b1a1b] text-center mb-10 sm:mb-14">
            Neden Sektör Sıralaması?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#f95a98] mb-2">%34</div>
              <h3 className="text-base font-bold text-[#1b1a1b] mb-2">Daha Fazla Tıklama</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Sektör rozeti taşıyan profiller, rozetsiz profillere göre %34 daha fazla tıklama alıyor.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#f95a98] mb-2">%27</div>
              <h3 className="text-base font-bold text-[#1b1a1b] mb-2">Daha Yüksek Dönüşüm</h3>
              <p className="text-sm text-gray-600 leading-relaxed">Sektöründe üst sıralarda yer alan işletmelerin dönüşüm oranları ortalama %27 daha yüksek.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-[#f95a98] mb-2">50+</div>
              <h3 className="text-base font-bold text-[#1b1a1b] mb-2">Sektör Kategorisi</h3>
              <p className="text-sm text-gray-600 leading-relaxed">50&apos;den fazla ana sektör kategorisi ve yüzlerce alt kategori ile en doğru karşılaştırma.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-[#f95a98]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center max-w-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1b1a1b] mb-6 leading-tight">
            Sektörünüzde lider olmaya hazır mısınız?
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

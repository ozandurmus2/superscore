'use client';

import { useState } from 'react';
import {
  WidgetCard, Section,
  PreviewEsnek, PreviewMikroInceleme, PreviewYatay, PreviewMikroDugme,
  PreviewMikroKombinasyon, PreviewMikroYildiz, PreviewMikroGuven, PreviewMini,
  PreviewBaslangic, PreviewIncelemeTopla, PreviewAtlikarinca, PreviewYikilmak,
  PreviewIzgara, PreviewListe, PreviewListeFiltre, PreviewMiniAtliKarusel,
  PreviewAnidenBelir, PreviewAlinti, PreviewKaydirici, PreviewUrunMini,
  PreviewUrunMiniCoklu, PreviewUrunSoruCevap, PreviewUrunIncelemeleri,
  PreviewUrunDongu, PreviewUrunGaleri, PreviewUrunMulti, PreviewUrunSEOCoklu, PreviewUrunSEO,
} from './_components';

function ChevronDown() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-gray-500" aria-hidden="true">
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function FilterBtn({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-[#1b1a1b] hover:bg-gray-50"
      >
        {value}
        <ChevronDown />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1">
          {options.map(opt => (
            <button key={opt} onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-[#1b1a1b]">
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PaylasimWidgetPage() {
  const [filterType, setFilterType] = useState("Tüm widget'lar");
  const [filterScore, setFilterScore] = useState('Güven Puanı');
  const [filterCount, setFilterCount] = useState('İnceleme sayısı');
  const [planOnly, setPlanOnly] = useState(false);

  return (
    <div className="w-full">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6 pb-5 border-b border-gray-200">
        <FilterBtn
          label={filterType} value={filterType} onChange={setFilterType}
          options={["Tüm widget'lar", 'Hizmet', 'Ürün']}
        />
        <FilterBtn
          label={filterScore} value={filterScore} onChange={setFilterScore}
          options={['Güven Puanı', '5 Yıldız', '4+ Yıldız']}
        />
        <FilterBtn
          label={filterCount} value={filterCount} onChange={setFilterCount}
          options={['İnceleme sayısı', '100+', '500+', '1000+']}
        />
        <div className="flex items-center gap-2 ml-1">
          <span className="text-sm text-gray-600">Sadece planınıza dahildir.</span>
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-gray-400">
            <path fillRule="evenodd" clipRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm9-2.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM7 7h2v5H7V7Z" />
          </svg>
          <button
            onClick={() => setPlanOnly(v => !v)}
            className="relative w-11 h-6 rounded-full transition-colors"
            style={{ background: planOnly ? '#1b1a1b' : '#d1d5db' }}
          >
            <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: planOnly ? '22px' : '2px' }} />
          </button>
        </div>
      </div>

      {/* Section 1: Özelleştirmek */}
      <Section
        title="Özelleştirmek"
        description="Yeni, uyarlanabilir düzenlerle tasarlandı. Markanızın rengini, kategorisini ekleyebilir, boyutunu ve içeriğini özelleştirebilirsiniz."
        cols={1}
      >
        <WidgetCard
          name="Esnek"
          preview={<PreviewEsnek />}
          badge={{ label: 'Yeni', color: 'green' }}
          description="En gelişmiş ve özelleştirilebilir widget'ımız. Marka renginizi, boyutu ve içeriği dilediğiniz gibi ayarlayın. Her sayfaya mükemmel uyum sağlar."
          sizeDesc="Genişlik: 200–800 piksel veya % (Duyarlı)\nYükseklik: 100–400 piksel"
          defaultW="100%"
          defaultH="160px"
        />
      </Section>

      {/* Section 2: Temeller */}
      <Section
        title="Temeller"
        description="Olmazsa olmaz araçları edinin ve müşterilerinizin işletmeniz hakkında neler söylediğini paylaşın."
        cols={3}
      >
        <WidgetCard
          name="Mikro İnceleme Sayısı"
          preview={<PreviewMikroInceleme />}
          badge={{ label: 'Tavsiye edilen', color: 'teal' }}
          description="Sitenize küçük ve şık bir TrustScore rozeti ekleyin. Ziyaretçileri yorum sayfanıza yönlendirin."
          sizeDesc="Genişlik: 150–420 piksel veya % (Duyarlı)\nYükseklik: 24–70 piksel"
          defaultW="100%"
          defaultH="28px"
        />
        <WidgetCard
          name="Yatay"
          preview={<PreviewYatay />}
          badge={{ label: 'Popüler', color: 'navy' }}
          description="Yatay yerleşimde TrustScore, yıldız puanı ve marka logonuzu tek satırda gösterin. Header ve footer için idealdir."
          sizeDesc="Genişlik: 150–420 piksel veya % (Duyarlı)\nYükseklik: 24–70 piksel"
          defaultW="100%"
          defaultH="28px"
        />
        <WidgetCard
          name="Mikro Düğme"
          preview={<PreviewMikroDugme />}
          description="Küçük bir düğme ile ziyaretçilerinizi yorumlara yönlendirin. Navigasyon barına mükemmel uyum sağlar."
          sizeDesc="Genişlik: 150–420 piksel veya % (Duyarlı)\nYükseklik: 24–70 piksel"
          defaultW="100%"
          defaultH="28px"
        />
        <WidgetCard
          name="Mikro Kombinasyon"
          preview={<PreviewMikroKombinasyon />}
          badge={{ label: 'Popüler', color: 'navy' }}
          description="Puan, yıldız ve marka logosunu tek satırda birleştiren kompakt widget. Güveni hızla iletişime geçirir."
          sizeDesc="Genişlik: 150–420 piksel veya % (Duyarlı)\nYükseklik: 24–70 piksel"
          defaultW="100%"
          defaultH="28px"
        />
        <WidgetCard
          name="Mikro Yıldız"
          preview={<PreviewMikroYildiz />}
          badge={{ label: 'Popüler', color: 'navy' }}
          description="Sadece yıldızlar ile minimal bir puanlama görünümü. En sade ve zarif TrustScore gösterimi."
          sizeDesc="Genişlik: 150–420 piksel veya % (Duyarlı)\nYükseklik: 24–70 piksel"
          defaultW="100%"
          defaultH="28px"
        />
        <WidgetCard
          name="Mikro Güven Puanı"
          preview={<PreviewMikroGuven />}
          description="Sayısal TrustScore ile güveninizi açıkça gösterin. Rakamlarla konuşan sade bir widget."
          sizeDesc="Genişlik: 150–420 piksel veya % (Duyarlı)\nYükseklik: 24–70 piksel"
          defaultW="100%"
          defaultH="28px"
        />
        <WidgetCard
          name="Mini"
          preview={<PreviewMini />}
          badge={{ label: 'Popüler', color: 'navy' }}
          description="Kompakt boyutta tam bilgi: puan, yıldız ve yorum sayısı. Sidebar ve footer için mükemmel."
          sizeDesc="Genişlik: 200–400 piksel\nYükseklik: 80–150 piksel"
          defaultW="200px"
          defaultH="100px"
        />
        <WidgetCard
          name="Başlangıç"
          preview={<PreviewBaslangic />}
          description="Ziyaretçileri yorum yazmaya teşvik eden basit ve etkili widget. Yorum sayınızı artırın."
          sizeDesc="Genişlik: 200–400 piksel\nYükseklik: 80–150 piksel"
          defaultW="200px"
          defaultH="100px"
        />
      </Section>

      {/* Section 3: Yorumları Topla */}
      <Section
        title="Yorumları topla"
        description="Daha fazla yorum mu istiyorsunuz? Müşterilerinizden doğrudan web siteniz üzerinden geri bildirim isteyin."
        cols={1}
      >
        <WidgetCard
          name="İnceleme Toplayıcı"
          preview={<PreviewIncelemeTopla />}
          description="Web sitenizden doğrudan yorum toplayın. Müşterilerinize yorum daveti gönderin ve dönüşüm oranınızı artırın."
          sizeDesc="Genişlik: 300–800 piksel veya % (Duyarlı)\nYükseklik: 200–600 piksel"
          defaultW="100%"
          defaultH="250px"
        />
      </Section>

      {/* Section 4: Müşteri Yorumları */}
      <Section
        title="Müşteri Yorumları"
        description="Müşteri yorumlarını ve referanslarını en öne ve görünür şekilde sergileyin."
        cols={3}
      >
        <WidgetCard
          name="Atlıkarınca"
          preview={<PreviewAtlikarinca />}
          badge={{ label: 'Popüler', color: 'navy' }}
          description="Yorumlarınızı otomatik slayt gösterisiyle sergileyin. Ziyaretçiler kaydırarak tüm yorumları görebilir."
          sizeDesc="Genişlik: 300–800 piksel veya % (Duyarlı)\nYükseklik: 200–600 piksel"
          defaultW="100%"
          defaultH="250px"
        />
        <WidgetCard
          name="Yıkılmak"
          preview={<PreviewYikilmak />}
          description="Tıklanınca genişleyen yorum listesi. Sayfanızın temiz kalmasını sağlarken yorumları erişilebilir kılar."
          sizeDesc="Genişlik: 300–800 piksel veya % (Duyarlı)\nYükseklik: 200–600 piksel"
          defaultW="100%"
          defaultH="250px"
        />
        <WidgetCard
          name="Izgara"
          preview={<PreviewIzgara />}
          description="Yorumlarınızı şık bir ızgara düzeninde gösterin. Birden fazla yorumu aynı anda sergileyin."
          sizeDesc="Genişlik: 300–800 piksel veya % (Duyarlı)\nYükseklik: 200–600 piksel"
          defaultW="100%"
          defaultH="250px"
        />
        <WidgetCard
          name="Liste"
          preview={<PreviewListe />}
          description="Yorumları kronolojik listeyle gösterin. En güncel ve güvenilir yorumlar ön planda."
          sizeDesc="Genişlik: 300–800 piksel veya % (Duyarlı)\nYükseklik: 200–600 piksel"
          defaultW="100%"
          defaultH="250px"
        />
        <WidgetCard
          name="Liste Filtrelendi"
          preview={<PreviewListeFiltre />}
          description="Pozitif/negatif filtreli yorum listesi. Ziyaretçiler istedikleri yorumları kolayca bulabilir."
          sizeDesc="Genişlik: 300–800 piksel veya % (Duyarlı)\nYükseklik: 200–600 piksel"
          defaultW="100%"
          defaultH="250px"
        />
        <WidgetCard
          name="Mini Atlı Karusel"
          preview={<PreviewMiniAtliKarusel />}
          description="Küçük ve hızlı geçişli yorum karuseli. Dar alanlarda bile etkili yorum gösterimi sağlar."
          sizeDesc="Genişlik: 300–800 piksel veya % (Duyarlı)\nYükseklik: 200–600 piksel"
          defaultW="100%"
          defaultH="250px"
        />
        <WidgetCard
          name="Aniden belirmek"
          preview={<PreviewAnidenBelir />}
          description="Sayfada beliren popup yorum kartı. Kritik anlarda dikkat çekerek güven inşa eder."
          sizeDesc="Genişlik: 280–420 piksel\nYükseklik: 120–200 piksel"
          defaultW="320px"
          defaultH="140px"
        />
        <WidgetCard
          name="Alıntı"
          preview={<PreviewAlinti />}
          description="Seçilmiş müşteri alıntılarını zarif kartlarda sergileyin. Sosyal kanıt en güçlü haliyle."
          sizeDesc="Genişlik: 300–600 piksel\nYükseklik: 150–300 piksel"
          defaultW="400px"
          defaultH="200px"
        />
        <WidgetCard
          name="Kaydırıcı"
          preview={<PreviewKaydirici />}
          description="Yorumları yatay kaydırarak gösterin. Mobil cihazlarda akıcı deneyim sunar."
          sizeDesc="Genişlik: 300–600 piksel\nYükseklik: 150–300 piksel"
          defaultW="400px"
          defaultH="200px"
        />
      </Section>

      {/* Section 5: Ürün İncelemeleri */}
      <Section
        title="Ürün İncelemeleri"
        description="Müşteri yorumlarını, fotoğraflarını ve videolarını doğrudan ürün sayfalarınızda sergileyin."
        cols={3}
      >
        <WidgetCard
          name="Ürün Mini"
          preview={<PreviewUrunMini />}
          description="Ürün puanını küçük ve temiz bir widget ile gösterin. Ürün kartlarına ve listeleme sayfalarına idealdir."
          sizeDesc="Genişlik: 200–600 piksel veya %\nYükseklik: 150–500 piksel"
          defaultW="100%"
          defaultH="200px"
        />
        <WidgetCard
          name="Ürün Mini Çoklu Kaynak"
          preview={<PreviewUrunMiniCoklu />}
          badge={{ label: 'Popüler', color: 'navy' }}
          description="Birden fazla kaynaktan ürün puanını tek widget'ta birleştirin. Güveni çarpıcı biçimde artırır."
          sizeDesc="Genişlik: 200–600 piksel veya %\nYükseklik: 150–500 piksel"
          defaultW="100%"
          defaultH="200px"
        />
        <WidgetCard
          name="Ürün Soru-Cevap"
          preview={<PreviewUrunSoruCevap />}
          description="Müşteri sorularını ve yanıtlarını sergileyin. Satın alma kararlarını kolaylaştırın."
          sizeDesc="Genişlik: 200–600 piksel veya %\nYükseklik: 150–500 piksel"
          defaultW="100%"
          defaultH="200px"
        />
        <WidgetCard
          name="Ürün İncelemeleri"
          preview={<PreviewUrunIncelemeleri />}
          description="Ürün yorumlarını detaylıca listeleyin. Yıldız dağılımı ve yazılı yorumların tam listesi."
          sizeDesc="Genişlik: 200–600 piksel veya %\nYükseklik: 150–500 piksel"
          defaultW="100%"
          defaultH="200px"
        />
        <WidgetCard
          name="Ürün Yorumları Döngüsü"
          preview={<PreviewUrunDongu />}
          description="Ürün yorumlarını döngüsel olarak gösterin. Her yenilemeyle farklı bir yorum öne çıkar."
          sizeDesc="Genişlik: 200–600 piksel veya %\nYükseklik: 150–500 piksel"
          defaultW="100%"
          defaultH="200px"
        />
        <WidgetCard
          name="Ürün İncelemeleri Galerisi"
          preview={<PreviewUrunGaleri />}
          description="Fotoğraflı ürün yorumlarını galeri formatında gösterin. Görseller güveni katlar."
          sizeDesc="Genişlik: 200–600 piksel veya %\nYükseklik: 150–500 piksel"
          defaultW="100%"
          defaultH="200px"
        />
        <WidgetCard
          name="Ürün İncelemeleri MultiSource"
          preview={<PreviewUrunMulti />}
          description="Çoklu kaynaklardan gelen yorumları tek widget'ta birleştirin. Kapsamlı sosyal kanıt."
          sizeDesc="Genişlik: 200–600 piksel veya %\nYükseklik: 150–500 piksel"
          defaultW="100%"
          defaultH="200px"
        />
        <WidgetCard
          name="Ürün Yorumları Çok Kaynaklı SEO"
          preview={<PreviewUrunSEOCoklu />}
          description="SEO optimize çoklu kaynaklı ürün yorumları. Arama sıralamalarınızı iyileştirin."
          sizeDesc="Genişlik: 200–600 piksel veya %\nYükseklik: 150–500 piksel"
          defaultW="100%"
          defaultH="200px"
        />
        <WidgetCard
          name="Ürün İncelemeleri SEO"
          preview={<PreviewUrunSEO />}
          description="Arama motorlarına uygun ürün inceleme widget'ı. Yapısal veri desteğiyle SEO avantajı."
          sizeDesc="Genişlik: 200–600 piksel veya %\nYükseklik: 150–500 piksel"
          defaultW="100%"
          defaultH="200px"
        />
      </Section>
    </div>
  );
}

import { WidgetCard, Section, PreviewUrunMini, PreviewUrunMiniCoklu, PreviewUrunSoruCevap, PreviewUrunIncelemeleri, PreviewUrunDongu, PreviewUrunGaleri, PreviewUrunMulti, PreviewUrunSEOCoklu, PreviewUrunSEO } from '../_components';

export default function UrunPage() {
  return (
    <div className="w-full">
      <Section
        title="Ürün İncelemeleri"
        description="Müşteri yorumlarını, fotoğraflarını ve videolarını doğrudan ürün sayfalarınızda sergileyin."
        cols={3}
      >
        <WidgetCard name="Ürün Mini" preview={<PreviewUrunMini />} />
        <WidgetCard name="Ürün Mini Çoklu Kaynak" preview={<PreviewUrunMiniCoklu />} badge={{ label: 'Popüler', color: 'navy' }} />
        <WidgetCard name="Ürün Soru-Cevap" preview={<PreviewUrunSoruCevap />} />
        <WidgetCard name="Ürün İncelemeleri" preview={<PreviewUrunIncelemeleri />} />
        <WidgetCard name="Ürün Yorumları Döngüsü" preview={<PreviewUrunDongu />} />
        <WidgetCard name="Ürün İncelemeleri Galerisi" preview={<PreviewUrunGaleri />} />
        <WidgetCard name="Ürün İncelemeleri MultiSource" preview={<PreviewUrunMulti />} />
        <WidgetCard name="Ürün Yorumları Çok Kaynaklı SEO" preview={<PreviewUrunSEOCoklu />} />
        <WidgetCard name="Ürün İncelemeleri SEO" preview={<PreviewUrunSEO />} />
      </Section>
    </div>
  );
}

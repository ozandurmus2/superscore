import { WidgetCard, Section, PreviewMikroInceleme, PreviewYatay, PreviewMikroDugme, PreviewMikroKombinasyon, PreviewMikroYildiz, PreviewMikroGuven, PreviewMini, PreviewBaslangic } from '../_components';

export default function TemellerPage() {
  return (
    <div className="w-full">
      <Section
        title="Temeller"
        description="Olmazsa olmaz araçları edinin ve müşterilerinizin işletmeniz hakkında neler söylediğini paylaşın."
        cols={3}
      >
        <WidgetCard name="Mikro İnceleme Sayısı" preview={<PreviewMikroInceleme />} badge={{ label: 'Tavsiye edilen', color: 'teal' }} />
        <WidgetCard name="Yatay" preview={<PreviewYatay />} badge={{ label: 'Popüler', color: 'navy' }} />
        <WidgetCard name="Mikro Düğme" preview={<PreviewMikroDugme />} />
        <WidgetCard name="Mikro Kombinasyon" preview={<PreviewMikroKombinasyon />} badge={{ label: 'Popüler', color: 'navy' }} />
        <WidgetCard name="Mikro Yıldız" preview={<PreviewMikroYildiz />} badge={{ label: 'Popüler', color: 'navy' }} />
        <WidgetCard name="Mikro Güven Puanı" preview={<PreviewMikroGuven />} />
        <WidgetCard name="Mini" preview={<PreviewMini />} badge={{ label: 'Popüler', color: 'navy' }} />
        <WidgetCard name="Başlangıç" preview={<PreviewBaslangic />} />
      </Section>
    </div>
  );
}

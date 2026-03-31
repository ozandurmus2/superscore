import { WidgetCard, Section, PreviewAtlikarinca, PreviewYikilmak, PreviewIzgara, PreviewListe, PreviewListeFiltre, PreviewMiniAtliKarusel, PreviewAnidenBelir, PreviewAlinti, PreviewKaydirici } from '../_components';

export default function MusteriPage() {
  return (
    <div className="w-full">
      <Section
        title="Müşteri Yorumları"
        description="Müşteri yorumlarını ve referanslarını en öne ve görünür şekilde sergileyin."
        cols={3}
      >
        <WidgetCard name="Atlıkarınca" preview={<PreviewAtlikarinca />} badge={{ label: 'Popüler', color: 'navy' }} />
        <WidgetCard name="Yıkılmak" preview={<PreviewYikilmak />} />
        <WidgetCard name="Izgara" preview={<PreviewIzgara />} />
        <WidgetCard name="Liste" preview={<PreviewListe />} />
        <WidgetCard name="Liste Filtrelendi" preview={<PreviewListeFiltre />} />
        <WidgetCard name="Mini Atlı Karusel" preview={<PreviewMiniAtliKarusel />} />
        <WidgetCard name="Aniden belirmek" preview={<PreviewAnidenBelir />} />
        <WidgetCard name="Alıntı" preview={<PreviewAlinti />} />
        <WidgetCard name="Kaydırıcı" preview={<PreviewKaydirici />} />
      </Section>
    </div>
  );
}

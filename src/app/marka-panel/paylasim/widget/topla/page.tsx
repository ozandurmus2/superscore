import { WidgetCard, Section, PreviewIncelemeTopla } from '../_components';

export default function ToplaPage() {
  return (
    <div className="w-full">
      <Section
        title="Yorumları topla"
        description="Daha fazla yorum mu istiyorsunuz? Müşterilerinizden doğrudan web siteniz üzerinden geri bildirim isteyin."
        cols={1}
      >
        <WidgetCard name="İnceleme Toplayıcı" preview={<PreviewIncelemeTopla />} />
      </Section>
    </div>
  );
}

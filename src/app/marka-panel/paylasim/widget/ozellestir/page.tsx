import { WidgetCard, Section, PreviewEsnek } from '../_components';

export default function OzellestirPage() {
  return (
    <div className="w-full">
      <Section
        title="Özelleştirmek"
        description="Yeni, uyarlanabilir düzenlerle tasarlandı. Artık markanızın rengini, kategorisini ekleyebilir, boyutunu ve içeriğini özelleştirerek her müşteri etkileşim noktasında geri bildirim görüntüleyebilirsiniz."
        cols={1}
      >
        <WidgetCard name="Esnek" preview={<PreviewEsnek />} badge={{ label: 'Yeni', color: 'green' }} />
      </Section>
    </div>
  );
}

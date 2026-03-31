interface IntegrationCardProps {
  name: string;
  logo: React.ReactNode;
  badge?: 'soon';
  highlighted?: boolean;
}

export default function IntegrationCard({ name, logo, badge, highlighted }: IntegrationCardProps) {
  return (
    <div
      className="bg-white rounded-2xl border p-6 flex flex-col items-center justify-center gap-3 min-h-[160px] relative"
      style={{ borderColor: highlighted ? '#3c57bc' : '#e5e7eb', borderWidth: highlighted ? 2 : 1 }}
    >
      {badge === 'soon' && (
        <span
          className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-md"
          style={{ background: '#fef9c3', color: '#854d0e', border: '1px solid #fde68a' }}
        >
          Çok yakında
        </span>
      )}
      <div className="h-12 flex items-center justify-center">{logo}</div>
      <p className="text-sm text-[#1b1a1b] text-center font-medium">{name}</p>
    </div>
  );
}

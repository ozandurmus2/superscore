import IntegrationCard from '../IntegrationCard';

const integrations = [
  {
    name: 'Mailchimp',
    logo: <div className="text-4xl">🐒</div>,
    badge: 'soon' as const,
    highlighted: true,
  },
  {
    name: 'Klaviyo',
    logo: (
      <span className="font-black text-xl">
        klaviyo<span className="text-black">▪</span>
      </span>
    ),
    badge: 'soon' as const,
  },
  {
    name: 'Promo.com',
    logo: (
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center"
        style={{ background: '#ff3b5c' }}
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    ),
    badge: 'soon' as const,
  },
  {
    name: 'Facebook',
    logo: (
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-black"
        style={{ background: '#1877f2' }}
      >
        f
      </div>
    ),
    badge: 'soon' as const,
  },
  {
    name: 'Pinterest',
    logo: (
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-black"
        style={{ background: '#e60023' }}
      >
        P
      </div>
    ),
    badge: 'soon' as const,
  },
  {
    name: 'Google Etiket Yöneticisi',
    logo: (
      <svg viewBox="0 0 40 40" className="h-12 w-12">
        <rect
          x="10"
          y="10"
          width="20"
          height="20"
          rx="2"
          fill="#4285f4"
          transform="rotate(45 20 20)"
        />
      </svg>
    ),
    badge: 'soon' as const,
  },
];

export default function PazarlamaPage() {
  return (
    <div className="w-full p-4 md:p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {integrations.map((item, i) => (
          <IntegrationCard
            key={i}
            name={item.name}
            logo={item.logo}
            badge={item.badge}
            highlighted={item.highlighted}
          />
        ))}
      </div>
    </div>
  );
}

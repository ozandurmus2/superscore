import IntegrationCard from '../IntegrationCard';

const integrations = [
  {
    name: "API'ler",
    logo: (
      <div className="relative w-10 h-12 bg-blue-100 rounded-sm flex items-end justify-center pb-1">
        <span className="text-xs font-black text-white bg-blue-600 px-1 rounded-sm">API</span>
      </div>
    ),
    badge: 'soon' as const,
  },
  {
    name: 'Webhook Bildirimleri',
    logo: (
      <svg viewBox="0 0 40 40" fill="none" className="h-12 w-12">
        <circle cx="20" cy="20" r="18" stroke="#e91e8c" strokeWidth="3" />
        <path
          d="M13 20c0-3.866 3.134-7 7-7s7 3.134 7 7"
          stroke="#e91e8c"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="27" r="3" fill="#e91e8c" />
      </svg>
    ),
    badge: 'soon' as const,
  },
  {
    name: 'Zapier',
    logo: (
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-2xl font-black"
        style={{ background: '#ff4a00' }}
      >
        Z
      </div>
    ),
    badge: 'soon' as const,
  },
  {
    name: 'Segment',
    logo: (
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-xl"
        style={{ background: '#52bd94' }}
      >
        S
      </div>
    ),
    badge: 'soon' as const,
  },
];

export default function GelistiricilerPage() {
  return (
    <div className="w-full p-4 md:p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {integrations.map((item, i) => (
          <IntegrationCard
            key={i}
            name={item.name}
            logo={item.logo}
            badge={item.badge}
          />
        ))}
      </div>
    </div>
  );
}

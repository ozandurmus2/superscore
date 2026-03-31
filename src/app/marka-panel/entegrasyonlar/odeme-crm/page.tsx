import IntegrationCard from '../IntegrationCard';

const integrations = [
  {
    name: 'HubSpot',
    logo: <span className="text-xl font-black text-[#ff7a59]">HubSpot</span>,
    badge: 'soon' as const,
    highlighted: true,
  },
  {
    name: 'Kare',
    logo: (
      <svg viewBox="0 0 24 24" className="h-10 w-10">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#1b1a1b" />
        <rect x="7" y="7" width="10" height="10" rx="1" fill="white" />
      </svg>
    ),
    badge: 'soon' as const,
  },
  {
    name: 'PayPal',
    logo: (
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-black"
        style={{ background: '#003087' }}
      >
        P
      </div>
    ),
    badge: 'soon' as const,
  },
  {
    name: 'Salesforce',
    logo: (
      <div
        className="px-3 py-1.5 rounded-full text-white text-sm font-bold"
        style={{ background: '#00a1e0' }}
      >
        salesforce
      </div>
    ),
    badge: 'soon' as const,
  },
];

export default function OdemeCrmPage() {
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

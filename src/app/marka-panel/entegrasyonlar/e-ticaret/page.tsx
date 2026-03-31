import IntegrationCard from '../IntegrationCard';

const integrations = [
  {
    name: 'Shopify',
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/icons/integrations/shopify.svg" className="h-12 w-auto" alt="Shopify" />
    ),
  },
  {
    name: 'Wix',
    logo: <span className="text-3xl font-black tracking-tight text-black">WiX</span>,
  },
  {
    name: 'WooCommerce',
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/icons/integrations/woocommerce.svg" className="h-10 w-auto" alt="WooCommerce" />
    ),
  },
  {
    name: 'Kare',
    logo: (
      <svg viewBox="0 0 24 24" className="h-10 w-10">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#1b1a1b" />
        <rect x="7" y="7" width="10" height="10" rx="1" fill="white" />
      </svg>
    ),
  },
  {
    name: 'JavaScript Entegrasyonu',
    logo: (
      <div className="relative">
        <div className="w-10 h-12 bg-gray-100 rounded-sm flex items-end justify-center pb-1">
          <span className="text-xs font-black text-yellow-400 bg-blue-600 px-1 rounded-sm">JS</span>
        </div>
      </div>
    ),
  },
  {
    name: 'Adobe Commerce (Magento) 2.x',
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/icons/integrations/magento.svg" className="h-12 w-auto" alt="Magento" />
    ),
  },
  {
    name: 'BigCommerce',
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/icons/integrations/bigcommerce.svg" className="h-10 w-auto" alt="BigCommerce" />
    ),
  },
  {
    name: 'PrestaShop',
    logo: (
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
        style={{ background: '#df0067' }}
      >
        PS
      </div>
    ),
  },
  {
    name: 'OpenCart',
    logo: (
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: '#23a9dd' }}
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2" />
          <path d="M16 10a4 4 0 01-8 0" fill="none" stroke="white" strokeWidth="2" />
        </svg>
      </div>
    ),
  },
  {
    name: 'Shopware',
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/icons/integrations/shopware.svg" className="h-10 w-auto" alt="Shopware" />
    ),
  },
  {
    name: 'WordPress',
    logo: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/icons/integrations/wordpress.svg" className="h-10 w-auto" alt="WordPress" />
    ),
  },
];

export default function ETicaretPage() {
  return (
    <div className="w-full p-4 md:p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {integrations.map((item, i) => (
          <IntegrationCard key={i} name={item.name} logo={item.logo} />
        ))}
      </div>
    </div>
  );
}

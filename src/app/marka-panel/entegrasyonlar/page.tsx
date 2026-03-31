export default function EntegrasyonlarPage() {
  const integrations = [
    { name: 'Shopify', color: '#96bf48', letter: 'S' },
    { name: 'WooCommerce', color: '#7f54b3', letter: 'W' },
    { name: 'Magento', color: '#f26322', letter: 'M' },
    { name: 'BigCommerce', color: '#121118', letter: 'B' },
    { name: 'WordPress', color: '#21759b', letter: 'W' },
    { name: 'Shopware', color: '#189eff', letter: 'S' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-bold text-[#1b1a1b]">Entegrasyonlar</h2>
          <p className="text-sm text-gray-500 mt-1">Mağazanızı Superscore ile entegre edin.</p>
        </div>
        <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {integrations.map(i => (
            <button
              key={i.name}
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#3c57bc] hover:bg-blue-50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ background: i.color }}>
                {i.letter}
              </div>
              <span className="text-sm font-semibold text-[#1b1a1b]">{i.name}</span>
            </button>
          ))}
        </div>
        <div className="px-6 pb-6 text-center">
          <p className="text-xs text-gray-400">Daha fazla entegrasyon yakında eklenecek.</p>
        </div>
      </div>
    </div>
  );
}

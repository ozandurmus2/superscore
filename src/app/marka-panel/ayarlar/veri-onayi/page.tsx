'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0
        ${checked ? 'bg-[#1b1a1b]' : 'bg-gray-300'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
        ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

type DomainSection = {
  key: string;
  title: string;
  description: string;
  domain: string;
};

const sections: DomainSection[] = [
  {
    key: 'cookie',
    title: 'Çerez izinleri',
    description: "Superscore'un, müşterilerinizi yorum yazmaya davet etmek ve yorumlarını doğrulamak için web mağazanıza çerez yerleştireceğini kabul ediyorsunuz. Kullanıcılarınızdan onay almayı ve geçerli yasalar gerektiriyorsa, Superscore'dan üçüncü taraf çerezleri kullandığınızı belirtmek için gizlilik politikanızı güncellemeyi unutmayın.",
    domain: '',
  },
  {
    key: 'partnership',
    title: 'Ortaklık izinleri',
    description: 'Bu izin, Superscore tarafından onaylanmış entegrasyonları iş ortaklarımızla kullanmanıza olanak tanır. Aşağıdaki panel, iş ortağı entegrasyonunun kurulumu sırasında etkinleştirdiğiniz iş ortağı entegrasyonlarını gösterir. İnceleme verilerinizi bu şirketlerden herhangi biriyle paylaşmak istemiyorsanız, kontrol panelini kullanarak erişimlerini kaldırabilirsiniz.',
    domain: '',
  },
  {
    key: 'account',
    title: 'Hesap Yönetimi',
    description: "Bu ayarı etkinleştirerek Superscore'a işletme hesabınızın kurulumuna yardımcı olma veya sizin adınıza başka destek sağlama (örneğin şirket bilgilerini düzenleme) izni verebilirsiniz. İzin yalnızca seçtiğiniz alan adları için verilir. İzninizi geri çekmek için ayarı devre dışı bırakın.",
    domain: '',
  },
];

export default function VeriOnayiPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    cookie: true,
    partnership: true,
    account: true,
  });
  const [domain, setDomain] = useState('');
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase
        .from('brand_members')
        .select('brand:brands(website)')
        .eq('user_id', user.id)
        .single();
      if (member) {
        const b = (member as unknown as { brand: { website: string } }).brand;
        const d = b?.website?.replace(/^https?:\/\//, '').replace(/\/$/, '') || '';
        setDomain(d);
      }
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleAll(key: string) {
    setEnabled(e => ({ ...e, [key]: !e[key] }));
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">

      {sections.map(sec => (
        <div key={sec.key} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-5">
            <h2 className="text-base font-bold text-[#1b1a1b] mb-2">{sec.title}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{sec.description}</p>
          </div>
          {/* Domain row */}
          <div className="mx-6 mb-5 border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
              <p className="text-sm text-gray-500">Alan adları</p>
              <button
                onClick={() => toggleAll(sec.key)}
                className="text-sm text-[#3c57bc] hover:underline"
              >
                {enabled[sec.key] ? 'Tümünü devre dışı bırak' : 'Tümünü etkinleştir'}
              </button>
            </div>
            <div className="flex items-center justify-between px-4 py-3">
              <p className="text-sm text-[#1b1a1b]">{domain || 'sirket.com'}</p>
              <Toggle checked={enabled[sec.key]} onChange={v => setEnabled(e => ({ ...e, [sec.key]: v }))} />
            </div>
          </div>
        </div>
      ))}

      {/* Privacy info box */}
      <div className="bg-white rounded-2xl border border-gray-200 px-6 py-5">
        <div className="flex items-start gap-4">
          {/* Shield icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3c57bc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4" strokeWidth="1.5"/>
            </svg>
          </div>
          <div>
            <p className="text-base font-bold text-[#1b1a1b] mb-2">Gizliliğe büyük önem veriyoruz.</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Veri güvenliği veya korumasıyla ilgili herhangi bir sorunuz varsa, lütfen Superscore&apos;un Gizlilik Ekibiyle{' '}
              <a href="mailto:privacy@superscore.com" className="text-[#3c57bc] hover:underline">
                privacy@superscore.com
              </a>{' '}
              adresinden iletişime geçin.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

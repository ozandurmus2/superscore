'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function VerifiedPage() {
  const [domain, setDomain] = useState('');
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: membership } = await supabase.from('brand_members').select('brand_id').eq('user_id', user.id).single();
        if (membership) {
          const { data: brand } = await supabase.from('brands').select('website').eq('id', membership.brand_id).single();
          if (brand?.website) {
            setDomain(brand.website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]);
            // Mark brand as verified
            await supabase.from('brands').update({ is_verified: true }).eq('id', membership.brand_id);
          }
        }
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f0ed] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-200 p-12 md:p-16 max-w-lg w-full text-center">
        {/* Check icon */}
        <div className="w-16 h-16 mx-auto mb-8 bg-[#52b37f] rounded-full flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p className="text-lg text-[#1b1a1b] mb-1">
          Domaininiz <strong>{domain || '...'}</strong> doğrulanmıştır.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Superscore Business&apos;ı kullanmaya başlamak için giriş yapın.
        </p>

        <button
          onClick={() => { window.location.href = '/marka-panel'; }}
          className="px-10 py-3.5 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2e449a] transition-colors"
        >
          Giriş yap
        </button>
      </div>
    </div>
  );
}

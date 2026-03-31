'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${checked ? 'bg-[#0e291d] border-[#0e291d]' : 'border-gray-300 group-hover:border-gray-400'}`}
      >
        {checked && (
          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-sm text-[#1b1a1b]">{label}</span>
    </label>
  );
}

export default function EpostaBildirimleriPage() {
  const [brandName, setBrandName] = useState('Markanız');
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase
        .from('brand_members')
        .select('brand_id')
        .eq('user_id', user.id)
        .single();
      if (!member) return;
      const { data: brand } = await supabase
        .from('brands')
        .select('name')
        .eq('id', member.brand_id)
        .single();
      if (brand?.name) setBrandName(brand.name);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [bulten, setBulten] = useState(false);

  const [hizmet, setHizmet] = useState({
    s12: true,
    s3: true,
    s45: true,
  });

  const [urun, setUrun] = useState({
    s12: false,
    s3: false,
    s45: false,
    moderation: false,
    flagged: false,
    published: false,
    qa: false,
    replies: false,
  });

  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4">

      {/* ─── Superscore bülteni ─── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-bold text-[#1b1a1b]">Superscore&apos;un bülteni</h2>
        </div>
        <div className="px-6 py-5">
          <Checkbox
            checked={bulten}
            onChange={setBulten}
            label="Superscore'dan haber bültenlerini ve ürün güncellemelerini almak istiyorum."
          />
        </div>
      </div>

      {/* ─── Hizmet değerlendirmeleri ─── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-bold text-[#1b1a1b]">{brandName} için hizmet değerlendirmeleri</h2>
          <p className="text-xs text-gray-500 mt-1">Lütfen bana şu konularda e-posta gönderin:</p>
        </div>
        <div className="px-6 py-5 space-y-4">
          <Checkbox
            checked={hizmet.s12}
            onChange={v => setHizmet(h => ({ ...h, s12: v }))}
            label="1-2 yıldızlı yeni yorumlar"
          />
          <Checkbox
            checked={hizmet.s3}
            onChange={v => setHizmet(h => ({ ...h, s3: v }))}
            label="3 yıldızlı yeni yorumlar"
          />
          <Checkbox
            checked={hizmet.s45}
            onChange={v => setHizmet(h => ({ ...h, s45: v }))}
            label="4-5 yıldızlı yeni yorumlar"
          />
        </div>
      </div>

      {/* ─── Ürün yorumları ─── */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-base font-bold text-[#1b1a1b]">{brandName} ürünleri hakkında yorumlar</h2>
          <p className="text-xs text-gray-500 mt-1">Lütfen bana şu konularda e-posta gönderin:</p>
        </div>
        <div className="px-6 py-5 space-y-4">
          <Checkbox
            checked={urun.s12}
            onChange={v => setUrun(u => ({ ...u, s12: v }))}
            label="1-2 yıldızlı yeni ürün yorumları"
          />
          <Checkbox
            checked={urun.s3}
            onChange={v => setUrun(u => ({ ...u, s3: v }))}
            label="3 yıldızlı yeni ürün yorumları"
          />
          <Checkbox
            checked={urun.s45}
            onChange={v => setUrun(u => ({ ...u, s45: v }))}
            label="4-5 yıldızlı yeni ürün yorumları"
          />
          <div className="border-t border-gray-100 pt-4 space-y-4">
            <Checkbox
              checked={urun.moderation}
              onChange={v => setUrun(u => ({ ...u, moderation: v }))}
              label="Moderasyon gerektiren yorumlar"
            />
            <Checkbox
              checked={urun.flagged}
              onChange={v => setUrun(u => ({ ...u, flagged: v }))}
              label="İşaretlenen yorumlar"
            />
            <Checkbox
              checked={urun.published}
              onChange={v => setUrun(u => ({ ...u, published: v }))}
              label="Yayınlanan yorumlar"
            />
            <Checkbox
              checked={urun.qa}
              onChange={v => setUrun(u => ({ ...u, qa: v }))}
              label="Yeni soru ve cevaplar"
            />
            <Checkbox
              checked={urun.replies}
              onChange={v => setUrun(u => ({ ...u, replies: v }))}
              label="Yorumlara verilen yanıtlar"
            />
          </div>
        </div>
      </div>

      <button
        onClick={save}
        className="px-6 py-2.5 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2c47ac] transition-colors"
      >
        {saved ? '✓ Değişiklikler kaydedildi' : 'Değişiklikleri kaydet'}
      </button>

    </div>
  );
}

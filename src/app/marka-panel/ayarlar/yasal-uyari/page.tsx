'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function YasalUyariPage() {
  const [form, setForm] = useState({
    legal_name: '',
    registration_number: '',
    legal_address: '',
    legal_email: '',
  });
  const [brandId, setBrandId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase
        .from('brand_members')
        .select('brand_id, brand:brands(*)')
        .eq('user_id', user.id)
        .single();
      if (member) {
        const m = member as unknown as { brand_id: string; brand: Record<string, string> };
        setBrandId(m.brand_id);
        const b = m.brand;
        setForm({
          legal_name: b.legal_name || '',
          registration_number: b.registration_number || '',
          legal_address: b.legal_address || '',
          legal_email: b.legal_email || b.contact_email || '',
        });
      }
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save() {
    if (!brandId) return;
    setSaving(true);
    await supabase.from('brands').update(form as never).eq('id', brandId);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (loading) return (
    <div className="max-w-5xl mx-auto">
      <div className="flex gap-6">
        <div className="flex-1 h-96 bg-gray-100 rounded-2xl animate-pulse" />
        <div className="w-72 h-80 bg-gray-100 rounded-2xl animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
    <div className="flex gap-6 items-start">

      {/* ─── Left: form card ─── */}
      <div className="flex-1 bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6">
          <h2 className="text-base font-bold text-[#1b1a1b] mb-1">
            Davetiyelerinize yasal bir uyarı ekleyin (optimize edilmiş şablon)
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Uluslararası ticari mesajlaşma ve spam karşıtı yasalara uymak için lütfen yasal bildirim
            özelliğimizi etkinleştirin ve gerekli bilgileri doldurun.
          </p>

          {/* ── Yasal bilgiler ── */}
          <p className="text-sm font-bold text-[#1b1a1b] mb-3">Yasal bilgiler</p>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                İşletmenin yasal adı: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.legal_name}
                onChange={e => setForm(f => ({ ...f, legal_name: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-[#1b1a1b] focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30 focus:border-[#3c57bc]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                İşletme kayıt numarası: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.registration_number}
                onChange={e => setForm(f => ({ ...f, registration_number: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-[#1b1a1b] focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30 focus:border-[#3c57bc]"
              />
            </div>
          </div>

          {/* ── İletişim bilgileri ── */}
          <p className="text-sm font-bold text-[#1b1a1b] mb-3">İletişim bilgileri</p>
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Adres: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.legal_address}
                onChange={e => setForm(f => ({ ...f, legal_address: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-[#1b1a1b] focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30 focus:border-[#3c57bc]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                E-posta adresi: <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={form.legal_email}
                onChange={e => setForm(f => ({ ...f, legal_email: e.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-[#1b1a1b] focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30 focus:border-[#3c57bc]"
              />
            </div>
          </div>

          {/* ── Save button ── */}
          <button
            onClick={save}
            disabled={saving}
            className="w-full py-3.5 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2c47ac] transition-colors disabled:opacity-60"
          >
            {saved ? '✓ Değişiklikler kaydedildi' : saving ? 'Kaydediliyor...' : 'Değişiklikleri kaydet'}
          </button>
        </div>
      </div>

      {/* ─── Right: info card ─── */}
      <div className="w-72 flex-shrink-0 bg-white rounded-2xl border border-gray-200 p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
            <span className="text-[#3c57bc] font-bold text-lg">§</span>
          </div>
          <p className="text-base font-bold text-[#1b1a1b] leading-snug">Yasal bildirim nedir?</p>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          Yasal bildirim, bazı ticari içeriklerde yasal olarak yer vermeniz gereken şirket bilgileridir.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mb-5">
          CAN-SPAM Yasası ve diğer mesajlaşma yasalarına uyumlu olmak için, bu özelliği
          etkinleştirmeniz yeterlidir; yasal bildiriminiz tüm davetiyelerinizin altbilgisinde
          gösterilecektir.
        </p>

        {/* Email mockup */}
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-3 overflow-hidden">
          {/* Window chrome */}
          <div className="flex items-center gap-1 mb-3">
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
          {/* Email body lines */}
          <div className="space-y-1.5 mb-3">
            <div className="h-2 bg-blue-200 rounded w-3/4" />
            <div className="h-1.5 bg-gray-200 rounded w-full" />
            <div className="h-1.5 bg-gray-200 rounded w-5/6" />
          </div>
          {/* Star rating */}
          <div className="flex gap-1 mb-3">
            {[1,2,3,4,5].map(s => (
              <div key={s} className="w-5 h-5 bg-[#3c57bc] rounded-sm" />
            ))}
          </div>
          {/* More lines */}
          <div className="space-y-1.5 mb-4">
            <div className="h-1.5 bg-gray-200 rounded w-4/6" />
            <div className="h-1.5 bg-gray-200 rounded w-3/6" />
          </div>
          {/* Legal footer box — red border = the legal notice */}
          <div className="border-2 border-red-400 rounded-lg p-2.5 flex items-center gap-2">
            <div className="h-1.5 bg-gray-300 rounded w-16 flex-shrink-0" />
            <div className="h-1.5 bg-gray-300 rounded flex-1" />
          </div>
        </div>
      </div>

    </div>
    </div>
  );
}

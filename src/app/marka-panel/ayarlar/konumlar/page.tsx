'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { MapPin, Trash2 } from 'lucide-react';

type Location = {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
};

export default function KonumlarPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [brandId, setBrandId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', address: '', city: '', country: 'Türkiye' });
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase
        .from('brand_members').select('brand_id').eq('user_id', user.id).single();
      if (!member) return;
      const bid = (member as unknown as { brand_id: string }).brand_id;
      setBrandId(bid);
      const { data } = await supabase
        .from('brand_locations').select('*').eq('brand_id', bid).order('created_at');
      setLocations((data || []) as Location[]);
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function addLocation() {
    if (!brandId || !form.name) return;
    setSaving(true);
    const { data } = await supabase
      .from('brand_locations').insert({ brand_id: brandId, ...form }).select().single();
    if (data) setLocations(prev => [...prev, data as Location]);
    setForm({ name: '', address: '', city: '', country: 'Türkiye' });
    setShowAdd(false);
    setSaving(false);
  }

  async function removeLocation(id: string) {
    await supabase.from('brand_locations').delete().eq('id', id);
    setLocations(prev => prev.filter(l => l.id !== id));
  }

  // If we have locations, show them in a list
  if (!loading && locations.length > 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-[#1b1a1b]">Konumlar</h1>
          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2c47ac] transition-colors"
          >
            + Konum ekle
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-4">
          {locations.map((loc, idx) => (
            <div key={loc.id} className={`flex items-center gap-4 px-6 py-4 ${idx < locations.length - 1 ? 'border-b border-gray-50' : ''}`}>
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4 text-[#3c57bc]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1b1a1b]">{loc.name}</p>
                <p className="text-xs text-gray-400 truncate">{[loc.address, loc.city, loc.country].filter(Boolean).join(', ')}</p>
              </div>
              <button onClick={() => removeLocation(loc.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        {showAdd && <AddForm form={form} setForm={setForm} onSave={addLocation} onCancel={() => setShowAdd(false)} saving={saving} />}
      </div>
    );
  }

  // Empty state — Trustpilot style two-column
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex gap-6 items-start">

        {/* Left card */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200 p-10 flex flex-col items-center text-center">
          {/* Pin icon */}
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-5">
            <MapPin className="h-7 w-7 text-[#3c57bc]" />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-xs">
            Tüm lokasyonlarınızı kolayca içe aktarın ve hemen onlar için yorum toplamaya başlayın.
          </p>
          <button
            onClick={() => setShowAdd(true)}
            className="px-8 py-3 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2c47ac] transition-colors mb-3"
          >
            İthalat konumları
          </button>
          <button
            onClick={() => setShowAdd(true)}
            className="text-sm text-gray-500 hover:text-[#1b1a1b] transition-colors"
          >
            Konumları manuel olarak ekleyin
          </button>

          {showAdd && (
            <div className="mt-6 w-full text-left">
              <AddForm form={form} setForm={setForm} onSave={addLocation} onCancel={() => setShowAdd(false)} saving={saving} />
            </div>
          )}
        </div>

        {/* Right benefits */}
        <div className="w-72 flex-shrink-0 space-y-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              {/* Search/location icon */}
              <svg className="w-4 h-4 text-[#3c57bc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-[#1b1a1b] mb-0.5">Yerel arama sonuçlarında daha üst sıralarda yer alın.</p>
              <p className="text-xs text-gray-500 leading-relaxed">Konuma özel profil sayfaları, yerel arama sonuçlarında öne çıkmanızı sağlayan zengin içerikli özetler içerir.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              {/* Shield/trust icon */}
              <svg className="w-4 h-4 text-[#3c57bc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-[#1b1a1b] mb-0.5">Yerel düzeyde müşteri güvenini artırın</p>
              <p className="text-xs text-gray-500 leading-relaxed">Her bir şubeniz için elde edilen Güven Puanları, müşterilerinize şehrin en iyi hizmetini sunduğunuza dair daha da fazla güven verir.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
              {/* Chart/reputation icon */}
              <svg className="w-4 h-4 text-[#3c57bc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-[#1b1a1b] mb-0.5">Konumlarınızın itibarını yönetin.</p>
              <p className="text-xs text-gray-500 leading-relaxed">Tüm şubelerinizin müşteri memnuniyet düzeyini daha iyi anlayın.</p>
            </div>
          </div>

          <button className="px-5 py-2.5 bg-blue-50 text-[#3c57bc] text-sm font-semibold rounded-full hover:bg-blue-100 transition-colors">
            Daha fazla bilgi edin
          </button>
        </div>
      </div>
    </div>
  );
}

function AddForm({
  form, setForm, onSave, onCancel, saving,
}: {
  form: { name: string; address: string; city: string; country: string };
  setForm: (fn: (f: typeof form) => typeof form) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3 mt-4">
      <p className="text-sm font-bold text-[#1b1a1b]">Yeni konum</p>
      <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Konum adı *"
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30" />
      <input type="text" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Adres"
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30" />
      <div className="grid grid-cols-2 gap-3">
        <input type="text" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="Şehir"
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30" />
        <input type="text" value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
          className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30" />
      </div>
      <div className="flex gap-3">
        <button onClick={onSave} disabled={saving || !form.name}
          className="px-5 py-2 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2c47ac] transition-colors disabled:opacity-50">
          {saving ? 'Ekleniyor...' : 'Ekle'}
        </button>
        <button onClick={onCancel}
          className="px-5 py-2 border border-gray-200 text-sm font-medium text-gray-600 rounded-full hover:bg-gray-50 transition-colors">
          İptal
        </button>
      </div>
    </div>
  );
}

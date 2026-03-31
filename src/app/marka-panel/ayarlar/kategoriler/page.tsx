'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Search } from 'lucide-react';

const ALL_CATEGORIES = [
  'E-ticaret', 'Giyim & Moda', 'Elektronik', 'Gıda & İçecek', 'Sağlık & Güzellik',
  'Ev & Dekorasyon', 'Spor & Outdoor', 'Kitap & Eğitim', 'Turizm & Seyahat',
  'Otomotiv', 'Finans & Sigorta', 'Teknoloji', 'Mobilya', 'Oyuncak & Oyun',
  'Evcil Hayvan', 'Bahçe & Tarım', 'Sanat & El Sanatları', 'Müzik', 'Film & Eğlence',
  'Yazılım & SaaS', 'Temizlik & Bakım', 'Medikal & Sağlık Hizmetleri', 'Gayrimenkul',
  'İnşaat & Yapı', 'Hukuk & Danışmanlık', 'Eğitim & Kurs', 'Lojistik & Kargo',
];

export default function KategorilerPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [brandId, setBrandId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase
        .from('brand_members')
        .select('brand_id, brand:brands(categories)')
        .eq('user_id', user.id)
        .single();
      if (member) {
        const m = member as unknown as { brand_id: string; brand: { categories: string[] } };
        setBrandId(m.brand_id);
        setSelected(m.brand?.categories || []);
      }
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = ALL_CATEGORIES.filter(c =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  function addCategory(cat: string) {
    if (selected.length >= 6 || selected.includes(cat)) return;
    setSelected(prev => [...prev, cat]);
    setSearch('');
    setShowDropdown(false);
  }

  async function handleAdd() {
    const match = ALL_CATEGORIES.find(c => c.toLowerCase() === search.toLowerCase());
    if (match) {
      addCategory(match);
    } else if (search.trim()) {
      addCategory(search.trim());
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5">
          <h1 className="text-base font-bold text-[#1b1a1b] mb-1.5">Bir kategori seçin</h1>
          <p className="text-sm text-gray-600 leading-relaxed mb-5">
            Superscore&apos;da ve arama sonuçlarında öne çıkmak için şirketinizi uygun kategoriye yerleştirin.
            Şirketinizi en fazla 6 kategoriye (1 birincil, 5 ikincil) ekleyebilirsiniz.{' '}
            <button className="text-[#3c57bc] hover:underline inline-flex items-center gap-0.5">
              Daha fazla bilgi edinin.
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
            </button>
          </p>

          {/* Search + add */}
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setShowDropdown(true); }}
                onFocus={() => setShowDropdown(true)}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                placeholder="Arama kategorileri"
                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-sm text-[#1b1a1b] focus:outline-none focus:ring-2 focus:ring-[#3c57bc]/30 focus:border-[#3c57bc]"
              />
              {/* Dropdown */}
              {showDropdown && search && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-56 overflow-y-auto">
                  {filtered.length === 0 ? (
                    <p className="px-4 py-3 text-sm text-gray-400">Sonuç bulunamadı.</p>
                  ) : filtered.map(cat => (
                    <button
                      key={cat}
                      onMouseDown={() => addCategory(cat)}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${selected.includes(cat) ? 'text-gray-400 cursor-not-allowed' : 'text-[#1b1a1b]'}`}
                    >
                      {cat} {selected.includes(cat) && '(seçili)'}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={handleAdd}
              disabled={!search.trim() || selected.length >= 6}
              className="px-5 py-3 bg-gray-100 text-gray-500 text-sm font-semibold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              + Ekle
            </button>
          </div>

          {/* Selected tags */}
          {selected.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selected.map((cat, idx) => (
                <span key={cat} className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border ${idx === 0 ? 'bg-[#0e291d] text-white border-[#0e291d]' : 'bg-white text-[#1b1a1b] border-gray-300'}`}>
                  {idx === 0 && <span className="text-xs opacity-70 mr-0.5">✦</span>}
                  {cat}
                  <button
                    onClick={() => setSelected(s => s.filter(c => c !== cat))}
                    className="ml-0.5 hover:opacity-70 transition-opacity"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M2 2l8 8M10 2l-8 8"/>
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-[#3c57bc] hover:underline mt-4 inline-block"
          >
            {showAll ? 'Gizle' : 'veya tüm kategorileri görüntüle'}
          </button>

          {/* All categories grid */}
          {showAll && (
            <div className="mt-3 flex flex-wrap gap-2">
              {ALL_CATEGORIES.filter(c => !selected.includes(c)).map(cat => (
                <button
                  key={cat}
                  onClick={() => addCategory(cat)}
                  disabled={selected.length >= 6}
                  className="px-3 py-1.5 border border-gray-200 text-sm text-gray-600 rounded-full hover:border-[#1b1a1b] hover:text-[#1b1a1b] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Save bar */}
        {selected.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-xs text-gray-500">{selected.length}/6 kategori seçildi · İlk kategori birincil</p>
            <button
              onClick={async () => {
                if (!brandId) return;
                setSaving(true);
                await supabase.from('brands').update({ categories: selected } as never).eq('id', brandId);
                setSaving(false);
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
              }}
              disabled={saving}
              className="px-5 py-2 bg-[#3c57bc] text-white text-sm font-semibold rounded-full hover:bg-[#2c47ac] transition-colors disabled:opacity-50"
            >
              {saved ? '✓ Kaydedildi' : 'Kaydet'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

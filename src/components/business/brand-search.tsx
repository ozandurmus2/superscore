'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Search, Loader2 } from 'lucide-react';
import { StarRating } from '@/components/ui/star-rating';

interface BrandResult {
  id: string;
  name: string;
  slug: string;
  website: string | null;
  avg_rating: number | null;
  total_complaints: number;
}

export function BusinessBrandSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BrandResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length < 2) { setResults([]); setShowDropdown(false); return; }
      setLoading(true);
      const { data } = await supabase.from('brands').select('id, name, slug, website, avg_rating, total_complaints').ilike('name', `%${query}%`).order('total_complaints', { ascending: false }).limit(6);
      setResults((data as BrandResult[]) || []);
      setShowDropdown(true);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <section className="bg-[#f3f0ed] py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-superscore-bold text-xl md:text-2xl text-[#1b1a1b] mb-8">
          Markanız hakkında ne söylüyorlar? Hemen kontrol edin:
        </h2>
        <div className="max-w-lg mx-auto relative" ref={dropdownRef}>
          <div className="flex items-center bg-white rounded-full border-2 border-[#1b1a1b] p-1.5">
            <Search className="h-5 w-5 text-gray-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Marka adınızı yazın..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.length >= 2 && setShowDropdown(true)}
              className="flex-1 px-4 py-3 text-base outline-none bg-transparent placeholder:text-gray-400"
            />
            {loading && <Loader2 className="h-5 w-5 text-gray-400 animate-spin mr-2" />}
            <button
              onClick={() => {
                if (results.length > 0) router.push(`/markalar/${results[0].slug}`);
                else if (query.trim()) router.push(`/markalar?q=${encodeURIComponent(query)}`);
              }}
              className="px-6 py-3 bg-[#1b1a1b] text-white text-sm font-semibold rounded-full hover:bg-[#333] transition-colors"
            >
              Kontrol Et
            </button>
          </div>

          {/* Dropdown */}
          {showDropdown && query.trim().length >= 2 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-gray-100 z-50 overflow-hidden text-left">
              {results.length > 0 ? results.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => { router.push(`/markalar/${brand.slug}`); setShowDropdown(false); }}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-semibold text-sm text-[#1b1a1b]">{brand.name}</p>
                    <p className="text-xs text-gray-400">{brand.website || ''} {brand.total_complaints > 0 ? `· ${brand.total_complaints} şikayet` : ''}</p>
                  </div>
                  <StarRating rating={brand.avg_rating || 0} size="xs" showScore />
                </button>
              )) : !loading ? (
                <div className="p-5 text-center">
                  <p className="text-sm text-gray-500 mb-2">Marka bulunamadı</p>
                  <button onClick={() => router.push('/kayit?tab=brand')} className="text-sm text-[#3c57bc] hover:underline font-medium">
                    Markanızı ücretsiz kaydedin
                  </button>
                </div>
              ) : null}
            </div>
          )}

          <p className="text-sm text-gray-400 mt-3">* Örnek: Trendyol, JB Step, LC Waikiki</p>
        </div>
      </div>
    </section>
  );
}

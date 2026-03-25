'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Search, Building2, Plus, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BrandResult {
  id: string;
  name: string;
  slug: string;
  category: string;
  superscore: number;
  total_complaints: number;
}

export function HeroSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BrandResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length < 2) {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      setLoading(true);
      const { data } = await supabase
        .from('brands')
        .select('id, name, slug, category, superscore, total_complaints')
        .ilike('name', `%${query}%`)
        .order('superscore', { ascending: false })
        .limit(5);

      setResults((data as BrandResult[]) || []);
      setShowDropdown(true);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  function goToComplaint(brandSlug?: string) {
    if (brandSlug) {
      router.push(`/panel/sikayet-yaz?marka=${brandSlug}`);
    } else {
      router.push(`/panel/sikayet-yaz?yeni=${encodeURIComponent(query)}`);
    }
  }

  function getScoreColor(score: number) {
    if (score >= 70) return 'text-green-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  }

  return (
    <div className="max-w-xl mx-auto mb-8 relative" ref={dropdownRef}>
      <div className="flex gap-2 bg-white rounded-xl p-2 shadow-lg">
        <div className="flex-1 flex items-center gap-2 px-3">
          <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Şikayet yazacağınız markayı arayın..."
            className="w-full py-2 text-gray-800 outline-none text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setShowDropdown(true)}
          />
          {loading && <Loader2 className="h-4 w-4 text-gray-400 animate-spin flex-shrink-0" />}
        </div>
        <Button
          size="lg"
          onClick={() => {
            if (results.length > 0) {
              goToComplaint(results[0].slug);
            } else if (query.trim()) {
              goToComplaint();
            } else {
              inputRef.current?.focus();
            }
          }}
        >
          Şikayet Yaz
        </Button>
      </div>

      {/* Search Results Dropdown */}
      {showDropdown && query.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border z-50 overflow-hidden">
          {results.length > 0 ? (
            <>
              {results.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => goToComplaint(brand.slug)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b last:border-0"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1B1F3B] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {brand.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{brand.name}</p>
                    <p className="text-xs text-gray-500">{brand.category} · {brand.total_complaints} şikayet</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`text-sm font-bold ${getScoreColor(brand.superscore)}`}>
                      {brand.superscore}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </button>
              ))}
            </>
          ) : (
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-gray-900">Marka bulunamadı</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Henüz Superscore&apos;da listelenmemiş olabilir. Ekleyin ve ilk şikayeti yazan siz olun.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => goToComplaint()}
                  className="flex-shrink-0 ml-4"
                >
                  <Plus className="h-4 w-4" /> Marka Ekle
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

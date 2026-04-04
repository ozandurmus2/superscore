'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SuperscoreBadge } from '@/components/brand/superscore-badge';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { BRAND_CATEGORIES } from '@/types';
import { Search, Star, Building2 } from 'lucide-react';
import Image from 'next/image';
import type { Brand } from '@/types';

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchBrands();
  }, [search, category]);

  async function fetchBrands() {
    setLoading(true);
    let query = supabase.from('brands').select('*').order('superscore', { ascending: false });
    if (search) query = query.ilike('name', `%${search}%`);
    if (category && category !== 'all') query = query.eq('category', category);
    const { data } = await query;
    setBrands((data as Brand[]) || []);
    setLoading(false);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1B1F3B] mb-2">Markalar</h1>
        <p className="text-gray-500">Tüm markaları keşfedin ve güven puanlarını görün</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Marka ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Kategoriler</SelectItem>
            {BRAND_CATEGORIES.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6"><div className="h-24 bg-gray-100 rounded" /></CardContent>
            </Card>
          ))}
        </div>
      ) : brands.length === 0 ? (
        <div className="text-center py-20">
          <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Marka bulunamadı</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <Link key={brand.id} href={`/markalar/${brand.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {brand.logo_url ? (
                        <Image src={brand.logo_url} alt={brand.name} width={56} height={56} className="w-14 h-14 rounded-full object-contain bg-gray-50 border border-gray-100" />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-[#1B1F3B] flex items-center justify-center text-white font-bold text-xl">
                          {brand.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{brand.name}</h3>
                        <Badge variant="secondary">{brand.category}</Badge>
                      </div>
                    </div>
                    <SuperscoreBadge score={brand.superscore} size="sm" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="font-semibold text-[#1B1F3B]">{brand.total_complaints}</div>
                      <div className="text-gray-500 text-xs">Şikayet</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="font-semibold text-green-600">{brand.resolved_complaints}</div>
                      <div className="text-gray-500 text-xs">Çözülen</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-2">
                      <div className="font-semibold text-yellow-600 flex items-center justify-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {brand.avg_rating || '-'}
                      </div>
                      <div className="text-gray-500 text-xs">Puan</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

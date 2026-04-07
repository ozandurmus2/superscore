'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BrandLogo } from '@/components/brand/brand-logo';
import { Search, ShieldCheck, ShieldX, Loader2 } from 'lucide-react';
import type { Brand } from '@/types';

type BrandFilter = 'all' | 'verified' | 'subscribed' | 'unverified';

function getScoreColor(score: number) {
  if (score >= 80) return 'bg-green-100 text-green-700';
  if (score >= 50) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
}

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<BrandFilter>('all');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchBrands();
  }, [search, filter]);

  async function fetchBrands() {
    setLoading(true);
    let query = supabase
      .from('brands')
      .select('*')
      .order('total_complaints', { ascending: false })
      .limit(50);

    if (search) query = query.ilike('name', `%${search}%`);
    if (filter === 'verified') query = query.eq('is_verified', true);
    if (filter === 'subscribed') query = query.eq('is_subscribed', true);
    if (filter === 'unverified') query = query.eq('is_verified', false);

    const { data } = await query;
    setBrands((data as Brand[]) || []);
    setLoading(false);
  }

  async function toggleVerify(brand: Brand, e: React.MouseEvent) {
    e.stopPropagation();
    await supabase.from('brands').update({ is_verified: !brand.is_verified }).eq('id', brand.id);
    setBrands((prev) =>
      prev.map((b) => (b.id === brand.id ? { ...b, is_verified: !b.is_verified } : b))
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B1F3B]">Markalar</h1>
        <p className="text-sm text-gray-500 mt-1">Toplam {brands.length} marka</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Marka ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 max-w-md"
        />
      </div>

      {/* Filter tabs */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as BrandFilter)} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Tumu</TabsTrigger>
          <TabsTrigger value="verified">Dogrulanmis</TabsTrigger>
          <TabsTrigger value="subscribed">Abone</TabsTrigger>
          <TabsTrigger value="unverified">Dogrulanmamis</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-4 py-3 font-medium text-gray-500 text-xs">Logo</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs">Marka Adi</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs hidden md:table-cell">Kategori</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs">Superscore</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs hidden md:table-cell">Sikayet</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs hidden lg:table-cell">Cozum Orani</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs">Durum</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs text-right">Islem</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400 mx-auto" />
                  </td>
                </tr>
              ) : brands.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    Marka bulunamadi
                  </td>
                </tr>
              ) : (
                brands.map((b) => {
                  const resolutionRate =
                    b.total_complaints > 0
                      ? Math.round((b.resolved_complaints / b.total_complaints) * 100)
                      : 0;
                  return (
                    <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <BrandLogo name={b.name} logoUrl={b.logo_url} size={36} />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{b.name}</span>
                          {b.is_verified && <ShieldCheck className="h-4 w-4 text-green-500 flex-shrink-0" />}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{b.category}</td>
                      <td className="px-4 py-3">
                        <Badge className={getScoreColor(b.superscore)} variant="secondary">
                          {b.superscore}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{b.total_complaints}</td>
                      <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">%{resolutionRate}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {b.is_verified && (
                            <Badge variant="success" className="text-[10px]">Dogrulanmis</Badge>
                          )}
                          {b.is_subscribed && (
                            <Badge variant="default" className="text-[10px]">Abone</Badge>
                          )}
                          {!b.is_verified && !b.is_subscribed && (
                            <Badge variant="secondary" className="text-[10px]">Yeni</Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          size="sm"
                          variant={b.is_verified ? 'outline' : 'success'}
                          onClick={(e) => toggleVerify(b, e)}
                          className="text-xs"
                        >
                          {b.is_verified ? (
                            <>
                              <ShieldX className="h-3 w-3" /> Kaldir
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="h-3 w-3" /> Dogrula
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SuperscoreBadge } from '@/components/brand/superscore-badge';
import { Search, ShieldCheck, ShieldX } from 'lucide-react';
import type { Brand } from '@/types';

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [search, setSearch] = useState('');
  const supabase = createClient();

  useEffect(() => { fetchBrands(); }, [search]);

  async function fetchBrands() {
    let query = supabase.from('brands').select('*').order('created_at', { ascending: false });
    if (search) query = query.ilike('name', `%${search}%`);
    const { data } = await query;
    setBrands((data as Brand[]) || []);
  }

  async function toggleVerify(brand: Brand) {
    await supabase.from('brands').update({ is_verified: !brand.is_verified }).eq('id', brand.id);
    fetchBrands();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">Markalar</h1>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Marka ara..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 max-w-md" />
      </div>
      <div className="space-y-3">
        {brands.map((b) => (
          <Card key={b.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1B1F3B] flex items-center justify-center text-white font-bold">{b.name.charAt(0)}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{b.name}</span>
                    {b.is_verified && <ShieldCheck className="h-4 w-4 text-green-500" />}
                    <Badge variant="secondary">{b.category}</Badge>
                    {b.is_subscribed && <Badge variant="success">Abone</Badge>}
                  </div>
                  <p className="text-xs text-gray-500">{b.total_complaints} şikayet &middot; {b.resolved_complaints} çözülen</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <SuperscoreBadge score={b.superscore} size="sm" showLabel={false} />
                <Button size="sm" variant={b.is_verified ? 'destructive' : 'success'} onClick={() => toggleVerify(b)}>
                  {b.is_verified ? <><ShieldX className="h-3 w-3" /> Kaldır</> : <><ShieldCheck className="h-3 w-3" /> Doğrula</>}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

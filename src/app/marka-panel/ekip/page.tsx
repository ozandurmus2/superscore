'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { UserPlus, Trash2, Users } from 'lucide-react';
import type { BrandMember, User } from '@/types';

export default function TeamPage() {
  const [members, setMembers] = useState<(BrandMember & { user: User })[]>([]);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [brandId, setBrandId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: member } = await supabase.from('brand_members').select('brand_id').eq('user_id', user.id).single();
      if (!member) return;
      const bid = (member as { brand_id: string }).brand_id;
      setBrandId(bid);

      const { data } = await supabase.from('brand_members').select('*, user:users(*)').eq('brand_id', bid);
      setMembers((data as (BrandMember & { user: User })[]) || []);
    }
    load();
  }, []);

  async function inviteMember() {
    if (!email || !brandId) return;
    setLoading(true);
    // Find user by email
    const { data: user } = await supabase.from('users').select('id').eq('email', email).single();
    if (user) {
      await supabase.from('brand_members').insert({ brand_id: brandId, user_id: (user as { id: string }).id, role: 'agent' });
      setEmail('');
      // Reload
      const { data } = await supabase.from('brand_members').select('*, user:users(*)').eq('brand_id', brandId);
      setMembers((data as (BrandMember & { user: User })[]) || []);
    }
    setLoading(false);
  }

  const roleLabels = { owner: 'Sahip', admin: 'Yönetici', agent: 'Temsilci' };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">Ekip Yönetimi</h1>

      <Card className="mb-6">
        <CardHeader><CardTitle className="text-base">Ekip Üyesi Davet Et</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input placeholder="E-posta adresi" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1" />
            <Button onClick={inviteMember} disabled={loading || !email}>
              <UserPlus className="h-4 w-4" /> Davet Et
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Users className="h-5 w-5" /> Ekip Üyeleri ({members.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {members.map((m) => (
              <div key={m.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1B1F3B] flex items-center justify-center text-white text-sm">
                    {m.user?.full_name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{m.user?.full_name}</p>
                    <p className="text-xs text-gray-500">{m.user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{roleLabels[m.role]}</Badge>
                  <span className="text-xs text-gray-400">{formatDate(m.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

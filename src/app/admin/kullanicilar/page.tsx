'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/utils';
import { Search } from 'lucide-react';
import type { User } from '@/types';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      let query = supabase.from('users').select('*').order('created_at', { ascending: false });
      if (search) query = query.ilike('full_name', `%${search}%`);
      const { data } = await query;
      setUsers((data as User[]) || []);
    }
    load();
  }, [search]);

  const roleLabels = { customer: 'Müşteri', brand_admin: 'Marka Yöneticisi', super_admin: 'Süper Admin' };
  const roleColors = { customer: 'secondary' as const, brand_admin: 'default' as const, super_admin: 'destructive' as const };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">Kullanıcılar</h1>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Kullanıcı ara..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 max-w-md" />
      </div>
      <div className="space-y-2">
        {users.map((u) => (
          <Card key={u.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1B1F3B] flex items-center justify-center text-white text-sm font-medium">
                  {u.full_name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-sm">{u.full_name}</p>
                  <p className="text-xs text-gray-500">{u.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={roleColors[u.role]}>{roleLabels[u.role]}</Badge>
                <span className="text-xs text-gray-400">{formatDate(u.created_at)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

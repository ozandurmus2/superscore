'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatRelativeTime } from '@/lib/utils';
import { Search, Loader2 } from 'lucide-react';
import type { User } from '@/types';

type UserRow = User & {
  complaint_count?: number;
};

const ROLE_LABELS: Record<string, string> = {
  customer: 'Musteri',
  brand_admin: 'Marka Yoneticisi',
  super_admin: 'Super Admin',
};

const ROLE_COLORS: Record<string, string> = {
  customer: 'bg-gray-100 text-gray-700',
  brand_admin: 'bg-blue-100 text-blue-700',
  super_admin: 'bg-red-100 text-red-700',
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      setLoading(true);
      let query = supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (search) {
        query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
      }

      const { data } = await query;
      const userList = (data as User[]) || [];

      // Fetch complaint counts for all users
      if (userList.length > 0) {
        const userIds = userList.map((u) => u.id);
        const { data: countData } = await supabase
          .from('complaints')
          .select('user_id')
          .in('user_id', userIds);

        const countMap: Record<string, number> = {};
        (countData || []).forEach((row: { user_id: string }) => {
          countMap[row.user_id] = (countMap[row.user_id] || 0) + 1;
        });

        setUsers(userList.map((u) => ({ ...u, complaint_count: countMap[u.id] || 0 })));
      } else {
        setUsers([]);
      }
      setLoading(false);
    }
    load();
  }, [search]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1B1F3B]">Kullanicilar</h1>
        <p className="text-sm text-gray-500 mt-1">Toplam {users.length} kullanici</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Isim veya email ile ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 max-w-md"
        />
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-4 py-3 font-medium text-gray-500 text-xs">Avatar</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs">Isim</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs hidden md:table-cell">Email</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs">Rol</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs hidden md:table-cell">Sikayet</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-xs hidden lg:table-cell">Kayit Tarihi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-gray-400 mx-auto" />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-gray-400">
                    Kullanici bulunamadi
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      {u.avatar_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={u.avatar_url}
                          alt={u.full_name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#1B1F3B] flex items-center justify-center text-white text-xs font-medium">
                          {u.full_name?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{u.full_name}</p>
                      <p className="text-xs text-gray-400 md:hidden">{u.email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{u.email}</td>
                    <td className="px-4 py-3">
                      <Badge className={ROLE_COLORS[u.role] || ''} variant="secondary">
                        {ROLE_LABELS[u.role] || u.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{u.complaint_count || 0}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 hidden lg:table-cell whitespace-nowrap">
                      {formatRelativeTime(u.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

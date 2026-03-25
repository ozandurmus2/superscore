'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_COLORS } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { FileText, CheckCircle, Clock, AlertCircle, PenSquare, ArrowRight } from 'lucide-react';
import type { Complaint } from '@/types';

export default function CustomerDashboard() {
  const [complaints, setComplaints] = useState<(Complaint & { brand: { name: string } })[]>([]);
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0, awaiting: 0 });
  const [userName, setUserName] = useState('');
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase.from('users').select('full_name').eq('id', user.id).single();
      if (profile) setUserName((profile as { full_name: string }).full_name);

      const { data, count } = await supabase
        .from('complaints')
        .select('*, brand:brands(name)', { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      const all = (data as (Complaint & { brand: { name: string } })[]) || [];
      setComplaints(all.slice(0, 5));
      setStats({
        total: count || 0,
        resolved: all.filter((c) => c.status === 'resolved').length,
        pending: all.filter((c) => c.status === 'pending').length,
        awaiting: all.filter((c) => c.status === 'brand_responded').length,
      });
    }
    load();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1B1F3B]">Hoş geldin, {userName}</h1>
          <p className="text-gray-500">Şikayetlerinizi takip edin</p>
        </div>
        <Link href="/panel/sikayet-yaz">
          <Button><PenSquare className="h-4 w-4" /> Yeni Şikayet</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Toplam Şikayet', value: stats.total, icon: FileText, color: 'text-blue-600' },
          { label: 'Çözülen', value: stats.resolved, icon: CheckCircle, color: 'text-green-600' },
          { label: 'Beklemede', value: stats.pending, icon: Clock, color: 'text-yellow-600' },
          { label: 'Yanıt Geldi', value: stats.awaiting, icon: AlertCircle, color: 'text-purple-600' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Son Şikayetlerim</CardTitle>
          <Link href="/panel/sikayetlerim" className="text-sm text-[#1B1F3B] hover:underline flex items-center gap-1">
            Tümü <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          {complaints.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Henüz şikayet yok</p>
              <Link href="/panel/sikayet-yaz"><Button variant="outline" className="mt-3">İlk Şikayetini Yaz</Button></Link>
            </div>
          ) : (
            <div className="space-y-3">
              {complaints.map((c) => (
                <Link key={c.id} href={`/panel/sikayetlerim/${c.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400 font-mono">{c.complaint_number}</span>
                      <Badge className={COMPLAINT_STATUS_COLORS[c.status]} variant="secondary">{COMPLAINT_STATUS_LABELS[c.status]}</Badge>
                    </div>
                    <p className="font-medium text-sm">{c.title}</p>
                    <p className="text-xs text-gray-500">{c.brand?.name} &middot; {formatRelativeTime(c.created_at)}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

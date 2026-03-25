'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { COMPLAINT_STATUS_LABELS, COMPLAINT_STATUS_COLORS } from '@/types';
import { formatRelativeTime } from '@/lib/utils';
import { Users, Building2, MessageSquare, CheckCircle, AlertTriangle } from 'lucide-react';
import type { Complaint } from '@/types';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, brands: 0, complaints: 0, resolved: 0 });
  const [escalated, setEscalated] = useState<(Complaint & { brand: { name: string }; user: { full_name: string } })[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const [{ count: userCount }, { count: brandCount }, { count: complaintCount }, { count: resolvedCount }] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('brands').select('*', { count: 'exact', head: true }),
        supabase.from('complaints').select('*', { count: 'exact', head: true }),
        supabase.from('complaints').select('*', { count: 'exact', head: true }).eq('status', 'resolved'),
      ]);
      setStats({ users: userCount || 0, brands: brandCount || 0, complaints: complaintCount || 0, resolved: resolvedCount || 0 });

      const { data } = await supabase
        .from('complaints')
        .select('*, brand:brands(name), user:users(full_name)')
        .eq('status', 'escalated')
        .order('created_at', { ascending: false })
        .limit(10);
      setEscalated((data as typeof escalated) || []);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-8">Yönetim Paneli</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Kullanıcılar', value: stats.users, icon: Users, color: 'text-blue-600' },
          { label: 'Markalar', value: stats.brands, icon: Building2, color: 'text-purple-600' },
          { label: 'Şikayetler', value: stats.complaints, icon: MessageSquare, color: 'text-orange-600' },
          { label: 'Çözülen', value: stats.resolved, icon: CheckCircle, color: 'text-green-600' },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <s.icon className={`h-8 w-8 ${s.color}`} />
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-red-500" /> Yükseltilmiş Şikayetler</CardTitle>
        </CardHeader>
        <CardContent>
          {escalated.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-8">Yükseltilmiş şikayet yok</p>
          ) : (
            <div className="space-y-3">
              {escalated.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400 font-mono">{c.complaint_number}</span>
                      <Badge className={COMPLAINT_STATUS_COLORS[c.status]} variant="secondary">{COMPLAINT_STATUS_LABELS[c.status]}</Badge>
                    </div>
                    <p className="font-medium text-sm">{c.title}</p>
                    <p className="text-xs text-gray-500">{c.brand?.name} &middot; {c.user?.full_name} &middot; {formatRelativeTime(c.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

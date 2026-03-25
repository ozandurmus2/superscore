'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { formatRelativeTime } from '@/lib/utils';
import { Bell, MessageSquare, CheckCircle, Star, Info } from 'lucide-react';
import type { Notification } from '@/types';

const iconMap = {
  new_complaint: MessageSquare,
  brand_response: MessageSquare,
  complaint_resolved: CheckCircle,
  review_received: Star,
  system: Info,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);
      setNotifications((data as Notification[]) || []);
      setLoading(false);
    }
    load();
  }, []);

  async function markAsRead(id: string) {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    setNotifications(notifications.map((n) => n.id === id ? { ...n, is_read: true } : n));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">Bildirimler</h1>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <Card key={i} className="animate-pulse"><CardContent className="p-4"><div className="h-12 bg-gray-100 rounded" /></CardContent></Card>)}
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-16">
          <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Henüz bildirim yok</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => {
            const Icon = iconMap[n.type] || Info;
            return (
              <Card key={n.id} className={`cursor-pointer transition-colors ${!n.is_read ? 'bg-blue-50 border-blue-100' : ''}`}
                onClick={() => !n.is_read && markAsRead(n.id)}>
                <CardContent className="p-4 flex items-start gap-3">
                  <Icon className={`h-5 w-5 mt-0.5 ${!n.is_read ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className="flex-1">
                    <p className={`text-sm ${!n.is_read ? 'font-medium' : ''}`}>{n.title}</p>
                    <p className="text-xs text-gray-500">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatRelativeTime(n.created_at)}</p>
                  </div>
                  {!n.is_read && <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

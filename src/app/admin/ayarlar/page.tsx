'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">Platform Ayarları</h1>
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5" /> Genel Ayarlar</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">Platform ayarları yakında eklenecek.</p>
        </CardContent>
      </Card>
    </div>
  );
}

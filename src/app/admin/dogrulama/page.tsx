'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatRelativeTime } from '@/lib/utils';
import { Brain, FileText, CheckCircle, XCircle } from 'lucide-react';
import type { ComplaintDocument } from '@/types';

export default function AIVerificationPage() {
  const [documents, setDocuments] = useState<(ComplaintDocument & { complaint: { complaint_number: string; title: string } })[]>([]);
  const [analyzing, setAnalyzing] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await supabase
      .from('complaint_documents')
      .select('*, complaint:complaints(complaint_number, title)')
      .order('created_at', { ascending: false })
      .limit(50);
    setDocuments((data as typeof documents) || []);
  }

  async function analyzeDoc(doc: ComplaintDocument) {
    setAnalyzing(doc.id);
    await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentUrl: doc.file_url, documentType: doc.document_type, complaintId: doc.complaint_id, documentId: doc.id }),
    });
    setAnalyzing(null);
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#1B1F3B] mb-6">AI Belge Doğrulama</h1>

      <div className="space-y-3">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-sm">{doc.file_name}</span>
                    <Badge variant="outline">{doc.document_type}</Badge>
                    {doc.ai_analysis ? (
                      <Badge variant="success"><CheckCircle className="h-3 w-3" /> Analiz Edildi</Badge>
                    ) : (
                      <Badge variant="warning">Bekliyor</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {doc.complaint?.complaint_number} - {doc.complaint?.title} &middot; {formatRelativeTime(doc.created_at)}
                  </p>
                  {doc.ai_analysis && (
                    <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
                      <p className="text-blue-700">{(doc.ai_analysis as { summary?: string }).summary || 'Analiz mevcut'}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {!doc.ai_analysis && (
                    <Button size="sm" variant="outline" onClick={() => analyzeDoc(doc)} disabled={analyzing === doc.id}>
                      <Brain className="h-3 w-3" /> {analyzing === doc.id ? 'Analiz...' : 'Analiz Et'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

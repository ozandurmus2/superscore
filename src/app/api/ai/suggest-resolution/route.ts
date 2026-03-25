import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { RESOLUTION_OPTIONS } from '@/types';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// AI-powered resolution suggestion based on user input
export async function POST(request: NextRequest) {
  const { text, brandCategory } = await request.json();

  if (!text || text.length < 3) {
    return NextResponse.json({ suggestions: [] });
  }

  // First: local keyword matching
  const lowerText = text.toLowerCase();
  const localMatches = RESOLUTION_OPTIONS
    .filter(opt => {
      // Category filter
      const categoryMatch = opt.categories.includes('*') || opt.categories.includes(brandCategory || '');
      // Keyword match
      const keywordMatch = opt.keywords.some(kw => lowerText.includes(kw.toLowerCase()));
      return categoryMatch && keywordMatch;
    })
    .slice(0, 5);

  // If we found good local matches, return them without AI
  if (localMatches.length >= 2) {
    return NextResponse.json({
      suggestions: localMatches.map(m => ({ value: m.value, label: m.label })),
      source: 'local',
    });
  }

  // Otherwise, use AI to find the best match
  try {
    const allOptions = RESOLUTION_OPTIONS.map(o => `${o.value}: ${o.label}`).join('\n');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Sen bir şikayet sınıflandırma AI'ısın. Kullanıcının yazdığı talep metnine göre en uygun talep türlerini seç.

MEVCUT TALEP TÜRLERİ:
${allOptions}

Marka kategorisi: ${brandCategory || 'bilinmiyor'}

Kullanıcının metnine en uygun 3 talep türünü seç. SADECE yukarıdaki listeden seç.

YANIT FORMATI (JSON):
{
  "suggestions": [
    {"value": "iade", "label": "İade (Para İadesi)", "confidence": 0.95},
    {"value": "degisim", "label": "Ürün Değişimi", "confidence": 0.6}
  ]
}`,
        },
        {
          role: 'user',
          content: `Kullanıcı talebi: "${text}"`,
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 300,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    // Merge local and AI suggestions
    const allSuggestions = [
      ...localMatches.map(m => ({ value: m.value, label: m.label, confidence: 0.8 })),
      ...(result.suggestions || []),
    ];

    // Deduplicate by value
    const unique = allSuggestions.filter((s, i, arr) =>
      arr.findIndex(x => x.value === s.value) === i
    ).slice(0, 5);

    return NextResponse.json({ suggestions: unique, source: 'ai' });
  } catch {
    // Fallback to local matches
    return NextResponse.json({
      suggestions: localMatches.length > 0
        ? localMatches.map(m => ({ value: m.value, label: m.label }))
        : [{ value: 'diger_talep', label: 'Diğer' }],
      source: 'fallback',
    });
  }
}

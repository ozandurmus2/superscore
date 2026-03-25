import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// AI Content Moderation - checks for profanity, legal issues, and auto-corrects
export async function POST(request: NextRequest) {
  const { title, description, desiredResolution } = await request.json();

  if (!description) {
    return NextResponse.json({ error: 'Description required' }, { status: 400 });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Sen Superscore platformunun içerik moderasyon yapay zekasısın. Kullanıcıların yazdığı şikayet metinlerini denetle ve düzenle.

GÖREVLERİN:
1. KÜFÜR & HAKARET TESPİTİ: Türkçe ve İngilizce küfür, hakaret, argo ifadeleri tespit et
2. YASAL RİSK TESPİTİ: Dolandırıcı, hırsız, sahtekar gibi iftira/hakaret sayılabilecek ifadeleri tespit et
3. KİŞİSEL BİLGİ: TC kimlik no, telefon numarası gibi kişisel verileri maskele
4. YAZIM DÜZELTMESİ: Büyük/küçük harf düzeltmesi, temel noktalama
5. TALEP SINIFLANDIRMASI: Metnin ne tür bir talep içerdiğini belirle

DÜZELTME KURALLARI:
- Küfürleri tamamen kaldır, yerine uygun ifade koy (ör: "s***k firma" → "kötü firma")
- "Dolandırıcı", "hırsız", "sahtekar" gibi iftira içeren kelimeleri yumuşat (ör: "dolandırıcı firma" → "güvenilmez bulduğum firma")
- TC no, IBAN gibi kişisel verileri "***" ile maskele
- Cümle başlarını büyük harfle başlat
- Aşırı BÜYÜK HARF kullanımını düzelt (tamamı büyük harfle yazılmış cümleleri normal yap)
- Anlamı değiştirme, sadece formu düzelt
- Eğer metin zaten temiz ve düzgünse, olduğu gibi bırak

YANIT FORMATI (JSON):
{
  "has_issues": true/false,
  "issues_found": ["küfür", "hakaret", "kişisel veri", "büyük harf"],
  "original_title": "orijinal başlık",
  "original_description": "orijinal açıklama",
  "original_resolution": "orijinal talep",
  "cleaned_title": "düzenlenmiş başlık",
  "cleaned_description": "düzenlenmiş açıklama",
  "cleaned_resolution": "düzenlenmiş talep",
  "changes_made": ["yapılan değişikliklerin listesi"],
  "severity": "none|low|medium|high",
  "suggested_category": "iade|degisim|tamir|teslimat|siparis_iptal|fatura_duzeltme|diger_talep",
  "suggested_keywords": ["tespit edilen anahtar kelimeler"]
}`,
        },
        {
          role: 'user',
          content: `Şu şikayet metnini denetle ve gerekirse düzenle:

BAŞLIK: ${title || '(boş)'}

AÇIKLAMA: ${description}

TALEP: ${desiredResolution || '(boş)'}`,
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 1500,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Moderation error:', error);
    return NextResponse.json({ error: 'Moderation failed' }, { status: 500 });
  }
}

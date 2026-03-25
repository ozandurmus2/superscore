import { createServiceClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Main endpoint: Analyze documents uploaded by brand
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { complaintId, action } = body;

  if (!complaintId) {
    return NextResponse.json({ error: 'complaintId required' }, { status: 400 });
  }

  const serviceClient = await createServiceClient();

  // Get complaint details
  const { data: complaint } = await serviceClient
    .from('complaints')
    .select('*, user:users(full_name, email), brand:brands(name)')
    .eq('id', complaintId)
    .single();

  if (!complaint) {
    return NextResponse.json({ error: 'Complaint not found' }, { status: 404 });
  }

  // ACTION: analyze-documents - called automatically when brand marks as resolved
  if (action === 'analyze-documents') {
    return analyzeDocuments(serviceClient, complaint);
  }

  // ACTION: auto-rate - AI gives rating when customer doesn't respond in 48h
  if (action === 'auto-rate') {
    return autoRate(serviceClient, complaint);
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

// ============================================
// DOCUMENT ANALYSIS - Real image/PDF analysis with GPT-4o Vision
// ============================================
async function analyzeDocuments(serviceClient: Awaited<ReturnType<typeof createServiceClient>>, complaint: Record<string, unknown>) {
  // Get all documents for this complaint
  const { data: documents } = await serviceClient
    .from('complaint_documents')
    .select('*')
    .eq('complaint_id', complaint.id);

  if (!documents || documents.length === 0) {
    return NextResponse.json({ error: 'No documents found' }, { status: 400 });
  }

  // Build image content for GPT-4o Vision
  const imageContents: OpenAI.Chat.Completions.ChatCompletionContentPart[] = [];

  for (const doc of documents) {
    // Add each document as an image_url for vision analysis
    if (doc.file_type?.startsWith('image/') || doc.file_url?.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      imageContents.push({
        type: 'image_url',
        image_url: {
          url: doc.file_url,
          detail: 'high',
        },
      });
    } else {
      // For PDFs and other files, add as text reference
      imageContents.push({
        type: 'text',
        text: `[Yüklenen dosya: ${doc.file_name} (${doc.file_type}) - URL: ${doc.file_url}]`,
      });
    }
  }

  const complaintUser = complaint.user as { full_name: string } | null;
  const complaintBrand = complaint.brand as { name: string } | null;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Sen Superscore platformunun belge analiz yapay zekasısın.

## GÖREVİN
Yüklenen görsellerdeki/belgelerdeki TÜM metinleri karakter karakter oku. Hiçbir detayı atlama. Görselde ne görüyorsan onu raporla.

## GÖRSEL OKUMA TALİMATLARI (ÇOK ÖNEMLİ)
1. Görseldeki HER YAZILI METNİ oku - başlıklar, sayılar, isimler, tarihler, tutarlar, adresler, her şey
2. Sipariş numarası, takip numarası, referans kodu gibi benzersiz tanımlayıcıları MUTLAKA bul ve raporla
3. Tutarları, para birimlerini ve kalemleri tek tek oku
4. İsim, soyisim, e-posta, telefon gibi kişi bilgilerini bul
5. Tarih bilgilerini bul (sipariş tarihi, iade tarihi, işlem tarihi)
6. Durumu bul (İptal Edildi, İade Edildi, Onaylandı vb.)
7. ASLA tahmin yapma - görselde görmediğin bilgiyi uydurma
8. Görselde bulanık veya okunamayan kısımlar varsa "okunamıyor" de

## ŞİKAYET BİLGİLERİ
- Şikayet No: ${complaint.complaint_number}
- Müşteri Adı: ${complaintUser?.full_name || 'Bilinmiyor'}
- Marka: ${complaintBrand?.name || 'Bilinmiyor'}
- Şikayet: ${complaint.title}
- Açıklama: ${complaint.description}
- Müşterinin Talebi: ${complaint.desired_resolution}
- Kategori: ${complaint.category}
- Müşterinin Belirttiği Sipariş No: ${complaint.order_number || 'Belirtilmemiş'}
- Satın Alma Tarihi: ${complaint.purchase_date || 'Belirtilmemiş'}

## DOĞRULAMA KRİTERLERİ (İADE TALEBİ İÇİN)
İade talebinin onaylanması için aşağıdaki kriterlerden EN AZ 1 TANESİNİN belgede bulunması YETERLİDİR:
- Müşteri adı/soyadı belgede geçiyor
- Sipariş numarası eşleşiyor
- E-posta adresi eşleşiyor
- Tutarlar mantıklı (tam eşleşme zorunlu değil, yakın olması yeterli)

Eğer yukarıdakilerden en az 1'i sağlanıyorsa VE belge gerçek bir sipariş/iade belgesi gibi görünüyorsa → ONAYLA.

SADECE şu durumlarda reddet:
- Belge tamamen alakasız (farklı bir kişi/firma)
- Belge sahte/manipüle edilmiş görünüyor
- Belge okunamıyor/bulanık
- Hiçbir kriter sağlanmıyor

## YANIT FORMATI (SADECE JSON)
{
  "belge_okunabiliyor_mu": true,
  "belgede_okunan_tum_metinler": "Görselde okuduğun TÜM metinleri buraya yaz - sipariş no, isimler, tutarlar, tarihler, durumlar, her şey",
  "belge_turu": "siparis_detayi|iade_dekontu|fatura|kargo_belgesi|banka_dekontu|diger",
  "tespit_edilen_bilgiler": {
    "siparis_numarasi": "belgede gördüğün sipariş no veya null",
    "musteri_adi": "belgede gördüğün isim veya null",
    "email": "belgede gördüğün email veya null",
    "tarihler": ["belgede gördüğün tarihler"],
    "tutarlar": ["belgede gördüğün tüm tutarlar - para birimi ile birlikte"],
    "urunler": ["belgede gördüğün ürün isimleri"],
    "durum": "İptal Edildi, İade Edildi vb. veya null",
    "diger_onemli_bilgiler": "diğer önemli detaylar"
  },
  "eslesme_kontrolu": {
    "musteri_adi_eslesti": true/false,
    "siparis_no_eslesti": true/false,
    "email_eslesti": true/false,
    "tutar_mantikli": true/false,
    "eslesen_kriter_sayisi": 0
  },
  "iade_dogrulandi_mi": true/false,
  "iade_tutari": null,
  "guvenilirlik_puani": 8,
  "sonuc": "onaylandi|reddedildi|belirsiz",
  "ozet_yorum": "Türkçe özet - belgede ne gördüğünü ve neden onayladığını/reddettiğini açıkla",
  "admin_notu": "Teknik detaylar"
}`,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Bu görselleri DETAYLI incele. Görseldeki TÜM yazıları oku ve raporla.

Şikayet bilgisi: Müşteri "${complaintUser?.full_name || ''}" adlı kişi, "${complaintBrand?.name || ''}" markasından "${complaint.desired_resolution}" talep ediyor.
${complaint.order_number ? `Müşterinin belirttiği sipariş numarası: ${complaint.order_number}` : ''}

Lütfen:
1. Önce görseldeki TÜM metinleri karakter karakter oku ve "belgede_okunan_tum_metinler" alanına yaz
2. Sonra tespit ettiğin bilgileri yapılandırılmış şekilde raporla
3. Son olarak eşleşme kontrolü yap ve onay/red kararı ver`,
            },
            ...imageContents,
          ],
        },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 3000,
    });

    const analysis = JSON.parse(response.choices[0].message.content || '{}');

    // Save analysis to each document
    for (const doc of documents) {
      await serviceClient
        .from('complaint_documents')
        .update({ ai_analysis: analysis })
        .eq('id', doc.id);
    }

    // Determine status based on AI analysis
    // Approve if: result is "onaylandi" OR reliability score >= 6 AND at least 1 matching criteria
    const eslesme = analysis.eslesme_kontrolu || {};
    const matchCount = eslesme.eslesen_kriter_sayisi || 0;
    const isVerified = (analysis.sonuc === 'onaylandi') ||
                       (analysis.guvenilirlik_puani >= 6 && matchCount >= 1);
    const newStatus = isVerified ? 'awaiting_customer' : 'brand_responded';

    // Update complaint status
    await serviceClient
      .from('complaints')
      .update({
        status: newStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', complaint.id);

    // Add system note with AI analysis - detailed and informative
    const tespit = analysis.tespit_edilen_bilgiler || {};
    const detaylar = [
      tespit.siparis_numarasi ? `📋 Sipariş No: ${tespit.siparis_numarasi}` : null,
      tespit.musteri_adi ? `👤 Belgede İsim: ${tespit.musteri_adi}` : null,
      tespit.tutarlar?.length ? `💰 Tutar: ${tespit.tutarlar.join(', ')}` : null,
      tespit.durum ? `📌 Durum: ${tespit.durum}` : null,
      tespit.urunler?.length ? `📦 Ürünler: ${tespit.urunler.join(', ')}` : null,
    ].filter(Boolean).join('\n');

    const systemMessage = isVerified
      ? `🤖 Superscore AI Belge Analizi\n\n${analysis.ozet_yorum}\n\n${detaylar ? `Belgeden Okunan Bilgiler:\n${detaylar}\n\n` : ''}Güvenilirlik: ${analysis.guvenilirlik_puani}/10\nSonuç: ✅ Belge doğrulandı - ${complaint.category === 'refund' ? 'İade işlemi onaylandı' : 'Çözüm doğrulandı'}`
      : `🤖 Superscore AI Belge Analizi\n\n${analysis.ozet_yorum}\n\n${detaylar ? `Belgeden Okunan Bilgiler:\n${detaylar}\n\n` : ''}Güvenilirlik: ${analysis.guvenilirlik_puani}/10\nSonuç: ⚠️ ${analysis.sonuc === 'reddedildi' ? 'Belge doğrulanamadı - admin incelemesi gerekli' : 'Belge belirsiz - admin incelemesi gerekli'}`;

    await serviceClient.from('complaint_responses').insert({
      complaint_id: complaint.id,
      user_id: complaint.user_id as string,
      response_type: 'system_note',
      message: systemMessage,
    });

    // Notify customer with detailed message
    const categoryLabel = complaint.category === 'refund' ? 'İade' :
      complaint.category === 'defective_product' ? 'Ürün Değişimi' :
      complaint.category === 'late_delivery' ? 'Teslimat' : 'Çözüm';

    const notifMessage = isVerified
      ? `${complaintBrand?.name || 'Marka'} şikayetiniz hakkında aksiyon aldı. Alınan aksiyon: ${categoryLabel}. Belge gönderildi ve sistemlerimizin kontrolü sonrası işlemin yapıldığı onaylandı. Lütfen giriş yaparak onaylayın veya 48 saat içinde itiraz edin.`
      : `${complaintBrand?.name || 'Marka'} şikayetinize yanıt verdi. Lütfen giriş yaparak kontrol edin.`;

    await serviceClient.from('notifications').insert({
      user_id: complaint.user_id as string,
      type: isVerified ? 'complaint_resolved' : 'brand_response',
      title: isVerified ? `${complaintBrand?.name || 'Marka'} Şikayetinizi Çözdü` : 'Marka Yanıt Verdi',
      message: notifMessage,
      metadata: { complaint_id: complaint.id },
    });

    return NextResponse.json({
      success: true,
      analysis,
      status: newStatus,
      verified: isVerified,
    });
  } catch (error) {
    console.error('AI analysis error:', error);
    return NextResponse.json({ error: 'AI analizi başarısız: ' + (error as Error).message }, { status: 500 });
  }
}

// ============================================
// AUTO-RATE - AI gives rating when customer doesn't respond in 48h
// ============================================
async function autoRate(serviceClient: Awaited<ReturnType<typeof createServiceClient>>, complaint: Record<string, unknown>) {
  // Get all responses and documents
  const { data: responses } = await serviceClient
    .from('complaint_responses')
    .select('*')
    .eq('complaint_id', complaint.id)
    .order('created_at', { ascending: true });

  const { data: documents } = await serviceClient
    .from('complaint_documents')
    .select('*')
    .eq('complaint_id', complaint.id);

  const complaintBrand = complaint.brand as { name: string } | null;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Sen bir müşteri deneyimi uzmanısın. Bir şikayet sürecini değerlendirip 1-5 yıldız puan vereceksin.

PUANLAMA KRİTERLERİ:
- Yanıt Hızı (markanın ne kadar hızlı yanıt verdiği)
- İlgi & Profesyonellik (yanıtların kalitesi)
- Belge Sunumu (çözüm belgelerinin eksiksiz olması)
- Çözüm Kalitesi (müşterinin talebinin karşılanması)
- Genel Deneyim

PUANLAMA:
1 ⭐ = Çok kötü - Hiç ilgilenilmemiş
2 ⭐ = Kötü - Yetersiz çözüm
3 ⭐ = Orta - Kısmen çözüldü
4 ⭐ = İyi - Çözüldü ama gecikmeli veya eksik
5 ⭐ = Mükemmel - Hızlı ve tam çözüm

YANIT FORMATI (JSON):
{
  "puan": 1-5,
  "yanit_hizi_puan": 1-5,
  "ilgi_puan": 1-5,
  "belge_puan": 1-5,
  "cozum_puan": 1-5,
  "yorum": "Türkçe kısa değerlendirme yorumu"
}`,
        },
        {
          role: 'user',
          content: `Şikayet: "${complaint.title}"
Müşteri Talebi: "${complaint.desired_resolution}"
Marka: ${complaintBrand?.name || 'Bilinmiyor'}
Şikayet Tarihi: ${complaint.created_at}
Toplam Yanıt Sayısı: ${responses?.length || 0}
Yüklenen Belge Sayısı: ${documents?.length || 0}
Mevcut Durum: ${complaint.status}

Yanıtlar:
${responses?.map(r => `[${r.response_type}] ${r.message}`).join('\n') || 'Yanıt yok'}

Bu şikayete AI olarak puan ver. Müşteri 48 saat içinde yanıt vermediği için otomatik puanlama yapılıyor.`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const ratingResult = JSON.parse(response.choices[0].message.content || '{}');

    // Create review
    await serviceClient.from('reviews').insert({
      user_id: complaint.user_id as string,
      brand_id: complaint.brand_id as string,
      complaint_id: complaint.id as string,
      rating: Math.min(5, Math.max(1, ratingResult.puan || 3)),
      title: 'Otomatik Değerlendirme',
      comment: `🤖 ${ratingResult.yorum || 'Müşteri 48 saat içinde yanıt vermediği için AI tarafından değerlendirildi.'}`,
      is_verified_purchase: false,
    });

    // Mark complaint as resolved
    await serviceClient
      .from('complaints')
      .update({
        status: 'resolved',
        resolved_at: new Date().toISOString(),
      })
      .eq('id', complaint.id);

    // Add system note
    await serviceClient.from('complaint_responses').insert({
      complaint_id: complaint.id as string,
      user_id: complaint.user_id as string,
      response_type: 'system_note',
      message: `🤖 Müşteri 48 saat içinde yanıt vermediği için şikayet otomatik olarak çözüldü olarak kapatıldı. AI Puanı: ${'⭐'.repeat(ratingResult.puan || 3)} (${ratingResult.puan}/5)`,
    });

    return NextResponse.json({ success: true, rating: ratingResult });
  } catch (error) {
    console.error('Auto-rate error:', error);
    return NextResponse.json({ error: 'Auto-rate failed' }, { status: 500 });
  }
}

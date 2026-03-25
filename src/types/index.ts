// Database types for Superscore

export type UserRole = 'customer' | 'brand_admin' | 'super_admin';

export type BrandMemberRole = 'owner' | 'admin' | 'agent';

export type SubscriptionPlan = 'free_trial' | 'starter' | 'pro' | 'enterprise';

export type ComplaintCategory =
  | 'refund'
  | 'defective_product'
  | 'late_delivery'
  | 'wrong_product'
  | 'customer_service'
  | 'warranty'
  | 'price_dispute'
  | 'other';

export type ComplaintStatus =
  | 'pending'
  | 'in_review'
  | 'brand_responded'
  | 'awaiting_customer'
  | 'resolved'
  | 'closed'
  | 'escalated';

export type ComplaintPriority = 'low' | 'medium' | 'high' | 'urgent';

export type ResponseType = 'brand_response' | 'customer_reply' | 'system_note' | 'admin_note';

export type DocumentType =
  | 'invoice'
  | 'receipt'
  | 'refund_proof'
  | 'shipping_proof'
  | 'warranty_card'
  | 'screenshot'
  | 'other';

export type NotificationType =
  | 'new_complaint'
  | 'brand_response'
  | 'complaint_resolved'
  | 'review_received'
  | 'system';

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  website: string | null;
  description: string | null;
  category: string;
  is_verified: boolean;
  is_subscribed: boolean;
  subscription_plan: SubscriptionPlan | null;
  trial_ends_at: string | null;
  superscore: number;
  total_complaints: number;
  resolved_complaints: number;
  avg_response_time_hours: number | null;
  avg_rating: number | null;
  created_at: string;
  updated_at: string;
}

export interface BrandMember {
  id: string;
  brand_id: string;
  user_id: string;
  role: BrandMemberRole;
  created_at: string;
  brand?: Brand;
  user?: User;
}

export interface Complaint {
  id: string;
  complaint_number: string;
  user_id: string;
  brand_id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  status: ComplaintStatus;
  priority: ComplaintPriority;
  order_number: string | null;
  purchase_date: string | null;
  desired_resolution: string;
  is_public: boolean;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  user?: User;
  brand?: Brand;
  responses?: ComplaintResponse[];
  documents?: ComplaintDocument[];
}

export interface ComplaintResponse {
  id: string;
  complaint_id: string;
  user_id: string;
  response_type: ResponseType;
  message: string;
  created_at: string;
  user?: User;
}

export interface ComplaintDocument {
  id: string;
  complaint_id: string;
  uploaded_by: string;
  file_url: string;
  file_name: string;
  file_type: string;
  document_type: DocumentType;
  ai_analysis: Record<string, unknown> | null;
  created_at: string;
}

export interface Review {
  id: string;
  user_id: string;
  brand_id: string;
  complaint_id: string | null;
  rating: number;
  title: string | null;
  comment: string;
  is_verified_purchase: boolean;
  created_at: string;
  updated_at: string;
  user?: User;
  brand?: Brand;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

// UI Helper types
export interface SuperscoreGrade {
  score: number;
  label: string;
  color: string;
  bgColor: string;
}

export const getSuperscore = (score: number): SuperscoreGrade => {
  if (score >= 80) return { score, label: 'Mükemmel', color: 'text-green-600', bgColor: 'bg-green-500' };
  if (score >= 60) return { score, label: 'İyi', color: 'text-lime-600', bgColor: 'bg-lime-500' };
  if (score >= 40) return { score, label: 'Orta', color: 'text-yellow-600', bgColor: 'bg-yellow-500' };
  if (score >= 20) return { score, label: 'Zayıf', color: 'text-orange-600', bgColor: 'bg-orange-500' };
  return { score, label: 'Kötü', color: 'text-red-600', bgColor: 'bg-red-500' };
};

export const COMPLAINT_CATEGORY_LABELS: Record<ComplaintCategory, string> = {
  refund: 'İade',
  defective_product: 'Arızalı Ürün',
  late_delivery: 'Geç Teslimat',
  wrong_product: 'Yanlış Ürün',
  customer_service: 'Müşteri Hizmetleri',
  warranty: 'Garanti',
  price_dispute: 'Fiyat Anlaşmazlığı',
  other: 'Diğer',
};

export const COMPLAINT_STATUS_LABELS: Record<ComplaintStatus, string> = {
  pending: 'Beklemede',
  in_review: 'İnceleniyor',
  brand_responded: 'Marka Yanıtladı',
  awaiting_customer: 'Müşteri Bekleniyor',
  resolved: 'Çözüldü',
  closed: 'Kapatıldı',
  escalated: 'Yükseltildi',
};

export const COMPLAINT_STATUS_COLORS: Record<ComplaintStatus, string> = {
  pending: 'bg-gray-100 text-gray-700',
  in_review: 'bg-blue-100 text-blue-700',
  brand_responded: 'bg-purple-100 text-purple-700',
  awaiting_customer: 'bg-yellow-100 text-yellow-700',
  resolved: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-500',
  escalated: 'bg-red-100 text-red-700',
};

// ============================================
// BRAND CATEGORIES - Full Trustpilot-style (kumar hariç)
// ============================================
export const BRAND_CATEGORIES: { value: string; label: string; subcategories: string[] }[] = [
  { value: 'e-ticaret', label: 'E-Ticaret & Pazaryerleri', subcategories: ['Online Mağazalar', 'Pazaryerleri', 'Toptan Satış', 'İkinci El'] },
  { value: 'kargo-lojistik', label: 'Kargo & Lojistik', subcategories: ['Kargo Firmaları', 'Kurye Hizmetleri', 'Depolama', 'Nakliye'] },
  { value: 'telekomunikasyon', label: 'Telekomünikasyon', subcategories: ['Mobil Operatörler', 'İnternet Sağlayıcıları', 'Uydu TV', 'Telefon Hizmetleri'] },
  { value: 'banka-finans', label: 'Bankacılık & Finans', subcategories: ['Bankalar', 'Kredi Kartları', 'Yatırım', 'Ödeme Sistemleri'] },
  { value: 'sigorta', label: 'Sigorta', subcategories: ['Sağlık Sigortası', 'Araç Sigortası', 'Konut Sigortası', 'Hayat Sigortası'] },
  { value: 'yemek-teslimat', label: 'Yemek & Teslimat', subcategories: ['Yemek Siparişi', 'Market Teslimatı', 'Su Siparişi'] },
  { value: 'elektronik-teknoloji', label: 'Elektronik & Teknoloji', subcategories: ['Ev Aletleri', 'Bilgisayar & Telefon', 'Ses & Görüntü', 'İnternet & Yazılım', 'Tamir & Servis'] },
  { value: 'seyahat-tatil', label: 'Seyahat & Tatil', subcategories: ['Havayolları', 'Oteller', 'Seyahat Acenteleri', 'Aktiviteler & Turlar', 'Konaklama'] },
  { value: 'arac-ulasim', label: 'Araç & Ulaşım', subcategories: ['Otomobil Markaları', 'Araç Kiralama', 'Taksiler & Toplu Taşıma', 'Oto Parça & Jant', 'Araç Tamir & Bakım'] },
  { value: 'ev-mobilya', label: 'Ev & Mobilya', subcategories: ['Mobilya Mağazaları', 'Dekorasyon', 'Mutfak & Banyo', 'Bahçe & Peyzaj', 'Ev Eşyaları'] },
  { value: 'saglik-tip', label: 'Sağlık & Tıp', subcategories: ['Hastaneler', 'Klinikler', 'Diş Hizmetleri', 'Eczaneler', 'Göz & İşitme', 'Ruh Sağlığı'] },
  { value: 'egitim', label: 'Eğitim & Öğretim', subcategories: ['Üniversiteler', 'Online Kurslar', 'Dil Öğrenimi', 'Mesleki Eğitim', 'Özel Okullar'] },
  { value: 'guzellik-bakim', label: 'Güzellik & Kişisel Bakım', subcategories: ['Kozmetik & Makyaj', 'Saç Bakımı', 'Kuaförler & Klinikler', 'Sağlık & Spa'] },
  { value: 'giyim-moda', label: 'Giyim & Moda', subcategories: ['Giyim', 'Ayakkabı', 'Aksesuar', 'Mücevher & Saat', 'İç Giyim'] },
  { value: 'spor-fitness', label: 'Spor & Fitness', subcategories: ['Spor Salonları', 'Spor Ekipmanları', 'Outdoor Sporlar'] },
  { value: 'ev-hizmetleri', label: 'Ev Hizmetleri', subcategories: ['Temizlik', 'Tadilat', 'Taşınma & Depolama', 'Tesisat', 'Güvenlik'] },
  { value: 'restoran-kafe', label: 'Restoranlar & Kafeler', subcategories: ['Restoranlar', 'Kafeler', 'Fast Food', 'Paket Servis'] },
  { value: 'gida-icecek', label: 'Gıda & İçecek', subcategories: ['Marketler', 'Fırın & Pastane', 'Kahve & Çay', 'Organik Ürünler'] },
  { value: 'is-hizmetleri', label: 'İş Hizmetleri', subcategories: ['BT & İletişim', 'Pazarlama', 'İK & İşe Alım', 'Baskı & Tasarım', 'Lojistik'] },
  { value: 'insaat-imalat', label: 'İnşaat & İmalat', subcategories: ['Yapı Malzemeleri', 'Müteahhitler', 'Mimarlık', 'Mühendislik'] },
  { value: 'hukuk', label: 'Hukuk Hizmetleri', subcategories: ['Avukatlar', 'Noterler', 'Arabuluculuk'] },
  { value: 'para-sigorta', label: 'Para & Sigorta', subcategories: ['Muhasebe', 'Vergi', 'Kredi', 'Gayrimenkul'] },
  { value: 'medya-yayincilik', label: 'Medya & Yayıncılık', subcategories: ['Kitap & Dergi', 'Fotoğrafçılık', 'Video & Ses'] },
  { value: 'hayvan-evcil', label: 'Evcil Hayvanlar', subcategories: ['Veteriner', 'Pet Shop', 'Evcil Hayvan Hizmetleri'] },
  { value: 'kamu-hizmetleri', label: 'Kamu Hizmetleri', subcategories: ['Enerji', 'Su', 'Doğalgaz', 'Belediye'] },
  { value: 'eglence-etkinlik', label: 'Eğlence & Etkinlik', subcategories: ['Konser & Etkinlik', 'Sinema', 'Oyun', 'Müze & Sergi'] },
  { value: 'hobi-elsanatlari', label: 'Hobi & El Sanatları', subcategories: ['Sanat', 'Müzik Aletleri', 'Açık Hava Aktiviteleri'] },
  { value: 'diger', label: 'Diğer', subcategories: [] },
];

// ============================================
// MARKETPLACES - Pazaryerleri
// ============================================
export const MARKETPLACES = [
  { value: 'trendyol', label: 'Trendyol', logo: '🟠' },
  { value: 'hepsiburada', label: 'Hepsiburada', logo: '🟡' },
  { value: 'amazon', label: 'Amazon Türkiye', logo: '📦' },
  { value: 'n11', label: 'N11', logo: '🔵' },
  { value: 'ciceksepeti', label: 'Çiçeksepeti', logo: '🌸' },
  { value: 'beymen', label: 'Beymen', logo: '🖤' },
  { value: 'morhipo', label: 'Morhipo', logo: '💜' },
  { value: 'gittigidiyor', label: 'GittiGidiyor', logo: '🔴' },
  { value: 'pttavm', label: 'PTT AVM', logo: '📮' },
  { value: 'dolap', label: 'Dolap', logo: '👗' },
  { value: 'letgo', label: 'Letgo', logo: '🟢' },
  { value: 'sahibinden', label: 'Sahibinden', logo: '🏠' },
  { value: 'diger', label: 'Diğer Pazaryeri', logo: '🛒' },
];

// ============================================
// RESOLUTION TYPES - Talep Türleri (AI filtreleme için)
// ============================================
export interface ResolutionOption {
  value: string;
  label: string;
  keywords: string[]; // AI matching keywords
  categories: string[]; // Which brand categories this applies to
}

export const RESOLUTION_OPTIONS: ResolutionOption[] = [
  // Genel talepler (tüm sektörler)
  { value: 'iade', label: 'İade (Para İadesi)', keywords: ['iade', 'para iadesi', 'geri ödeme', 'refund', 'paramı istiyorum', 'ücret iadesi'], categories: ['*'] },
  { value: 'degisim', label: 'Ürün Değişimi', keywords: ['değişim', 'değiştirme', 'yeni ürün', 'exchange', 'takas'], categories: ['*'] },
  { value: 'tamir', label: 'Tamir / Onarım', keywords: ['tamir', 'onarım', 'arıza', 'bozuk', 'çalışmıyor', 'fix', 'repair'], categories: ['*'] },
  { value: 'tazminat', label: 'Tazminat / Telafi', keywords: ['tazminat', 'telafi', 'zarar', 'kayıp', 'compensation', 'mağduriyet'], categories: ['*'] },
  { value: 'ozur', label: 'Resmi Özür', keywords: ['özür', 'açıklama', 'apology'], categories: ['*'] },
  { value: 'bilgi', label: 'Bilgi / Açıklama Talebi', keywords: ['bilgi', 'açıklama', 'neden', 'sebebi', 'information'], categories: ['*'] },

  // E-ticaret & Kargo
  { value: 'teslimat', label: 'Teslimat Talebi', keywords: ['teslimat', 'kargo', 'gönderi', 'ulaşmadı', 'teslim', 'delivery'], categories: ['e-ticaret', 'kargo-lojistik'] },
  { value: 'siparis_iptal', label: 'Sipariş İptali', keywords: ['iptal', 'cancel', 'vazgeçtim', 'istemiyorum'], categories: ['e-ticaret', 'yemek-teslimat'] },
  { value: 'eksik_urun', label: 'Eksik Ürün Gönderimi', keywords: ['eksik', 'missing', 'tam gelmedi', 'yarım'], categories: ['e-ticaret', 'gida-icecek', 'yemek-teslimat'] },
  { value: 'yanlis_urun', label: 'Yanlış Ürün Gönderimi', keywords: ['yanlış', 'hatalı ürün', 'wrong', 'farklı ürün'], categories: ['e-ticaret'] },

  // Finans & Sigorta
  { value: 'faiz_duzeltme', label: 'Faiz / Ücret Düzeltme', keywords: ['faiz', 'komisyon', 'ücret', 'masraf', 'fee', 'interest'], categories: ['banka-finans', 'para-sigorta'] },
  { value: 'kredi_yapilandirma', label: 'Kredi Yapılandırma', keywords: ['kredi', 'yapılandırma', 'taksit', 'borç', 'restructure'], categories: ['banka-finans'] },
  { value: 'hasar_tazminat', label: 'Hasar Tazminatı', keywords: ['hasar', 'tazminat', 'sigorta', 'poliçe', 'claim'], categories: ['sigorta'] },

  // Telekom
  { value: 'hat_iptal', label: 'Hat / Abonelik İptali', keywords: ['hat iptal', 'abonelik iptal', 'cancel subscription', 'cayma'], categories: ['telekomunikasyon'] },
  { value: 'fatura_duzeltme', label: 'Fatura Düzeltme', keywords: ['fatura', 'bill', 'yanlış fatura', 'fazla çekim'], categories: ['telekomunikasyon', 'kamu-hizmetleri'] },
  { value: 'hiz_artirma', label: 'Hız / Kalite İyileştirme', keywords: ['yavaş', 'hız', 'kalite', 'bağlantı', 'internet', 'speed'], categories: ['telekomunikasyon'] },

  // Seyahat
  { value: 'rezervasyon_iptal', label: 'Rezervasyon İptali', keywords: ['rezervasyon', 'booking', 'iptal', 'cancel'], categories: ['seyahat-tatil', 'restoran-kafe'] },
  { value: 'ucus_tazminat', label: 'Uçuş Tazminatı / Gecikme', keywords: ['gecikme', 'delay', 'iptal uçuş', 'aktarma', 'bagaj'], categories: ['seyahat-tatil'] },

  // Sağlık
  { value: 'randevu', label: 'Randevu Talebi', keywords: ['randevu', 'appointment', 'muayene'], categories: ['saglik-tip'] },
  { value: 'yanlis_tedavi', label: 'Yanlış Tedavi Şikayeti', keywords: ['yanlış tedavi', 'hatalı', 'malpractice'], categories: ['saglik-tip'] },

  // Araç
  { value: 'garanti', label: 'Garanti Kapsamında Tamir', keywords: ['garanti', 'warranty', 'ücretsiz tamir'], categories: ['arac-ulasim', 'elektronik-teknoloji'] },
  { value: 'servis', label: 'Servis Talebi', keywords: ['servis', 'bakım', 'service', 'kontrol'], categories: ['arac-ulasim', 'elektronik-teknoloji'] },

  // Ev hizmetleri
  { value: 'tekrar_hizmet', label: 'Hizmetin Tekrar Yapılması', keywords: ['tekrar', 'yeniden', 'düzgün yapılmadı', 'redo'], categories: ['ev-hizmetleri', 'insaat-imalat'] },

  // Genel
  { value: 'diger_talep', label: 'Diğer', keywords: [], categories: ['*'] },
];

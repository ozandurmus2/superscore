import Link from 'next/link';
import { Search, ShoppingCart, Truck, Phone, Landmark, UtensilsCrossed, Shield, Tv, Plane, Car, Home, Stethoscope, GraduationCap, Sparkles, Shirt, Dumbbell, PawPrint, Wrench, Scale, Newspaper, Building2, Zap, Fuel, Drama, Palette } from 'lucide-react';

const CATEGORIES = [
  {
    name: 'E-Ticaret & Pazaryerleri',
    slug: 'e-ticaret',
    icon: ShoppingCart,
    color: 'bg-[#fff0f0] border-l-[#f8b4b4]',
    subs: ['Online Mağazalar', 'Pazaryerleri', 'Dropshipping', 'İkinci El Platformları', 'Toptan Satış', 'Abonelik Kutuları'],
  },
  {
    name: 'Kargo & Lojistik',
    slug: 'kargo-lojistik',
    icon: Truck,
    color: 'bg-[#e8f5e9] border-l-[#a5d6a7]',
    subs: ['Kargo Şirketleri', 'Kurye Hizmetleri', 'Depolama', 'Uluslararası Kargo', 'Posta Hizmetleri'],
  },
  {
    name: 'Telekomünikasyon',
    slug: 'telekomunikasyon',
    icon: Phone,
    color: 'bg-[#f3e5f5] border-l-[#ce93d8]',
    subs: ['Mobil Operatörler', 'İnternet Sağlayıcıları', 'Kablo TV', 'Uydu Hizmetleri', 'VoIP Hizmetleri'],
  },
  {
    name: 'Bankacılık & Finans',
    slug: 'bankacilik-finans',
    icon: Landmark,
    color: 'bg-[#e0f7fa] border-l-[#80deea]',
    subs: ['Bankalar', 'Kredi Kuruluşları', 'Sigorta', 'Yatırım', 'Ödeme Sistemleri', 'Kripto Borsaları'],
  },
  {
    name: 'Yemek & Teslimat',
    slug: 'yemek-teslimat',
    icon: UtensilsCrossed,
    color: 'bg-[#fce4ec] border-l-[#f48fb1]',
    subs: ['Yemek Siparişi', 'Market Teslimatı', 'Yemek Aboneliği', 'Catering', 'Fast Food Zincirleri'],
  },
  {
    name: 'Sigorta',
    slug: 'sigorta',
    icon: Shield,
    color: 'bg-[#e1f5fe] border-l-[#81d4fa]',
    subs: ['Kasko & Trafik', 'Sağlık Sigortası', 'Konut Sigortası', 'Hayat Sigortası', 'Seyahat Sigortası'],
  },
  {
    name: 'Elektronik & Teknoloji',
    slug: 'elektronik-teknoloji',
    icon: Tv,
    color: 'bg-[#ede7f6] border-l-[#b39ddb]',
    subs: ['Bilgisayar & Telefon', 'Ev Aletleri', 'Ses & Görüntü', 'İnternet & Yazılım', 'Tamir & Servis'],
  },
  {
    name: 'Seyahat & Tatil',
    slug: 'seyahat-tatil',
    icon: Plane,
    color: 'bg-[#e0f2f1] border-l-[#80cbc4]',
    subs: ['Havayolları', 'Oteller', 'Seyahat Acenteleri', 'Araç Kiralama', 'Tur Operatörleri', 'Konaklama'],
  },
  {
    name: 'Araç & Ulaşım',
    slug: 'arac-ulasim',
    icon: Car,
    color: 'bg-[#fffde7] border-l-[#fff176]',
    subs: ['Otomobil Satış', 'Motosiklet', 'Araç Kiralama', 'Araç Tamir & Bakım', 'Yedek Parça', 'Taksi & Ulaşım'],
  },
  {
    name: 'Ev & Bahçe',
    slug: 'ev-bahce',
    icon: Home,
    color: 'bg-[#e8f5e9] border-l-[#81c784]',
    subs: ['Mobilya', 'Dekorasyon', 'Banyo & Mutfak', 'Bahçe & Peyzaj', 'Enerji & Isıtma', 'Ev Eşyaları'],
  },
  {
    name: 'Sağlık & Tıp',
    slug: 'saglik-tip',
    icon: Stethoscope,
    color: 'bg-[#fce4ec] border-l-[#ef9a9a]',
    subs: ['Hastaneler', 'Klinikler', 'Eczaneler', 'Diş Hekimleri', 'Göz Doktorları', 'Ruh Sağlığı', 'Fizik Tedavi'],
  },
  {
    name: 'Eğitim & Öğretim',
    slug: 'egitim-ogretim',
    icon: GraduationCap,
    color: 'bg-[#e8eaf6] border-l-[#9fa8da]',
    subs: ['Üniversiteler', 'Online Kurslar', 'Dil Eğitimi', 'Mesleki Eğitim', 'Özel Okullar', 'Sertifika Programları'],
  },
  {
    name: 'Güzellik & Kişisel Bakım',
    slug: 'guzellik-bakim',
    icon: Sparkles,
    color: 'bg-[#fce4ec] border-l-[#f48fb1]',
    subs: ['Kozmetik & Makyaj', 'Saç Bakımı', 'Cilt Bakımı', 'Kuaförler', 'Spa & Masaj', 'Parfüm'],
  },
  {
    name: 'Giyim & Moda',
    slug: 'giyim-moda',
    icon: Shirt,
    color: 'bg-[#f1f8e9] border-l-[#aed581]',
    subs: ['Kadın Giyim', 'Erkek Giyim', 'Çocuk Giyim', 'Ayakkabı', 'Aksesuar', 'Mücevher & Saat'],
  },
  {
    name: 'Spor & Fitness',
    slug: 'spor-fitness',
    icon: Dumbbell,
    color: 'bg-[#fff3e0] border-l-[#ffb74d]',
    subs: ['Spor Salonları', 'Spor Malzemeleri', 'Outdoor Aktiviteler', 'Yüzme', 'Dövüş Sanatları', 'Yoga & Pilates'],
  },
  {
    name: 'Evcil Hayvanlar',
    slug: 'evcil-hayvanlar',
    icon: PawPrint,
    color: 'bg-[#fff8e1] border-l-[#ffd54f]',
    subs: ['Pet Mağazaları', 'Veteriner', 'Pet Bakım', 'Pet Otelleri', 'Pet Maması'],
  },
  {
    name: 'Ev Hizmetleri',
    slug: 'ev-hizmetleri',
    icon: Wrench,
    color: 'bg-[#eceff1] border-l-[#b0bec5]',
    subs: ['Temizlik', 'Tadilat', 'Tesisatçı', 'Elektrikçi', 'Nakliyat', 'Güvenlik Sistemleri'],
  },
  {
    name: 'Hukuk & Devlet',
    slug: 'hukuk-devlet',
    icon: Scale,
    color: 'bg-[#efebe9] border-l-[#bcaaa4]',
    subs: ['Avukatlar', 'Noterler', 'Devlet Daireleri', 'Belediyeler', 'Vergi Danışmanları'],
  },
  {
    name: 'Medya & Yayıncılık',
    slug: 'medya-yayincilik',
    icon: Newspaper,
    color: 'bg-[#e1f5fe] border-l-[#4fc3f7]',
    subs: ['Kitap & Dergi', 'Fotoğrafçılık', 'Video Prodüksiyon', 'Dijital Medya', 'Podcast'],
  },
  {
    name: 'İş Hizmetleri',
    slug: 'is-hizmetleri',
    icon: Building2,
    color: 'bg-[#fff8e1] border-l-[#ffca28]',
    subs: ['İK & İşe Alım', 'Muhasebe', 'Pazarlama', 'BT Hizmetleri', 'Danışmanlık', 'Lojistik'],
  },
  {
    name: 'İnşaat & İmalat',
    slug: 'insaat-imalat',
    icon: Building2,
    color: 'bg-[#fff9c4] border-l-[#fff176]',
    subs: ['Müteahhitler', 'Yapı Malzemeleri', 'Mimarlık', 'Mühendislik', 'Üretim'],
  },
  {
    name: 'Kamu Hizmetleri',
    slug: 'kamu-hizmetleri',
    icon: Zap,
    color: 'bg-[#e8f5e9] border-l-[#66bb6a]',
    subs: ['Elektrik', 'Doğalgaz', 'Su Hizmetleri', 'Çöp & Atık Yönetimi'],
  },
  {
    name: 'Restoranlar & Kafeler',
    slug: 'restoranlar-kafeler',
    icon: UtensilsCrossed,
    color: 'bg-[#fce4ec] border-l-[#e57373]',
    subs: ['Türk Mutfağı', 'İtalyan Mutfağı', 'Uzak Doğu', 'Fast Food', 'Kafeler', 'Barlar', 'Vejetaryen'],
  },
  {
    name: 'Etkinlik & Eğlence',
    slug: 'etkinlik-eglence',
    icon: Drama,
    color: 'bg-[#f3e5f5] border-l-[#ba68c8]',
    subs: ['Konserler', 'Sinema', 'Tiyatro', 'Oyun', 'Düğün & Parti', 'Çocuk Eğlence', 'Müzeler'],
  },
  {
    name: 'Hobi & El Sanatları',
    slug: 'hobi-el-sanatlari',
    icon: Palette,
    color: 'bg-[#fff3e0] border-l-[#ff8a65]',
    subs: ['Sanat Malzemeleri', 'Müzik Aletleri', 'Bahçecilik', 'Koleksiyon', 'DIY Projeleri'],
  },
  {
    name: 'Yakıt & Enerji',
    slug: 'yakit-enerji',
    icon: Fuel,
    color: 'bg-[#eceff1] border-l-[#90a4ae]',
    subs: ['Akaryakıt İstasyonları', 'LPG', 'Güneş Enerjisi', 'Şarj İstasyonları'],
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#f9f8f5]">
      {/* Search Hero */}
      <div className="bg-[#f3f0ec] py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-superscore-bold text-2xl md:text-3xl text-[#1b1a1b] mb-6">Ne arıyorsunuz?</h1>
          <div className="max-w-lg mx-auto">
            <div className="flex items-center bg-white rounded-lg px-4 py-3 shadow-sm">
              <Search className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
              <input type="text" placeholder="Ara" className="w-full text-[#1b1a1b] outline-none text-base bg-transparent placeholder:text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#1b1a1b] mb-10">Kategorilere göre şirketleri keşfedin</h2>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.slug} className="break-inside-avoid mb-4">
              <div className="border border-gray-200 rounded-2xl overflow-hidden">
                {/* Category header */}
                <Link href={`/kategoriler/${cat.slug}`}>
                  <div className={`${cat.color} border-l-4 px-4 py-4 flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition-opacity`}>
                    <cat.icon className="h-6 w-6 text-[#1b1a1b]/60 mb-2" strokeWidth={1.5} />
                    <h2 className="font-medium text-sm text-[#1b1a1b]">{cat.name}</h2>
                  </div>
                </Link>

                {/* Subcategories */}
                <div className="divide-y divide-gray-100">
                  {cat.subs.map((sub) => (
                    <Link
                      key={sub}
                      href={`/kategoriler/${cat.slug}/${encodeURIComponent(sub.toLowerCase().replace(/\s+/g, '-').replace(/[ğ]/g,'g').replace(/[ü]/g,'u').replace(/[ş]/g,'s').replace(/[ı]/g,'i').replace(/[ö]/g,'o').replace(/[ç]/g,'c').replace(/[&]/g,'ve'))}`}
                      className="block px-4 py-3 text-sm text-[#1b1a1b] hover:bg-gray-50 transition-colors"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

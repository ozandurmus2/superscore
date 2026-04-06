import { createClient } from '@/lib/supabase/server';
import type { MetadataRoute } from 'next';

const SITE_URL = 'https://superscore.com.tr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  // Fetch all brand slugs
  const allBrands: { slug: string; updated_at: string | null }[] = [];
  let offset = 0;
  while (true) {
    const { data } = await supabase
      .from('brands')
      .select('slug, updated_at')
      .range(offset, offset + 999);
    if (!data || data.length === 0) break;
    allBrands.push(...data);
    offset += 1000;
    if (data.length < 1000) break;
  }

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/markalar`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/kategoriler`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sikayetler`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sikayet-yaz`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/nasil-calisir`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/karsilastir`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Brand pages
  const brandPages: MetadataRoute.Sitemap = allBrands.map((brand) => ({
    url: `${SITE_URL}/markalar/${brand.slug}`,
    lastModified: brand.updated_at ? new Date(brand.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...brandPages];
}

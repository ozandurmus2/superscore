import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/marka-panel/', '/panel/', '/api/'],
      },
    ],
    sitemap: 'https://superscore.com.tr/sitemap.xml',
  };
}

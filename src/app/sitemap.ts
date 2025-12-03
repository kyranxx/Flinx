import { MetadataRoute } from 'next'
import { languages } from '@/lib/languages'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.flinx.site';

    return languages.map((locale) => ({
        url: `${baseUrl}/${locale.code}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: locale.code === 'en' ? 1 : 0.9,
    }));
}

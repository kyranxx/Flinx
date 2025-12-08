import { MetadataRoute } from 'next'
import { languages } from '@/lib/languages'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.flinx.site';
    const currentDate = new Date();

    // Add the root URL (canonical English version)
    const rootUrl: MetadataRoute.Sitemap[0] = {
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 1,
    };

    // Add all language-specific URLs
    const languageUrls: MetadataRoute.Sitemap = languages.map((locale) => ({
        url: `${baseUrl}/${locale.code}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: locale.code === 'en' ? 1 : 0.8,
    }));

    return [rootUrl, ...languageUrls];
}

import { MetadataRoute } from 'next'
import { getLanguageUrl, getLocalizedLanguages, SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date();

    // Add the root URL (canonical English version)
    const rootUrl: MetadataRoute.Sitemap[0] = {
        url: SITE_URL,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 1,
    };

    // Add all language-specific URLs
    const languageUrls: MetadataRoute.Sitemap = getLocalizedLanguages().map((language) => ({
        url: getLanguageUrl(language.code),
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [rootUrl, ...languageUrls];
}

import { defaultLanguage, isLanguage, languages } from '@/lib/languages';
import { getLlmsContent } from '@/lib/llms';

const HEADERS = {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, max-age=3600, s-maxage=86400',
};

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
    return languages
        .filter((language) => language.code !== defaultLanguage)
        .map((language) => ({ lang: language.code }));
}

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ lang: string }> }
) {
    const { lang } = await params;

    if (!isLanguage(lang) || lang === defaultLanguage) {
        return new Response('Not found', { status: 404 });
    }

    return new Response(getLlmsContent(lang), {
        headers: HEADERS,
    });
}

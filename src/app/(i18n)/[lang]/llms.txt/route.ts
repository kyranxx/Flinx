import { type Language, languages } from '@/lib/languages';
import { getLlmsContent } from '@/lib/llms';

const HEADERS = {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, max-age=3600, s-maxage=86400',
};

function isLanguage(value: string): value is Language {
    return languages.some((language) => language.code === value);
}

export const dynamic = 'force-static';

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ lang: string }> }
) {
    const { lang } = await params;

    if (!isLanguage(lang)) {
        return new Response('Not found', { status: 404 });
    }

    return new Response(getLlmsContent(lang), {
        headers: HEADERS,
    });
}

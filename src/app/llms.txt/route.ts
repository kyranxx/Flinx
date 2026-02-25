import { getLlmsContent } from '@/lib/llms';

const HEADERS = {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, max-age=3600, s-maxage=86400',
};

export const dynamic = 'force-static';

export async function GET() {
    return new Response(getLlmsContent(), {
        headers: HEADERS,
    });
}

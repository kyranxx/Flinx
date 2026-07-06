import type { Metadata } from 'next'
import sitemap from '../sitemap'

export const metadata: Metadata = {
    title: 'Sitemap | Flinx',
    description: 'Public HTML sitemap for Flinx language pages.',
}

function labelForUrl(url: string) {
    const path = new URL(url).pathname

    if (path === '/') {
        return 'Homepage'
    }

    return path
        .split('/')
        .filter(Boolean)
        .map((part) => part.replace(/-/g, ' '))
        .join(' / ')
}

export default function HtmlSitemapPage() {
    const entries = sitemap()
    const uniqueEntries = Array.from(new Map(entries.map((entry) => [entry.url, entry])).values())

    return (
        <main className="min-h-screen bg-[var(--bg-primary)] px-4 py-14 text-white">
            <div className="mx-auto max-w-5xl">
                <p className="text-sm font-bold uppercase tracking-normal text-[var(--accent-primary)]">Flinx</p>
                <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">Sitemap</h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-gray-300">
                    Public index of canonical Flinx pages and language variants.
                </p>

                <ol className="mt-10 grid gap-3 sm:grid-cols-2" role="list">
                    {uniqueEntries.map((entry) => (
                        <li key={entry.url}>
                            <a
                                href={entry.url}
                                className="block rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-gray-100 transition hover:border-[var(--accent-primary)] hover:text-white"
                            >
                                {labelForUrl(entry.url)}
                            </a>
                        </li>
                    ))}
                </ol>
            </div>
        </main>
    )
}

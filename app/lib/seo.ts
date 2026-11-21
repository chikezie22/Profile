import { profile } from '~/data/profile';

// Open Graph + Twitter tags. These are what WhatsApp, LinkedIn, Slack, iMessage and X read to build
// the big preview card (image, title, link) when someone shares the site.
export function seoMeta(origin: string, path = '') {
  const title = `${profile.name} — ${profile.title}`;
  const image = `${origin}/og-image.jpg`; // must be an absolute URL for link previews

  return [
    { title },
    { name: 'description', content: profile.tagline },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: profile.name },
    { property: 'og:title', content: title },
    { property: 'og:description', content: profile.tagline },
    { property: 'og:url', content: `${origin}${path}` },
    { property: 'og:image', content: image },
    { property: 'og:image:type', content: 'image/jpeg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: `${profile.name}, ${profile.title}` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: profile.tagline },
    { name: 'twitter:image', content: image },
  ];
}

// Pull the site origin the root loader worked out (see root.tsx).
export function originFromMatches(matches: ReadonlyArray<unknown>): string {
  const root = matches.find((m) => (m as { id?: string } | undefined)?.id === 'root') as
    | { loaderData?: { origin?: string }; data?: { origin?: string } }
    | undefined;
  return root?.loaderData?.origin ?? root?.data?.origin ?? '';
}

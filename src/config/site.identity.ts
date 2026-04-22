export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'qr3tw8nsjq',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'LadyFrame',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'CONNECT • SHARE • GROW',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Curate links and resources you come back to. Public profiles sit beside your shelf so trust and context stay visible—built for scanning, not noise.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'ladyframe.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ladyframe.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const


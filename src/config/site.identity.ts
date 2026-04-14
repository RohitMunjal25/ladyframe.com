export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'qr3tw8nsjq',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Lady Frame',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Profile-first community discovery',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A profile-led platform for public identity, updates, and social discovery.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'ladyframe.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ladyframe.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const


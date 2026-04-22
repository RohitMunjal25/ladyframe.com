import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'editorial',
  hero: {
    variant: 'spotlight-split',
    eyebrow: 'Research desk · social bookmarking',
  },
  home: {
    layout: 'editorial-rhythm',
    primaryTask: 'sbm',
    featuredTaskKeys: ['sbm', 'profile'],
  },
  navigation: {
    variant: 'capsule',
  },
  footer: {
    variant: 'dense',
  },
  cards: {
    listing: 'catalog-grid',
    article: 'editorial-feature',
    image: 'studio-panel',
    profile: 'listing-elevated',
    classified: 'catalog-grid',
    pdf: 'editorial-feature',
    sbm: 'editorial-feature',
    social: 'studio-panel',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})

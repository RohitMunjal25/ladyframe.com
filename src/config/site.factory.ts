import type { SiteFactoryRecipe } from '@/design/factory/types'

export const SITE_FACTORY_RECIPE: SiteFactoryRecipe = {
  brandPack: 'directory-clean',
  navbar: 'folio-nav',
  footer: 'dense-footer',
  homeLayout: 'article-home',
  motionPack: 'minimal',
  primaryTask: 'sbm',
  enabledTasks: ['listing', 'classified', 'article', 'image', 'profile', 'sbm'],
  taskLayouts: {
    listing: 'listing-directory',
    classified: 'classified-market',
    article: 'article-editorial',
    image: 'image-portfolio',
    profile: 'profile-business',
    sbm: 'sbm-curation',
  },
}

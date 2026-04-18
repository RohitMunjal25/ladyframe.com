import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'curation',
  themePack: 'folio-emerald',
  homepageTemplate: 'article-home',
  navbarTemplate: 'folio-nav',
  footerTemplate: 'dense-footer',
  motionPack: 'minimal',
  primaryTask: 'sbm',
  enabledTasks: ['listing', 'classified', 'article', 'image', 'profile', 'sbm'],
  taskTemplates: {
    sbm: 'sbm-curation',
    profile: 'profile-business',
    article: 'article-editorial',
    image: 'image-masonry',
    listing: 'listing-showcase',
    classified: 'classified-bulletin',
  },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}

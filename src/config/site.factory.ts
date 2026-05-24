import type { SiteFactoryRecipe } from '@/design/factory/types'

export const SITE_FACTORY_RECIPE: SiteFactoryRecipe = {
  brandPack: 'market-utility',
  navbar: 'compact-bar',
  footer: 'editorial-footer',
  homeLayout: 'article-home',
  motionPack: 'editorial-soft',
  primaryTask: 'sbm',
  enabledTasks: ["sbm", "profile"],
  taskLayouts: {
    sbm: 'sbm-board',
    profile: 'profile-business',
  },
}

import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Tag, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory':
    'bg-[radial-gradient(circle_at_12%_0%,rgba(64,138,113,0.12),transparent_38%),linear-gradient(180deg,#f4fff8_0%,#ffffff_100%)]',
  'listing-showcase':
    'bg-[linear-gradient(135deg,#ecfdf5_0%,#ffffff_48%,#f0fdf7_100%)]',
  'article-editorial':
    'bg-[radial-gradient(circle_at_0%_20%,rgba(176,228,204,0.35),transparent_42%),linear-gradient(180deg,#fffefa_0%,#f6fff9_100%)]',
  'article-journal':
    'bg-[linear-gradient(180deg,#fdfcf8_0%,#eef8f2_55%,#ffffff_100%)]',
  'image-masonry': 'bg-[linear-gradient(180deg,#050f0d_0%,#0c1f1a_55%,#091413_100%)] text-white',
  'image-portfolio': 'bg-[linear-gradient(180deg,#061512_0%,#0f2a24_100%)] text-white',
  'profile-creator': 'bg-[linear-gradient(180deg,#040d0b_0%,#0f2420_100%)] text-white',
  'profile-business':
    'bg-[radial-gradient(circle_at_100%_0%,rgba(176,228,204,0.28),transparent_40%),linear-gradient(180deg,#ffffff_0%,#f3fff8_100%)]',
  'classified-bulletin':
    'bg-[linear-gradient(180deg,#f7fff2_0%,#eef9f4_45%,#ffffff_100%)]',
  'classified-market':
    'bg-[linear-gradient(180deg,#f3fff6_0%,#fbfefa_100%)]',
  'sbm-curation':
    'bg-[radial-gradient(circle_at_20%_0%,rgba(40,90,72,0.12),transparent_40%),linear-gradient(180deg,#f6fffb_0%,#ffffff_100%)]',
  'sbm-library':
    'bg-[linear-gradient(180deg,#f4fffb_0%,#eefcf6_40%,#ffffff_100%)]',
  'pdf-editorial':
    'bg-[radial-gradient(circle_at_80%_0%,rgba(176,228,204,0.22),transparent_36%),linear-gradient(180deg,#fffdf7_0%,#f4fff8_100%)]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark = ['image-masonry', 'image-portfolio', 'profile-creator'].includes(layoutKey)
  const ui = isDark
    ? {
        muted: 'text-[#b0e4cc]/75',
        panel: 'border border-[rgba(176,228,204,0.18)] bg-[rgba(9,20,19,0.55)]',
        soft: 'border border-white/10 bg-white/5',
        input: 'border-white/15 bg-white/8 text-white',
        button: 'bg-[#b0e4cc] text-[#091413] hover:bg-[#9fd6b8]',
      }
    : layoutKey.startsWith('article') || layoutKey.startsWith('sbm') || layoutKey === 'pdf-editorial'
      ? {
          muted: 'text-[rgb(55,85,76)]',
          panel: 'border border-[rgba(64,138,113,0.22)] bg-white/95',
          soft: 'border border-[rgba(64,138,113,0.18)] bg-[rgba(236,252,244,0.85)]',
          input: 'border border-[rgba(64,138,113,0.28)] bg-white text-[#091413]',
          button: 'bg-[#285a48] text-[#f4fff8] hover:bg-[#1f4639]',
        }
      : {
          muted: 'text-[rgb(55,85,76)]',
          panel: 'border border-[rgba(64,138,113,0.2)] bg-white',
          soft: 'border border-[rgba(64,138,113,0.16)] bg-[#f3fff8]',
          input: 'border border-[rgba(64,138,113,0.25)] bg-white text-[#091413]',
          button: 'bg-[#285a48] text-[#f4fff8] hover:bg-[#1f4639]',
        }

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className={`rounded-[2rem] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.07)] ${ui.panel}`}>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] opacity-70"><Icon className="h-4 w-4" /> {taskConfig?.label || task}</div>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>Directory rhythm with mineral cards, mint metadata chips, and a wider hero split so listings feel materially different from the bookmark shelf.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}>Explore results <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.soft}`}>Open search</Link>
              </div>
            </div>
            <form className={`grid gap-3 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${ui.soft}`} action={taskConfig?.route || '#'}>
              <div>
                <label className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Category</label>
                <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={`h-11 rounded-xl text-sm font-medium ${ui.button}`}>Apply filters</button>
            </form>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>Journal pacing with tall headlines, parchment panels, and a calmer filter rail so articles never reuse the SBM ink layout.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Reading note</p>
              <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>Use category filters to jump between topics without collapsing the page into the same repeated card rhythm used by other task types.</p>
              <form className="mt-5 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                <Icon className="h-3.5 w-3.5" /> Visual feed
              </div>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>
                LadyFrame image posts use a darker gallery rail so photography and screenshots read clearly next to the emerald bookmark desk.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`min-h-[220px] rounded-[2rem] ${ui.panel}`} />
              <div className={`min-h-[220px] rounded-[2rem] ${ui.soft}`} />
              <div className={`col-span-2 min-h-[120px] rounded-[2rem] ${ui.panel}`} />
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] ${ui.panel}`}>
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className={`min-h-[240px] rounded-[2rem] ${ui.soft}`} />
              <div>
                <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">
                  Public profiles that answer “who is behind this?”—without a noisy social feed.
                </h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>
                  LadyFrame profiles pair portrait, bio, and outbound links with the same mint-on-emerald language as the bookmark shelf so trust stays consistent site-wide.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className={`rounded-[1.8rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Bulletin board pacing for offers, gigs, and flash notices.</h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {['Quick to scan', 'Shorter response path', 'Clearer urgency cues'].map((item) => (
                <div key={item} className={`rounded-[1.5rem] p-5 ${ui.soft}`}>
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Bookmark shelf with collection filters and mint metadata.</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>Dense scanning, compact category rail, and emerald paper panels tuned for social bookmarking—not magazine spreads.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.24em] ${ui.muted}`}>Collection filter</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'pdf-editorial' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-stretch">
            <div className={`flex flex-col justify-between rounded-[2rem] border border-[rgba(64,138,113,0.22)] bg-[linear-gradient(180deg,#fffdf7_0%,#f4fff8_100%)] p-7 shadow-[0_20px_55px_rgba(9,20,19,0.06)]`}>
              <div>
                <p className={`text-xs uppercase tracking-[0.28em] ${ui.muted}`}>Vault</p>
                <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#091413]">PDFs & downloads</h1>
              </div>
              <p className={`mt-6 text-sm leading-7 ${ui.muted}`}>Vertical rhythm tuned for filenames, file types, and quick download decisions—distinct from the horizontal bookmark shelf.</p>
            </div>
            <div className={`grid gap-4 rounded-[2rem] p-7 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Browse by category</p>
              <form className="flex flex-col gap-3 sm:flex-row sm:items-end" action={taskConfig?.route || '#'}>
                <div className="flex-1">
                  <label className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Category</label>
                  <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" className={`h-11 shrink-0 rounded-xl px-6 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
              <div className="mt-2 grid gap-3 sm:grid-cols-3">
                {['Versioned files', 'Readable previews', 'Linked from bookmarks'].map((label) => (
                  <div key={label} className={`rounded-2xl border border-[rgba(64,138,113,0.15)] bg-[rgba(236,252,244,0.65)] p-4 text-sm font-medium text-[#1a3d32]`}>{label}</div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {intro ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}

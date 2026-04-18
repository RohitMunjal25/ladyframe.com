import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { FOOTER_OVERRIDE_ENABLED, FooterOverride } from '@/overrides/footer'

const footerLinks = {
  company: [{ name: 'About', href: '/about' }],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Cookies', href: '/cookies' },
    { name: 'Licenses', href: '/licenses' },
  ],
} as const

const footerSections = ['company', 'legal'] as const

export function Footer() {
  if (FOOTER_OVERRIDE_ENABLED) {
    return <FooterOverride />
  }

  const { recipe } = getFactoryState()

  if (recipe.footer === 'minimal-footer') {
    return (
      <footer className="border-t border-[#d7deca] bg-[#f4f6ef] text-[#1f2617]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8">
          <div>
            <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
            <p className="mt-1 text-sm text-[#56604b]">{SITE_CONFIG.description}</p>
            <Link href="/about" className="mt-4 inline-block text-sm font-semibold text-[#1f2617] underline-offset-4 hover:underline">
              About
            </Link>
          </div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'dense-footer') {
    return (
      <footer className="border-t border-[rgba(176,228,204,0.18)] bg-[linear-gradient(180deg,#050f0d_0%,#091413_42%,#0c1f1a_100%)] text-[#e8fff4]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
            <div className="max-w-xl">
              <Link href="/" className="inline-flex items-center gap-3 rounded-xl transition hover:opacity-90">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#408a71]/40 bg-white/95 shadow-sm">
                  <img src="/favicon.png" alt={`${SITE_CONFIG.name}`} width={48} height={48} className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="text-lg font-semibold tracking-tight text-white">{SITE_CONFIG.name}</p>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#b0e4cc]/75">{siteContent.footer.tagline}</p>
                </div>
              </Link>
              <p className="mt-5 text-sm leading-relaxed text-[#b0e4cc]/88">{SITE_CONFIG.description}</p>
            </div>
            <div className="grid max-w-md gap-10 sm:grid-cols-2 sm:gap-12">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b0e4cc]/65">Company</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-[#dff9ec]/90">
                  {footerLinks.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="transition hover:text-[#b0e4cc]">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#b0e4cc]/65">Legal</h3>
                <ul className="mt-4 space-y-2.5 text-sm text-[#dff9ec]/90">
                  {footerLinks.legal.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="transition hover:text-[#b0e4cc]">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-6 text-sm text-[#b0e4cc]/55">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'editorial-footer') {
    return (
      <footer className="border-t border-[#dbc6b6] bg-[linear-gradient(180deg,#fff9f0_0%,#fff1df_100%)] text-[#2f1d16]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#dbc6b6] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#72594a]">
                <Sparkles className="h-3.5 w-3.5" />
                Editorial desk
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{SITE_CONFIG.name}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#72594a]">{SITE_CONFIG.description}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6d5a]">Company</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {footerLinks.company.map((item) => (
                  <li key={item.name}><Link href={item.href} className="hover:text-[#2f1d16]">{item.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] text-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr_0.85fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
                <img src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} width="44" height="44" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="block text-lg font-semibold">{SITE_CONFIG.name}</span>
                <span className="text-xs uppercase tracking-[0.22em] text-slate-500">{siteContent.footer.tagline}</span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">{SITE_CONFIG.description}</p>
          </div>
          {footerSections.map((section) => (
            <div key={section}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{section}</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {footerLinks[section].map((item) => (
                  <li key={item.name}><Link href={item.href} className="hover:text-slate-950">{item.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
      </div>
    </footer>
  )
}

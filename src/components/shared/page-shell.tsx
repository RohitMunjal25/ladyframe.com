'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main>
        <section className="border-b border-[rgba(64,138,113,0.18)] bg-[linear-gradient(90deg,rgba(236,252,244,0.9),rgba(255,255,255,0.95))]">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#285a48]">Desk</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#091413]">{title}</h1>
                {description && (
                  <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  )
}

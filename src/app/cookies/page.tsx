import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  { title: 'Essential cookies', body: `Required so ${SITE_CONFIG.name} can keep you signed in, protect forms, and load the application securely.` },
  { title: 'Analytics cookies', body: 'Optional cookies that help us see aggregate traffic and performance so we can improve search and stability.' },
  { title: 'Preference cookies', body: 'Remember choices such as theme or filters on your device so repeat visits feel consistent.' },
]

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie Policy"
      description={`How ${SITE_CONFIG.name} uses cookies and similar technologies.`}
    >
      <Card className="border-border bg-card">
        <CardContent className="p-6 space-y-4">
          <p className="text-xs text-muted-foreground">Last updated: March 16, 2026</p>
          {sections.map((section) => (
            <div key={section.title} className="rounded-lg border border-border bg-secondary/40 p-4">
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </PageShell>
  )
}

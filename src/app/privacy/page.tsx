import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { SITE_CONFIG } from '@/lib/site-config'

const sections = [
  {
    title: 'Data we collect',
    body: `When you use ${SITE_CONFIG.name}, we collect account details (name, email), content you publish (bookmarks, profiles, posts), and technical logs needed to run and secure the service.`,
  },
  {
    title: 'How we use data',
    body: 'We use this information to operate search and feeds, prevent abuse, fix bugs, and send essential product email such as security notices.',
  },
  {
    title: 'Your choices',
    body: 'You can update or delete most content from your dashboard, export where available, and request account deletion through support.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description={`How ${SITE_CONFIG.name} collects, uses, and protects personal information.`}
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

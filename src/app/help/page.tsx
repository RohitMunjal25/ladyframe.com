import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { mockFaqs } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'

const topics = [
  { title: 'Getting started', description: `Create your ${SITE_CONFIG.name} account, complete your profile, and save your first bookmark.` },
  { title: 'Bookmarks and collections', description: 'Submit links, tag them, and group saves into collections you can share or keep private.' },
  { title: 'Profiles and publishing', description: 'Polish your public profile, then add articles, listings, classifieds, or PDFs when you need them.' },
]

export default function HelpPage() {
  return (
    <PageShell
      title="Help Center"
      description={`Guides and answers for using ${SITE_CONFIG.name}: bookmarks, profiles, and the rest of the archive.`}
      actions={
        <Button asChild>
          <Link href="/contact">Contact Support</Link>
        </Button>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-6 md:grid-cols-2">
          {topics.map((topic) => (
            <Card key={topic.title} className="border-border bg-card transition-transform hover:-translate-y-1">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-foreground">{topic.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground">FAQ</h3>
            <Accordion type="single" collapsible className="mt-4">
              {mockFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  )
}

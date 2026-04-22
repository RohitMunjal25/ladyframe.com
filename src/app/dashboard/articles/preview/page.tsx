import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function ArticlePreviewPage() {
  return (
    <PageShell
      title="Article Preview"
      description="Preview typography and spacing before you publish to LadyFrame."
      actions={
        <Button variant="outline" asChild>
          <Link href="/dashboard/articles/new">Back to Editor</Link>
        </Button>
      }
    >
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-foreground">Article headline appears here</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            This preview route shows how your draft will read on LadyFrame. Return to the editor to adjust title, excerpt,
            and body—then publish when you are satisfied with the rhythm and hierarchy.
          </p>
        </CardContent>
      </Card>
    </PageShell>
  )
}

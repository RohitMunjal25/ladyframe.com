import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/site-config";

const sections = [
  {
    title: "Accounts",
    body: `You are responsible for activity under your ${SITE_CONFIG.name} login. Use a strong password and notify support if you suspect unauthorized access.`,
  },
  {
    title: "Content you publish",
    body: `You retain rights to your text, links, and media. You grant ${SITE_CONFIG.name} a non-exclusive license to host, display, and distribute that content on the service.`,
  },
  {
    title: "Acceptable use",
    body: "Do not post spam, malware, harassment, or illegal material. We may remove content or suspend accounts that put members or the platform at risk.",
  },
];

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description={`The rules and guidelines for using ${SITE_CONFIG.name}.`}
    >
      <Card className="border-border bg-card">
        <CardContent className="space-y-4 p-6">
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
  );
}

import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const roles = [
  { title: "Product Designer (UX)", location: "Remote", type: "Full-time", level: "Mid" },
  { title: "Full-stack Engineer", location: "Remote", type: "Full-time", level: "Senior" },
  { title: "Community & support lead", location: "Remote", type: "Part-time", level: "Mid" },
];

const benefits = [
  "Remote-first team with overlap-friendly hours",
  "Hardware and home-office stipend where applicable",
  "Learning budget for courses, books, and conferences",
  "Small team: your work ships directly to members",
];

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      description={`Join ${SITE_CONFIG.name} and help shape calm, trustworthy bookmarking and profiles for people who live in links.`}
      actions={
        <Button asChild>
          <Link href="/contact">Apply Now</Link>
        </Button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {roles.map((role) => (
            <Card key={role.title} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{role.level}</Badge>
                  <Badge variant="outline">{role.type}</Badge>
                </div>
                <h2 className="mt-3 text-lg font-semibold text-foreground">{role.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{role.location}</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/contact">View Role</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground">Why {SITE_CONFIG.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We are building {SITE_CONFIG.name}: a place to save links with intention, show who you are in public, and
              grow an audience without noisy feeds.
            </p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              {benefits.map((benefit) => (
                <div key={benefit} className="rounded-md border border-border bg-secondary/40 px-3 py-2">
                  {benefit}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

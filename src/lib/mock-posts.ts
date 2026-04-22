import type { TaskKey } from "./site-config";
import type { SitePost } from "./site-connector";
import { siteIdentity } from "@/config/site.identity";

const taskSeeds: Record<TaskKey, string> = {
  listing: "listing",
  classified: "classified",
  article: "article",
  image: "image",
  profile: "profile",
  social: "social",
  pdf: "pdf",
  org: "org",
  sbm: "sbm",
  comment: "comment",
};

const taskTitles: Record<TaskKey, string[]> = {
  listing: [
    "Northside Creative Studio",
    "Harbor City Pilates",
    "Elm Street Bookshop",
    "Brightline Legal Clinic",
    "Riverside Plant Co.",
  ],
  classified: [
    "Standing desk — local pickup",
    "Small office sublet (month-to-month)",
    "Looking for UX contract (Q2)",
    "Weekend photo walk — 12 spots",
    "Vintage road bike",
  ],
  article: [
    "How we organize research at LadyFrame",
    "Designing calm bookmark shelves",
    "Public profiles without the performance feed",
    "From saved link to trusted source",
    "Shipping features on a small team",
  ],
  image: [
    "Workspace tour — editorial desk",
    "Community meetup — spring 2026",
    "Brand refresh moodboard",
    "Field notes from our last offsite",
    "Product photography — mint on emerald",
  ],
  profile: [
    "Ananya Mehta",
    "Jordan Ellis",
    "Studio Lumen",
    "Rahul Verma",
    "Morgan Lee",
  ],
  social: [
    "LadyFrame changelog — March",
    "Office hours: collections Q&A",
    "Bookmarking habits that stuck",
    "Welcome new curators",
    "Tips for a clearer public profile",
  ],
  pdf: [
    "LadyFrame product overview (PDF)",
    "Accessibility checklist for publishers",
    "Onboarding checklist for teams",
    "Content moderation guidelines",
    "API quick reference",
  ],
  org: [
    "LadyFrame Labs",
    "Open Curators Guild",
    "Harbor Media Collective",
    "Northwind Research",
    "Brightline Education",
  ],
  sbm: [
    "Shelf picks — links teams reopen before every review",
    "Profile spine — who saved or published this, at a glance",
    "Collections — shared shelves without losing your personal flow",
    "Trust cues — bios, continuity, and outbound credibility",
    "One desk — bookmarks, profiles, and search in the same rhythm",
  ],
  comment: [
    "Notes on bookmark shelf density",
    "Reply: profile trust signals",
    "Discussion: collection privacy",
    "Feedback: search filters",
    "Thread: emerald theme contrast",
  ],
};

const taskCategories: Record<TaskKey, string[]> = {
  listing: ["Studio", "Wellness", "Retail", "Services", "Outdoors"],
  classified: ["Furniture", "Space", "Jobs", "Events", "Market"],
  article: ["Product", "Design", "Community", "Trust", "Engineering"],
  image: ["Studio", "Events", "Brand", "Team", "Product"],
  profile: ["Curator", "Writer", "Studio", "Developer", "Educator"],
  social: ["Updates", "Q&A", "Tips", "Welcome", "Changelog"],
  pdf: ["Guides", "Policy", "Reference", "Onboarding", "Research"],
  org: ["Partner", "Collective", "Nonprofit", "Studio", "Education"],
  sbm: [
    "Curated saves",
    "Public profiles",
    "Collections",
    "Trust & context",
    "How it works",
  ],
  comment: ["Discussion", "Feedback", "Notes", "Reply", "Ideas"],
};

const summaryByTask: Record<TaskKey, string> = {
  listing: "Verified business listing with hours, location, and contact paths.",
  classified: "Short-lived offer or notice from a community member.",
  article: "Long-form note from the LadyFrame editorial desk or members.",
  image: "Photo set or visual story published to the gallery.",
  profile: "Public profile with bio, links, and activity highlights.",
  social: "Lightweight update from the LadyFrame community lane.",
  pdf: "Downloadable reference or guideline hosted on LadyFrame.",
  org: "Organization hub with structured details and outbound links.",
  sbm:
    "Hand-picked save with a short why—meant for quick scanning beside profile trust.",
  comment: "Thread reply or discussion note tied to a story.",
};

const sampleSites = [
  "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
  "https://web.dev/learn/performance/",
  "https://www.nngroup.com/articles/",
  "https://www.a11yproject.com/",
  "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
];

const siteBase = siteIdentity.url.replace(/\/$/, "");
const sbmShelfPreviewUrls = [
  `${siteBase}/sbm`,
  `${siteBase}/profile`,
  `${siteBase}/help`,
  `${siteBase}/search`,
  `${siteBase}/about`,
];

const authorNames = [
  "Community curators",
  "Editorial desk",
  "Member shelf",
];

const randomFrom = (items: string[], index: number) =>
  items[index % items.length];

const buildImage = (task: TaskKey, index: number) =>
  `https://picsum.photos/seed/${taskSeeds[task]}-${index}/1200/800`;

export const getMockPostsForTask = (task: TaskKey): SitePost[] => {
  return Array.from({ length: 5 }).map((_, index) => {
    const title = taskTitles[task][index];
    const category = randomFrom(taskCategories[task], index);
    const slug = `${title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const website =
      task === "sbm"
        ? sbmShelfPreviewUrls[index % sbmShelfPreviewUrls.length]
        : sampleSites[index % sampleSites.length];

    return {
      id: `${task}-mock-${index + 1}`,
      title,
      slug,
      summary: summaryByTask[task],
      content: {
        type: task,
        category,
        location: index % 2 === 0 ? "Remote" : "India",
        description: summaryByTask[task],
        website,
      },
      media: [{ url: buildImage(task, index), type: "IMAGE" }],
      tags: [task, category],
      authorName: authorNames[index % authorNames.length],
      publishedAt: new Date().toISOString(),
    };
  });
};

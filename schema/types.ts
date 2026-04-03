// Auto-generated TypeScript types from Drupal GraphQL schema.
// Run `decoupled-cli schema sync` to regenerate.

export interface NodeHomepage {
  id: string;
  ctaDescription: { value: string };
  ctaPrimary: string;
  ctaSecondary: string;
  ctaTitle: string;
  featuredItemsTitle: string;
  heroDescription: { value: string };
  heroSubtitle: string;
  heroTitle: string;
  path: string;
  statsItems: any[];
  title: string;
}

export interface ParagraphStatItem {
  id: string;
  label: string;
  number: string;
}

export interface NodeIndustry {
  id: string;
  body: { value: string; summary?: string };
  image: { url: string; alt: string; width: number; height: number };
  openPositions: number;
  path: string;
  title: string;
}

export interface NodeJobOpening {
  id: string;
  body: { value: string; summary?: string };
  companyName: string;
  employmentType: string;
  image: { url: string; alt: string; width: number; height: number };
  jobIndustry: string;
  location: string;
  path: string;
  salaryRange: string;
  title: string;
}

export interface NodeNews {
  id: string;
  body: { value: string; summary?: string };
  image: { url: string; alt: string; width: number; height: number };
  newsCategory: string;
  path: string;
  title: string;
}

export interface NodePage {
  id: string;
  body: { value: string; summary?: string };
  path: string;
  title: string;
}

export interface NodeTeamMember {
  id: string;
  body: { value: string; summary?: string };
  email: string;
  path: string;
  phone: string;
  photo: { url: string; alt: string; width: number; height: number };
  position: string;
  specialtyArea: string;
  title: string;
}

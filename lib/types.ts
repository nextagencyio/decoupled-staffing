// Base node type
export interface DrupalNode {
  __typename?: string
  id: string
  title: string
  path: string
  created: {
    timestamp: number
  }
  changed: {
    timestamp: number
  }
}

// Paragraph types
export interface DrupalStatItem {
  id: string
  number: string
  label: string
}

// Homepage
export interface DrupalHomepage extends DrupalNode {
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: {
    processed: string
  }
  statsItems?: DrupalStatItem[]
  featuredItemsTitle?: string
  ctaTitle?: string
  ctaDescription?: {
    processed: string
  }
  ctaPrimary?: string
  ctaSecondary?: string
}

export interface HomepageData {
  nodeHomepages: {
    nodes: DrupalHomepage[]
  }
}

// Job Opening
export interface DrupalJobOpening extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  companyName?: string
  location?: string
  employmentType?: string
  salaryRange?: string
  jobIndustry?: string
  image?: DrupalImage
}

export interface JobOpeningsData {
  nodeJobOpenings: {
    nodes: DrupalJobOpening[]
  }
}

// Industry
export interface DrupalIndustry extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  openPositions?: number
  image?: DrupalImage
}

export interface IndustriesData {
  nodeIndustries: {
    nodes: DrupalIndustry[]
  }
}

// Team Member
export interface DrupalTeamMember extends DrupalNode {
  body?: {
    processed: string
  }
  position?: string
  email?: string
  phone?: string
  specialtyArea?: string
  photo?: DrupalImage
}

export interface TeamMembersData {
  nodeTeamMembers: {
    nodes: DrupalTeamMember[]
  }
}

// News
export interface DrupalNews extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  newsCategory?: string
  image?: DrupalImage
}

export interface NewsData {
  nodeNewsItems: {
    nodes: DrupalNews[]
  }
}

// Basic Page
export interface DrupalPage extends DrupalNode {
  body?: {
    processed: string
  }
}

// Shared types
export interface DrupalImage {
  url: string
  alt?: string
  width?: number
  height?: number
  variations?: Array<{
    name: string
    url: string
    width: number
    height: number
  }>
}

export interface DrupalTerm {
  id: string
  name: string
  path?: string
}

// Legacy compatibility
export interface DrupalArticle extends DrupalNode {
  body?: {
    processed: string
    summary?: string
  }
  image?: DrupalImage
  tags?: DrupalTerm[]
}

export interface ArticleTeaserData {
  nodeArticles: {
    nodes: DrupalArticle[]
  }
}

// Feature color type
export type FeatureColor = 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo'

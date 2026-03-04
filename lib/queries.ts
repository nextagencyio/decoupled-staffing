import { gql } from '@apollo/client'

// Homepage query with stats
export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    nodeHomepages(first: 1) {
      nodes {
        id
        title
        path
        heroTitle
        heroSubtitle
        heroDescription {
          processed
        }
        statsItems {
          ... on ParagraphStatItem {
            id
            number
            label
          }
        }
        featuredItemsTitle
        ctaTitle
        ctaDescription {
          processed
        }
        ctaPrimary
        ctaSecondary
      }
    }
  }
`

// Job Openings
export const GET_JOB_OPENINGS = gql`
  query GetJobOpenings($first: Int = 20) {
    nodeJobOpenings(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeJobOpening {
          body {
            processed
            summary
          }
          companyName
          location
          employmentType
          salaryRange
          jobIndustry
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_JOB_OPENING_BY_PATH = gql`
  query GetJobOpeningByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeJobOpening {
            id
            title
            path
            body {
              processed
            }
            companyName
            location
            employmentType
            salaryRange
            jobIndustry
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// Industries
export const GET_INDUSTRIES = gql`
  query GetIndustries($first: Int = 20) {
    nodeIndustries(first: $first, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeIndustry {
          body {
            processed
            summary
          }
          openPositions
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_INDUSTRY_BY_PATH = gql`
  query GetIndustryByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeIndustry {
            id
            title
            path
            body {
              processed
            }
            openPositions
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// Team Members
export const GET_TEAM_MEMBERS = gql`
  query GetTeamMembers($first: Int = 50) {
    nodeTeamMembers(first: $first, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeTeamMember {
          body {
            processed
          }
          position
          email
          phone
          specialtyArea
          photo {
            url
            alt
            width
            height
            variations(styles: [MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_TEAM_MEMBER_BY_PATH = gql`
  query GetTeamMemberByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeTeamMember {
            id
            title
            path
            body {
              processed
            }
            position
            email
            phone
            specialtyArea
            photo {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// News
export const GET_NEWS = gql`
  query GetNews($first: Int = 20) {
    nodeNewsItems(first: $first, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeNews {
          body {
            processed
            summary
          }
          newsCategory
          image {
            url
            alt
            width
            height
            variations(styles: [LARGE, MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

export const GET_NEWS_BY_PATH = gql`
  query GetNewsByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodeNews {
            id
            title
            path
            created {
              timestamp
            }
            body {
              processed
            }
            newsCategory
            image {
              url
              alt
              width
              height
              variations(styles: [LARGE, MEDIUM]) {
                name
                url
                width
                height
              }
            }
          }
        }
      }
    }
  }
`

// Generic route query for all content types
export const GET_NODE_BY_PATH = gql`
  query GetNodeByPath($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePage {
            id
            title
            body {
              processed
            }
          }
          ... on NodeJobOpening {
            id
            title
            path
            body {
              processed
            }
            companyName
            location
            employmentType
            salaryRange
            jobIndustry
            image {
              url
              alt
            }
          }
          ... on NodeIndustry {
            id
            title
            path
            body {
              processed
            }
            openPositions
            image {
              url
              alt
            }
          }
          ... on NodeTeamMember {
            id
            title
            path
            body {
              processed
            }
            position
            email
            phone
            specialtyArea
            photo {
              url
              alt
            }
          }
          ... on NodeNews {
            id
            title
            path
            created {
              timestamp
            }
            body {
              processed
            }
            newsCategory
            image {
              url
              alt
            }
          }
          ... on NodeHomepage {
            id
            title
            heroTitle
            heroSubtitle
            heroDescription {
              processed
            }
            statsItems {
              ... on ParagraphStatItem {
                id
                number
                label
              }
            }
            featuredItemsTitle
            ctaTitle
            ctaDescription {
              processed
            }
            ctaPrimary
            ctaSecondary
          }
        }
      }
    }
  }
`

// Featured job openings for homepage
export const GET_FEATURED_JOB_OPENINGS = gql`
  query GetFeaturedJobOpenings {
    nodeJobOpenings(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        ... on NodeJobOpening {
          companyName
          location
          employmentType
          salaryRange
          image {
            url
            alt
            variations(styles: [MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

// Featured industries for homepage
export const GET_FEATURED_INDUSTRIES = gql`
  query GetFeaturedIndustries {
    nodeIndustries(first: 3, sortKey: TITLE) {
      nodes {
        id
        title
        path
        ... on NodeIndustry {
          openPositions
          image {
            url
            alt
            variations(styles: [MEDIUM]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

// Recent news for homepage
export const GET_RECENT_NEWS = gql`
  query GetRecentNews {
    nodeNewsItems(first: 3, sortKey: CREATED_AT) {
      nodes {
        id
        title
        path
        created {
          timestamp
        }
        ... on NodeNews {
          body {
            summary
          }
          newsCategory
          image {
            url
            alt
            variations(styles: [MEDIUM, THUMBNAIL]) {
              name
              url
              width
              height
            }
          }
        }
      }
    }
  }
`

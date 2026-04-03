/**
 * Stub typed client — replaced by `npm run sync-schema`.
 *
 * Run `npx decoupled-cli schema sync` after connecting to a Drupal space
 * to generate the real typed client with interfaces and queries.
 */

import type { DecoupledClient } from 'decoupled-client'
import type { DrupalNode } from 'decoupled-client'
import type { QueryOptions } from 'decoupled-client'

// Placeholder types — sync-schema will replace with actual content types
export type ContentNode = DrupalNode
export type ContentTypeName = string

export interface ContentTypeMap {
  [key: string]: DrupalNode
}

export interface TypedClient {
  getEntries<K extends ContentTypeName>(type: K, options?: QueryOptions): Promise<DrupalNode[]>
  getEntry<K extends ContentTypeName>(type: K, id: string): Promise<DrupalNode | null>
  getEntryByPath(path: string): Promise<ContentNode | null>
  raw<T = any>(queryOrOptions: string | { query: string; variables?: Record<string, any>; [key: string]: any }, variables?: Record<string, any>): Promise<T>
}

const ROUTE_QUERY = `
  query ($path: String!) {
    route(path: $path) {
      ... on RouteInternal {
        entity {
          ... on NodePage { __typename id title path body { processed } }
          ... on NodeHomepage {
            __typename id title path
            heroTitle heroSubtitle heroDescription { processed }
            statsItems { ... on ParagraphStatItem { id number label } }
            featuredItemsTitle
            ctaTitle ctaDescription { processed } ctaPrimary ctaSecondary
          }
          ... on NodeJobOpening {
            __typename id title path
            body { processed }
            companyName location employmentType salaryRange jobIndustry
            image { url alt width height }
          }
          ... on NodeIndustry {
            __typename id title path
            body { processed summary }
            openPositions
            image { url alt width height }
          }
          ... on NodeTeamMember {
            __typename id title path
            body { processed }
            position email phone specialtyArea
            photo { url alt width height }
          }
          ... on NodeNews {
            __typename id title path
            created { timestamp }
            body { processed summary }
            newsCategory
            image { url alt width height }
          }
        }
      }
    }
  }
`

// Stub factory — uses raw queryByPath with a comprehensive route query
export function createTypedClient(client: DecoupledClient): TypedClient {
  return {
    async getEntries() { return [] },
    async getEntry() { return null },
    async getEntryByPath(path) {
      return client.queryByPath(path, ROUTE_QUERY)
    },
    async raw(queryOrOptions, variables) {
      if (typeof queryOrOptions === 'object' && queryOrOptions !== null) {
        const { query, variables: vars } = queryOrOptions as { query: string; variables?: Record<string, any> }
        return client.query(query, vars)
      }
      return client.query(queryOrOptions, variables)
    },
  }
}

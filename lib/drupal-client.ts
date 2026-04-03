/**
 * Drupal client singleton using decoupled-client.
 *
 * Usage:
 *   import { getClient } from '@/lib/drupal-client'
 *   const client = getClient()
 *   const page = await client.getEntryByPath('/about')
 */

import { createClient } from 'decoupled-client'
import type { TypedClient } from '@/schema/client'
import { isDemoMode, handleMockQuery } from './demo-mode'

let _client: TypedClient | null = null
let _mockClient: TypedClient | null = null

function createMockTypedClient(): TypedClient {
  if (_mockClient) return _mockClient

  _mockClient = {
    async getEntries() { return [] },
    async getEntry() { return null },
    async getEntryByPath(path) {
      // For homepage, return the first homepage node from mock data
      if (!path || path === '/') {
        const result = handleMockQuery(JSON.stringify({
          query: 'GetHomepageData nodeHomepages',
          variables: {}
        }))
        return result?.data?.nodeHomepages?.nodes?.[0] || null
      }
      // For other paths, try route lookup
      const result = handleMockQuery(JSON.stringify({
        query: 'route',
        variables: { path }
      }))
      return result?.data?.route?.entity || null
    },
    async raw(queryOrOptions: any, variables?: any) {
      let q: string
      let v: any
      if (typeof queryOrOptions === 'object' && queryOrOptions !== null && 'query' in queryOrOptions) {
        q = queryOrOptions.query
        v = queryOrOptions.variables
      } else {
        q = typeof queryOrOptions === 'string' ? queryOrOptions : ''
        v = variables
      }
      const result = handleMockQuery(JSON.stringify({ query: q, variables: v }))
      return result?.data ?? result
    },
  } as TypedClient

  return _mockClient
}

export function getClient(): TypedClient {
  if (isDemoMode()) {
    return createMockTypedClient()
  }

  if (_client) return _client

  let createTypedClient: ((base: any) => TypedClient) | null = null
  try {
    createTypedClient = require('@/schema/client').createTypedClient
  } catch {
    // schema/client.ts not generated yet
  }

  const baseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
  const clientId = process.env.DRUPAL_CLIENT_ID
  const clientSecret = process.env.DRUPAL_CLIENT_SECRET

  if (!baseUrl || !clientId || !clientSecret) {
    throw new Error('Missing Drupal credentials. Set NEXT_PUBLIC_DRUPAL_BASE_URL, DRUPAL_CLIENT_ID, DRUPAL_CLIENT_SECRET.')
  }

  const base = createClient({
    baseUrl,
    clientId,
    clientSecret,
    fetch: ((input: RequestInfo | URL, init?: RequestInit) =>
      globalThis.fetch(input, {
        ...init,
        next: { tags: ['drupal'] },
      } as RequestInit)) as typeof globalThis.fetch,
  })

  if (createTypedClient) {
    _client = createTypedClient(base)
  } else {
    _client = {
      async getEntries() { return [] },
      async getEntry() { return null },
      async getEntryByPath(path) {
        return base.queryByPath(path, `
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
        `)
      },
      async raw(queryOrOptions: any, variables?: any) {
        if (typeof queryOrOptions === 'object' && queryOrOptions !== null) {
          const { query, variables: vars } = queryOrOptions
          return base.query(query, vars)
        }
        return base.query(queryOrOptions, variables)
      },
    } as TypedClient
  }

  return _client
}

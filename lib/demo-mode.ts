/**
 * Demo Mode Module
 *
 * This file contains ALL demo/mock mode functionality.
 * To remove demo mode from a real project:
 * 1. Delete this file (lib/demo-mode.ts)
 * 2. Delete the data/mock/ directory
 * 3. Delete app/components/DemoModeBanner.tsx
 * 4. Remove DemoModeBanner from app/layout.tsx
 * 5. Remove the demo mode check from app/api/graphql/route.ts
 */

import homepageData from '@/data/mock/homepage.json'
import jobOpeningsData from '@/data/mock/jobs.json'
import industriesData from '@/data/mock/industries.json'
import teamMembersData from '@/data/mock/team.json'
import newsData from '@/data/mock/news.json'
import routesData from '@/data/mock/routes.json'

export function isDemoMode(): boolean {
  return process.env.NEXT_PUBLIC_DEMO_MODE !== 'false'
}

const mockDataMap: Record<string, any> = {
  'homepage.json': homepageData,
  'jobs.json': jobOpeningsData,
  'industries.json': industriesData,
  'team.json': teamMembersData,
  'news.json': newsData,
  'routes.json': routesData,
}

function loadMockData(filename: string): any {
  return mockDataMap[filename] || null
}

export function handleMockQuery(body: string): any {
  try {
    const { query, variables } = JSON.parse(body)

    if (variables?.path) {
      const routePath = variables.path
      const routes = loadMockData('routes.json')
      if (routes && routes[routePath]) {
        return routes[routePath]
      }
    }

    if (query.includes('GetHomepageData') || query.includes('nodeHomepages')) {
      return loadMockData('homepage.json')
    }

    if (query.includes('GetJobOpenings') || query.includes('nodeJobOpenings')) {
      return loadMockData('jobs.json')
    }

    if (query.includes('GetIndustries') || query.includes('nodeIndustries')) {
      return loadMockData('industries.json')
    }

    if (query.includes('GetTeamMembers') || query.includes('nodeTeamMembers')) {
      return loadMockData('team.json')
    }

    if (query.includes('GetNews') || query.includes('nodeNews')) {
      return loadMockData('news.json')
    }

    return { data: {} }
  } catch (error) {
    console.error('Mock query error:', error)
    return { data: {}, errors: [{ message: 'Mock data error' }] }
  }
}

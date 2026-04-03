import { getClient } from '@/lib/drupal-client'
import { GET_HOMEPAGE_DATA } from '@/lib/queries'
import { HomepageData } from '@/lib/types'
import HomepageRenderer from './components/HomepageRenderer'
import FeaturedJobs from './components/FeaturedJobs'
import SetupGuide from './components/SetupGuide'
import ContentSetupGuide from './components/ContentSetupGuide'
import { Metadata } from 'next'
import { checkConfiguration } from '../lib/config-check'

// Enable ISR with 1 hour revalidation
export const revalidate = 3600
export const dynamic = 'force-dynamic'


export async function generateMetadata(): Promise<Metadata> {
  const title = 'Pinnacle Staffing Group'
  const description = 'Pinnacle Staffing Group connects exceptional talent with outstanding opportunities through expert recruitment and staffing solutions.'

  return {
    title,
    description,
    keywords: ["Staffing", "Recruitment", "Job Openings", "Talent Acquisition", "HR Solutions", "Employment"],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function Home() {
  const configStatus = checkConfiguration()

  if (!configStatus.isConfigured) {
    return <SetupGuide missingVars={configStatus.missingVars} />
  }

  try {
    const client = getClient()
    const data = await client.raw<HomepageData>({
      query: GET_HOMEPAGE_DATA,
    })
    const homepageContent = data?.nodeHomepages?.nodes?.[0] || null

    if (!homepageContent) {
      const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
      return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
    }

    return (
      <HomepageRenderer homepageContent={homepageContent}>
        <FeaturedJobs />
      </HomepageRenderer>
    )
  } catch (error) {
    console.error('Error fetching homepage:', error)
    const drupalBaseUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL
    return <ContentSetupGuide drupalBaseUrl={drupalBaseUrl} />
  }
}

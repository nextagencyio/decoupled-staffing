import { getClient } from '@/lib/drupal-client'
import { Metadata } from 'next'
import { GET_INDUSTRIES } from '@/lib/queries'
import { IndustriesData } from '@/lib/types'
import Header from '../components/Header'
import IndustryCard from '../components/IndustryCard'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Industries | Pinnacle Staffing Group',
  description: 'Explore the industries we serve.',
}

async function getData() {
  try {
    const client = getClient()
    const { data } = await client.raw<IndustriesData>(({
      query: GET_INDUSTRIES,
      variables: { first: 50 },
      fetchPolicy: 'cache-first',
    }))
    return data?.nodeIndustries?.nodes || []
  } catch (error) {
    console.error('Error fetching industries:', error)
    return []
  }
}

export default async function IndustriesPage() {
  const items = await getData()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Industries
            </h1>
            <p className="text-xl text-primary-200 max-w-3xl mx-auto">
              Explore the industries we serve.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Industries Yet</h2>
              <p className="text-gray-500">
                Industries will appear here once content is imported.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items.map((item) => (
                <IndustryCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

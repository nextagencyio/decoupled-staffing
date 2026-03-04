'use client'

import { useQuery } from '@apollo/client'
import { GET_FEATURED_JOB_OPENINGS } from '@/lib/queries'
import { DrupalJobOpening } from '@/lib/types'
import Link from 'next/link'
import ResponsiveImage from './ResponsiveImage'
import { ArrowRight } from 'lucide-react'

export default function FeaturedJobs() {
  const { data, loading } = useQuery(GET_FEATURED_JOB_OPENINGS)
  const items: DrupalJobOpening[] = data?.nodeJobOpenings?.nodes || []

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-4">Featured Jobs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse flex rounded-xl overflow-hidden bg-gray-100 h-48" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (items.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-2">Featured Jobs</h2>
            <p className="text-lg text-gray-600">Explore our latest open positions across industries.</p>
          </div>
          <Link
            href="/jobs"
            className="hidden md:inline-flex items-center text-primary-700 font-semibold hover:text-primary-900 transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              href={item.path || '#'}
              className="group flex flex-row rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-1/3 min-h-[200px] bg-gradient-to-br from-primary-800 to-primary-900">
                {(item as any).image?.url ? (
                  <ResponsiveImage
                    src={(item as any).image.url}
                    alt={(item as any).image.alt || item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    variations={(item as any).image.variations}
                    targetWidth={300}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl font-bold text-white/30">{item.title?.charAt(0)}</div>
                  </div>
                )}
              </div>
              <div className="flex-1 p-6 flex flex-col justify-center">
                <h3 className="font-display text-lg font-bold text-primary-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center text-primary-700 font-medium text-sm group-hover:gap-2 transition-all">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/jobs"
            className="inline-flex items-center text-primary-700 font-semibold hover:text-primary-900"
          >
            View all
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

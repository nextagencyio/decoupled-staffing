'use client'

import { DrupalHomepage } from '@/lib/types'

interface StatsSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function StatsSection({ homepageContent }: StatsSectionProps) {
  const stats = (homepageContent as any)?.stats || (homepageContent as any)?.statsItems || []
  if (!stats || stats.length === 0) return null

  return (
    <section className="py-16 bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center divide-y md:divide-y-0 md:divide-x divide-primary-700">
          {stats.map((stat: any, i: number) => (
            <div key={stat.id || i} className="px-8 py-4 md:py-0 text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-white">
                {stat.value || stat.statValue || stat.number}
              </div>
              <div className="text-primary-200 mt-1 text-sm font-medium uppercase tracking-wide">
                {stat.label || stat.statLabel || stat.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { DrupalHomepage } from '@/lib/types'

interface HeroSectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function HeroSection({ homepageContent }: HeroSectionProps) {
  const title = (homepageContent as any)?.heroTitle || (homepageContent as any)?.title || 'Welcome'
  const subtitle = (homepageContent as any)?.heroSubtitle || ''

  return (
    <section className="bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-6 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{subtitle}</p>
            )}
            <div className="flex gap-4">
              <a
                href="/jobs"
                className="px-8 py-3 bg-primary-800 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                Browse Jobs
              </a>
              <a
                href="/contact"
                className="px-8 py-3 border-2 border-primary-800 text-primary-800 rounded-lg hover:bg-primary-50 transition-colors font-semibold"
              >
                For Employers
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80&fit=crop"
              alt="Professional team meeting"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent-400 rounded-2xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}

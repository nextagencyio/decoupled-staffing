'use client'

import { DrupalHomepage } from '@/lib/types'

interface CTASectionProps {
  homepageContent: DrupalHomepage | null | undefined
}

export default function CTASection({ homepageContent }: CTASectionProps) {
  const title = (homepageContent as any)?.ctaTitle || 'Get in Touch'
  const description = (homepageContent as any)?.ctaDescription?.processed || ''
  const primaryLabel = (homepageContent as any)?.ctaPrimary || 'Contact Us'

  return (
    <section className="bg-white py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:max-w-xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-4">{title}</h2>
            {description && (
              <div className="text-gray-600 text-lg" dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </div>
          <div className="flex-shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-primary-800 text-white rounded-lg hover:bg-primary-700 transition-colors font-bold text-lg"
            >
              {primaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

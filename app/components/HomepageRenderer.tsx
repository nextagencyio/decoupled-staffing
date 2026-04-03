'use client'

import Header from './Header'
import HeroSection from './HeroSection'
import StatsSection from './StatsSection'
import CTASection from './CTASection'
import WhyChooseUs from './WhyChooseUs'
import PhotoGallery from './PhotoGallery'
import ErrorBoundary from './ErrorBoundary'
import { DrupalHomepage } from '@/lib/types'
import { Users } from 'lucide-react'

interface HomepageRendererProps {
  homepageContent: DrupalHomepage | null | undefined
  children?: React.ReactNode
}

export default function HomepageRenderer({ homepageContent, children }: HomepageRendererProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <ErrorBoundary>
        <HeroSection homepageContent={homepageContent} />
      </ErrorBoundary>

      <ErrorBoundary>
        <StatsSection homepageContent={homepageContent} />
      </ErrorBoundary>

      {children}

      <ErrorBoundary>
        <WhyChooseUs />
      </ErrorBoundary>

      <ErrorBoundary>
        <PhotoGallery />
      </ErrorBoundary>

      <ErrorBoundary>
        <CTASection homepageContent={homepageContent} />
      </ErrorBoundary>

      <footer className="border-t border-gray-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 bg-primary-900 rounded-md flex items-center justify-center">
                <Users className="w-4 h-4 text-accent-400" />
              </div>
              <span className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Pinnacle Staffing Group. All rights reserved.
              </span>
            </div>
            <nav className="flex items-center space-x-6 text-sm text-gray-500">
              <a href="/jobs" className="hover:text-primary-700 transition-colors">Jobs</a>
              <a href="/industries" className="hover:text-primary-700 transition-colors">Industries</a>
              <a href="/team" className="hover:text-primary-700 transition-colors">Team</a>
              <a href="/news" className="hover:text-primary-700 transition-colors">News</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

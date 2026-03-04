'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'
import { Menu, X, Users } from 'lucide-react'

const navigationItems = [{"name": "Home", "href": "/"}, {"name": "Jobs", "href": "/jobs"}, {"name": "Industries", "href": "/industries"}, {"name": "Team", "href": "/team"}, {"name": "News", "href": "/news"}, {"name": "About", "href": "/about"}]

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bannerHeight, setBannerHeight] = useState(0)

  useEffect(() => {
    const banner = document.querySelector('[class*="bg-amber-500"]')
    if (banner) {
      setBannerHeight(banner.getBoundingClientRect().height)
      const observer = new MutationObserver(() => {
        if (!document.querySelector('[class*="bg-amber-500"]')) setBannerHeight(0)
      })
      observer.observe(document.body, { childList: true, subtree: true })
      return () => { observer.disconnect() }
    }
  }, [])

  const getActiveTab = () => {
    if (pathname === '/') return 'Home'
    for (const item of navigationItems) {
      if (item.href !== '/' && pathname.startsWith(item.href)) {
        return item.name
      }
    }
    return null
  }

  const activeTab = getActiveTab()

  return (
    <header
      className="bg-white border-b border-gray-200 sticky z-50"
      style={{ top: bannerHeight > 0 ? `${bannerHeight}px` : '0px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
            <div className="flex-shrink-0 w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-accent-400" />
            </div>
            <span className="text-lg font-display font-bold text-primary-900 hidden sm:block">
              Pinnacle Staffing Group
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  'px-4 py-2 text-sm font-medium transition-colors border-b-2',
                  activeTab === item.name
                    ? 'border-primary-700 text-primary-900'
                    : 'border-transparent text-gray-600 hover:text-primary-900 hover:border-gray-300'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center bg-primary-800 text-white px-5 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-semibold text-sm"
            >
              Contact Us
            </Link>

            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    'px-4 py-3 text-sm font-medium transition-colors border-l-2',
                    activeTab === item.name
                      ? 'border-primary-700 text-primary-900 bg-primary-50'
                      : 'border-transparent text-gray-600 hover:text-primary-900 hover:bg-gray-50'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

'use client'

import { Users, Briefcase, TrendingUp, Shield, Clock, Award } from 'lucide-react'

const reasons = [
  {
    icon: Users,
    title: 'Top Talent Network',
    description: 'Access to a curated pool of pre-screened, qualified professionals across all industries.',
  },
  {
    icon: Briefcase,
    title: 'Industry Expertise',
    description: 'Specialized recruiters with deep knowledge of your sector and its unique hiring needs.',
  },
  {
    icon: TrendingUp,
    title: 'Proven Results',
    description: '95% placement success rate with measurable improvements in client workforce quality.',
  },
  {
    icon: Shield,
    title: 'Quality Guarantee',
    description: 'Every placement backed by our satisfaction guarantee and thorough vetting process.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Average time-to-fill of just 5 business days for most positions.',
  },
  {
    icon: Award,
    title: 'Award-Winning Service',
    description: 'Recognized as a top staffing firm for excellence in recruitment and client satisfaction.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Why Choose Pinnacle Staffing Group
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We connect exceptional talent with outstanding opportunities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <div
                key={reason.title}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary-700" />
                </div>
                <h3 className="font-display text-xl font-bold text-primary-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

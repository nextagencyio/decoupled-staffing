'use client'

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80&fit=crop',
    alt: 'Team collaboration',
  },
  {
    src: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80&fit=crop',
    alt: 'Professional workplace',
  },
  {
    src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80&fit=crop',
    alt: 'Modern office',
  },
  {
    src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&fit=crop',
    alt: 'Business professional',
  },
]

export default function PhotoGallery() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-900 mb-4">
            Our Work Environment
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connecting talent with opportunity across industries.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, i) => (
            <div key={i} className="relative overflow-hidden rounded-xl group aspect-square">
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

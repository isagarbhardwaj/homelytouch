import React, { useState, forwardRef } from 'react'

export interface HeroProps {
  title?: string
  subtitle?: string
  searchPlaceholder?: string
  onSearch?: (query: string) => void
  backgroundImage?: string
}

export const Hero = forwardRef<HTMLInputElement, HeroProps>(
  (
    {
      title = 'Transform Your Space With\nOur Stylish Furniture',
      subtitle = 'Turn your room with panto into a lot more minimalist and modern with ease and speed',
      searchPlaceholder = 'Search furniture',
      onSearch,
      backgroundImage = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=90',
    },
    ref
  ) => {
    const [query, setQuery] = useState('')

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (onSearch) {
        onSearch(query)
      }
    }

    return (
      <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] bg-[#163837] text-white flex flex-col justify-between overflow-hidden pt-28 pb-20">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt="Interior Hero"
            className="w-full h-full object-cover object-center filter brightness-[0.72] contrast-[1.05]"
          />
          {/* Dark Teal Tint Overlay for Color Fidelity */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#143232]/80 via-[#143232]/50 to-[#143232]/90 mix-blend-multiply" />
        </div>

        {/* Main Content (Centered Text & Search) */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center pt-8 md:pt-14 space-y-6">
          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15] whitespace-pre-line drop-shadow-sm">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-white/85 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-normal leading-relaxed drop-shadow-xs">
            {subtitle}
          </p>

          {/* Search Bar Component */}
          <form
            onSubmit={handleSearchSubmit}
            className="pt-4 max-w-md mx-auto relative flex items-center"
          >
            <div className="w-full relative">
              <input
                ref={ref}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-white/15 backdrop-blur-md border border-white/30 rounded-full py-3.5 sm:py-4 pl-6 pr-14 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60 focus:bg-white/20 transition-all text-sm sm:text-base shadow-xl"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:bg-neutral-100 transition-colors shadow-md cursor-pointer"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#163837]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Fade at the bottom mixing into the white background below */}
        <div className="absolute bottom-0 inset-x-0 h-48 md:h-64 lg:h-72 bg-gradient-to-t from-white via-white/80 via-40% to-transparent pointer-events-none z-10" />
      </section>
    )
  }
)

Hero.displayName = 'Hero'

export default Hero

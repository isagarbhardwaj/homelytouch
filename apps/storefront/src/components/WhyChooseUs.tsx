import React, { useRef, useState, useEffect, useCallback } from 'react'

export interface ChoiceItem {
  id: string
  title: string
  description: string
  image: string
  link?: string
}

const defaultItems: ChoiceItem[] = [
  {
    id: '1',
    title: 'Luxury facilities',
    description:
      'The advantage of hiring a workspace with us is that givees you comfortable service and all-around facilities.',
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    link: '#luxury-facilities',
  },
  {
    id: '2',
    title: 'Affordable Price',
    description:
      'You can get a workspace of the highst quality at an affordable price and still enjoy the facilities that are oly here.',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    link: '#affordable-price',
  },
  {
    id: '3',
    title: 'Many Choices',
    description:
      'We provide many unique work space choices so that you can choose the workspace to your liking.',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    link: '#many-choices',
  },
  {
    id: '4',
    title: 'Luxury Furniture',
    description:
      'The advantage of hiring a workspace with us is that givees you comfortable service and all-around facilities.',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    link: '#luxury-furniture',
  },
  {
    id: '5',
    title: 'Quality Materials',
    description:
      'Our interiors use premium, sustainable materials designed for long-lasting durability and luxury aesthetics.',
    image:
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=800&q=80',
    link: '#quality-materials',
  },
]

export interface WhyChooseUsProps {
  title?: string
  subtitle?: string
  items?: ChoiceItem[]
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  title = 'Why\nChoosing Us',
  subtitle = 'You don’t have to worry about the result because all of these interiors are made by people who are professionals.',
  items = defaultItems,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isOverflowing, setIsOverflowing] = useState(true)

  const checkScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const hasOverflow = scrollWidth > clientWidth + 5
    setIsOverflowing(hasOverflow)
    setCanScrollLeft(scrollLeft > 5)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    checkScrollState()

    const handleScroll = () => {
      checkScrollState()
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', checkScrollState)

    return () => {
      el.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkScrollState)
    }
  }, [checkScrollState, items])

  const scrollByCard = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const firstCard = el.querySelector<HTMLElement>('[data-carousel-card]')
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 320
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 lg:px-16 text-neutral-900 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          {/* Main Title */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15] whitespace-pre-line">
              {title}
            </h2>
          </div>

          {/* Subtitle & Navigation Controls */}
          <div className="flex flex-col items-start md:items-end space-y-4 max-w-md">
            <p className="text-neutral-600 text-sm sm:text-base text-left md:text-right leading-relaxed">
              {subtitle}
            </p>

            {/* Navigation Buttons: displayed when carousel content exceeds screen width */}
            {isOverflowing && (
              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => scrollByCard('left')}
                  disabled={!canScrollLeft}
                  aria-label="Previous slide"
                  className={`w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    canScrollLeft
                      ? 'text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900'
                      : 'text-neutral-300 border-neutral-200 cursor-not-allowed opacity-50'
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => scrollByCard('right')}
                  disabled={!canScrollRight}
                  aria-label="Next slide"
                  className={`w-10 h-10 rounded-full border border-neutral-300 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    canScrollRight
                      ? 'text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900'
                      : 'text-neutral-300 border-neutral-200 cursor-not-allowed opacity-50'
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-6 pb-4 -mx-2 px-2 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              data-carousel-card
              className="snap-start shrink-0 w-[85%] sm:w-[48%] md:w-[31%] lg:w-[calc(25%-18px)] flex flex-col bg-[#f4f4f4] rounded-[24px] overflow-hidden transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Card Image */}
              <div className="w-full h-52 sm:h-56 overflow-hidden bg-neutral-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-t-[24px] hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-neutral-800 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'

export interface NavItem {
  label: string
  href: string
  hasDropdown?: boolean
}

export interface HeaderProps {
  brandName?: string
  navItems?: NavItem[]
  cartCount?: number
  onSearchClick?: () => void
  onCartClick?: () => void
  onUserClick?: () => void
}

const defaultNavItems: NavItem[] = [
  { label: 'Products', href: '/products' },
  { label: 'Shop', href: '/shop' },
  { label: 'About Us', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export const Header: React.FC<HeaderProps> = ({
  brandName = 'HomelyTouch',
  navItems = defaultNavItems,
  cartCount = 0,
  onSearchClick,
  onCartClick,
  onUserClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop or route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full bg-white border-b border-black/10 py-3.5 transition-all duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
        
        {/* Left Side: Brand Logo */}
        <Link to="/" className="flex items-center space-x-3 group">
          <span className="text-xl font-bold tracking-tight text-neutral-900 drop-shadow-xs">
            <img src={logo} alt={brandName} className="w-[100px] h-auto object-contain" />
          </span>
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-medium text-black/90 hover:text-black transition-colors duration-200 flex items-center space-x-1 py-1"
            >
              <span>{item.label}</span>
              {item.hasDropdown && (
                <svg
                  className="w-3.5 h-3.5 opacity-80"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Side: Action Icons */}
        <div className="flex items-center space-x-5 sm:space-x-6 text-neutral-800">
          
          {/* Search Trigger Icon */}
          <button
            type="button"
            onClick={onSearchClick}
            aria-label="Search"
            className="p-1 text-black/90 hover:text-black transition-colors duration-200 cursor-pointer"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Shopping Bag Icon */}
          <button
            type="button"
            onClick={onCartClick}
            aria-label="Shopping Cart"
            className="p-1 text-black/90 hover:text-black transition-colors duration-200 relative cursor-pointer"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-neutral-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile Icon */}
          <button
            type="button"
            onClick={onUserClick}
            aria-label="Account"
            className="p-1 text-black/90 hover:text-black transition-colors duration-200 cursor-pointer"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>

          {/* Hamburger Menu Toggle (Mobile View) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-1.5 text-neutral-900 hover:text-black focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? (
              // Close X icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // 3-Line Hamburger icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Overlay Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 shadow-2xl px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-neutral-800 hover:text-black border-b border-neutral-100 pb-2 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                {item.hasDropdown && <span className="text-xs opacity-70">▼</span>}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header

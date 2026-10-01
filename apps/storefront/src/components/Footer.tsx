import React, { useState } from 'react'

export interface FooterProps {
  brandName?: string
  copyrightText?: string
  addressLine1?: string
  addressLine2?: string
  contactEmail?: string
}

export const Footer: React.FC<FooterProps> = ({
  brandName = 'HomelyTouch',
  copyrightText = 'Copyright 2024. HomelyTouch All Rights Reserved.',
  addressLine1 = '12 B Street,Estern',
  addressLine2 = 'Alberta',
  contactEmail = 'Global@HomelyTouch.com',
}) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="w-full bg-[#191919] text-neutral-300 font-sans px-6 md:px-12 lg:px-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          
          {/* Column 1: Service */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-white text-lg font-medium tracking-wide">
              Service
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a
                  href="#legal-notice"
                  className="hover:text-white transition-colors duration-200"
                >
                  Legal Notice
                </a>
              </li>
              <li>
                <a
                  href="#data-protection"
                  className="hover:text-white transition-colors duration-200"
                >
                  Data Protection
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Newsletter */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-white text-lg font-medium tracking-wide">
              Newsletter
            </h3>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2 text-sm text-neutral-400">
              {subscribed ? (
                <span className="text-emerald-400 text-sm py-1">
                  Thank you for subscribing!
                </span>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email Address"
                    className="bg-transparent border-b border-neutral-700 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-white py-1 transition-colors text-sm"
                    aria-label="Enter Email Address"
                  />
                  <button
                    type="submit"
                    className="text-left text-neutral-400 hover:text-white transition-colors duration-200 cursor-pointer pt-1"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Column 3: Brand Logo (Center Column) */}
          <div className="flex flex-col sm:col-span-2 md:col-span-1 items-center justify-center my-4 lg:my-0">
            <a href="/" className="flex items-center space-x-3 group">
              {/* Star / Sparkle inside Circle Icon */}
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <svg
                  className="w-6 h-6 text-[#191919]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C12 7.5 16.5 12 22 12C16.5 12 12 16.5 12 22C12 16.5 7.5 12 2 12C7.5 12 12 7.5 12 2Z" />
                </svg>
              </div>
              <span className="text-white text-2xl font-semibold tracking-tight">
                {brandName}
              </span>
            </a>
          </div>

          {/* Column 4: Connect */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-white text-lg font-medium tracking-wide">
              Connect
            </h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-white text-lg font-medium tracking-wide">
              Contact
            </h3>
            <div className="space-y-1 text-sm text-neutral-400">
              <p>{addressLine1}</p>
              <p>{addressLine2}</p>
              <p className="pt-1">
                <a
                  href={`mailto:${contactEmail}`}
                  className="underline underline-offset-4 text-neutral-400 hover:text-white hover:decoration-white transition-colors duration-200"
                >
                  {contactEmail}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Horizontal Divider */}
        <div className="w-full border-t border-neutral-800/80 my-8" />

        {/* Bottom Bar Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-400 space-y-4 md:space-y-0">
          <p>© {copyrightText}</p>
          <div className="flex items-center space-x-6">
            <a
              href="#terms"
              className="hover:text-white transition-colors duration-200"
            >
              Terms of service
            </a>
            <a
              href="#privacy"
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

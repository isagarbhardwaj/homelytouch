import React, { useState } from 'react'
import logo from '../assets/logo.svg'

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
  addressLine1 = 'K-109, Shankar Vihar',
  addressLine2 = 'Lal kuan, Ghaziabad, UP-201001',
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
    <footer className="w-full bg-white text-neutral-700 font-sans px-6 md:px-12 lg:px-16 pt-12 pb-8 border-t border-black/10">
      <div className="max-w-7xl mx-auto">
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Column 1: Connect */}
          <div className="flex flex-col space-y-3 text-center lg:text-left md:text-left">
            <h3 className="text-neutral-900 text-lg font-medium tracking-wide">
              Connect
            </h3>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li>
                <a
                  href="https://instagram.com/homelytouch.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900 transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900 transition-colors duration-200"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Brand Logo (Center Column) */}
          <div className="flex flex-col sm:col-span-2 md:col-span-1 items-center justify-center my-4 lg:my-0">
            <a href="/" className="flex items-center space-x-3 group">
              <span className="text-2xl font-semibold tracking-tight">
                <img src={logo} alt={brandName} className="w-[120px] h-auto object-contain" />
              </span>
            </a>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col space-y-3 text-center lg:text-right md:text-right">
            <h3 className="text-neutral-900 text-lg font-medium tracking-wide">
              Contact
            </h3>
            <div className="space-y-1 text-sm text-neutral-600">
              <p>{addressLine1}</p>
              <p>{addressLine2}</p>
              <p className="pt-1">
                <a
                  href={`mailto:${contactEmail}`}
                  className="underline underline-offset-4 text-neutral-600 hover:text-neutral-900 hover:decoration-neutral-900 transition-colors duration-200"
                >
                  {contactEmail}
                </a>
              </p>
            </div>
          </div>

        </div>

        {/* Horizontal Divider */}
        <div className="w-full border-t border-neutral-200 my-8" />

        {/* Bottom Bar Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500 space-y-4 md:space-y-0">
          <p>© {copyrightText}</p>
          <div className="flex items-center space-x-6">
            <a
              href="#terms"
              className="hover:text-neutral-900 transition-colors duration-200"
            >
              Terms of service
            </a>
            <a
              href="#privacy"
              className="hover:text-neutral-900 transition-colors duration-200"
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

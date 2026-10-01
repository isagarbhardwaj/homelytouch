import { useRef, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import WhyChooseUs from './components/WhyChooseUs'
import BestQualityProducts from './components/BestQualityProducts'
import Footer from './components/Footer'
import ProductsPage from './pages/ProductsPage'
import ShopPage from './pages/ShopPage'
import ProductDetailPage from './pages/ProductDetailPage'

// Helper component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function HomePage({ heroRef }: { heroRef: React.RefObject<HTMLInputElement | null> }) {
  return (
    <>
      <Hero ref={heroRef} />
      <WhyChooseUs />
      <BestQualityProducts />
    </>
  )
}

function MainLayout() {
  const heroSearchInputRef = useRef<HTMLInputElement>(null)

  const handleHeaderSearchClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => {
      heroSearchInputRef.current?.focus()
    }, 100)
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-white font-sans antialiased text-neutral-900">
      <ScrollToTop />
      {/* Sticky Header */}
      <Header onSearchClick={handleHeaderSearchClick} />

      {/* Main Content View Container */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<HomePage heroRef={heroSearchInputRef} />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          {/* Fallback redirect */}
          <Route path="*" element={<HomePage heroRef={heroSearchInputRef} />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  )
}

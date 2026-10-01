import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { ProductItem } from '../data/mockProducts'
import { allMockProducts } from '../data/mockProducts'
import ProductCard from '../components/ProductCard'

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>()

  // Find product by id or fallback to first product
  const product: ProductItem =
    allMockProducts.find((p: ProductItem) => p.id === id || p.id === `prod-${id}`) || allMockProducts[0]

  // Gallery image thumbnails
  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
  ]

  const [selectedImage, setSelectedImage] = useState(galleryImages[0])
  const [selectedColor, setSelectedColor] = useState('Celeste')
  const [selectedSize, setSelectedSize] = useState('22" x 22"')
  const [selectedInsert, setSelectedInsert] = useState('Down Feather Insert')
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'dimensions' | 'shipping'>('details')

  const colors = [
    { name: 'Celeste', bg: 'bg-[#5b7c8d]' },
    { name: 'Rust', bg: 'bg-[#a35238]' },
    { name: 'Olive', bg: 'bg-[#4e593c]' },
    { name: 'Oatmeal', bg: 'bg-[#d8cfbc]' },
    { name: 'Charcoal', bg: 'bg-[#2d3136]' },
  ]

  const sizes = ['20" x 20"', '22" x 22"', '14" x 22" Lumbar']
  const inserts = ['Pillow Cover Only', 'Down Feather Insert', 'Polyfill Insert']

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 3000)
  }

  // Related products
  const relatedProducts = allMockProducts
    .filter((p: ProductItem) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="w-full bg-white min-h-screen text-neutral-900 font-sans pt-28 pb-24 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs sm:text-sm text-neutral-500 space-x-2">
          <Link to="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-neutral-900 transition-colors">Shop</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-neutral-900 transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-neutral-900 font-medium">{product.name}</span>
        </nav>

        {/* 2-Column Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Media Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnails list */}
            <div className="flex md:flex-col gap-3 justify-center md:justify-start">
              {galleryImages.map((imgUrl, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-[#f4f4f4] ${
                    selectedImage === imgUrl ? 'border-neutral-900 scale-95 shadow-sm' : 'border-transparent hover:border-neutral-300 opacity-80'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Featured Image Display */}
            <div className="flex-1 bg-[#f4f4f4] rounded-[24px] overflow-hidden min-h-[380px] sm:min-h-[480px] flex items-center justify-center p-8 relative">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full max-h-[500px] object-contain transition-all duration-300"
              />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-neutral-900 text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                Handcrafted
              </span>
            </div>

          </div>

          {/* Right Column: Product Info & Purchasing Form (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Title & Reviews Header */}
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-neutral-400">
                HomelyTouch Collection
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-1">
                {product.name}
              </h1>

              {/* Rating & Review */}
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex text-amber-500 text-sm">
                  ★ ★ ★ ★ ★
                </div>
                <span className="text-xs font-medium text-neutral-600">(48 Reviews)</span>
              </div>
            </div>

            {/* Pricing & Installment Notice */}
            <div className="border-b border-neutral-200 pb-6 space-y-2">
              <div className="text-2xl sm:text-3xl font-bold text-neutral-900">
                {product.price}
              </div>
              <p className="text-xs text-neutral-500">
                Or 4 interest-free payments of ${(product.numericPrice / 4).toFixed(2)} with <span className="font-semibold text-neutral-800">Klarna</span> or <span className="font-semibold text-neutral-800">Afterpay</span>.
              </p>
            </div>

            {/* Color Swatch Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Color: <span className="font-normal text-neutral-600">{selectedColor}</span>
              </label>
              <div className="flex items-center space-x-3">
                {colors.map((col) => (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setSelectedColor(col.name)}
                    aria-label={`Select ${col.name} color`}
                    className={`w-8 h-8 rounded-full ${col.bg} transition-transform cursor-pointer relative flex items-center justify-center ${
                      selectedColor === col.name ? 'ring-2 ring-offset-2 ring-neutral-900 scale-110' : 'hover:scale-105 opacity-85'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Size / Variant Options */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Size
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                        : 'border-neutral-300 bg-transparent text-neutral-700 hover:border-neutral-900'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Insert / Fill Type Option */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Insert Type
              </label>
              <div className="flex flex-col gap-2">
                {inserts.map((ins) => (
                  <button
                    key={ins}
                    type="button"
                    onClick={() => setSelectedInsert(ins)}
                    className={`px-4 py-2.5 text-xs sm:text-sm font-medium rounded-xl border text-left transition-all cursor-pointer flex justify-between items-center ${
                      selectedInsert === ins
                        ? 'border-neutral-900 bg-neutral-50 text-neutral-900 font-semibold'
                        : 'border-neutral-200 bg-transparent text-neutral-600 hover:border-neutral-400'
                    }`}
                  >
                    <span>{ins}</span>
                    {selectedInsert === ins && <span className="text-xs text-neutral-900">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add to Cart Button */}
            <div className="pt-4 flex items-center gap-4">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-neutral-300 rounded-xl px-3 py-2 space-x-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-neutral-500 hover:text-neutral-900 px-1 font-bold text-base cursor-pointer"
                >
                  -
                </button>
                <span className="text-sm font-bold text-neutral-900 min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-neutral-500 hover:text-neutral-900 px-1 font-bold text-base cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Primary Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 shadow-md cursor-pointer ${
                  addedToCart
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#191919] hover:bg-neutral-800 text-white active:scale-98'
                }`}
              >
                {addedToCart ? '✓ Added to Bag' : 'Add to Cart'}
              </button>
            </div>

            {/* In-Stock Shipping Callout */}
            <div className="flex items-center space-x-2 text-xs text-neutral-600 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>In Stock — Ships in 1-2 business days with free standard delivery</span>
            </div>

            {/* Accordion Tabs / Details */}
            <div className="pt-6 border-t border-neutral-200 space-y-4">
              <div className="flex border-b border-neutral-200 space-x-6 text-sm font-medium">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 transition-colors border-b-2 cursor-pointer ${
                    activeTab === 'details' ? 'border-neutral-900 text-neutral-900 font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Details
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('dimensions')}
                  className={`pb-2 transition-colors border-b-2 cursor-pointer ${
                    activeTab === 'dimensions' ? 'border-neutral-900 text-neutral-900 font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Dimensions & Specs
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 transition-colors border-b-2 cursor-pointer ${
                    activeTab === 'shipping' ? 'border-neutral-900 text-neutral-900 font-bold' : 'border-transparent text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Shipping & Returns
                </button>
              </div>

              {/* Tab Contents */}
              <div className="text-xs sm:text-sm text-neutral-600 leading-relaxed min-h-[80px]">
                {activeTab === 'details' && (
                  <p>
                    Bring a touch of luxe texture to your space with this solid velvet pillow. Designed with rich depth, subtle sheen, and an extra-plush feel, it elevates any sofa, armchair, or bed arrangement with timeless warmth.
                  </p>
                )}
                {activeTab === 'dimensions' && (
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Dimensions: {selectedSize}</li>
                    <li>Material: 100% Cotton Velvet Cover</li>
                    <li>Fill: {selectedInsert}</li>
                    <li>Closure: Hidden YKK Zipper</li>
                    <li>Care: Spot clean or dry clean only</li>
                  </ul>
                )}
                {activeTab === 'shipping' && (
                  <p>
                    Standard shipping delivered within 3-5 business days. Free returns accepted within 30 days of delivery on all unused items in original packaging.
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* You May Also Like Section */}
        <div className="pt-16 border-t border-neutral-200 space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 text-center">
            Complete The Look
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((relProduct: ProductItem) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductDetailPage

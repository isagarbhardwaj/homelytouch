import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { ProductItem } from '../data/mockProducts'

export interface ProductCardProps {
  product: ProductItem
  onProductClick?: (product: ProductItem) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
}) => {
  const navigate = useNavigate()
  const productPath = `/product/${product.id}`

  const handleClick = (e: React.MouseEvent) => {
    if (onProductClick) {
      e.preventDefault()
      onProductClick(product)
    } else {
      navigate(productPath)
    }
  }

  return (
    <div className="group bg-[#f4f4f4] rounded-[24px] overflow-hidden flex flex-col justify-between p-6 transition-all duration-300 hover:shadow-xl relative">
      {/* Product Image Area */}
      <Link
        to={productPath}
        onClick={handleClick}
        className="w-full h-64 sm:h-72 flex items-center justify-center overflow-hidden mb-4 cursor-pointer"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Product Details & Action Button Row */}
      <div className="flex items-end justify-between pt-2">
        {/* Title & Price */}
        <Link to={productPath} onClick={handleClick} className="flex flex-col space-y-1">
          <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">
            {product.title}
          </span>
          <span className="text-xl font-bold text-neutral-900">
            {product.price}
          </span>
        </Link>

        {/* Black Circle Button */}
        <button
          type="button"
          onClick={handleClick}
          aria-label={`View ${product.name} details`}
          className="w-12 h-12 rounded-full bg-[#191919] hover:bg-neutral-800 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md group-hover:bg-neutral-900 cursor-pointer shrink-0"
        >
          <svg
            className="w-5 h-5 text-white transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 17L17 7M17 7H7M17 7V17"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ProductCard

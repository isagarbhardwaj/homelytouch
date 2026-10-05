import React, { useState, useEffect, useRef, useCallback } from 'react'
import { HttpTypes } from '@medusajs/types'
import ProductCard from '../components/ProductCard'
import { sdk } from '../lib/sdk'

export const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)

  const [categories, setCategories] = useState<
    HttpTypes.StoreProductCategory[]
  >([])

  const [products, setProducts] = useState<
    HttpTypes.StoreProduct[]
  >([])

  const observerRef = useRef<IntersectionObserver | null>(null)

  /**
   * Load products
   */
  const loadMoreProducts = useCallback(
    async (
      currentPage: number,
      categoryId: string,
      reset: boolean = false
    ) => {
      setLoading(true)

      try {
        const limit = 20

        const { products: dataProducts, count } =
          await sdk.store.product.list({
            limit,
            offset: (currentPage - 1) * limit,

            // Only add this when a category is selected
            ...(categoryId
              ? {
                  category_id: [categoryId],
                }
              : {}),
          })

        setProducts((prev) =>
          reset ? dataProducts : [...prev, ...dataProducts]
        )

        console.log(dataProducts[0].variants?.[0]);

        setHasMore(
          currentPage * limit < count
        )
      } catch (err) {
        console.error('Error fetching shop products:', err)
      } finally {
        setLoading(false)
      }
    },
    []
  )

  /**
   * Load categories once
   */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { product_categories } =
          await sdk.store.category.list({
            limit: 100,
          })

        setCategories(product_categories)
      } catch (err) {
        console.error('Error fetching categories:', err)
      }
    }

    loadCategories()
  }, [])

  /**
   * Load products whenever category changes
   */
  useEffect(() => {
    setPage(1)
    setProducts([])
    setHasMore(true)

    loadMoreProducts(1, selectedCategory, true)
  }, [selectedCategory, loadMoreProducts])

  /**
   * Category click
   */
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
  }

  /**
   * Infinite scroll
   */
  const sentinelRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return

      if (observerRef.current) {
        observerRef.current.disconnect()
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => {
              const nextPage = prevPage + 1

              loadMoreProducts(
                nextPage,
                selectedCategory,
                false
              )

              return nextPage
            })
          }
        }
      )

      if (node) {
        observerRef.current.observe(node)
      }
    },
    [
      loading,
      hasMore,
      selectedCategory,
      loadMoreProducts,
    ]
  )

  return (
    <div className="w-full bg-white min-h-screen text-neutral-900 font-sans pt-28 pb-20 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex flex-col items-center space-y-6">

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 text-center">
            Give your house a <br />Homely Touch
          </h1>

          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-3">

            {/* All */}
            <button
              type="button"
              onClick={() => handleCategoryClick('')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedCategory === ''
                  ? 'bg-[#191919] text-white shadow-md'
                  : 'bg-transparent border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900'
              }`}
            >
              All
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#191919] text-white shadow-md'
                    : 'bg-transparent border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900'
                }`}
              >
                {cat.name}
              </button>
            ))}

          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* Infinite Scroll */}
        <div
          ref={sentinelRef}
          className="w-full flex justify-center py-8"
        >
          {loading && (
            <div className="flex items-center space-x-3 text-neutral-600">
              <div className="w-6 h-6 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />

              <span className="text-sm font-medium">
                Loading page {page}...
              </span>
            </div>
          )}

          {!hasMore && products.length > 0 && (
            <p className="text-sm text-neutral-400 font-medium pt-4">
              You've reached the end of{' '}
              {selectedCategory
                ? categories.find(
                    (cat) => cat.id === selectedCategory
                  )?.name
                : 'All'}{' '}
              products.
            </p>
          )}

          {!loading && products.length === 0 && (
            <p className="text-sm text-neutral-400 font-medium pt-4">
              No products found.
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default ShopPage

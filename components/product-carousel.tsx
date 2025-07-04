"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/products"

interface ProductCarouselProps {
  title: string
  products: Product[]
}

export function ProductCarousel({ title, products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const handleResize = () => checkScrollButtons()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [products])

  const scroll = (direction: number) => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
      })
      setTimeout(checkScrollButtons, 300)
    }
  }

  if (products.length === 0) return null

  return (
    <section className="py-16 bg-gradient-to-r from-white via-pink-50/30 to-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8 animate-slide-up">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600">Sabores que conquistam corações</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              className={`glass rounded-full p-3 transition-all duration-300 ${canScrollLeft ? "hover:bg-pink-100 hover:scale-110 hover:shadow-lg" : "opacity-50 cursor-not-allowed"
                }`}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              className={`glass rounded-full p-3 transition-all duration-300 ${canScrollRight ? "hover:bg-pink-100 hover:scale-110 hover:shadow-lg" : "opacity-50 cursor-not-allowed"
                }`}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide custom-scrollbar"
          onScroll={checkScrollButtons}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-80 animate-slide-in-right"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

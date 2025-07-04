"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { searchProducts, getFeaturedProducts } from "@/lib/products"

interface LiveSearchDropdownProps {
  isOpen: boolean
  searchQuery: string
  onClose: () => void
}

export function LiveSearchDropdown({ isOpen, searchQuery, onClose }: LiveSearchDropdownProps) {
  const [results, setResults] = useState(getFeaturedProducts().slice(0, 6))

  useEffect(() => {
    if (searchQuery.trim()) {
      setResults(searchProducts(searchQuery).slice(0, 6))
    } else {
      setResults(getFeaturedProducts().slice(0, 6))
    }
  }, [searchQuery])

  if (!isOpen) return null

  return (
    <div
      className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-pink-100 max-h-96 overflow-y-auto custom-scrollbar animate-slide-up z-50`}
    >
      <div className="p-4">
        {searchQuery.trim() === "" ? (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-dancing">✨ Produtos em Destaque</h3>
            <div className="space-y-3">
              {results.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={onClose}
                >
                  <MobileProductItem product={product} />
                </div>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3 animate-bounce">😔</div>
            <p className="text-gray-500 mb-2">Nenhum produto encontrado para "{searchQuery}"</p>
            <p className="text-gray-400 text-sm">Tente buscar por "cookie", "bolo" ou "chocolate"</p>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-dancing">
              🔍 Resultados para "{searchQuery}"
            </h3>
            <div className="space-y-3">
              {results.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={onClose}
                >
                  <MobileProductItem product={product} />
                </div>
              ))}
            </div>
            {searchProducts(searchQuery).length > 6 && (
              <div className="text-center mt-4 pt-4 border-t border-pink-100">
                <p className="text-gray-500 text-sm">E mais {searchProducts(searchQuery).length - 6} produtos...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function MobileProductItem({ product }: { product: any }) {
  return (
    <Link href={`/produtos/${product.slug}`}>
      <div className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-pink-100 hover:shadow-lg transition-all duration-300 group">
        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={product.imagem || "/placeholder.svg"}
            alt={product.titulo}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-gray-800 truncate">{product.titulo}</h4>
          <p className="text-xs text-gray-500 line-clamp-1 mt-1">{product.descricao}</p>
          <div className="flex items-center justify-between mt-2">
            <Badge variant="outline" className="text-xs">
              {product.categoria}
            </Badge>
            <span className="font-bold text-pink-600 text-sm">
              {product.preco ? `R$ ${product.preco.toFixed(2)}` : "Consulte"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

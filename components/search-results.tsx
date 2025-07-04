"use client"

import { useSearchParams } from "next/navigation"
import { ProductGrid } from "@/components/product-grid"
import { SearchBar } from "@/components/search-bar"
import { searchProducts } from "@/lib/products"

export function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const results = query ? searchProducts(query) : []

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 font-playfair mb-4">
          {query ? `Resultados para "${query}"` : "Buscar Produtos"}
        </h1>
        {query && (
          <p className="text-gray-600 text-lg">
            {results.length} produto{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="mb-8">
        <SearchBar />
      </div>

      <ProductGrid products={results} />
    </div>
  )
}

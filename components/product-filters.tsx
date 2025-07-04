"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get("categoria") || null)
  const [priceRange, setPriceRange] = useState<string | null>(searchParams.get("preco") || null)

  const categories = [
    { id: "Cookies", name: "Cookies", count: 13 },
    { id: "Bolos", name: "Bolos", count: 16 },
    { id: "Mini Cakes", name: "Mini Cakes", count: 5 },
    { id: "Acompanhamentos", name: "Acompanhamentos", count: 3 },
  ]

  const priceRanges = [
    { id: "0-20", name: "Até R$ 20", count: 15 },
    { id: "20-40", name: "R$ 20 - R$ 40", count: 18 },
    { id: "40+", name: "Acima de R$ 40", count: 4 },
  ]

  useEffect(() => {
    const params = new URLSearchParams()

    if (selectedCategory) {
      params.set("categoria", selectedCategory)
    }

    if (priceRange) {
      params.set("preco", priceRange)
    }

    const queryString = params.toString()
    const newUrl = queryString ? `/produtos?${queryString}` : "/produtos"

    router.push(newUrl, { scroll: false })
  }, [selectedCategory, priceRange, router])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
  }

  const handlePriceRangeChange = (rangeId: string) => {
    setPriceRange(priceRange === rangeId ? null : rangeId)
  }

  const clearFilters = () => {
    setSelectedCategory(null)
    setPriceRange(null)
  }

  return (
    <div className="space-y-6">
      <Card className="glass-pink">
        <CardHeader>
          <CardTitle className="text-lg">Categorias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "ghost"}
              className="w-full justify-between rounded-full"
              onClick={() => handleCategoryChange(category.id)}
            >
              <span>{category.name}</span>
              <span className="text-sm text-gray-500">({category.count})</span>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-pink">
        <CardHeader>
          <CardTitle className="text-lg">Preço</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {priceRanges.map((range) => (
            <Button
              key={range.id}
              variant={priceRange === range.id ? "default" : "ghost"}
              className="w-full justify-between rounded-full"
              onClick={() => handlePriceRangeChange(range.id)}
            >
              <span>{range.name}</span>
              <span className="text-sm text-gray-500">({range.count})</span>
            </Button>
          ))}
        </CardContent>
      </Card>

      {(selectedCategory || priceRange) && (
        <Button variant="outline" className="w-full bg-transparent rounded-full" onClick={clearFilters}>
          Limpar Filtros
        </Button>
      )}
    </div>
  )
}

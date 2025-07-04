"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/products"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedVariation, setSelectedVariation] = useState(
    product.variacoes_preco ? product.variacoes_preco[0] : null,
  )
  const [showNotification, setShowNotification] = useState(false)

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariation)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const price = selectedVariation ? selectedVariation.preco : product.preco || 0

  return (
    <>
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/produtos">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Voltar aos produtos
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <Image
              src={product.imagem || "/placeholder.svg"}
              alt={product.titulo}
              width={600}
              height={600}
              className="w-full h-auto object-cover"
            />
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-playfair mb-2">{product.titulo}</h1>
            <Badge variant="secondary" className="mb-4">
              {product.categoria}
            </Badge>
            <p className="text-gray-600 text-lg leading-relaxed">{product.descricao}</p>
          </div>

          {product.variacoes_preco && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Tamanho:</h3>
              <div className="flex flex-wrap gap-2">
                {product.variacoes_preco.map((variacao) => (
                  <Button
                    key={variacao.tamanho}
                    variant={selectedVariation?.tamanho === variacao.tamanho ? "default" : "outline"}
                    className={`rounded-full px-4 py-2 text-sm ${selectedVariation?.tamanho === variacao.tamanho ? "bg-pink-500 text-white" : "bg-white text-pink-500"
                      }`}
                    onClick={() => setSelectedVariation(variacao)}
                  >
                    {variacao.tamanho} - R$ {variacao.preco.toFixed(2)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="text-4xl font-bold text-pink-600">R$ {price.toFixed(2)}</div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-full">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 text-lg font-semibold">{quantity}</span>
              <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAddToCart} size="lg" className="flex-1 rounded-full bg-pink-300 hover:bg-pink-200 text-pink-700">
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="fixed bottom-5 right-5 bg-pink-500 text-white py-3 px-6 rounded-lg shadow-lg animate-fade-in-out z-50">
          Produto adicionado ao carrinho!
        </div>
      )}
    </>
  )
}

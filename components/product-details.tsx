"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Cookie, // Ícone para Cookies
  Cake, // Ícone para Bolos
  Coffee, // Ícone para Acompanhamentos
} from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/lib/products"

// Mapeamento de categorias para ícones
const categoryIcons: { [key: string]: React.ElementType } = {
  Cookies: Cookie,
  Bolos: Cake,
  "Mini Cakes": Cake,
  Acompanhamentos: Coffee,
}

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  // Tipo corrigido para buscar a definição de variação de dentro do tipo Product
  const [selectedVariation, setSelectedVariation] = useState<
    NonNullable<Product["variacoes_preco"]>[number] | null
  >(
    product.variacoes_preco && product.variacoes_preco.length > 0
      ? product.variacoes_preco[0]
      : null,
  )
  const [showNotification, setShowNotification] = useState(false)

  // --- Lógica do Carrossel ---
  // Removida a tipagem explícita que causava erro
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", onSelect)
    return () => { emblaApi.off("select", onSelect) }
  }, [emblaApi, onSelect])
  // --- Fim da Lógica do Carrossel ---

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariation ?? undefined)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const price = selectedVariation ? selectedVariation.preco : product.preco || 0

  // Corrigido para usar `product.imagem` (que é string[]) como definido no seu products.ts
  const images: string[] =
    product.imagem && product.imagem.length > 0
      ? product.imagem
      : ["/placeholder.svg"]

  // Usando um ícone padrão caso a categoria não seja encontrada no mapeamento
  const CategoryIcon = categoryIcons[product.categoria] || Cake

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
        {/* Coluna da Imagem / Carrossel */}
        <div className="space-y-4">
          <div className="embla relative rounded-3xl overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {images.map((imgUrl, index) => (
                <div className="embla__slide flex-[0_0_100%]" key={index}>
                  <Card className="overflow-hidden">
                    <Image
                      src={imgUrl}
                      alt={`${product.titulo} - Imagem ${index + 1}`}
                      width={600}
                      height={600}
                      className="w-full h-auto object-cover aspect-square"
                      priority={index === 0}
                    />
                  </Card>
                </div>
              ))}
            </div>
            {images.length > 1 && (
              <>
                <Button variant="ghost" size="icon" className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/50 hover:bg-white" onClick={scrollPrev}>
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/50 hover:bg-white" onClick={scrollNext}>
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>

          {/* Miniaturas */}
          {images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {images.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`overflow-hidden rounded-3xl border-2 transition-colors ${index === selectedIndex ? "border-pink-300" : "border-transparent"
                    }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`Miniatura ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Coluna de Detalhes do Produto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-playfair mb-2">
              {product.titulo}
            </h1>
            <Badge className="mb-4 bg-pink-100 text-pink-700 border border-pink-500 hover:bg-pink-100">
              <CategoryIcon className="h-4 w-4 mr-2" />
              {product.categoria}
            </Badge>
            <p className="text-gray-600 text-lg leading-relaxed">
              {product.descricao}
            </p>
          </div>

          {product.variacoes_preco && product.variacoes_preco.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Tamanho:</h3>
              <div className="flex flex-wrap gap-2">
                {product.variacoes_preco.map(variacao => (
                  <Button
                    key={variacao.tamanho}
                    variant={
                      selectedVariation?.tamanho === variacao.tamanho ? "default" : "outline"
                    }
                    className={`rounded-full px-4 py-2 text-sm transition-colors ${selectedVariation?.tamanho === variacao.tamanho
                      ? "bg-pink-500 text-white border-pink-500"
                      : "bg-white text-pink-500 border-gray-300"
                      }`}
                    onClick={() => setSelectedVariation(variacao)}
                  >
                    {variacao.tamanho} - R$ {variacao.preco.toFixed(2)}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="text-4xl font-bold text-pink-600">
            R$ {price.toFixed(2)}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-full">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 text-lg font-semibold">{quantity}</span>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAddToCart} size="lg" className="flex-1 rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg transition-transform transform hover:scale-105">
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg animate-fade-in-out z-50">
          Produto adicionado ao carrinho!
        </div>
      )}
    </>
  )
}
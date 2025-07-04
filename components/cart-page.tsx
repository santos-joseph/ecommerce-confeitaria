"use client"

import Link from "next/link"
import Image from "next/image"
import { Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"

export function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4 font-playfair">Seu carrinho está vazio</h1>
        <p className="text-gray-600 mb-8 text-lg">Que tal adicionar alguns doces para alegrar o seu dia?</p>
        <Button asChild size="lg" className="bg-pink-300 hover:bg-pink-500 rounded-full">
          <Link href="/produtos">Ver produtos</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center font-playfair">Meu Carrinho</h1>

      {/* MODIFICAÇÃO 1: Layout Principal 
        - Trocamos o 'grid' por 'flex' com 'flex-col-reverse lg:flex-row'.
        - O resumo do pedido agora vem ANTES da lista no código, mas o flex-col-reverse
          garante que no mobile a lista de itens apareça primeiro.
      */}
      <div className="flex flex-col-reverse lg:flex-row gap-8">

        {/* Lista de Itens do Carrinho */}
        <div className="lg:w-2/3 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.key} className="rounded-2xl overflow-hidden">
              {/* MODIFICAÇÃO 2: Layout Interno do Card
                - Usamos um container flex com 'justify-between' para criar duas colunas.
                - Coluna da Esquerda: Imagem e informações do produto.
                - Coluna da Direita: Controles de quantidade e botão de remover.
              */}
              <CardContent className="p-4 flex items-center justify-between gap-4">
                {/* Coluna da Esquerda: Imagem e Infos */}
                <div className="flex items-center gap-4">
                  <Image
                    src={item.imagem || "/placeholder.svg"}
                    alt={item.titulo}
                    width={80}
                    height={80}
                    className="rounded-xl object-cover aspect-square"
                  />
                  <div>
                    <h3 className="font-semibold text-md">{item.titulo}</h3>
                    {item.selectedVariation && (
                      <p className="text-sm text-gray-500">{item.selectedVariation.tamanho}</p>
                    )}
                    <p className="text-pink-600 font-bold mt-1">
                      R$ {(item.selectedVariation ? item.selectedVariation.preco : item.preco || 0).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Coluna da Direita: Ações */}
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                  <div className="flex items-center border border-gray-200 rounded-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-2 text-md font-semibold">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.key)}
                    className="text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:w-1/3">
          <Card className="sticky top-28 rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4 font-playfair">Resumo do Pedido</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between py-2 border-b">
                  <span>Subtotal</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <Button asChild className="w-full bg-pink-500 hover:bg-pink-600 rounded-full" size="lg">
                <Link href="/checkout">Finalizar Compra</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}
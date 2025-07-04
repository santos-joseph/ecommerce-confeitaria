"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/lib/products"

// ... (as interfaces CartItem e CartContextType permanecem as mesmas)

interface CartItem extends Product {
  quantity: number
  selectedVariation?: {
    tamanho: string
    preco: number
  }
  key: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Product, quantity: number, selectedVariation?: { tamanho: string; preco: number }) => void
  updateQuantity: (itemKey: string, newQuantity: number) => void
  removeFromCart: (itemKey: string) => void
  clearCart: () => void
  cartTotal: number
  totalItems: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

// Nome da chave que usaremos para salvar os dados no localStorage
const CART_STORAGE_KEY = "shopping-cart"

export function CartProvider({ children }: { children: ReactNode }) {
  // MODIFICAÇÃO 1: Carregando o estado inicial do localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Verifica se o código está rodando no navegador antes de acessar o localStorage
    if (typeof window === "undefined") {
      return []
    }

    const storedCart = localStorage.getItem(CART_STORAGE_KEY)
    return storedCart ? JSON.parse(storedCart) : []
  })

  // MODIFICAÇÃO 2: Salvando o estado no localStorage sempre que ele mudar
  useEffect(() => {
    // O localStorage só existe no ambiente do navegador
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    }
  }, [cartItems]) // Este hook será executado sempre que 'cartItems' mudar

  const addToCart = (product: Product, quantity: number, selectedVariation?: { tamanho: string; preco: number }) => {
    setCartItems((prevItems) => {
      const itemKey = selectedVariation ? `${product.id}-${selectedVariation.tamanho}` : product.id.toString()
      const existingItem = prevItems.find((item) => item.key === itemKey)

      if (existingItem) {
        return prevItems.map((item) => (item.key === itemKey ? { ...item, quantity: item.quantity + quantity } : item))
      }

      const newItem: CartItem = {
        ...product,
        key: itemKey,
        quantity,
        selectedVariation,
      }
      return [...prevItems, newItem]
    })
  }

  const updateQuantity = (itemKey: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.key === itemKey ? { ...item, quantity: newQuantity } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (itemKey: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.key !== itemKey))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.selectedVariation ? item.selectedVariation.preco : item.preco || 0
    return total + price * item.quantity
  }, 0)

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
import type { Metadata } from "next"
import { CartPage } from "@/components/cart-page"

export const metadata: Metadata = {
  title: "Carrinho de Compras",
  description: "Revise seus itens selecionados e finalize seu pedido de doces artesanais.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function Cart() {
  return <CartPage />
}

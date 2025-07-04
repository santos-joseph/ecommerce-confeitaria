import type { Metadata } from "next"
import { CheckoutPage } from "@/components/checkout-page"

export const metadata: Metadata = {
  title: "Finalizar Pedido",
  description: "Complete seu pedido e entre em contato conosco via WhatsApp.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function Checkout() {
  return <CheckoutPage />
}

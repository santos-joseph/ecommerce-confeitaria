import type React from "react"
import type { Metadata } from "next"
import { Poppins, Dancing_Script } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-provider"
import { Navbar } from "@/components/navbar"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
})
const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
})

export const metadata: Metadata = {
  title: {
    default: "Confeitaria Ju Montanaro - Bolos e Cookies Artesanais",
    template: "%s | Confeitaria Ju Montanaro",
  },
  description:
    "Confeitaria artesanal especializada em bolos, cookies e doces únicos. Feitos com amor e ingredientes selecionados para adoçar seus momentos especiais.",
  keywords: ["confeitaria", "bolos artesanais", "cookies", "doces", "encomendas", "festa", "aniversário"],
  authors: [{ name: "Ju Montanaro" }],
  creator: "Ju Montanaro",
  publisher: "Confeitaria Ju Montanaro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://confeitaria-ju-montanaro.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://confeitaria-ju-montanaro.vercel.app",
    title: "Confeitaria Ju Montanaro - Bolos e Cookies Artesanais",
    description:
      "Confeitaria artesanal especializada em bolos, cookies e doces únicos. Feitos com amor e ingredientes selecionados.",
    siteName: "Confeitaria Ju Montanaro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Confeitaria Ju Montanaro - Bolos e Cookies Artesanais",
    description: "Confeitaria artesanal especializada em bolos, cookies e doces únicos.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.variable} ${dancing.variable} font-poppins min-h-screen`}
      >
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <footer className="bg-gradient-to-r from-pink-100 to-rose-100 text-gray-700 mt-16 border-t border-pink-200">
            <div className="container mx-auto px-4 py-12 text-center">
              <p className="font-dancing text-2xl text-pink-800 mb-6">Feito com amor para adoçar seus dias</p>
              <div className="flex justify-center space-x-8 mb-6">
                <a href="/" className="hover:text-pink-600 transition-colors duration-300 font-medium">
                  Início
                </a>
                <a href="/produtos" className="hover:text-pink-600 transition-colors duration-300 font-medium">
                  Produtos
                </a>
                <a
                  href="https://wa.me/5519987382375"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 transition-colors duration-300 font-medium"
                >
                  WhatsApp
                </a>
              </div>
              <p className="text-sm opacity-75">
                &copy; {new Date().getFullYear()} Confeitaria Ju Montanaro. Todos os direitos reservados.
              </p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getProductBySlug } from "@/lib/products"
import { CookieIcon } from "lucide-react"

export function FeaturedProductSection() {
  const featuredProduct = getProductBySlug("cookie-ferrero-rocher")

  if (!featuredProduct) return null

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="glass-pink rounded-3xl overflow-hidden md:flex items-center animate-slide-up">
            <div className="md:w-1/2 p-2">
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={featuredProduct.imagem[0] || "/placeholder.svg"}
                  alt={featuredProduct.titulo}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold px-3 py-1 animate-pulse">
                    Especial
                  </Badge>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-8 md:p-12 text-center md:text-left">
              <div className="animate-slide-in-right">
                <h3 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  {featuredProduct.titulo}
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">{featuredProduct.descricao}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-pink-600">R$ {featuredProduct.preco?.toFixed(2)}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300"
                  >
                    <Link href={`/produtos/${featuredProduct.slug}`}>
                      <span className="mr-2"><CookieIcon /></span>
                      Quero esse!
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 font-bold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300 bg-transparent"
                  >
                    <Link href="/produtos">Ver Mais Sabores</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

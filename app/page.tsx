import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { ProductCarousel } from "@/components/product-carousel"
import { FeaturedProductSection } from "@/components/featured-product-section"
import { ContactBanner } from "@/components/contact-banner"
import { getProducts, getFeaturedProducts } from "@/lib/products"

export const metadata: Metadata = {
  title: "Início",
  description:
    "Descubra os melhores bolos e cookies artesanais. Cada doce é feito à mão com ingredientes selecionados e muito carinho.",
  openGraph: {
    title: "Confeitaria Ju Montanaro - Bolos e Cookies Artesanais",
    description:
      "Descubra os melhores bolos e cookies artesanais. Cada doce é feito à mão com ingredientes selecionados e muito carinho.",
  },
}

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()
  const cookies = getProducts("Cookies")
  const bolos = getProducts("Bolos")

  return (
    <>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductCarousel title="Os Queridinhos" products={featuredProducts} />
        <ProductCarousel title="Nossos Cookies" products={cookies} />
      </div>
      <FeaturedProductSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductCarousel title="Bolos Especiais" products={bolos} />
      </div>
      <ContactBanner />
    </>
  )
}

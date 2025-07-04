import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"
import { getProductBySlug, getRelatedProducts } from "@/lib/products"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: "Produto não encontrado",
    }
  }

  return {
    title: product.titulo,
    description: product.descricao,
    openGraph: {
      title: `${product.titulo} - Confeitaria Ju Montanaro`,
      description: product.descricao,
      images: [
        {
          url: product.imagem,
          width: 800,
          height: 600,
          alt: product.titulo,
        },
      ],
    },
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = getRelatedProducts(product.categoria, product.id)

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <ProductDetails product={product} />
      <RelatedProducts products={relatedProducts} />
    </div>
  )
}

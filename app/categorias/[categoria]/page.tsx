import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductGrid } from "@/components/product-grid"
import { getProducts, getCategoryInfo } from "@/lib/products"

interface CategoryPageProps {
  params: Promise<{ categoria: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categoria } = await params
  const categoryInfo = getCategoryInfo(categoria)

  if (!categoryInfo) {
    return {
      title: "Categoria não encontrada",
    }
  }

  return {
    title: categoryInfo.name,
    description: categoryInfo.description,
    openGraph: {
      title: `${categoryInfo.name} - Confeitaria Ju Montanaro`,
      description: categoryInfo.description,
    },
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categoria } = await params
  const categoryInfo = getCategoryInfo(categoria)

  if (!categoryInfo) {
    notFound()
  }

  const products = getProducts(categoryInfo.name)

  return (
    <div className=" max-w-7xl container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 font-playfair mb-4">{categoryInfo.name}</h1>
        <p className="text-gray-600 text-lg">{categoryInfo.description}</p>
      </div>

      <ProductGrid products={products} />
    </div>
  )
}

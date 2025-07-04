import type { Metadata } from "next"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { getAllProducts } from "@/lib/products"

export const metadata: Metadata = {
  title: "Todos os Produtos",
  description:
    "Explore nossa linha completa de bolos, cookies e doces artesanais. Encontre o doce perfeito para sua ocasião especial.",
  openGraph: {
    title: "Produtos - Confeitaria Ju Montanaro",
    description: "Explore nossa linha completa de bolos, cookies e doces artesanais.",
  },
}

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const categoria = params.categoria as string
  const preco = params.preco as string

  let products = getAllProducts()

  // Filtrar por categoria
  if (categoria) {
    products = products.filter((product) => product.categoria === categoria)
  }

  // Filtrar por preço
  if (preco) {
    products = products.filter((product) => {
      const productPrice = product.preco || 0
      const minPrice = product.variacoes_preco ? Math.min(...product.variacoes_preco.map((v) => v.preco)) : productPrice

      switch (preco) {
        case "0-20":
          return minPrice <= 20
        case "20-40":
          return minPrice > 20 && minPrice <= 40
        case "40+":
          return minPrice > 40
        default:
          return true
      }
    })
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 animate-slide-up">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Nossos Produtos</h1>
        <p className="text-gray-600 text-lg">
          {categoria && preco
            ? `${categoria} • ${preco === "0-20" ? "Até R$ 20" : preco === "20-40" ? "R$ 20 - R$ 40" : "Acima de R$ 40"}`
            : categoria
              ? categoria
              : preco
                ? preco === "0-20"
                  ? "Até R$ 20"
                  : preco === "20-40"
                    ? "R$ 20 - R$ 40"
                    : "Acima de R$ 40"
                : "Descubra nossa linha completa de doces artesanais"}
        </p>
        {(categoria || preco) && (
          <p className="text-sm text-gray-500 mt-2">
            {products.length} produto{products.length !== 1 ? "s" : ""} encontrado{products.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1 mb-8 lg:mb-0">
          <ProductFilters />
        </div>
        <div className="lg:col-span-3">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  )
}

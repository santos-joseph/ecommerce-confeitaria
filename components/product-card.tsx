import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const displayPrice = product.preco
    ? `R$ ${product.preco.toFixed(2)}`
    : product.variacoes_preco
      ? `a partir de R$ ${Math.min(...product.variacoes_preco.map((v) => v.preco)).toFixed(2)}`
      : "Consulte o preço"

  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-2xl border border-pink-50 hover:bg-pink-50 overflow-hidden transition-all duration-300 group">
      <Link href={`/produtos/${product.slug}`}>
        <div className="overflow-hidden">
          <Image
            src={product.imagem[0] || "/placeholder.svg"}
            alt={product.titulo}
            width={400}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800 truncate mb-2">{product.titulo}</h3>
          <p className="text-sm text-gray-500 h-10 mb-3 line-clamp-2">{product.descricao}</p>
          <p className="text-xl font-bold text-pink-600 mb-4">{displayPrice}</p>
          <Button className="w-full bg-pink-300 hover:bg-pink-400 text-pink-700 transition duration-300 transform group-hover:scale-105 rounded-full">
            Ver detalhes
          </Button>
        </div>
      </Link>
    </div>
  )
}

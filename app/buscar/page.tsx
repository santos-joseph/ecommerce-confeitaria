import type { Metadata } from "next"
import { SearchResults } from "@/components/search-results"

export const metadata: Metadata = {
  title: "Buscar Produtos",
  description: "Encontre seus doces favoritos em nossa confeitaria artesanal.",
}

export default function SearchPage() {
  return <SearchResults />
}

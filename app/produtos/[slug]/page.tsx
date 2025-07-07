import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetails } from "@/components/product-details";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { RelatedProducts } from "@/components/related-products";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Produto não encontrado",
    };
  }

  const imageUrl =
    product.imagem && product.imagem.length > 0
      ? product.imagem[0]
      : "/placeholder.svg";

  return {
    title: product.titulo,
    description: product.descricao,
    openGraph: {
      title: product.titulo,
      description: product.descricao,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.titulo,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product.categoria, product.id);

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <ProductDetails product={product} />
      {related.length > 0 && <RelatedProducts products={related} />}
    </div>
  );
}
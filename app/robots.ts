import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/carrinho", "/checkout"],
    },
    sitemap: "https://jumontanaro.vercel.app/sitemap.xml",
  }
}

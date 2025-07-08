import { List } from "postcss/lib/list"

export interface Product {
  id: number
  titulo: string
  slug: string
  imagem: string[]
  descricao: string
  preco?: number
  categoria: string
  destaque?: boolean
  variacoes_preco?: {
    tamanho: string
    preco: number
  }[]
  ingredientes?: string[]
  tags?: string[]
}

const rawProducts = [
  {
    titulo: "Cookie Nutella Lovers",
    imagem: "",
    descricao: "Clássico amanteigado com recheio generoso de Nutella cremosa.",
    preco: 12.5,
    categoria: "Cookies",
  },
  {
    titulo: "Cookie de Prestígio",
    imagem: [
      "/produtos/cookie-de-prestigio/1.jpg",
      "/produtos/cookie-de-prestigio/2.jpg",
      "/produtos/cookie-de-prestigio/3.jpg",
      "/produtos/cookie-de-prestigio/4.jpg",
    ],
    descricao:
      "Cookie de cacau com gotas de chocolate ao leite, recheado com brigadeiro de coco mega cremoso, e claro, com muito coco.",
    preco: 12.5,
    categoria: "Cookies",
  },
  {
    titulo: "Cookie Indeciso",
    imagem: "",
    descricao: "Massa dupla (clara e escura) com recheio de Nutella branca e tradicional.",
    preco: 15.0,
    categoria: "Cookies",
  },
  {
    titulo: "Cookie Red Velvet com Brigadeiro de Ninho",
    imagem: "",
    descricao: "Massa vermelha intensa com recheio de brigadeiro de leite Ninho.",
    preco: 12.5,
    categoria: "Cookies",
  },
  {
    titulo: "Cookie Ferrero Rocher",
    imagem: "",
    descricao:
      "Massa de chocolate com gotas de chocolate ao leite, com recheio de nutella e um delicioso bombom de ferrero rocher.",
    preco: 17.0,
    categoria: "Cookies",
  },
  {
    titulo: "Cookie Cacau Black com Nutella",
    imagem: "",
    descricao: "Massa de cacau 100% com recheio quente e intenso de Nutella.",
    preco: 12.5,
    categoria: "Cookies",
  },
  {
    titulo: "Cookie Banana Nevada",
    imagem: [
      "/produtos/cookie-de-banana-nevada/1.jpg",
      "/produtos/cookie-de-banana-nevada/2.jpg",
      "/produtos/cookie-de-banana-nevada/3.jpg",
      "/produtos/cookie-de-banana-nevada/4.jpg",
    ],
    descricao: "Massa amanteigada com pedacinhos de banana e recheio cremoso de leite Ninho.",
    preco: 14.0,
    categoria: "Cookies",
  },
  {
    titulo: "Cookie de Paçoca",
    imagem: "",
    descricao: "Massa amanteigada com chocolate branco, amendoim triturado e recheio de brigadeiro de paçoca.",
    preco: 12.5,
    categoria: "Cookies",
  },
  {
    titulo: "Cookie Stikadinho",
    imagem: "",
    descricao: "Massa de chocolate com gostas de chocolate ao leite com muitos pedaços de chocolate stikadinho.",
    preco: 14.0,
    categoria: "Cookies",
  },
  {
    titulo: "Cookie de Churros com Doce de Leite",
    imagem: "",
    descricao: "Cookie com açúcar e canela, recheado com doce de leite.",
    preco: 12.5,
    categoria: "Cookies",
  },
  {
    titulo: "Cookie de Brigadeiro Trufado",
    imagem: "",
    descricao: "Massa de chocolate recheada com brigadeiro gourmet e gotas de chocolate belga.",
    preco: 13.0,
    categoria: "Cookies",
  },
  {
    titulo: "Cookie de Cacau Black com Ninho",
    imagem: "",
    descricao: "Massa de cacau puro com recheio de brigadeiro de leite Ninho.",
    preco: 12.5,
    categoria: "Cookies",
  },
  {
    titulo: "Cookie Sensação",
    imagem: "",
    descricao: "Massa de chocolate recheada com brigadeiro de morango.",
    preco: 12.5,
    categoria: "Cookies",
  },
  {
    titulo: "Bolo Mesclado",
    imagem: [
      "/produtos/bolo-mesclado/1.jpg",
      "/produtos/bolo-mesclado/2.jpg",
      "/produtos/bolo-mesclado/3.jpg",
      "/produtos/bolo-mesclado/4.jpg",
      "/produtos/bolo-mesclado/5.jpg",
    ],
    descricao: "Massa macia e saborosa com cobertura dupla irresistível: brigadeiro cremoso e leite Ninho.",
    preco: 45.0,
    categoria: "Bolos",
  },
  {
    titulo: "Bolo de Iogurte com Limão",
    imagem: [
      "/produtos/bolo-de-iorgute-com-limao/1.jpg",
      "/produtos/bolo-de-iorgute-com-limao/2.jpg",
      "/produtos/bolo-de-iorgute-com-limao/3.jpg",
      "/produtos/bolo-de-iorgute-com-limao/4.jpg",
      "/produtos/bolo-de-iorgute-com-limao/5.jpg",
    ],
    descricao: "Bolo com massa de iogurte, leve e úmida, finalizado com cobertura cremosa de limão.",
    preco: 35.5,
    categoria: "Bolos",
  },
  {
    titulo: "Bolo de Cenoura com Brigadeiro",
    imagem: [
      "/produtos/bolo-de-cenoura/1.jpg",
      "/produtos/bolo-de-cenoura/2.jpg",
      "/produtos/bolo-de-cenoura/3.jpg",
      "/produtos/bolo-de-cenoura/4.jpg",
      "/produtos/bolo-de-cenoura/5.jpg",
    ],
    descricao: "Massa fofinha e vibrante de cenoura com cobertura generosa de brigadeiro caseiro, bem cremoso.",
    preco: 45.5,
    categoria: "Bolos",
  },
  {
    titulo: "Bolo de Laranja",
    imagem: [
      "/produtos/bolo-de-laranja/1.jpg",
      "/produtos/bolo-de-laranja/2.jpg",
      "/produtos/bolo-de-laranja/3.jpg",
      "/produtos/bolo-de-laranja/4.jpg",
      "/produtos/bolo-de-laranja/5.jpg",
    ],
    descricao: "Massa fofinha com suco natural de laranja, leve toque cítrico e aroma fresco.",
    preco: 40.0,
    categoria: "Bolos",
  },
  {
    titulo: "Bolo de Paçoca",
    imagem: [
      "/produtos/bolo-de-pacoca/1.jpg",
      "/produtos/bolo-de-pacoca/2.jpg",
      "/produtos/bolo-de-pacoca/3.jpg",
      "/produtos/bolo-de-pacoca/4.jpg",
      "/produtos/bolo-de-pacoca/5.jpg",
    ],
    descricao: "Massa leve e saborosa, coberta com creme de paçoca bem cremoso.",
    preco: 40.0,
    categoria: "Bolos",
  },
  {
    titulo: "Bolo de Leite Ninho",
    imagem: [
      "/produtos/bolo-de-ninho/1.jpg",
      "/produtos/bolo-de-ninho/2.jpg",
      "/produtos/bolo-de-ninho/3.jpg",
      "/produtos/bolo-de-ninho/4.jpg",
      "/produtos/bolo-de-ninho/5.jpg",
    ],
    descricao:
      "Massa leve e fofinha com cobertura cremosa de leite Ninho, finalizada com uma delicada camada de leite em pó.",
    preco: 45.0,
    categoria: "Bolos",
  },
  {
    titulo: "Bolo de Leite com Maracujá",
    imagem: "",
    descricao: "Massa suave de leite com cobertura refrescante de maracujá.",
    preco: 40.0,
    categoria: "Bolos",
  },
  {
    titulo: "Bolo de Chocolate",
    imagem: "",
    descricao: "Clássico bolo de chocolate com massa fofinha e sabor intenso.",
    preco: 40.0,
    categoria: "Bolos",
  },
  {
    titulo: "Bolo de Banana",
    imagem: "",
    descricao: "Bolo caseiro com banana madura e toque especial de canela.",
    preco: 45.0,
    categoria: "Bolos",
  },
  {
    titulo: "Bolo Formigueiro",
    imagem: "",
    descricao: "Tradicional bolo com granulado de chocolate por toda massa.",
    preco: 35.0,
    categoria: "Bolos",
  },
  {
    titulo: "Bolo de Limão",
    imagem: "",
    descricao: "Bolo cítrico e refrescante com aroma natural de limão.",
    preco: 35.0,
    categoria: "Bolos",
  },
  {
    titulo: "Bolo de Coco",
    imagem: "",
    descricao: "Massa fofinha com coco ralado e sabor tropical.",
    preco: 35.0,
    categoria: "Bolos",
  },
  {
    titulo: "Bolo de Fubá Cremoso",
    imagem: "",
    descricao: "Variação cremosa do tradicional bolo de fubá.",
    preco: 40.0,
    categoria: "Bolos",
  },
  {
    titulo: "Bolo de Fubá com Goiabada",
    imagem: "",
    descricao: "Combinação perfeita de fubá com pedaços de goiabada.",
    preco: 35.0,
    categoria: "Bolos",
  },
  {
    titulo: "Bolo de Fubá com Laranja",
    imagem: "",
    descricao: "Fubá com toque cítrico da laranja fresca.",
    preco: 35.0,
    categoria: "Bolos",
  },
  {
    titulo: "Bolo de Fubá com Erva doce",
    imagem: "",
    descricao: "Tradicional bolo de fubá com aroma suave de erva doce.",
    preco: 30.0,
    categoria: "Bolos",
  },
  {
    titulo: "Mini Cake Black com Brigadeiro",
    imagem: "",
    descricao: "Versão mini do bolo Black com brigadeiro cremoso.",
    preco: 25.0,
    categoria: "Mini Cakes",
  },
  {
    titulo: "Mini Cake Black Ninho",
    imagem: "",
    descricao: "Versão mini do bolo Black com cobertura de Ninho.",
    preco: 26.0,
    categoria: "Mini Cakes",
  },
  {
    titulo: "Mini Cake Black Duo Ninho com Brigadeiro",
    imagem: "",
    descricao: "Versão mini do bolo Black com duo de Ninho e brigadeiro.",
    preco: 28.0,
    categoria: "Mini Cakes",
  },
  {
    titulo: "Mini Cake Cenoura com Brigadeiro",
    imagem: "",
    descricao: "Versão mini do bolo de cenoura com brigadeiro.",
    preco: 18.0,
    categoria: "Mini Cakes",
  },
  {
    titulo: "Mini Cake Red Velvet com Ninho",
    imagem: "",
    descricao: "Versão mini do bolo Red Velvet com Ninho.",
    preco: 26.0,
    categoria: "Mini Cakes",
  },
  {
    titulo: "Caneca de Cookie",
    imagem: [
      "/produtos/caneca-de-cookie/1.jpg",
      "/produtos/caneca-de-cookie/2.jpg",
      "/produtos/caneca-de-cookie/3.jpg",
      "/produtos/caneca-de-cookie/4.jpg",
      "/produtos/caneca-de-cookie/5.jpg",
    ],
    descricao:
      "Feita com massa de cookie crocante e recheada com uma generosa camada de chocolate por dentro, nossa caneca comestível é perfeita para servir café, leite ou chocolate quente.",
    preco: 12.5,
    categoria: "Acompanhamentos",
  },
  {
    titulo: "Chocolate Quente Artesanal",
    imagem: "",
    descricao:
      "Bebida cremosa à base de chocolate, feita com receita artesanal da Ju. Sabor intenso, textura aveludada e ideal para acompanhar cookies ou bolos.",
    variacoes_preco: [
      {
        tamanho: "300ml",
        preco: 18.0,
      },
      {
        tamanho: "400ml",
        preco: 22.0,
      },
      {
        tamanho: "500ml",
        preco: 26.0,
      },
    ],
    categoria: "Acompanhamentos",
  },
  {
    titulo: "Torta de Banana Nevada",
    imagem: [],
    descricao:
      "Feita com banana caramelizada e doce de leite, cobertos com um chocolate branco leve e finalizados com aquele toque especial de açúcar caramelizado.",
    preco: 19.9,
    categoria: "Acompanhamentos",
  },
]

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export const productsData: Product[] = rawProducts.map((product, index) => {
  const imagensDoProduto =
    Array.isArray(product.imagem) && product.imagem.length > 0
      ? product.imagem
      : [
        `/sem-foto.jpg`,
        `/sem-foto.jpg`,
        `/sem-foto.jpg`,
        `/sem-foto.jpg`,
        `/sem-foto.jpg`,
      ];

  return {
    id: index + 1,
    titulo: product.titulo,
    slug: createSlug(product.titulo),
    imagem: imagensDoProduto,
    descricao: product.descricao,
    preco: product.preco,
    categoria: product.categoria,
    destaque: [4, 3, 5, 14, 16, 31, 37].includes(index + 1),
    variacoes_preco: (product as any).variacoes_preco,
    ingredientes: generateIngredients(product.titulo, product.categoria),
    tags: generateTags(product.titulo, product.descricao),
  };
});

function generateIngredients(titulo: string, categoria: string): string[] {
  const baseIngredients = {
    Cookies: ["Farinha de trigo", "Manteiga", "Açúcar", "Ovos"],
    Bolos: ["Farinha de trigo", "Açúcar", "Ovos", "Leite", "Fermento"],
    "Mini Cakes": ["Farinha de trigo", "Açúcar", "Ovos", "Leite"],
    Acompanhamentos: ["Ingredientes especiais"],
  }

  const specific: { [key: string]: string[] } = {
    nutella: ["Nutella", "Avelã"],
    chocolate: ["Chocolate", "Cacau"],
    coco: ["Coco ralado", "Leite de coco"],
    banana: ["Banana", "Canela"],
    limão: ["Limão", "Raspas de limão"],
    cenoura: ["Cenoura", "Óleo"],
    paçoca: ["Amendoim", "Paçoca"],
    ninho: ["Leite Ninho", "Leite em pó"],
  }

  const ingredients = [...(baseIngredients[categoria as keyof typeof baseIngredients] || [])]

  Object.entries(specific).forEach(([key, values]) => {
    if (titulo.toLowerCase().includes(key)) {
      ingredients.push(...values)
    }
  })

  return [...new Set(ingredients)].slice(0, 6)
}

function generateTags(titulo: string, descricao: string): string[] {
  const text = `${titulo} ${descricao}`.toLowerCase()
  const possibleTags = [
    "chocolate",
    "nutella",
    "coco",
    "banana",
    "limão",
    "cenoura",
    "paçoca",
    "ninho",
    "brigadeiro",
    "cremoso",
    "caseiro",
    "artesanal",
    "especial",
    "tradicional",
    "gourmet",
    "doce",
    "fofinho",
    "intenso",
  ]

  return possibleTags.filter((tag) => text.includes(tag)).slice(0, 4)
}

export function getAllProducts(): Product[] {
  return productsData
}

export function getProducts(categoria?: string): Product[] {
  if (!categoria) return productsData
  return productsData.filter((product) => product.categoria === categoria)
}

export function getFeaturedProducts(): Product[] {
  return productsData.filter((product) => product.destaque)
}

export function getProductById(id: number): Product | undefined {
  return productsData.find((product) => product.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.find((product) => product.slug === slug)
}

export function getRelatedProducts(categoria: string, excludeId: number): Product[] {
  return productsData.filter((product) => product.categoria === categoria && product.id !== excludeId).slice(0, 4)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return productsData.filter(
    (product) =>
      product.titulo.toLowerCase().includes(lowercaseQuery) ||
      product.descricao.toLowerCase().includes(lowercaseQuery) ||
      product.categoria.toLowerCase().includes(lowercaseQuery) ||
      product.tags?.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

export function getCategoryInfo(categoria: string) {
  const categories = {
    cookies: {
      name: "Cookies",
      description:
        "Cookies artesanais com recheios especiais e sabores únicos. Cada um feito com muito carinho e ingredientes selecionados.",
    },
    bolos: {
      name: "Bolos",
      description:
        "Bolos caseiros com massas fofas e coberturas irresistíveis. Perfeitos para celebrar momentos especiais.",
    },
    "mini-cakes": {
      name: "Mini Cakes",
      description:
        "Versões individuais dos nossos bolos favoritos. Perfeitos para uma porção individual ou presente especial.",
    },
    acompanhamentos: {
      name: "Acompanhamentos",
      description:
        "Bebidas e complementos especiais para acompanhar nossos doces e tornar sua experiência ainda mais completa.",
    },
  }

  return categories[categoria as keyof typeof categories]
}

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ContactBanner() {
  return (
    <section className="bg-pink-500 text-white text-center py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold font-playfair mb-4">Dúvidas ou Pedidos Especiais?</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg mb-8">
          Quer montar um kit personalizado ou precisa de ajuda? Fale com a gente no WhatsApp!
        </p>
        <Button asChild size="lg" className="bg-white text-pink-500 hover:bg-gray-100 rounded-full">
          <Link href="https://wa.me/5519987382375" target="_blank" rel="noopener noreferrer">
            Chamar no WhatsApp
          </Link>
        </Button>
      </div>
    </section>
  )
}

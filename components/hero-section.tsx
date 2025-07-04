import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CookieIcon } from "lucide-react"
import { PhoneIcon } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative text-center py-20 md:py-32 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-20 animate-float"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-rose-200 rounded-full opacity-30 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-24 h-24 bg-pink-300 rounded-full opacity-15 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-40 right-10 w-12 h-12 bg-rose-300 rounded-full opacity-25 animate-float"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="animate-slide-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight mb-8">
            <span className="block font-poppins">Aquele momento</span>
            <span className="block font-poppins">que começa com</span>
            <span className="block font-dancing text-pink-500 text-5xl md:text-7xl lg:text-8xl animate-wiggle">
              "só um doce"
            </span>
            <span className="block font-poppins">e termina com</span>
            <span className="block font-dancing text-gray-800 text-4xl md:text-6xl lg:text-7xl">"quero mais"</span>
          </h1>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <p className="mt-8 max-w-3xl mx-auto text-gray-600 text-lg md:text-xl leading-relaxed mb-10">
            Cada bolo e cookie é feito à mão, com ingredientes selecionados e o carinho que você merece.
          </p>
        </div>

        <div
          className="animate-slide-up flex flex-col sm:flex-row gap-6 justify-center items-center"
          style={{ animationDelay: "0.6s" }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Link href="/produtos">
              <span className="mr-2"><CookieIcon /></span>
              Descobrir Sabores
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-transparent"
          >
            <Link href="https://wa.me/5519987382375" target="_blank">
              <span className="mr-2"><PhoneIcon /></span>
              Falar no WhatsApp
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

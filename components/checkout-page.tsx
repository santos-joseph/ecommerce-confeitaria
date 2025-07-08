"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin, CreditCard, MessageCircle, TruckIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"

export function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const router = useRouter()
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    deliveryMethod: "retirada",
    paymentMethod: "pix",
    address: "",
    complement: "",
    neighborhood: "",
    city: "",
    observations: "",
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleFinalizeOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerInfo.name.trim()) {
      alert("Por favor, preencha seu nome.")
      return
    }
    if (!customerInfo.phone.trim()) {
      alert("Por favor, preencha seu telefone.")
      return
    }
    if (customerInfo.deliveryMethod === "entrega" && !customerInfo.address.trim()) {
      alert("Por favor, preencha o endereço para entrega.")
      return
    }
    setIsModalOpen(true)
  }

  const sendWhatsAppMessage = () => {
    const phoneNumber = "5519987382375" // Substitua pelo número de destino
    let message = `Olá, Ju! Gostaria de fazer um *novo pedido:*\n\n`
    message += `*Nome:* ${customerInfo.name}\n`
    message += `*Modalidade:* ${customerInfo.deliveryMethod === "retirada" ? "Retirada" : "Entrega"}\n`

    if (customerInfo.deliveryMethod === "entrega") {
      message += `*Endereço:* ${customerInfo.address}`
      if (customerInfo.complement) message += `, ${customerInfo.complement}`
      message += `, ${customerInfo.neighborhood} - ${customerInfo.city}\n`
    }

    message += `\n*Itens do Pedido:*\n`

    cartItems.forEach((item) => {
      const price = item.selectedVariation ? item.selectedVariation.preco : item.preco || 0
      message += `• ${item.quantity}x ${item.titulo}`
      if (item.selectedVariation) {
        message += ` (${item.selectedVariation.tamanho})`
      }
      message += ` - R$ ${(price * item.quantity).toFixed(2)}\n`
    })

    message += `\n*Total do Pedido:* R$ ${cartTotal.toFixed(2)}\n`
    message += `*Forma de Pagamento:* ${customerInfo.paymentMethod === "pix" ? "Pix" : "Cartão de Crédito"}\n`

    if (customerInfo.observations) {
      message += `\n*Observações:* ${customerInfo.observations}\n`
    }

    message += `\nObrigado!`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    clearCart()
    setIsModalOpen(false)
    router.push("/")
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-playfair mb-2">Finalizar Pedido</h1>
          <p className="text-gray-600">Estamos quase lá! Só faltam alguns detalhes.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Resumo do Pedido */}
          <div className="lg:w-2/5 w-full">
            <Card className="sticky top-28 rounded-2xl">
              <CardHeader>
                <CardTitle className="font-playfair text-2xl">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-base">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Subtotal</span>
                    <span>R$ {cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 font-bold text-lg">
                    <span>Total</span>
                    <span className="text-pink-600">R$ {cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-500 pt-2">
                  <p>Seu pedido será confirmado via WhatsApp.</p>
                </div>

                <Button
                  type="submit"
                  form="checkout-form"
                  size="lg"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 text-base rounded-full mt-4"
                >
                  Enviar pedido via WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Formulário */}
          <div className="lg:w-3/5 w-full">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-playfair text-2xl">
                  <UserIcon className="h-6 w-6" />
                  Suas Informações
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form id="checkout-form" onSubmit={handleFinalizeOrder} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="font-medium">Nome completo *</Label>
                      <Input id="name" name="name" value={customerInfo.name} onChange={handleInputChange} required className="mt-1 border rounded-2xl border-gray-300" />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="font-medium">Telefone *</Label>
                      <Input id="phone" name="phone" value={customerInfo.phone} onChange={handleInputChange} required className="mt-1 border rounded-2xl border-gray-300" />
                    </div>
                  </div>

                  <div>
                    <Label className="font-medium flex items-center gap-2 mb-2">
                      <TruckIcon className="h-5 w-5" />
                      Como você quer receber?
                    </Label>
                    <RadioGroup value={customerInfo.deliveryMethod} onValueChange={(value) => setCustomerInfo((prev) => ({ ...prev, deliveryMethod: value }))} className="space-y-2">
                      <Label htmlFor="retirada" className="flex items-center p-4 border rounded-2xl cursor-pointer">
                        <RadioGroupItem value="retirada" id="retirada" />
                        <span className="ml-3 font-medium">Retirada no local</span>
                      </Label>
                      <Label htmlFor="entrega" className="flex items-center p-4 border rounded-2xl cursor-pointer">
                        <RadioGroupItem value="entrega" id="entrega" />
                        <span className="ml-3 font-medium">Entrega</span>
                      </Label>
                    </RadioGroup>
                  </div>

                  {customerInfo.deliveryMethod === "entrega" && (
                    <div className="space-y-4 p-4 border rounded-2xl">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-pink-500" />
                        <Label className="font-medium">Endereço de entrega</Label>
                      </div>
                      <Input name="address" value={customerInfo.address} onChange={handleInputChange} required className="mt-1 border rounded-2xl border-gray-300" placeholder="Rua, número" />
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input name="complement" value={customerInfo.complement} onChange={handleInputChange} className="mt-1 border rounded-2xl border-gray-300" placeholder="Complemento" />
                        <Input name="neighborhood" value={customerInfo.neighborhood} onChange={handleInputChange} className="mt-1 border rounded-2xl border-gray-300" placeholder="Bairro" />
                      </div>
                      <Input name="city" value={customerInfo.city} onChange={handleInputChange} className="mt-1 border rounded-2xl border-gray-300" placeholder="Cidade" />
                    </div>
                  )}

                  <div>
                    <Label className="font-medium flex items-center gap-2 mb-2">
                      <CreditCard className="h-5 w-5" />
                      Como você quer pagar?
                    </Label>
                    <RadioGroup value={customerInfo.paymentMethod} onValueChange={(value) => setCustomerInfo((prev) => ({ ...prev, paymentMethod: value }))} className="space-y-2">
                      <Label htmlFor="pix" className="flex items-center p-4 border rounded-2xl cursor-pointer">
                        <RadioGroupItem value="pix" id="pix" />
                        <span className="ml-3 font-medium">Pix</span>
                      </Label>
                      <Label htmlFor="cartao" className="flex items-center p-4 border rounded-2xl cursor-pointer">
                        <RadioGroupItem value="cartao" id="cartao" />
                        <span className="ml-3 font-medium">Cartão de Crédito</span>
                      </Label>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="observations" className="font-medium">Observações</Label>
                    <Textarea id="observations" name="observations" value={customerInfo.observations} onChange={handleInputChange} className="mt-1 border rounded-2xl border-gray-300" rows={3} />
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="max-w-md m-4 bg-white rounded-2xl">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold font-playfair mb-4">Quase lá!</h2>
              <p className="text-gray-600 mb-6">Você será redirecionado para o WhatsApp para confirmar seu pedido.</p>
              <div className="space-y-3">
                <Button onClick={sendWhatsAppMessage} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-2 rounded-full">
                  Continuar para o WhatsApp
                </Button>
                <Button variant="outline" onClick={() => setIsModalOpen(false)} className="w-full rounded-full">
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
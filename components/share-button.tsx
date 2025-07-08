// components/share-button.tsx

"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";

// NOVO: Definindo a interface para as props do componente ✅
interface ShareButtonProps {
    productTitle: string;
    productUrl: string;
}

// Aplicando o tipo ShareButtonProps às props que chegam 👇
export default function ShareButton({ productTitle, productUrl }: ShareButtonProps) {
    const [feedbackMessage, setFeedbackMessage] = useState("");

    const handleShare = async () => {
        const shareData = {
            title: `Olha esse produto da Ju Montanaro: ${productTitle}`,
            text: `Eu amei esse produto e achei que você também gostaria: ${productTitle}`,
            url: productUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.log("Compartilhamento cancelado ou falhou", err);
            }
        } else {
            // Fallback para copiar o link
            navigator.clipboard.writeText(productUrl).then(() => {
                setFeedbackMessage("Link copiado!");
                setTimeout(() => setFeedbackMessage(""), 2000);
            });
        }
    };

    return (
        <>
            <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Compartilhar produto"
            >
                <Share2 size={18} />
                <span className="font-semibold">Compartilhar</span>
            </button>
            {feedbackMessage && (
                <p className="text-sm text-green-600 mt-2 text-center">
                    {feedbackMessage}
                </p>
            )}
        </>
    );
}
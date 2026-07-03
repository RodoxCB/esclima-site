import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppFloatProps = {
  whatsappNumber: string;
  whatsappMessage: string;
};

export function WhatsAppFloat({ whatsappNumber, whatsappMessage }: WhatsAppFloatProps) {
  return (
    <a
      href={getWhatsAppUrl(whatsappNumber, whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition hover:scale-110 hover:animate-none hover:bg-[#20bd5a] active:scale-95 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      <MessageCircle size={28} className="sm:hidden" />
      <MessageCircle size={32} className="hidden sm:block" />
    </a>
  );
}

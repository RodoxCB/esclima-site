import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  phone: string;
  message: string;
};

const sizeClasses = {
  sm: "px-4 py-2.5 text-sm gap-2",
  md: "px-6 py-3 text-base gap-2.5",
  lg: "px-8 py-4 text-lg gap-3"
};

export function WhatsAppButton({
  label = "Falar no WhatsApp",
  className = "",
  size = "md",
  phone,
  message
}: WhatsAppButtonProps) {
  return (
    <a
      href={getWhatsAppUrl(phone, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-xl bg-[#25D366] font-semibold text-white shadow-lg shadow-[#25D366]/25 transition hover:bg-[#20bd5a] hover:shadow-[#25D366]/40 active:scale-[0.98] ${sizeClasses[size]} ${className}`}
    >
      <MessageCircle className="shrink-0" size={size === "lg" ? 24 : size === "sm" ? 18 : 20} />
      {label}
    </a>
  );
}

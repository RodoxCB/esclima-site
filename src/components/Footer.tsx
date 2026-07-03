import { Clock, MapPin, MessageCircle } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type FooterProps = {
  content: SiteContent;
};

export function Footer({ content }: FooterProps) {
  const { footer } = content.copy;

  return (
    <footer className="border-t border-slate-200 bg-slate-900 px-4 py-12 text-slate-300 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xl font-bold text-white">{content.site.name}</p>
            <p className="mt-2 text-sm">{content.site.tagline}</p>
          </div>

          <div>
            <p className="font-semibold text-white">{footer.contact}</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href={getWhatsAppUrl(
                    content.contact.whatsappNumber,
                    content.contact.whatsappMessage
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm transition hover:text-sky-400"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={content.site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm transition hover:text-sky-400"
                >
                  @ Instagram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-white">{footer.location}</p>
            <p className="mt-3 inline-flex items-start gap-2 text-sm">
              <MapPin size={16} className="mt-0.5 shrink-0 text-sky-400" />
              {content.site.address}
            </p>
          </div>

          <div>
            <p className="font-semibold text-white">{footer.schedule}</p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm">
              <Clock size={16} className="text-sky-400" />
              {content.site.schedule}
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {content.site.name}. {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

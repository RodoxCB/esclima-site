import { Clock, MapPin, Phone } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { FadeIn } from "@/components/FadeIn";
import { SectionTitle } from "@/components/SectionTitle";
import { WhatsAppButton } from "@/components/WhatsAppButton";

type ContactProps = {
  copy: SiteContent["copy"]["contact"];
  content: SiteContent;
};

export function Contact({ copy, content }: ContactProps) {
  return (
    <section id="contato" className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle title={copy.title} subtitle={copy.subtitle} />
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Telefone / WhatsApp</p>
                  <p className="mt-1 text-slate-600">{content.contact.phoneDisplay}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Localização</p>
                  <p className="mt-1 text-slate-600">{content.site.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Horário de atendimento</p>
                  <p className="mt-1 text-slate-600">{content.site.schedule}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-8 text-center">
              <p className="text-lg font-semibold text-slate-900">
                Pronto para solicitar seu orçamento?
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Clique abaixo e fale diretamente com nossa equipe.
              </p>
              <WhatsAppButton
                label={copy.cta}
                size="lg"
                phone={content.contact.whatsappNumber}
                message={content.contact.whatsappMessage}
                className="mt-6"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

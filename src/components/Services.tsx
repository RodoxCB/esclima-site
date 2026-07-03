import { CheckCircle } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { FadeIn } from "@/components/FadeIn";
import { SectionTitle } from "@/components/SectionTitle";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getServiceIcon } from "@/lib/icons";

type ServicesProps = {
  copy: SiteContent["copy"]["services"];
  services: SiteContent["services"];
  whatsapp: SiteContent["contact"];
};

export function Services({ copy, services, whatsapp }: ServicesProps) {
  return (
    <section id="servicos" className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle title={copy.title} subtitle={copy.subtitle} />
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = getServiceIcon(service.icon);
            const message = `Olá! Gostaria de um orçamento para: ${service.title}`;

            return (
              <FadeIn key={`${service.title}-${index}`} delay={index * 60}>
                <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-300 hover:shadow-md hover:shadow-sky-100">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
                    {service.description}
                  </p>
                  <p className="mt-3 inline-flex items-start gap-1.5 text-sm font-medium text-sky-700">
                    <CheckCircle size={16} className="mt-0.5 shrink-0" />
                    {service.benefit}
                  </p>
                  <div className="mt-5">
                    <WhatsAppButton
                      label="Solicitar orçamento"
                      size="sm"
                      phone={whatsapp.whatsappNumber}
                      message={message}
                      className="w-full"
                    />
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn>
          <div className="mt-10 text-center">
            <WhatsAppButton
              label={copy.cta}
              size="lg"
              message={copy.ctaMessage}
              phone={whatsapp.whatsappNumber}
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

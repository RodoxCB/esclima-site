import type { SiteContent } from "@/lib/types";
import { FadeIn } from "@/components/FadeIn";
import { WhatsAppButton } from "@/components/WhatsAppButton";

type FinalCTAProps = {
  copy: SiteContent["copy"]["finalCta"];
  whatsapp: SiteContent["contact"];
};

export function FinalCTA({ copy, whatsapp }: FinalCTAProps) {
  return (
    <section className="bg-gradient-to-r from-sky-600 to-sky-700 px-4 py-16 sm:px-6 sm:py-20">
      <FadeIn>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-lg text-sky-100">{copy.subtitle}</p>
          <WhatsAppButton
            phone={whatsapp.whatsappNumber}
            message={whatsapp.whatsappMessage}
            size="lg"
            className="mt-8"
          />
        </div>
      </FadeIn>
    </section>
  );
}

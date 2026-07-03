import { ChevronDown, ShieldCheck, Zap } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { FadeIn } from "@/components/FadeIn";
import { WhatsAppButton } from "@/components/WhatsAppButton";

type HeroProps = {
  copy: SiteContent["copy"]["hero"];
  whatsapp: SiteContent["contact"];
};

export function Hero({ copy, whatsapp }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-sky-900 via-sky-800 to-slate-900 px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.2)_0%,_transparent_60%)]" />
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-sky-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <FadeIn>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-sm text-sky-300">
            <Zap size={16} />
            {copy.badge}
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <h1 className="max-w-3xl text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {copy.title}{" "}
            <span className="bg-gradient-to-r from-sky-300 to-sky-100 bg-clip-text text-transparent">
              {copy.titleHighlight}
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mt-4 max-w-2xl text-lg text-sky-100 sm:text-xl">{copy.subtitle}</p>
        </FadeIn>

        <FadeIn delay={300}>
          <p className="mt-3 max-w-xl text-base text-sky-200/80">{copy.complement}</p>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <WhatsAppButton
              phone={whatsapp.whatsappNumber}
              message={whatsapp.whatsappMessage}
              size="lg"
            />
            <a
              href="#galeria"
              className="inline-flex items-center justify-center rounded-xl border border-sky-400/40 bg-sky-400/10 px-8 py-4 text-lg font-semibold text-white transition hover:border-sky-300/60 hover:bg-sky-400/20"
            >
              {copy.ctaGallery}
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={500}>
          <div className="mt-10 flex flex-wrap gap-4 text-sm text-sky-200">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-sky-300" />
              {copy.trust1}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap size={16} className="text-sky-300" />
              {copy.trust2}
            </span>
          </div>
        </FadeIn>

        <a
          href="#servicos"
          aria-label="Ver serviços"
          className="mt-12 flex justify-center text-sky-400/60 transition hover:text-sky-300"
        >
          <ChevronDown size={28} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}

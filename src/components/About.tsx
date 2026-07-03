import { Snowflake } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { FadeIn } from "@/components/FadeIn";
import { SectionTitle } from "@/components/SectionTitle";

type AboutProps = {
  copy: SiteContent["copy"]["about"];
  about: SiteContent["about"];
};

export function About({ copy, about }: AboutProps) {
  return (
    <section id="sobre" className="bg-gradient-to-br from-sky-900 to-slate-900 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle title={copy.title} subtitle={copy.subtitle} light />
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mt-10 grid items-center gap-8 lg:grid-cols-[auto_1fr]">
            <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-3xl bg-sky-400/20 text-sky-300 lg:mx-0">
              <Snowflake size={64} />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">{about.title}</h3>
              {about.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed text-sky-100">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import type { DifferentialItem } from "@/lib/types";
import { FadeIn } from "@/components/FadeIn";
import { SectionTitle } from "@/components/SectionTitle";
import { getDifferentialIcon } from "@/lib/icons";

type DifferentialsProps = {
  title: string;
  subtitle: string;
  differentials: DifferentialItem[];
};

export function Differentials({ title, subtitle, differentials }: DifferentialsProps) {
  return (
    <section id="diferenciais" className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle title={title} subtitle={subtitle} />
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.map((item, index) => {
            const Icon = getDifferentialIcon(item.icon);
            return (
              <FadeIn key={`${item.title}-${index}`} delay={index * 60}>
                <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-sky-200 hover:bg-sky-50/50">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-600 text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Quote, Star } from "lucide-react";
import type { SiteContent } from "@/lib/types";
import { FadeIn } from "@/components/FadeIn";
import { SectionTitle } from "@/components/SectionTitle";

type ReviewsProps = {
  copy: SiteContent["copy"]["reviews"];
  reviews: SiteContent["reviews"];
};

export function Reviews({ copy, reviews }: ReviewsProps) {
  return (
    <section id="avaliacoes" className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle title={copy.title} subtitle={copy.subtitle} />
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {reviews.map((review, index) => (
            <FadeIn key={`${review.name}-${index}`} delay={index * 80}>
              <article className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <Quote
                  size={32}
                  className="absolute right-4 top-4 text-sky-100"
                  aria-hidden
                />
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-slate-600">&ldquo;{review.text}&rdquo;</p>
                <p className="mt-4 text-sm font-semibold text-slate-900">{review.name}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

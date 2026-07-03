import { ExternalLink } from "lucide-react";
import type { GalleryItem, SiteContent } from "@/lib/types";
import { FadeIn } from "@/components/FadeIn";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SectionTitle } from "@/components/SectionTitle";

type GalleryProps = {
  copy: SiteContent["copy"]["gallery"];
  items: GalleryItem[];
  instagram: string;
};

export function Gallery({ copy, items, instagram }: GalleryProps) {
  return (
    <section id="galeria" className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <SectionTitle title={copy.title} subtitle={copy.subtitle} />
        </FadeIn>

        <FadeIn>
          <div className="mt-10">
            <GalleryGrid items={items} hoverText={copy.hover} />
          </div>
        </FadeIn>

        <FadeIn>
          <div className="mt-10 text-center">
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-6 py-3 font-semibold text-slate-700 transition hover:border-sky-400 hover:text-sky-600"
            >
              <ExternalLink size={20} />
              {copy.instagramCta}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

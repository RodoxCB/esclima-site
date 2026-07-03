import Image from "next/image";
import type { GalleryItem } from "@/lib/types";

const categoryLabels: Record<string, string> = {
  instalacao: "Instalação",
  manutencao: "Manutenção",
  higienizacao: "Higienização",
  outros: "Outros"
};

type GalleryGridProps = {
  items: GalleryItem[];
  hoverText: string;
};

export function GalleryGrid({ items, hoverText }: GalleryGridProps) {
  if (!items.length) {
    return (
      <p className="text-center text-slate-500">
        Em breve, novos projetos serão adicionados aqui.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="group relative aspect-square overflow-hidden rounded-xl bg-slate-200"
        >
          <Image
            src={item.url}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent p-3 opacity-0 transition duration-300 group-hover:opacity-100">
            <span className="mb-1 inline-block w-fit rounded-full bg-sky-500/80 px-2 py-0.5 text-xs font-medium text-white">
              {categoryLabels[item.category] ?? item.category}
            </span>
            <p className="text-sm font-semibold text-white">{item.title}</p>
            {item.description && (
              <p className="mt-0.5 text-xs text-sky-100">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

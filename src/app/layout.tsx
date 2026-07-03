import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteChrome } from "@/components/SiteChrome";
import { getContent } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();

  return {
    title: `${content.site.name} | Climatização e Refrigeração`,
    description:
      "Instalação, manutenção e higienização de ar-condicionado. Atendimento rápido via WhatsApp. Especialistas em climatização de ambientes.",
    keywords: [
      "ar condicionado",
      "climatização",
      "refrigeração",
      "instalação ar condicionado",
      "manutenção ar condicionado",
      "higienização ar condicionado",
      "carga de gás",
      "Esclima Refrigeração"
    ],
    openGraph: {
      title: `${content.site.name} | Especialistas em Climatização`,
      description: content.site.tagline,
      locale: "pt_BR",
      type: "website"
    },
    robots: { index: true, follow: true }
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await getContent();

  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans">
        <JsonLd content={content} />
        <SiteChrome content={content}>{children}</SiteChrome>
      </body>
    </html>
  );
}

import type { SiteContent } from "@/lib/types";

type JsonLdProps = {
  content: SiteContent;
};

export function JsonLd({ content }: JsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: content.site.name,
    description: content.site.tagline,
    url: "https://esclimarefrigeracao.com.br",
    telephone: content.contact.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      addressLocality: content.site.address
    },
    openingHours: content.site.schedule,
    sameAs: [content.site.instagram]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

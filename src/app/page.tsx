import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Differentials } from "@/components/Differentials";
import { FinalCTA } from "@/components/FinalCTA";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Hero copy={content.copy.hero} whatsapp={content.contact} />
      <Services
        copy={content.copy.services}
        services={content.services}
        whatsapp={content.contact}
      />
      <Differentials
        title={content.copy.differentials.title}
        subtitle={content.copy.differentials.subtitle}
        differentials={content.differentials}
      />
      <Reviews copy={content.copy.reviews} reviews={content.reviews} />
      <Gallery
        copy={content.copy.gallery}
        items={content.gallery}
        instagram={content.site.instagram}
      />
      <About copy={content.copy.about} about={content.about} />
      <Contact copy={content.copy.contact} content={content} />
      <FinalCTA copy={content.copy.finalCta} whatsapp={content.contact} />
    </>
  );
}

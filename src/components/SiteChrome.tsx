"use client";

import { usePathname } from "next/navigation";
import type { SiteContent } from "@/lib/types";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

type SiteChromeProps = {
  content: SiteContent;
  children: React.ReactNode;
};

export function SiteChrome({ content, children }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header
        siteName={content.site.name}
        links={content.navLinks}
        whatsappNumber={content.contact.whatsappNumber}
        whatsappMessage={content.contact.whatsappMessage}
      />
      <main>{children}</main>
      <Footer content={content} />
      <WhatsAppFloat
        whatsappNumber={content.contact.whatsappNumber}
        whatsappMessage={content.contact.whatsappMessage}
      />
    </>
  );
}

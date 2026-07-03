export type NavLink = {
  href: string;
  label: string;
};

export type GalleryCategory = "instalacao" | "manutencao" | "higienizacao" | "outros";

export type GalleryItem = {
  id: string;
  url: string;
  title: string;
  category: GalleryCategory;
  description?: string;
};

export type ServiceItem = {
  icon: string;
  title: string;
  description: string;
  benefit: string;
};

export type DifferentialItem = {
  icon: string;
  title: string;
  description: string;
};

export type ReviewItem = {
  name: string;
  text: string;
};

export type SiteContent = {
  site: {
    name: string;
    tagline: string;
    instagram: string;
    schedule: string;
    address: string;
  };
  contact: {
    whatsappNumber: string;
    whatsappMessage: string;
    phoneDisplay: string;
  };
  navLinks: NavLink[];
  services: ServiceItem[];
  differentials: DifferentialItem[];
  reviews: ReviewItem[];
  about: {
    title: string;
    paragraphs: string[];
  };
  copy: {
    hero: {
      badge: string;
      title: string;
      titleHighlight: string;
      subtitle: string;
      complement: string;
      ctaGallery: string;
      trust1: string;
      trust2: string;
    };
    services: {
      title: string;
      subtitle: string;
      cta: string;
      ctaMessage: string;
    };
    differentials: {
      title: string;
      subtitle: string;
    };
    reviews: {
      title: string;
      subtitle: string;
    };
    gallery: {
      title: string;
      subtitle: string;
      instagramCta: string;
      hover: string;
    };
    about: {
      title: string;
      subtitle: string;
    };
    contact: {
      title: string;
      subtitle: string;
      cta: string;
    };
    finalCta: {
      title: string;
      subtitle: string;
    };
    footer: {
      contact: string;
      schedule: string;
      location: string;
      copyright: string;
    };
  };
  gallery: GalleryItem[];
};

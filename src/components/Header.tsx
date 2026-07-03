"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { NavLink } from "@/lib/types";
import { BrandMark } from "@/components/BrandMark";
import { WhatsAppButton } from "@/components/WhatsAppButton";

type HeaderProps = {
  siteName: string;
  links: NavLink[];
  whatsappNumber: string;
  whatsappMessage: string;
};

export function Header({ siteName, links, whatsappNumber, whatsappMessage }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white/95 shadow-md backdrop-blur-md"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={closeMenu}>
          <BrandMark />
          <span className="text-lg font-bold text-slate-900 sm:text-xl">{siteName}</span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-sky-600"
            >
              {link.label}
            </Link>
          ))}
          <WhatsAppButton phone={whatsappNumber} message={whatsappMessage} size="sm" />
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="rounded-lg p-2 text-slate-700 lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-slate-700"
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <WhatsAppButton
              className="mt-2 w-full"
              phone={whatsappNumber}
              message={whatsappMessage}
            />
          </nav>
        </div>
      )}
    </header>
  );
}

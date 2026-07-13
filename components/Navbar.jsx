"use client";

import { useEffect, useState } from "react";
import { Menu, X, Snowflake } from "lucide-react";
import { useQuote } from "./wizard/QuoteProvider";

const links = [
  { href: "#dlaczego-piana", label: "Dlaczego piana?" },
  { href: "#porownanie", label: "Porównanie" },
  { href: "#realizacje", label: "Realizacje" },
  { href: "#jak-dzialamy", label: "Jak działamy?" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  const { openQuote } = useQuote();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <a
          href="#hero"
          className={`flex items-center gap-2 text-lg font-extrabold tracking-tight md:text-xl ${
            solid ? "text-slate-900" : "text-white"
          }`}
        >
          <Snowflake
            className={solid ? "text-brand-500" : "text-accent-400"}
            size={26}
          />
          Izolacje<span className="text-brand-500">PUR</span>
        </a>

        {/* Linki desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-brand-500 ${
                  solid ? "text-slate-700" : "text-white/90"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={openQuote}
              className="rounded-full bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-500/30 transition-all hover:bg-accent-600 hover:shadow-accent-500/40"
            >
              Darmowa Wycena
            </button>
          </li>
        </ul>

        {/* Hamburger mobile */}
        <button
          type="button"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden ${solid ? "text-slate-900" : "text-white"}`}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <ul className="container flex flex-col gap-1 py-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="mt-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openQuote();
                }}
                className="block w-full rounded-full bg-accent-500 px-5 py-3 text-center text-base font-semibold text-white shadow-lg shadow-accent-500/30"
              >
                Darmowa Wycena
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

"use client";

import { motion } from "framer-motion";
import { Phone, Clock, ShieldCheck, BadgeCheck } from "lucide-react";
import { useQuote } from "./wizard/QuoteProvider";

const badges = [
  { icon: Clock, label: "Krótkie terminy" },
  { icon: ShieldCheck, label: "Certyfikowana piana" },
  { icon: BadgeCheck, label: "Darmowa wycena" },
];

export default function Hero() {
  const { openQuote } = useQuote();
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Tło — nowoczesne poddasze */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
        alt="Nowoczesne, czyste poddasze przygotowane do ocieplenia pianą PUR"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      {/* Przyciemnienie */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/70 to-brand-900/60" />

      <div className="container relative z-10 py-28 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium uppercase tracking-wider text-brand-200 ring-1 ring-white/15 backdrop-blur">
            Izolacje pianą PUR — województwo łódzkie
          </p>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Nowoczesne Ocieplanie Pianą PUR.{" "}
            <span className="text-accent-400">
              Cieplejszy dom, niższe rachunki.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
            Zabezpiecz swój dom przed utratą ciepła zimą i nagrzewaniem latem.
            Bezszwowa izolacja poddaszy z 25-letnią gwarancją wydajności —
            łączymy Cię ze sprawdzoną ekipą na terenie województwa łódzkiego.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={openQuote}
              className="inline-flex items-center justify-center rounded-full bg-accent-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-accent-500/30 transition-all hover:-translate-y-0.5 hover:bg-accent-600"
            >
              Wylicz wycenę online
            </button>
            <a
              href="tel:+48000000000"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-8 py-4 text-base font-semibold text-white ring-1 ring-white/25 backdrop-blur transition-all hover:bg-white/20"
            >
              <Phone size={20} />
              Zadzwoń: +48 000 000 000
            </a>
          </div>

          {/* Trust badges */}
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {badges.map((b) => (
              <li
                key={b.label}
                className="flex items-center gap-2 text-sm font-medium text-slate-200"
              >
                <b.icon size={18} className="text-accent-400" />
                {b.label}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeIn from "./FadeIn";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    title: "Poddasze użytkowe",
    desc: "Ocieplenie skosów pianą otwartokomórkową — dom jednorodzinny.",
  },
  {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80",
    title: "Natrysk na skosach",
    desc: "Bezszwowa warstwa dopasowana do każdej krokwi.",
  },
  {
    src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=80",
    title: "Pomiar wilgotności",
    desc: "Kontrola wilgotności drewna przed aplikacją.",
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
    title: "Dom jednorodzinny",
    desc: "Kompleksowa izolacja termiczna budynku.",
  },
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80",
    title: "Więźba przed pracą",
    desc: "Przygotowanie konstrukcji dachu do natrysku.",
  },
];

const AUTOPLAY_MS = 4500;

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next) => {
    setDir(next > 0 ? 1 : -1);
    setIndex((i) => (i + next + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, go, index]);

  return (
    <section id="realizacje" className="bg-slate-50 py-20 md:py-28">
      <div className="container">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Nasze realizacje
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Poddasza, skosy i stropodachy ocieplone pianą natryskową na terenie
            województwa łódzkiego.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mx-auto mt-10 max-w-4xl">
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-slate-200 shadow-xl sm:aspect-[16/9]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.img
                key={index}
                src={slides[index].src}
                alt={slides[index].title}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* Przyciemnienie + podpis */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    {slides[index].title}
                  </h3>
                  <p className="mt-1 max-w-md text-sm text-slate-200">
                    {slides[index].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Strzałki */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Poprzednie zdjęcie"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-slate-800 shadow-md transition hover:bg-white sm:left-4"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Następne zdjęcie"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 text-slate-800 shadow-md transition hover:bg-white sm:right-4"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Kropki */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Przejdź do zdjęcia ${i + 1}`}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "w-7 bg-accent-500"
                    : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </FadeIn>

        <p className="mt-4 text-center text-xs text-slate-400">
          Zdjęcia poglądowe. Galeria własnych realizacji w przygotowaniu.
        </p>
      </div>
    </section>
  );
}

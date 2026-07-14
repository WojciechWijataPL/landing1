"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import FadeIn from "./FadeIn";

const faqs = [
  {
    q: "Ile trwa ocieplenie poddasza pianą PUR?",
    a: "Standardowe poddasze ocieplamy zwykle w ciągu 1 dnia roboczego. Nie wstrzymujemy budowy ani nie wymagamy wyprowadzki.",
  },
  {
    q: "Czy piana PUR jest bezpieczna i zdrowa?",
    a: "Tak. Po związaniu (kilka godzin) piana jest chemicznie obojętna, nie pyli jak wełna i nie stanowi zagrożenia dla domowników. Stosujemy certyfikowane systemy.",
  },
  {
    q: "Czy muszę się wyprowadzać na czas prac?",
    a: "Nie. Zabezpieczamy okna i powierzchnie, a po zakończeniu zostawiamy porządek. Wystarczy zwietrzenie pomieszczeń po aplikacji.",
  },
  {
    q: "Ile kosztuje ocieplenie pianą PUR?",
    a: "Cena zależy od powierzchni, rodzaju piany i grubości. Orientacyjną wycenę policzysz w naszym kreatorze w minutę, a twardą cenę podajemy po bezpłatnym pomiarze na miejscu.",
  },
  {
    q: "Otwarto- czy zamkniętokomórkowa — którą wybrać?",
    a: "Otwartokomórkowa świetnie sprawdza się na poddaszach i skosach (ciepło, akustyka). Zamkniętokomórkowa jest twardsza i odporna na wodę — do fundamentów, stropodachów i hydroizolacji. Doradzimy przy pomiarze.",
  },
  {
    q: "Jaką gwarancję dostaję?",
    a: "Na wydajność izolacji udzielamy gwarancji do 25 lat. Piana nie osiada i nie traci właściwości jak tradycyjne materiały.",
  },
  {
    q: "Na jakim terenie działacie?",
    a: "Obsługujemy całe województwo łódzkie. Zostaw numer — oddzwonimy i ustalimy dogodny termin pomiaru.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="bg-white py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Najczęstsze pytania
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Wszystko, co warto wiedzieć przed decyzją — w prostych słowach.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/50"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-slate-900">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 rounded-full p-1 ${
                      isOpen ? "bg-accent-500 text-white" : "bg-white text-brand-500"
                    }`}
                  >
                    <Plus size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-5 leading-relaxed text-slate-600">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </FadeIn>
      </div>
    </section>
  );
}

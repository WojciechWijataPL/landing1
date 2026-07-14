"use client";

import { CheckCircle2, Phone, Clock, ShieldCheck, PiggyBank, ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";
import Counter from "./ui/Counter";
import { useQuote } from "./wizard/QuoteProvider";

const stats = [
  { icon: PiggyBank, value: 40, prefix: "do ", suffix: "%", label: "niższe rachunki za ogrzewanie" },
  { icon: ShieldCheck, value: 25, suffix: " lat", label: "gwarancji wydajności piany" },
  { icon: Clock, value: 1, suffix: " dzień", label: "typowa realizacja poddasza" },
  { icon: Phone, value: 24, suffix: "h", label: "kontakt po zostawieniu numeru" },
];

const points = [
  "Jedna wycena zamiast obdzwaniania kilku firm — my robimy to za Ciebie.",
  "Kierujemy Cię wyłącznie do sprawdzonych, wyspecjalizowanych ekip.",
  "Twarda cena po bezpłatnym pomiarze — bez ukrytych kosztów.",
  "Krótkie terminy — nie wstrzymujemy Twojej budowy.",
  "Certyfikowana piana i porządek po zakończeniu prac.",
];

export default function WhyUs() {
  const { openQuote } = useQuote();

  return (
    <section id="dlaczego-my" className="bg-slate-50 py-20 md:py-28">
      <div className="container">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Dlaczego właśnie od nas?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Bierzemy na siebie najbardziej męczącą część — znalezienie dobrej
            ekipy i uczciwej ceny. Ty dostajesz gotowy, sprawdzony wynik.
          </p>
        </FadeIn>

        {/* Liczniki */}
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <FadeIn
              key={s.label}
              delay={i * 0.08}
              className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm"
            >
              <s.icon className="mx-auto text-brand-500" size={28} />
              <p className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                <Counter value={s.value} prefix={s.prefix || ""} suffix={s.suffix || ""} />
              </p>
              <p className="mt-1 text-sm leading-tight text-slate-500">
                {s.label}
              </p>
            </FadeIn>
          ))}
        </div>

        {/* Wyróżniki + CTA */}
        <FadeIn delay={0.15} className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 md:p-10">
            <ul className="space-y-4">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <CheckCircle2
                    size={22}
                    className="mt-0.5 flex-shrink-0 text-green-500"
                  />
                  <span className="leading-relaxed text-slate-700">{p}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={openQuote}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-4 font-semibold text-white shadow-lg shadow-accent-500/30 transition-all hover:-translate-y-0.5 hover:bg-accent-600 sm:w-auto sm:px-10"
            >
              Zamów darmową wycenę <ArrowRight size={20} />
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

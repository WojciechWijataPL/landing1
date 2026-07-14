"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PiggyBank, TrendingDown, ArrowRight } from "lucide-react";
import FadeIn from "./FadeIn";
import { useQuote } from "./wizard/QuoteProvider";
import { formatPLN } from "./wizard/wizardConfig";

// Założenia orientacyjne V1 (do kalibracji):
const HEATING_MONTHS = 7; // sezon grzewczy
const SAVINGS_RATE = 0.3; // realna oszczędność po dobrej izolacji (~do 40%)

export default function SavingsCalculator() {
  const { openQuote } = useQuote();
  const [area, setArea] = useState(120);
  const [bill, setBill] = useState(800); // miesięczny rachunek w sezonie

  const yearly = bill * HEATING_MONTHS;
  const savedYear = Math.round(yearly * SAVINGS_RATE);
  const saved10 = savedYear * 10;

  return (
    <section id="kalkulator" className="bg-white py-20 md:py-28">
      <div className="container">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-1.5 text-sm font-semibold text-accent-600">
            <PiggyBank size={16} /> Kalkulator oszczędności
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Ile zaoszczędzisz na ogrzewaniu?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Przesuń suwaki i zobacz, ile pieniędzy ucieka przez nieocieplony
            dach — i ile z tego odzyskasz.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mx-auto mt-12 max-w-4xl">
          <div className="grid gap-8 rounded-3xl border border-slate-100 bg-slate-50/60 p-6 shadow-sm md:grid-cols-2 md:p-10">
            {/* Suwaki */}
            <div className="space-y-8">
              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <label htmlFor="area" className="font-semibold text-slate-700">
                    Powierzchnia poddasza
                  </label>
                  <span className="text-lg font-bold text-brand-600">
                    {area} m²
                  </span>
                </div>
                <input
                  id="area"
                  type="range"
                  min="30"
                  max="300"
                  step="5"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full accent-accent-500"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>30 m²</span>
                  <span>300 m²</span>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-baseline justify-between">
                  <label htmlFor="bill" className="font-semibold text-slate-700">
                    Miesięczny rachunek za ogrzewanie
                  </label>
                  <span className="text-lg font-bold text-brand-600">
                    {formatPLN(bill)}
                  </span>
                </div>
                <input
                  id="bill"
                  type="range"
                  min="200"
                  max="3000"
                  step="50"
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full accent-accent-500"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>200 zł</span>
                  <span>3000 zł</span>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-slate-400">
                Szacunek przy założeniu ~{Math.round(SAVINGS_RATE * 100)}%
                oszczędności i {HEATING_MONTHS} miesięcy sezonu grzewczego.
                Wartości orientacyjne.
              </p>
            </div>

            {/* Wynik */}
            <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-center text-white">
              <TrendingDown className="mx-auto text-accent-400" size={36} />
              <p className="mt-3 text-sm text-brand-100">
                Szacowana oszczędność rocznie
              </p>
              <motion.p
                key={savedYear}
                initial={{ opacity: 0.4, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="mt-1 text-4xl font-extrabold sm:text-5xl"
              >
                {formatPLN(savedYear)}
              </motion.p>
              <p className="mt-4 text-sm text-brand-200">
                przez 10 lat to nawet{" "}
                <span className="font-bold text-white">
                  {formatPLN(saved10)}
                </span>
              </p>

              <button
                type="button"
                onClick={openQuote}
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 font-semibold text-white transition-all hover:bg-accent-600"
              >
                Poznaj dokładną wycenę <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

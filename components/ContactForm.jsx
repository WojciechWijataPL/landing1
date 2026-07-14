"use client";

import { Phone, Mail, MapPin, Clock, ArrowRight, Calculator } from "lucide-react";
import FadeIn from "./FadeIn";
import { useQuote } from "./wizard/QuoteProvider";

export default function ContactForm() {
  const { openQuote } = useQuote();

  return (
    <section id="kontakt" className="bg-white py-20 md:py-28">
      <div className="container">
        <div className="overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/10 ring-1 ring-slate-100 lg:grid lg:grid-cols-2">
          {/* Lewa strona — informacje kontaktowe */}
          <FadeIn className="relative flex flex-col justify-center bg-gradient-to-br from-brand-700 to-brand-900 p-8 text-white md:p-12">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Zamów darmową wycenę
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-brand-100">
              Odpowiedz na kilka pytań w kreatorze — od razu zobaczysz
              orientacyjny koszt, a nasz specjalista oddzwoni w ciągu 24 godzin,
              aby potwierdzić szczegóły.
            </p>

            <ul className="mt-10 space-y-6">
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Phone size={20} className="text-accent-400" />
                </span>
                <div>
                  <p className="text-sm text-brand-200">Telefon</p>
                  <a
                    href="tel:+48000000000"
                    className="text-lg font-semibold hover:text-accent-400"
                  >
                    +48 000 000 000
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Mail size={20} className="text-accent-400" />
                </span>
                <div>
                  <p className="text-sm text-brand-200">E-mail</p>
                  <a
                    href="mailto:kontakt@izolacjepur.pl"
                    className="text-lg font-semibold hover:text-accent-400"
                  >
                    kontakt@izolacjepur.pl
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <MapPin size={20} className="text-accent-400" />
                </span>
                <div>
                  <p className="text-sm text-brand-200">Obszar działania</p>
                  <p className="text-lg font-semibold">Województwo łódzkie</p>
                </div>
              </li>
            </ul>
          </FadeIn>

          {/* Prawa strona — CTA do kreatora wyceny */}
          <FadeIn
            delay={0.1}
            className="flex flex-col items-center justify-center bg-white p-8 text-center md:p-12"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
              <Calculator size={32} />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-slate-900">
              Wylicz wycenę online
            </h3>
            <p className="mt-3 max-w-sm leading-relaxed text-slate-600">
              Kilka prostych pytań i orientacyjny koszt izolacji Twojego
              poddasza. Bez zobowiązań, całkowicie bezpłatnie.
            </p>

            <button
              type="button"
              onClick={openQuote}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-accent-500/30 transition-all hover:-translate-y-0.5 hover:bg-accent-600 sm:w-auto sm:px-10"
            >
              Rozpocznij wycenę <ArrowRight size={20} />
            </button>

            <p className="mt-5 flex items-center gap-2 text-sm text-slate-400">
              <Clock size={16} /> Zajmuje mniej niż minutę
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

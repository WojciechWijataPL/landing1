"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import FadeIn from "./FadeIn";
import { useLegal } from "./legal/LegalProvider";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBHOOK_URL ||
  "https://n8n.twojadomena.pl/webhook/dummy";

const initialForm = { name: "", phone: "", area: "", consent: false };

export default function ContactForm() {
  const { openPrivacy } = useLegal();
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setIsSubmitting(true);

    // Payload trafia na webhook. NASTĘPNY KROK: webhook (np. n8n / Apps Script)
    // zapisuje lead do Google Sheet jako mini-CRM. Pola gotowe pod kolumny.
    const payload = {
      name: form.name,
      phone: form.phone,
      area: form.area,
      service: "Piana PUR",
      region: "łódzkie",
      source: "landing",
      createdAt: new Date().toISOString(),
    };

    try {
      // no-cors: zgodne z Google Apps Script i n8n bez konfiguracji CORS.
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });

      setForm(initialForm);
      setStatus("success");
    } catch (err) {
      console.error("Webhook error:", err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Zostaw kontakt, a nasz specjalista oddzwoni w ciągu 24 godzin i
              ustali termin bezpłatnego pomiaru.
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
                  <p className="text-lg font-semibold">
                    Województwo łódzkie
                  </p>
                </div>
              </li>
            </ul>
          </FadeIn>

          {/* Prawa strona — formularz */}
          <FadeIn delay={0.1} className="bg-white p-8 md:p-12">
            {status === "success" ? (
              <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
                <CheckCircle2 size={64} className="text-green-500" />
                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  Dziękujemy!
                </h3>
                <p className="mt-3 max-w-sm leading-relaxed text-slate-600">
                  Otrzymaliśmy Twoje zapytanie. Nasz specjalista zadzwoni do
                  Ciebie w ciągu 24 godzin.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus(null)}
                  className="mt-8 text-sm font-semibold text-brand-500 hover:text-brand-600"
                >
                  Wyślij kolejne zapytanie
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Imię i nazwisko <span className="text-accent-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="Jan Kowalski"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Numer telefonu <span className="text-accent-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="+48 000 000 000"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="area"
                    className="mb-1.5 block text-sm font-semibold text-slate-700"
                  >
                    Przybliżona powierzchnia (m²){" "}
                    <span className="text-accent-500">*</span>
                  </label>
                  <input
                    id="area"
                    name="area"
                    type="number"
                    min="1"
                    required
                    value={form.area}
                    onChange={handleChange}
                    placeholder="np. 120"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    name="consent"
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 flex-shrink-0 rounded border-slate-300 text-brand-500 accent-brand-500 focus:ring-brand-500/30"
                  />
                  <span className="text-sm leading-relaxed text-slate-600">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
                    przygotowania darmowej wyceny i kontaktu telefonicznego,
                    zgodnie z{" "}
                    <button
                      type="button"
                      onClick={openPrivacy}
                      className="font-medium text-brand-500 underline hover:text-brand-600"
                    >
                      Polityką Prywatności
                    </button>
                    . <span className="text-accent-500">*</span>
                  </span>
                </label>

                {status === "error" && (
                  <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                    <span>
                      Coś poszło nie tak. Spróbuj ponownie lub zadzwoń do nas
                      bezpośrednio.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-accent-500/30 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Wysyłanie...
                    </>
                  ) : (
                    "Wyślij prośbę o wycenę"
                  )}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

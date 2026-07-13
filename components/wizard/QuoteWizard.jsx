"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Phone,
  CheckCircle2,
  Calculator,
} from "lucide-react";
import { STEPS, label, computeQuote, formatPLN } from "./wizardConfig";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBHOOK_URL ||
  "https://n8n.twojadomena.pl/webhook/dummy";

const CALC_MESSAGES = [
  "Analizujemy powierzchnię...",
  "Dobieramy rodzaj piany...",
  "Liczymy zapotrzebowanie materiału...",
  "Sprawdzamy stawki w regionie...",
  "Przygotowujemy wycenę...",
];

const phoneOk = (v) => (v.match(/\d/g) || []).length >= 9;
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function QuoteWizard({ onClose }) {
  const [step, setStep] = useState(0); // indeks kroku pytań
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    consent: false,
  });
  const [phase, setPhase] = useState("form"); // form | contact | calc | result | error
  const [quote, setQuote] = useState(null);
  const [calcMsg, setCalcMsg] = useState(0);

  const totalSteps = STEPS.length + 1; // +1 = krok kontaktowy
  const current = STEPS[step];

  // Escape + blokada scrolla
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Rotacja komunikatów podczas liczenia
  useEffect(() => {
    if (phase !== "calc") return;
    setCalcMsg(0);
    const iv = setInterval(
      () => setCalcMsg((m) => Math.min(m + 1, CALC_MESSAGES.length - 1)),
      700
    );
    const done = setTimeout(finish, 3800);
    return () => {
      clearInterval(iv);
      clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const progress = useMemo(() => {
    if (phase === "result") return 100;
    const done = phase === "contact" ? STEPS.length : step;
    return Math.round((done / totalSteps) * 100);
  }, [phase, step, totalSteps]);

  const setAnswer = (id, value) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const goNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else setPhase("contact");
  };

  const goBack = () => {
    if (phase === "contact") setPhase("form");
    else if (step > 0) setStep(step - 1);
  };

  const chooseAndAdvance = (id, value) => {
    setAnswer(id, value);
    setTimeout(goNext, 180);
  };

  const canProceed = () => {
    if (current.kind === "number")
      return Number(answers[current.id]) >= (current.min || 1);
    if (current.kind === "text")
      return (answers[current.id] || "").trim().length >= 2;
    return Boolean(answers[current.id]);
  };

  const contactValid =
    contact.name.trim().length >= 2 &&
    phoneOk(contact.phone) &&
    emailOk(contact.email) &&
    contact.consent;

  const startCalc = () => {
    if (!contactValid) return;
    setPhase("calc");
  };

  async function finish() {
    const q = computeQuote(answers);
    setQuote(q);

    // Płaski payload — 1 lead = 1 wiersz w Google Sheets
    const payload = {
      type: "quote",
      service: "Piana PUR",
      region: "łódzkie",
      source: "landing-wizard",
      createdAt: new Date().toISOString(),
      // odpowiedzi (czytelne etykiety)
      surface: label("surface", answers.surface),
      area: answers.area,
      foam: label("foam", answers.foam),
      thickness: label("thickness", answers.thickness),
      stage: label("stage", answers.stage),
      timing: label("timing", answers.timing),
      city: answers.city,
      // kontakt
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      // wycena
      quoteMin: q.totalMin,
      quoteMax: q.totalMax,
      pricePerM2Min: q.perMin,
      pricePerM2Max: q.perMax,
    };

    try {
      // no-cors: działa z Google Apps Script i n8n bez konfiguracji CORS.
      // Odpowiedź jest nieczytelna (opaque) — nie szkodzi, wycena liczona lokalnie.
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Wizard webhook error:", err);
    }
    setPhase("result");
  }

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Kreator wyceny"
        className="relative flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Pasek postępu */}
        <div className="h-1.5 w-full bg-slate-100">
          <motion.div
            className="h-full bg-accent-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Nagłówek */}
        <div className="flex items-center justify-between px-5 py-3 sm:px-7">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
            <Calculator size={16} className="text-brand-500" />
            Darmowa wycena piany PUR
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zamknij"
            className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-6 pt-2 sm:px-7">
          <AnimatePresence mode="wait">
            {/* ---- KROKI PYTAŃ ---- */}
            {phase === "form" && (
              <motion.div
                key={"step-" + step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">
                  Krok {step + 1} z {totalSteps}
                </p>
                <h3 className="mt-1 text-2xl font-extrabold text-slate-900">
                  {current.title}
                </h3>
                {current.subtitle && (
                  <p className="mt-2 text-slate-500">{current.subtitle}</p>
                )}

                <div className="mt-6">
                  {current.kind === "choice" && (
                    <div className="grid gap-3">
                      {current.options.map((o) => {
                        const active = answers[current.id] === o.value;
                        const Icon = o.icon;
                        return (
                          <button
                            key={o.value}
                            type="button"
                            onClick={() => chooseAndAdvance(current.id, o.value)}
                            className={`flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
                              active
                                ? "border-brand-500 bg-brand-50"
                                : "border-slate-100 bg-white hover:border-brand-200 hover:bg-slate-50"
                            }`}
                          >
                            {Icon && (
                              <span
                                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${
                                  active
                                    ? "bg-brand-500 text-white"
                                    : "bg-brand-50 text-brand-500"
                                }`}
                              >
                                <Icon size={22} />
                              </span>
                            )}
                            <span>
                              <span className="block font-semibold text-slate-900">
                                {o.label}
                              </span>
                              {o.desc && (
                                <span className="block text-sm text-slate-500">
                                  {o.desc}
                                </span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {current.kind === "number" && (
                    <div className="relative">
                      <input
                        type="number"
                        min={current.min || 1}
                        autoFocus
                        value={answers[current.id] || ""}
                        onChange={(e) => setAnswer(current.id, e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && canProceed() && goNext()
                        }
                        placeholder={current.placeholder}
                        className="w-full rounded-2xl border-2 border-slate-200 px-5 py-4 text-lg font-semibold text-slate-900 outline-none focus:border-brand-500"
                      />
                      {current.unit && (
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 font-semibold text-slate-400">
                          {current.unit}
                        </span>
                      )}
                    </div>
                  )}

                  {current.kind === "text" && (
                    <input
                      type="text"
                      autoFocus
                      value={answers[current.id] || ""}
                      onChange={(e) => setAnswer(current.id, e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && canProceed() && goNext()
                      }
                      placeholder={current.placeholder}
                      className="w-full rounded-2xl border-2 border-slate-200 px-5 py-4 text-lg text-slate-900 outline-none focus:border-brand-500"
                    />
                  )}
                </div>

                {/* Nawigacja (choice sam przewija) */}
                {current.kind !== "choice" && (
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={!canProceed()}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-4 font-semibold text-white transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Dalej <ArrowRight size={20} />
                  </button>
                )}
              </motion.div>
            )}

            {/* ---- KROK KONTAKTOWY ---- */}
            {phase === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">
                  Ostatni krok
                </p>
                <h3 className="mt-1 text-2xl font-extrabold text-slate-900">
                  Gdzie wysłać wycenę?
                </h3>
                <p className="mt-2 text-slate-500">
                  Przygotujemy orientacyjną wycenę i oddzwonimy, aby ją
                  potwierdzić.
                </p>

                <div className="mt-6 space-y-4">
                  <input
                    type="text"
                    placeholder="Imię i nazwisko *"
                    value={contact.name}
                    onChange={(e) =>
                      setContact((c) => ({ ...c, name: e.target.value }))
                    }
                    className="w-full rounded-2xl border-2 border-slate-200 px-5 py-3.5 text-slate-900 outline-none focus:border-brand-500"
                  />
                  <input
                    type="tel"
                    placeholder="Numer telefonu *"
                    value={contact.phone}
                    onChange={(e) =>
                      setContact((c) => ({ ...c, phone: e.target.value }))
                    }
                    className="w-full rounded-2xl border-2 border-slate-200 px-5 py-3.5 text-slate-900 outline-none focus:border-brand-500"
                  />
                  <input
                    type="email"
                    placeholder="Adres e-mail *"
                    value={contact.email}
                    onChange={(e) =>
                      setContact((c) => ({ ...c, email: e.target.value }))
                    }
                    className="w-full rounded-2xl border-2 border-slate-200 px-5 py-3.5 text-slate-900 outline-none focus:border-brand-500"
                  />

                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={contact.consent}
                      onChange={(e) =>
                        setContact((c) => ({ ...c, consent: e.target.checked }))
                      }
                      className="mt-1 h-5 w-5 flex-shrink-0 accent-brand-500"
                    />
                    <span className="text-sm leading-relaxed text-slate-600">
                      Wyrażam zgodę na przetwarzanie moich danych w celu
                      przygotowania wyceny i kontaktu telefonicznego. *
                    </span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={startCalc}
                  disabled={!contactValid}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-4 font-semibold text-white transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Oblicz moją wycenę <ArrowRight size={20} />
                </button>
              </motion.div>
            )}

            {/* ---- LICZENIE ---- */}
            {phase === "calc" && (
              <motion.div
                key="calc"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[320px] flex-col items-center justify-center text-center"
              >
                <Loader2 size={56} className="animate-spin text-brand-500" />
                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  Liczymy Twoją wycenę
                </h3>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={calcMsg}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-2 text-slate-500"
                  >
                    {CALC_MESSAGES[calcMsg]}
                  </motion.p>
                </AnimatePresence>
              </motion.div>
            )}

            {/* ---- WYNIK ---- */}
            {phase === "result" && quote && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-2 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h3 className="mt-4 text-2xl font-extrabold text-slate-900">
                  Orientacyjna wycena
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {quote.area} m² · {label("surface", answers.surface)} ·{" "}
                  {label("foam", answers.foam)}
                </p>

                <div className="mt-5 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-7 text-white">
                  <p className="text-sm text-brand-100">
                    Szacowany koszt realizacji
                  </p>
                  <p className="mt-1 text-3xl font-extrabold sm:text-4xl">
                    {formatPLN(quote.totalMin)} – {formatPLN(quote.totalMax)}
                  </p>
                  <p className="mt-2 text-sm text-brand-200">
                    ok. {formatPLN(quote.perMin)}–{formatPLN(quote.perMax)} / m²
                  </p>
                </div>

                <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
                  To wstępny szacunek na podstawie podanych danych. Ostateczną,
                  wiążącą cenę ustalamy po bezpłatnym pomiarze na miejscu.
                </p>

                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href="tel:+48000000000"
                    className="flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-4 font-semibold text-white transition-all hover:bg-accent-600"
                  >
                    <Phone size={20} /> Zadzwoń: +48 000 000 000
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full px-6 py-3 font-semibold text-slate-500 hover:text-slate-800"
                  >
                    Zamknij — oddzwonimy w ciągu 24h
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stopka nawigacji — tylko w krokach z możliwością cofnięcia */}
        {(phase === "form" && step > 0) || phase === "contact" ? (
          <div className="border-t border-slate-100 px-5 py-3 sm:px-7">
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800"
            >
              <ArrowLeft size={16} /> Wstecz
            </button>
          </div>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

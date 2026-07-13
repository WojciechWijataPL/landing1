"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { REGULAMIN, PRIVACY } from "./legalContent";

const DOCS = { regulamin: REGULAMIN, privacy: PRIVACY };

const LegalContext = createContext(null);

export function useLegal() {
  const ctx = useContext(LegalContext);
  if (!ctx) throw new Error("useLegal must be used within <LegalProvider>");
  return ctx;
}

export default function LegalProvider({ children }) {
  const [openDoc, setOpenDoc] = useState(null); // "regulamin" | "privacy" | null

  const openRegulamin = useCallback(() => setOpenDoc("regulamin"), []);
  const openPrivacy = useCallback(() => setOpenDoc("privacy"), []);
  const close = useCallback(() => setOpenDoc(null), []);

  // Escape zamyka + blokada scrolla tła
  useEffect(() => {
    if (!openDoc) return;
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openDoc, close]);

  const doc = openDoc ? DOCS[openDoc] : null;

  return (
    <LegalContext.Provider value={{ openRegulamin, openPrivacy, close }}>
      {children}

      <AnimatePresence>
        {doc && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={close}
            />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={doc.title}
              className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {doc.title}
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">{doc.updated}</p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Zamknij"
                  className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="overflow-y-auto px-6 py-6">
                {doc.sections.map((s) => (
                  <section key={s.h} className="mb-6 last:mb-0">
                    <h3 className="mb-2 text-base font-semibold text-slate-900">
                      {s.h}
                    </h3>
                    {s.p.map((para, i) => (
                      <p
                        key={i}
                        className="mb-2 text-sm leading-relaxed text-slate-600 last:mb-0"
                      >
                        {para}
                      </p>
                    ))}
                  </section>
                ))}

                <p className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800">
                  Dokument roboczy (placeholder). Przed publikacją uzupełnij dane
                  firmy i skonsultuj treść z prawnikiem.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LegalContext.Provider>
  );
}

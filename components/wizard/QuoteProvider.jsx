"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import QuoteWizard from "./QuoteWizard";

const QuoteContext = createContext(null);

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within <QuoteProvider>");
  return ctx;
}

export default function QuoteProvider({ children }) {
  const [open, setOpen] = useState(false);
  // sesja rośnie przy każdym otwarciu -> wymusza remount (reset kroków)
  const [session, setSession] = useState(0);

  const openQuote = useCallback(() => {
    setSession((s) => s + 1);
    setOpen(true);
  }, []);
  const closeQuote = useCallback(() => setOpen(false), []);

  return (
    <QuoteContext.Provider value={{ openQuote, closeQuote }}>
      {children}
      <AnimatePresence>
        {open && <QuoteWizard key={session} onClose={closeQuote} />}
      </AnimatePresence>
    </QuoteContext.Provider>
  );
}

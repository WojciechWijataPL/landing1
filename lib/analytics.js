// Cienka warstwa na GA4 (gtag) i Meta Pixel (fbq).
// Bezpieczna, gdy skrypty nie są załadowane (brak env) — po prostu nic nie robi.

export function gaEvent(name, params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

export function fbEvent(name, params = {}, custom = false) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  window.fbq(custom ? "trackCustom" : "track", name, params);
}

// --- Zdarzenia biznesowe ---

// Klient otworzył kreator wyceny
export function trackQuoteStart() {
  gaEvent("quote_start");
  fbEvent("QuoteStart", {}, true);
}

// Klient dokończył wycenę i zostawił kontakt = LEAD
export function trackLead(value) {
  gaEvent("generate_lead", { currency: "PLN", value: value || 0 });
  fbEvent("Lead", { currency: "PLN", value: value || 0 });
}

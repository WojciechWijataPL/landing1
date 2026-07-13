import {
  Home,
  Layers,
  PanelTop,
  Box,
  Warehouse,
  Snowflake,
  Droplets,
  HelpCircle,
  Ruler,
  Hammer,
  Zap,
  CalendarClock,
} from "lucide-react";

// Kroki kreatora. kind: "choice" | "number" | "text" | "contact"
export const STEPS = [
  {
    id: "surface",
    kind: "choice",
    title: "Co chcesz ocieplić?",
    subtitle: "Wybierz rodzaj powierzchni.",
    options: [
      { value: "skosy", label: "Poddasze skośne (skosy)", icon: Home },
      { value: "strop", label: "Strop / podłoga poddasza", icon: Layers },
      { value: "stropodach", label: "Stropodach (dach płaski)", icon: PanelTop },
      { value: "fundament", label: "Fundamenty / ściany fund.", icon: Box },
      { value: "sciany", label: "Ściany / hala / garaż", icon: Warehouse },
    ],
  },
  {
    id: "area",
    kind: "number",
    title: "Jaka powierzchnia do ocieplenia?",
    subtitle: "Podaj przybliżony metraż w m². Nie musi być dokładny.",
    unit: "m²",
    placeholder: "np. 120",
    min: 1,
  },
  {
    id: "foam",
    kind: "choice",
    title: "Jaki rodzaj piany?",
    subtitle: "Jeśli nie wiesz — doradzimy podczas pomiaru.",
    options: [
      {
        value: "open",
        label: "Otwartokomórkowa",
        desc: "Ciepło, poddasza, skosy",
        icon: Snowflake,
      },
      {
        value: "closed",
        label: "Zamkniętokomórkowa",
        desc: "Hydroizolacja, fundamenty",
        icon: Droplets,
      },
      {
        value: "unknown",
        label: "Nie wiem — doradźcie",
        desc: "Dobierzemy do potrzeb",
        icon: HelpCircle,
      },
    ],
  },
  {
    id: "thickness",
    kind: "choice",
    title: "Jaka grubość izolacji?",
    subtitle: "Grubsza warstwa = cieplejszy dom.",
    options: [
      { value: "standard", label: "Standardowa (rekomendowana)", icon: Ruler },
      { value: "zwiekszona", label: "Zwiększona (max oszczędność)", icon: Zap },
      { value: "unknown", label: "Nie wiem", icon: HelpCircle },
    ],
  },
  {
    id: "stage",
    kind: "choice",
    title: "Na jakim etapie jest inwestycja?",
    subtitle: null,
    options: [
      { value: "nowy", label: "Nowy budynek (stan surowy)", icon: Hammer },
      { value: "remont", label: "Remont / modernizacja", icon: Home },
    ],
  },
  {
    id: "timing",
    kind: "choice",
    title: "Kiedy planujesz realizację?",
    subtitle: null,
    options: [
      { value: "asap", label: "Jak najszybciej", icon: Zap },
      { value: "1-3m", label: "W ciągu 1–3 miesięcy", icon: CalendarClock },
      { value: "later", label: "Później / dopiero planuję", icon: CalendarClock },
    ],
  },
  {
    id: "city",
    kind: "text",
    title: "W jakiej miejscowości?",
    subtitle: "Województwo łódzkie — podaj miejscowość lub gminę.",
    placeholder: "np. Łódź, Zgierz, Pabianice...",
  },
];

// Mapowanie value -> czytelna etykieta (do payloadu / Sheets)
export const LABELS = {
  surface: {
    skosy: "Poddasze skośne",
    strop: "Strop / podłoga poddasza",
    stropodach: "Stropodach",
    fundament: "Fundamenty / ściany fund.",
    sciany: "Ściany / hala / garaż",
  },
  foam: {
    open: "Otwartokomórkowa",
    closed: "Zamkniętokomórkowa",
    unknown: "Nie wiem — doradzić",
  },
  thickness: {
    standard: "Standardowa",
    zwiekszona: "Zwiększona",
    unknown: "Nie wiem",
  },
  stage: {
    nowy: "Nowy budynek (surowy)",
    remont: "Remont / modernizacja",
  },
  timing: {
    asap: "Jak najszybciej",
    "1-3m": "1–3 miesiące",
    later: "Później / planuje",
  },
};

export function label(field, value) {
  return LABELS[field]?.[value] ?? value ?? "";
}

// Prosta wycena orientacyjna V1. Do kalibracji cennikiem firmy.
export function computeQuote(a) {
  const rates = {
    open: { min: 45, max: 70 },
    closed: { min: 100, max: 160 },
    unknown: { min: 45, max: 120 },
  };

  let foam = a.foam || "unknown";
  // Fundamenty realnie wymagają piany zamkniętokomórkowej
  if (a.surface === "fundament" && foam === "unknown") foam = "closed";
  const rate = rates[foam] || rates.unknown;

  const surfaceFactor =
    {
      skosy: 1.0,
      strop: 0.9,
      stropodach: 1.05,
      fundament: 1.1,
      sciany: 1.0,
    }[a.surface] ?? 1.0;

  const thickFactor =
    { standard: 1.0, zwiekszona: 1.3, unknown: 1.0 }[a.thickness] ?? 1.0;

  const area = Math.max(Number(a.area) || 0, 0);

  const perMin = rate.min * surfaceFactor * thickFactor;
  const perMax = rate.max * surfaceFactor * thickFactor;

  let totalMin = area * perMin;
  let totalMax = area * perMax;

  // Minimalna wartość zlecenia (dojazd, mobilizacja sprzętu)
  const MIN_JOB = 1500;
  if (totalMin < MIN_JOB) totalMin = MIN_JOB;
  if (totalMax < MIN_JOB * 1.4) totalMax = MIN_JOB * 1.4;

  const round50 = (n) => Math.round(n / 50) * 50;
  const round5 = (n) => Math.round(n / 5) * 5;

  return {
    area,
    perMin: round5(perMin),
    perMax: round5(perMax),
    totalMin: round50(totalMin),
    totalMax: round50(totalMax),
  };
}

export function formatPLN(n) {
  return new Intl.NumberFormat("pl-PL").format(Math.round(n)) + " zł";
}

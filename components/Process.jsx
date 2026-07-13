import { PhoneCall, Ruler, SprayCan } from "lucide-react";
import FadeIn from "./FadeIn";

const steps = [
  {
    icon: PhoneCall,
    title: "Kontakt i krótki wywiad",
    text: "Zostawiasz numer, my oddzwaniamy i ustalamy szczegóły.",
  },
  {
    icon: Ruler,
    title: "Darmowy pomiar",
    text: "Przyjeżdżamy na budowę, mierzymy wilgotność drewna i podajemy twardą cenę.",
  },
  {
    icon: SprayCan,
    title: "Szybki natrysk",
    text: "Zabezpieczamy okna i realizujemy izolację w jeden dzień. Zostawiamy idealny porządek.",
  },
];

export default function Process() {
  return (
    <section id="jak-dzialamy" className="bg-slate-50 py-20 md:py-28">
      <div className="container">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            3 kroki do ciepłego domu
          </h2>
        </FadeIn>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          {/* Linia łącząca (desktop) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent md:block" />

          {steps.map((s, i) => (
            <FadeIn
              key={s.title}
              delay={i * 0.15}
              as="article"
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/30">
                <s.icon size={28} />
                <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent-500 text-sm font-bold text-white ring-4 ring-slate-50">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-3 max-w-xs leading-relaxed text-slate-600">
                {s.text}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

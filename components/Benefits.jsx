import { Thermometer, ShieldCheck, Clock } from "lucide-react";
import FadeIn from "./FadeIn";

const benefits = [
  {
    icon: Thermometer,
    title: "Oszczędność do 40%",
    text: "Piana eliminuje mostki termiczne. Twój rachunek za ogrzewanie drastycznie spada.",
  },
  {
    icon: ShieldCheck,
    title: "Bariera bezszwowa",
    text: "Wnika w każdą szczelinę, chroniąc przed wilgocią, kunami i hałasem z zewnątrz.",
  },
  {
    icon: Clock,
    title: "Szybka realizacja",
    text: "Ocieplenie standardowego poddasza zajmuje nam zaledwie 1 dzień roboczy. Nie wstrzymujemy budowy.",
  },
];

export default function Benefits() {
  return (
    <section id="dlaczego-piana" className="bg-white py-20 md:py-28">
      <div className="container">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Dlaczego piana poliuretanowa to najlepszy wybór?
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {benefits.map((b, i) => (
            <FadeIn
              key={b.title}
              delay={i * 0.12}
              as="article"
              className="group rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-100 hover:shadow-xl hover:shadow-brand-500/5"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                <b.icon size={28} strokeWidth={2} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {b.title}
              </h3>
              <p className="mt-3 leading-relaxed text-slate-600">{b.text}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

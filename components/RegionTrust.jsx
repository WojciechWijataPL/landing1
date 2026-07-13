import { MapPin, Users, ShieldCheck, ThumbsUp } from "lucide-react";
import FadeIn from "./FadeIn";

const stats = [
  { icon: ShieldCheck, value: "25 lat", label: "gwarancji wydajności" },
  { icon: Users, value: "Sprawdzone", label: "ekipy partnerskie" },
  { icon: ThumbsUp, value: "Darmowy", label: "pomiar i wycena" },
];

export default function RegionTrust() {
  return (
    <section id="o-nas" className="bg-white py-20 md:py-28">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Zdjęcie */}
          <FadeIn className="relative">
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80"
              alt="Nowoczesny dom na terenie województwa łódzkiego"
              loading="lazy"
              className="h-[360px] w-full rounded-3xl object-cover shadow-xl md:h-[440px]"
            />
            <div className="absolute -bottom-5 left-5 flex items-center gap-2 rounded-2xl bg-white px-5 py-3 shadow-lg ring-1 ring-slate-100">
              <MapPin className="text-brand-500" size={22} />
              <span className="text-sm font-semibold text-slate-900">
                Województwo łódzkie
              </span>
            </div>
          </FadeIn>

          {/* Tekst */}
          <FadeIn delay={0.1}>
            <p className="mb-3 inline-flex rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium uppercase tracking-wider text-brand-600">
              Lokalnie i konkretnie
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Łączymy Cię ze sprawdzoną ekipą w Twojej okolicy
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Działamy na terenie <strong>województwa łódzkiego</strong>.
              Zbieramy Twoje zapytanie, wstępnie je weryfikujemy i kierujemy do
              zaufanej, wyspecjalizowanej firmy wykonawczej z Twojego regionu —
              tak, żebyś nie tracił czasu na szukanie i porównywanie ofert.
            </p>
            <p className="mt-3 leading-relaxed text-slate-500">
              Dzięki temu dostajesz szybki kontakt, uczciwą wycenę po pomiarze i
              realizację w krótkim terminie. Przy prostszych zleceniach
              realizujemy prace również we własnym zakresie.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-center"
                >
                  <s.icon className="mx-auto text-brand-500" size={24} />
                  <p className="mt-2 text-base font-bold text-slate-900">
                    {s.value}
                  </p>
                  <p className="text-xs leading-tight text-slate-500">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

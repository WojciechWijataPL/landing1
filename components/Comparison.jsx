import { Check, Minus, X } from "lucide-react";
import FadeIn from "./FadeIn";

const columns = ["Piana PUR", "Wełna mineralna", "Styropian"];

// v: "good" | "mid" | "bad" — steruje ikoną i kolorem
const rows = [
  {
    label: "Szczelność (mostki termiczne)",
    cells: [
      { v: "good", t: "Bezszwowa" },
      { v: "mid", t: "Łączenia" },
      { v: "mid", t: "Łączenia" },
    ],
  },
  {
    label: "Współczynnik λ [W/(m·K)]",
    cells: [
      { v: "good", t: "0,023–0,040" },
      { v: "mid", t: "0,035–0,045" },
      { v: "mid", t: "0,031–0,045" },
    ],
  },
  {
    label: "Odporność na wilgoć",
    cells: [
      { v: "good", t: "Wysoka" },
      { v: "bad", t: "Chłonie wodę" },
      { v: "mid", t: "Średnia" },
    ],
  },
  {
    label: "Osiadanie w czasie",
    cells: [
      { v: "good", t: "Nie osiada" },
      { v: "bad", t: "Osiada" },
      { v: "mid", t: "Zależne" },
    ],
  },
  {
    label: "Wypełnia trudne kształty",
    cells: [
      { v: "good", t: "Tak" },
      { v: "mid", t: "Częściowo" },
      { v: "bad", t: "Nie" },
    ],
  },
  {
    label: "Ochrona przed gryzoniami",
    cells: [
      { v: "good", t: "Tak" },
      { v: "bad", t: "Nie" },
      { v: "bad", t: "Nie" },
    ],
  },
  {
    label: "Czas montażu poddasza",
    cells: [
      { v: "good", t: "~1 dzień" },
      { v: "mid", t: "Kilka dni" },
      { v: "mid", t: "Kilka dni" },
    ],
  },
];

const icon = {
  good: <Check size={16} className="text-green-600" strokeWidth={3} />,
  mid: <Minus size={16} className="text-amber-500" strokeWidth={3} />,
  bad: <X size={16} className="text-red-500" strokeWidth={3} />,
};

export default function Comparison() {
  return (
    <section id="porownanie" className="bg-white py-20 md:py-28">
      <div className="container">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Piana PUR na tle innych izolacji
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Wełna i styropian to sprawdzone materiały, ale mają ograniczenia,
            których piana natryskowa nie ma. Zobacz różnice w praktyce.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-500">
                    Kryterium
                  </th>
                  {columns.map((c, i) => (
                    <th
                      key={c}
                      className={`px-5 py-4 text-sm font-bold ${
                        i === 0
                          ? "bg-brand-500 text-white"
                          : "bg-slate-50 text-slate-700"
                      }`}
                    >
                      {c}
                      {i === 0 && (
                        <span className="ml-2 rounded-full bg-accent-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                          Nasz wybór
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr
                    key={row.label}
                    className={ri % 2 ? "bg-slate-50/50" : "bg-white"}
                  >
                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                      {row.label}
                    </td>
                    {row.cells.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-5 py-4 text-sm ${
                          ci === 0
                            ? "bg-brand-50/60 font-semibold text-slate-900"
                            : "text-slate-600"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {icon[cell.v]}
                          {cell.t}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">
            Wartości orientacyjne, zależne od producenta i rodzaju piany
            (otwarto- / zamkniętokomórkowa).
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

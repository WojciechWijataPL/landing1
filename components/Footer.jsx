"use client";

import { Snowflake } from "lucide-react";
import { useLegal } from "./legal/LegalProvider";

export default function Footer() {
  const { openRegulamin, openPrivacy } = useLegal();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="container py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2 text-lg font-extrabold text-white">
            <Snowflake className="text-accent-400" size={24} />
            Izolacje<span className="text-brand-400">PUR</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <button
              type="button"
              onClick={openRegulamin}
              className="transition-colors hover:text-white"
            >
              Regulamin
            </button>
            <button
              type="button"
              onClick={openPrivacy}
              className="transition-colors hover:text-white"
            >
              Polityka Prywatności (RODO)
            </button>
            <a href="#kontakt" className="transition-colors hover:text-white">
              Kontakt
            </a>
          </nav>

          <p className="text-sm">© 2026 IzolacjePUR</p>
        </div>

        {/* Disclaimer pośrednika */}
        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
          IzolacjePUR działa jako pośrednik — pozyskujemy i przekazujemy
          zapytania sprawdzonym firmom wykonawczym z terenu województwa
          łódzkiego. Nie ponosimy odpowiedzialności za usługi realizowane przez
          firmy trzecie. Szczegóły w{" "}
          <button
            type="button"
            onClick={openRegulamin}
            className="underline hover:text-slate-300"
          >
            Regulaminie
          </button>
          .
        </p>
      </div>
    </footer>
  );
}

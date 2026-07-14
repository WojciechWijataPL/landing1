import { Snowflake } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:flex-row">
        <div className="flex items-center gap-2 text-lg font-extrabold text-white">
          <Snowflake className="text-accent-400" size={24} />
          IzolacjePUR&nbsp;<span className="text-brand-400">Pro</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <a href="#" className="transition-colors hover:text-white">
            Regulamin
          </a>
          <a href="#" className="transition-colors hover:text-white">
            Polityka Prywatności (RODO)
          </a>
        </nav>

        <p className="text-sm">
          © 2026 IzolacjePUR Pro. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}

# Wdrożenie na Vercel

Projekt to standardowy Next.js — Vercel wykrywa wszystko sam. Nie trzeba
`vercel.json`.

## Opcja A — przez panel (najprościej)

1. Wejdź na https://vercel.com → zaloguj przez GitHub.
2. **Add New → Project** → wybierz repo **`landing1`** → **Import**.
3. Framework: **Next.js** (wykryty automatycznie). Nic nie zmieniaj.
4. Rozwiń **Environment Variables** i dodaj:
   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_WEBHOOK_URL` | Twój URL `/exec` z Apps Script |
   | `NEXT_PUBLIC_GA4_ID` | `G-...` (opcjonalnie) |
   | `NEXT_PUBLIC_FB_PIXEL_ID` | ID piksela (opcjonalnie) |
5. **Deploy**. Po ~1 min dostajesz adres `https://landing1-xxx.vercel.app`.

> Zmienne `NEXT_PUBLIC_*` wchodzą przy buildzie — po ich zmianie zrób
> **Redeploy** (Deployments → … → Redeploy).

## Opcja B — przez CLI

```bash
npm i -g vercel
vercel            # pierwsze wdrożenie (preview)
vercel --prod     # produkcja
```
Zmienne dodasz: `vercel env add NEXT_PUBLIC_WEBHOOK_URL`.

## Własna domena

Vercel → projekt → **Settings → Domains → Add** → wpisz domenę i ustaw
rekordy DNS wg instrukcji Vercela (A / CNAME).

## Automatyczne deploye

Po podpięciu repo każdy `git push` na `main` = automatyczny deploy produkcyjny.
Pull requesty dostają osobne podglądy (preview URL).

## Po wdrożeniu — sanity check

- Otwórz stronę, przejdź kreator wyceny → sprawdź wiersz w Google Sheets +
  powiadomienie Telegram.
- Jeśli podałeś GA4/Pixel: GA4 → Raporty → Czas rzeczywisty; wtyczka
  Meta Pixel Helper.

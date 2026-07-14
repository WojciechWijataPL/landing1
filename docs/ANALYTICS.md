# GA4 + Meta Pixel — szybkie podpięcie

Analityka ładuje się **tylko** gdy ustawisz zmienne env. Bez nich strona działa
normalnie (zero cookies, zero błędów). Kod: `components/Analytics.jsx` +
`lib/analytics.js`.

## 1. Google Analytics 4 (GA4)

1. https://analytics.google.com → **Administracja** → utwórz **Usługę** (jeśli
   nie masz), potem **Strumień danych → Sieć** dla swojej domeny.
2. Skopiuj **Identyfikator pomiaru** — format `G-XXXXXXXXXX`.
3. Wklej do `.env.local` (i w Vercel → Environment Variables):
   ```
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   ```

## 2. Meta Pixel (Facebook / Instagram Ads)

1. https://business.facebook.com → **Menedżer zdarzeń** → **Połącz źródła
   danych → Sieć → Meta Pixel** → nadaj nazwę.
2. Skopiuj **ID piksela** (kilkanaście cyfr).
3. Wklej do `.env.local` (i w Vercel):
   ```
   NEXT_PUBLIC_FB_PIXEL_ID=000000000000000
   ```

## 3. Uruchom

```
npm run build && npm run start   # lub redeploy na Vercel
```

Po wejściu na stronę odpal **GA4 → Raporty → Czas rzeczywisty** oraz rozszerzenie
**Meta Pixel Helper** (Chrome) — powinny pokazać ruch.

## Śledzone zdarzenia (automatycznie)

| Moment                         | GA4              | Meta Pixel            |
| ------------------------------ | ---------------- | --------------------- |
| Wejście na stronę              | `page_view`      | `PageView`            |
| Otwarcie kreatora wyceny       | `quote_start`    | `QuoteStart` (custom) |
| Dokończenie wyceny (LEAD)      | `generate_lead`  | `Lead`                |

`generate_lead` / `Lead` niosą wartość (`value` = środek widełek wyceny, w PLN) —
dzięki temu w kampaniach zobaczysz koszt pozyskania leada i szacowany przychód.

## Zgody / RODO

To wersja podstawowa (piksele odpalają się od razu). Docelowo warto dodać
baner zgód (Consent Mode v2) — do zrobienia w kolejnym kroku.

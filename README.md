# IzolacjePUR Pro — Landing Page (V1)

Landing page do pozyskiwania leadów dla firmy "Ocieplanie Pianą PUR".

## Stos

- **Next.js 16** (App Router, React 19, Turbopack)
- **Tailwind CSS 3**
- **Framer Motion** — animacje wejścia (fade-in-up)
- **Lucide React** — ikony
- Formularz: React state + `fetch` POST na webhook (bez backendu)

## Uruchomienie lokalne

```bash
npm install
cp .env.local.example .env.local   # ustaw NEXT_PUBLIC_WEBHOOK_URL
npm run dev
```

Otwórz http://localhost:3000

## Konfiguracja formularza

Formularz wysyła `POST` JSON na `NEXT_PUBLIC_WEBHOOK_URL`:

```json
{ "name": "...", "phone": "...", "area": "...", "service": "Piana PUR" }
```

Ustaw zmienną w `.env.local` (lokalnie) oraz w **Vercel → Project Settings →
Environment Variables** (produkcja).

## Wdrożenie na Vercel

1. Wypchnij repo na GitHub.
2. Zaimportuj projekt na [vercel.com](https://vercel.com) — wykryje Next.js automatycznie.
3. Dodaj zmienną `NEXT_PUBLIC_WEBHOOK_URL`.
4. Deploy.

## Struktura

```
app/
  layout.js        # SEO metadata, font, <html lang="pl">
  page.js          # kompozycja sekcji
  globals.css      # Tailwind + smooth scroll
components/
  Navbar.jsx       # sticky, transparent → solid przy scrollu
  Hero.jsx         # nagłówek H1 + CTA + trust badges
  Benefits.jsx     # 3 korzyści (SEO)
  Process.jsx      # 3 kroki współpracy
  ContactForm.jsx  # formularz + logika webhooka
  Footer.jsx       # stopka + linki
  FadeIn.jsx       # wrapper animacji scroll
```

## SEO

- Next.js Metadata API (title, description, OpenGraph, Twitter, robots)
- Semantyczny HTML5: `header`, `main`, `section`, `article`, `footer`
- Hierarchia nagłówków H1 → H2 → H3
- `lang="pl"`, `scroll-margin` dla kotwic

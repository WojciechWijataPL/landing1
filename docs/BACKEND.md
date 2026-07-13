# Backend leadów — Google Sheets + Telegram (V1)

Kreator wyceny i formularz wysyłają **jeden POST JSON** na
`NEXT_PUBLIC_WEBHOOK_URL`. Jeden lead = jeden komplet danych (wszystkie
odpowiedzi + wyliczona wycena). Poniżej dwie drogi odbioru — wybierz jedną.

## Payload (co przychodzi)

```json
{
  "type": "quote",
  "service": "Piana PUR",
  "region": "łódzkie",
  "source": "landing-wizard",
  "createdAt": "2026-07-14T10:00:00.000Z",
  "surface": "Poddasze skośne",
  "area": "120",
  "foam": "Otwartokomórkowa",
  "thickness": "Standardowa",
  "stage": "Nowy budynek (surowy)",
  "timing": "Jak najszybciej",
  "city": "Łódź",
  "name": "Jan Kowalski",
  "phone": "500600700",
  "email": "jan@example.com",
  "quoteMin": 6000,
  "quoteMax": 9000,
  "pricePerM2Min": 45,
  "pricePerM2Max": 70
}
```

> Prosty formularz w sekcji Kontakt wysyła węższy payload
> (`type` pominięty, `source: "landing"`, bez pól kreatora) — skrypt i tak go
> obsłuży (puste kolumny).

---

## Droga A — Google Apps Script (najszybsza, bez serwera) ⭐

Plik gotowy: [`backend/google-apps-script.gs`](../backend/google-apps-script.gs).
Zapisuje lead do arkusza **i** wysyła powiadomienie na Telegram.

1. Nowy Google Sheets → skopiuj ID z URL.
2. **Rozszerzenia → Apps Script** → wklej zawartość pliku `.gs`.
3. Uzupełnij `SHEET_ID`, `TELEGRAM_TOKEN`, `TELEGRAM_CHAT_ID`.
4. **Wdróż → Nowe wdrożenie → Aplikacja internetowa**
   - Wykonaj jako: *Ja*
   - Dostęp: *Wszyscy*
5. Skopiuj URL kończący się na `/exec` → wklej do `.env.local`:
   ```
   NEXT_PUBLIC_WEBHOOK_URL=https://script.google.com/macros/s/AKfy.../exec
   ```

Bot Telegram: napisz do **@BotFather** → `/newbot` → token. Chat ID:
napisz coś do bota, otwórz `https://api.telegram.org/bot<TOKEN>/getUpdates`,
odczytaj `chat.id`.

Front wysyła w trybie `no-cors`, więc Apps Script działa bez dodatkowej
konfiguracji CORS.

---

## Droga B — n8n (jeśli wolisz workflow)

1. Node **Webhook** (POST) → skopiuj URL do `NEXT_PUBLIC_WEBHOOK_URL`.
2. Node **Google Sheets → Append Row** — zmapuj pola z payloadu na kolumny.
3. Node **Telegram → Send Message** — treść np.:
   ```
   🔥 Nowy lead PUR
   👤 {{$json.name}}  📞 {{$json.phone}}
   📍 {{$json.city}} — {{$json.surface}}, {{$json.area}} m²
   💰 {{$json.quoteMin}}–{{$json.quoteMax}} zł
   ```

Przy `no-cors` przeglądarka nie czyta odpowiedzi — n8n nie musi zwracać
nagłówków CORS. Dane docierają niezależnie.

---

## Kalibracja wyceny

Stawki zł/m² i mnożniki są w
[`components/wizard/wizardConfig.js`](../components/wizard/wizardConfig.js),
funkcja `computeQuote`. Podmień na realny cennik firmy — to jedyne miejsce do
edycji logiki cenowej.

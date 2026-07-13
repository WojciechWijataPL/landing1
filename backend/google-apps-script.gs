/**
 * IzolacjePUR — odbiór leadów z landing page.
 * Zapisuje lead do Google Sheets ORAZ wysyła powiadomienie na Telegram.
 *
 * WDROŻENIE (5 minut, bez serwera):
 * 1. Utwórz arkusz Google Sheets, skopiuj jego ID z URL
 *    (https://docs.google.com/spreadsheets/d/  <<TO_ID>>  /edit).
 * 2. Rozszerzenia → Apps Script. Wklej ten plik.
 * 3. Uzupełnij 4 stałe poniżej.
 * 4. Wdróż → Nowe wdrożenie → typ: Aplikacja internetowa.
 *    - Wykonaj jako: Ja
 *    - Kto ma dostęp: Wszyscy
 * 5. Skopiuj URL /exec i wklej do .env.local jako NEXT_PUBLIC_WEBHOOK_URL.
 *
 * TELEGRAM (żeby dostawać SMS-podobne powiadomienia z numerem klienta):
 * - Napisz do @BotFather → /newbot → skopiuj TOKEN.
 * - Napisz coś do swojego bota, potem otwórz:
 *   https://api.telegram.org/bot<TOKEN>/getUpdates → znajdź "chat":{"id": ...}.
 */

const SHEET_ID = "WKLEJ_ID_ARKUSZA";
const SHEET_NAME = "Leady";
const TELEGRAM_TOKEN = "WKLEJ_TOKEN_BOTA"; // puste = pomiń Telegram
const TELEGRAM_CHAT_ID = "WKLEJ_CHAT_ID";

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    appendRow(d);
    sendTelegram(d);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function appendRow(d) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow([
      "Data",
      "Typ",
      "Usługa",
      "Region",
      "Rodzaj powierzchni",
      "Powierzchnia m²",
      "Rodzaj piany",
      "Grubość",
      "Etap",
      "Termin",
      "Miejscowość",
      "Imię",
      "Telefon",
      "Email",
      "Wycena min",
      "Wycena max",
      "zł/m² min",
      "zł/m² max",
    ]);
  }
  sh.appendRow([
    new Date(),
    d.type || "",
    d.service || "",
    d.region || "",
    d.surface || "",
    d.area || "",
    d.foam || "",
    d.thickness || "",
    d.stage || "",
    d.timing || "",
    d.city || "",
    d.name || "",
    d.phone || "",
    d.email || "",
    d.quoteMin || "",
    d.quoteMax || "",
    d.pricePerM2Min || "",
    d.pricePerM2Max || "",
  ]);
}

function sendTelegram(d) {
  if (!TELEGRAM_TOKEN || TELEGRAM_TOKEN.indexOf("WKLEJ") === 0) return;

  const wycena =
    d.quoteMin && d.quoteMax ? `${d.quoteMin}–${d.quoteMax} zł` : "—";
  const msg =
    "🔥 Nowy lead — Piana PUR\n" +
    "————————————\n" +
    "👤 " + (d.name || "-") + "\n" +
    "📞 " + (d.phone || "-") + "\n" +
    "✉️ " + (d.email || "-") + "\n" +
    "📍 " + (d.city || "-") + " (" + (d.region || "-") + ")\n" +
    "🏠 " + (d.surface || "-") + ", " + (d.area || "-") + " m²\n" +
    "🧴 " + (d.foam || "-") + " · grubość: " + (d.thickness || "-") + "\n" +
    "🗓 termin: " + (d.timing || "-") + "\n" +
    "💰 wycena: " + wycena;

  UrlFetchApp.fetch(
    "https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMessage",
    {
      method: "post",
      payload: { chat_id: TELEGRAM_CHAT_ID, text: msg },
      muteHttpExceptions: true,
    }
  );
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

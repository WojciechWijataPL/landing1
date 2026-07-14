/**
 * IzolacjePUR — odbiór leadów z landing page.
 * Zapisuje lead do Google Sheets ORAZ wysyła powiadomienie na Telegram.
 *
 * WDROŻENIE:
 * 1. Utwórz arkusz, skopiuj jego ID z URL.
 * 2. Rozszerzenia → Apps Script. Wklej ten plik.
 * 3. Uzupełnij 4 stałe poniżej.
 * 4. Wdróż → Nowe wdrożenie → Aplikacja internetowa
 *    (Wykonaj jako: Ja, Dostęp: Każdy).
 * 5. URL /exec wklej do .env.local jako NEXT_PUBLIC_WEBHOOK_URL.
 *
 * WAŻNE: po KAŻDEJ zmianie kodu wdróż NOWĄ WERSJĘ:
 *   Wdróż → Zarządzaj wdrożeniami → Edytuj (ołówek)
 *   → Wersja: „Nowa wersja" → Wdróż.
 * Inaczej /exec dalej uruchamia stary kod.
 *
 * TEST TELEGRAMA: otwórz URL /exec w przeglądarce (GET) — wyśle testową
 * wiadomość i pokaże odpowiedź Telegrama.
 */

const SHEET_ID = "WKLEJ_ID_ARKUSZA";
const SHEET_NAME = "Leady";
const TELEGRAM_TOKEN = "WKLEJ_TOKEN_BOTA";
const TELEGRAM_CHAT_ID = "WKLEJ_CHAT_ID";

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    appendRow(d);
    const tg = sendTelegram(d);
    return json({ ok: true, telegram: tg });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// GET = szybki test Telegrama z przeglądarki.
function doGet() {
  const tg = sendTelegram({
    name: "TEST GET",
    phone: "500000000",
    email: "test@get",
    city: "Łódź",
    region: "łódzkie",
    surface: "Poddasze skośne",
    area: "100",
    foam: "Otwartokomórkowa",
    thickness: "Standardowa",
    timing: "Jak najszybciej",
    quoteMin: 4000,
    quoteMax: 6000,
  });
  return json({ ok: true, telegram: tg });
}

function appendRow(d) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow([
      "Data", "Typ", "Usługa", "Region", "Rodzaj powierzchni",
      "Powierzchnia m²", "Rodzaj piany", "Grubość", "Etap", "Termin",
      "Miejscowość", "Imię", "Telefon", "Email",
      "Wycena min", "Wycena max", "zł/m² min", "zł/m² max",
    ]);
  }
  sh.appendRow([
    new Date(), d.type || "", d.service || "", d.region || "",
    d.surface || "", d.area || "", d.foam || "", d.thickness || "",
    d.stage || "", d.timing || "", d.city || "", d.name || "",
    d.phone || "", d.email || "", d.quoteMin || "", d.quoteMax || "",
    d.pricePerM2Min || "", d.pricePerM2Max || "",
  ]);
}

// Zwraca odpowiedź Telegrama (do diagnostyki). NIE wycisza błędów.
function sendTelegram(d) {
  if (!TELEGRAM_TOKEN || TELEGRAM_TOKEN.indexOf("WKLEJ") === 0) {
    return "pominięto: brak TELEGRAM_TOKEN";
  }
  const wycena =
    d.quoteMin && d.quoteMax ? d.quoteMin + "–" + d.quoteMax + " zł" : "—";
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

  const res = UrlFetchApp.fetch(
    "https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMessage",
    {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: msg }),
      muteHttpExceptions: true,
    }
  );
  return res.getContentText();
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

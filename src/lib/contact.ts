/**
 * Single source of truth for how customers reach Ayusya.
 *
 * Ayusya does not take payment online — there is no gateway, and no price is
 * published anywhere on the site. The site collects a list and hands it over;
 * availability, quantity and pricing are settled in the WhatsApp conversation.
 * So the prefilled message IS the order form, and is worth getting right.
 */

/** International format, no "+" — wa.me expects bare digits in the path. */
export const WHATSAPP_NUMBER = "918333832277";

/** Human-readable, for display in contact blocks. */
export const PHONE_DISPLAY = "+91 83338 32277";
export const PHONE_TEL = "+918333832277";

export const EMAIL = "ayusyaexp@gmail.com";
export const INSTAGRAM_HANDLE = "ayusya_smartnutrition";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export const COMPANY_NAME = "Ayusya Foods Industry";
export const FOUNDER = "Prasanna Venigandla";

/** FSSAI Central License. The pamphlet's 10125006000218 is a State license and
 *  should not be used on new material — see Ayusya_Brand_Guidelines.md §1. */
export const FSSAI_LICENSE = "10125999000589";

export const ADDRESS_SHORT = "Gudivada, Krishna District, Andhra Pradesh";
export const ADDRESS_FULL =
  "1-239/1 Ground Floor, Ramanapudi Village, Gudivada Mandal, Krishna, AP – 521322";

export const CATALOGUE_PATH = "/AYUSYA%20CATALOGUE.pdf";

/**
 * Build a WhatsApp deep link with the enquiry already typed out.
 *
 * Without a prefilled message the chat opens blank and Ayusya cannot tell which
 * product the customer tapped — the asterisks render as bold in WhatsApp, so the
 * product name stands out in the thread.
 *
 * @param productName Optional product to name in the message.
 */
export function whatsappUrl(productName?: string): string {
  const message = productName
    ? `Hi Ayusya, I'd like to enquire about *${productName}*.`
    : "Hi Ayusya, I'd like to know more about your products.";

  return waLink(message);
}

/** One line of the customer's list. Named rather than keyed by id so the message
 *  is built from what the customer actually sees on the card. */
export interface CartLine {
  name: string;
  quantity: number;
}

/**
 * Build the checkout message for a whole list.
 *
 * This is the only "checkout" the site has, so the message has to be legible to
 * a person reading it on a phone with no order-management system behind them:
 * one product per line, quantity first, a total to check the lines against, and
 * an explicit ask so the reply is a price rather than "yes".
 *
 * No prices appear here because none exist in the catalogue — see productData.ts,
 * where no SKU carries a price, weight or pack size. Quoting one here would be
 * inventing it.
 *
 * Length is not a concern at this catalogue size: all 21 products at two digits
 * of quantity encodes to roughly 1.4KB, well inside what wa.me accepts.
 */
export function whatsappCartUrl(lines: CartLine[]): string {
  if (lines.length === 0) return whatsappUrl();

  const total = lines.reduce((sum, line) => sum + line.quantity, 0);
  const items = lines.map((l) => `• ${l.quantity} × *${l.name}*`).join("\n");

  return waLink(
    `Hi Ayusya, I'd like to order:\n\n${items}\n\n` +
      `(${total} ${total === 1 ? "item" : "items"} total)\n` +
      `Please confirm availability and pricing.`
  );
}

/** wa.me expects the message percent-encoded in the query string. */
function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

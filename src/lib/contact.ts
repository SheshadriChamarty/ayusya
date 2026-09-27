/**
 * Single source of truth for how customers reach Ayusya.
 *
 * Ayusya does not sell online — there is no cart and no payment gateway. Every
 * conversion path ends in a WhatsApp conversation, so the prefilled message is
 * the closest thing this site has to an "add to basket" and is worth getting right.
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

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

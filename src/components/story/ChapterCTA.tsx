import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import { whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface ChapterCTAProps {
  /**
   * Which action leads. Chapters alternate so the same button is never repeated
   * down the page — the reader always meets a next step, never the same one twice.
   */
  lead?: "products" | "whatsapp";
  /** Overrides the products label, so each chapter's CTA speaks in its own voice. */
  productsLabel?: string;
  /**
   * Where the non-WhatsApp button goes. Defaults to the catalogue, but /products
   * itself needs it to point back at the story — a CTA that links to the page
   * you are already on is a dead end.
   */
  productsTo?: string;
  /** Overrides the WhatsApp label. */
  whatsappLabel?: string;
  /**
   * Set when this sits on a dark ground (the photographic hero, or any future
   * photo band). The default outline button is bronze-on-cream, so on a bronze
   * scrim it disappears entirely — the secondary action has to invert, not just
   * inherit.
   */
  onDark?: boolean;
  className?: string;
}

/**
 * Every chapter ends here. Nothing is paid for on this site, so a WhatsApp thread
 * *is* the conversion — which makes "no screen without a next step" a hard
 * requirement rather than a nicety.
 */
const ChapterCTA = ({
  lead = "products",
  productsLabel = "Browse the range",
  productsTo = "/products",
  whatsappLabel = "Ask us on WhatsApp",
  onDark = false,
  className,
}: ChapterCTAProps) => {
  /* Both buttons have to know what they are sitting on. The solid one looks like it
     would be safe anywhere — it carries its own fill — but that fill is bronze and
     so is the hero scrim, so on dark it becomes a cream label with no button
     around it. Measured, not assumed: rgb(69,27,3) on rgb(69,27,3). */
  const solid = onDark ? "ayusya-btn-light" : "ayusya-btn";
  const outline = onDark ? "ayusya-btn-outline-light" : "ayusya-btn-outline";

  const products = (
    <Link key="products" to={productsTo} className={lead === "products" ? solid : outline}>
      {productsLabel}
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );

  const whatsapp = (
    <a
      key="whatsapp"
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer noopener"
      className={lead === "whatsapp" ? solid : outline}
    >
      <MessageCircle size={18} aria-hidden="true" />
      {whatsappLabel}
    </a>
  );

  return (
    <div className={cn("mt-10 flex flex-wrap items-center gap-4", className)}>
      {lead === "products" ? [products, whatsapp] : [whatsapp, products]}
    </div>
  );
};

export default ChapterCTA;

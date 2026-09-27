import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, ShoppingBasket } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { whatsappCartUrl, whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

/**
 * Persistent route to the things a visitor can actually do: see the range, send
 * the list they have built, or start a WhatsApp enquiry from nothing.
 *
 * There is no payment step, so the conversation IS the conversion. That makes an
 * always-reachable rail more valuable here than on a transactional store:
 * whatever paragraph of the story lands, the next step is one tap away.
 *
 * Once the list has something on it, the rail becomes the checkout: the enquiry
 * pill turns into "Send list (N)". Sending goes straight to wa.me rather than
 * opening the panel first, which is safe because wa.me only *prefills* the
 * message — the customer reads the whole list in WhatsApp's compose box and
 * still has to press send. The review step exists by construction.
 *
 * Deliberately hidden at the very top of the page. The hero already carries
 * both CTAs, so showing the rail immediately would double them up and cover
 * the opening frame of the story before it has said anything.
 */
const CTARail = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation();
  const { lines, count } = useCart();
  const isProductsPage = pathname === "/products";

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        /* Centred on mobile — the standard bottom-bar position, and a phone has
           no gutter to tuck into. Docked right from md up, because centred it
           lands squarely on the reading column: it was covering chapter copy on
           the homepage and the middle card column on /products. */
        "fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4",
        "transition-all duration-500 md:bottom-6 md:justify-end md:pr-6 lg:pr-10",
        /* Hidden on /products at md and up: there it collapses to a lone Enquire
           pill, which just duplicates the one already in the sticky navbar. On
           mobile it stays, since the navbar's pill is behind the burger menu.
           But a non-empty list overrides that — "Send list" is not in the navbar,
           and /products is exactly where a customer finishes building one. */
        isProductsPage && count === 0 && "md:hidden",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <div
        className={cn(
          "flex w-full max-w-md items-center gap-2 rounded-full border border-caramel/40",
          "bg-cream-100/95 p-2 shadow-warm-lg backdrop-blur-md md:w-auto"
        )}
      >
        {/* On /products the visitor is already looking at the range, so the
            second CTA would point at the page they are on. */}
        {!isProductsPage && (
          <Link
            to="/products"
            className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-3 font-display text-sm font-semibold text-bronze transition-colors hover:bg-cream-200 md:flex-none md:px-5"
          >
            <ShoppingBasket size={17} className="shrink-0" aria-hidden="true" />
            {/* "Browse the range" wraps to two lines below ~400px and makes the
                two buttons different heights, so the phone gets the short form. */}
            <span className="sm:hidden">Products</span>
            <span className="hidden sm:inline">Browse the range</span>
          </Link>
        )}

        <a
          href={count > 0 ? whatsappCartUrl(lines) : whatsappUrl()}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-sku-moringa px-5 py-3 font-display text-sm font-semibold text-cream shadow-warm transition-transform duration-300 hover:-translate-y-0.5 active:scale-95 md:flex-none"
        >
          <MessageCircle size={17} className="shrink-0" aria-hidden="true" />
          {count > 0 ? `Send list (${count})` : "Enquire"}
        </a>
      </div>
    </div>
  );
};

export default CTARail;

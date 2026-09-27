import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ShoppingBasket } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import IngredientGlyph from "@/components/illustrations/IngredientGlyph";
import QuantityStepper from "@/components/QuantityStepper";
import { useCart } from "@/hooks/useCart";
import { useIsMobile } from "@/hooks/use-mobile";
import { whatsappCartUrl } from "@/lib/contact";
import { skuStyle } from "@/lib/skuAccents";

/**
 * The list panel.
 *
 * Mounted once, in App.tsx beside CTARail, and opened from `useCart().setOpen`.
 * Anything that needs to open it — the navbar badge, the mobile menu, the rail —
 * calls that rather than rendering its own copy, so there is exactly one panel in
 * the DOM and no chance of two disagreeing about what is in the list.
 *
 * Built on ui/sheet.tsx (Radix Dialog) rather than ui/drawer.tsx (vaul): vaul is
 * wired bottom-only here, and this needs to be a right-hand panel on desktop.
 * Sheet's `side` prop gives both from one component.
 *
 * Deliberately says nothing about price. Ayusya publishes no prices — see
 * lib/contact.ts — so the panel's job is to be an accurate list and to set the
 * expectation that the number arrives in the chat. Showing a "total" of item
 * counts where a customer expects money would be worse than showing neither.
 */
const CartPanel = () => {
  const { lines, count, setQuantity, remove, clear, isOpen, setOpen } = useCart();
  const isMobile = useIsMobile();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        /* flex column with a scrolling middle: the header and the send button stay
           put while a long list scrolls between them. Without this the button
           would be pushed off a phone screen at about six items. */
        className="flex max-h-[85svh] flex-col gap-0 border-caramel/40 bg-cream-50 p-0 sm:max-w-md md:max-h-none"
      >
        <SheetHeader className="border-b border-caramel/30 px-5 py-5 text-left sm:text-left">
          <SheetTitle className="font-display text-xl font-bold text-primary">
            Your list
          </SheetTitle>
          <SheetDescription className="text-sm text-umber">
            {count === 0
              ? "Nothing on it yet."
              : `${count} ${count === 1 ? "item" : "items"} ready to send.`}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <ShoppingBasket
              size={36}
              aria-hidden="true"
              className="mx-auto text-caramel"
            />
            <p className="mt-4 text-sm leading-relaxed text-umber">
              Add the powders you want and send them to us in one message.
            </p>
            <SheetClose asChild>
              <Link to="/products" className="ayusya-btn mt-6 px-6 py-3 text-sm">
                Browse the products
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-caramel/25 overflow-y-auto px-5">
              {lines.map((line) => (
                <li
                  key={line.name}
                  className="flex items-center gap-3 py-4"
                  style={
                    { "--sku-accent": skuStyle(line.name).accent } as CSSProperties
                  }
                >
                  {/* The glyph is how a customer recognises the product on the card,
                      so it is how they should recognise it here too — the name alone
                      makes 21 near-identical "… Powder" lines hard to scan. */}
                  <IngredientGlyph
                    productName={line.name}
                    className="h-10 w-10 shrink-0"
                  />

                  <span className="flex-1 font-display text-sm font-semibold leading-snug text-primary">
                    {line.name}
                  </span>

                  <QuantityStepper
                    name={line.name}
                    quantity={line.quantity}
                    size="sm"
                    onChange={(q) => (q < 1 ? remove(line.name) : setQuantity(line.name, q))}
                  />
                </li>
              ))}
            </ul>

            <div className="border-t border-caramel/30 bg-cream-100 px-5 py-5">
              {/* An anchor, not a button that calls window.open — same reasoning as
                  ProductCard: it survives popup blockers and long-press, and a
                  screen reader announces it as the link off-site that it is. */}
              <a
                href={whatsappCartUrl(lines)}
                target="_blank"
                rel="noreferrer noopener"
                className="ayusya-btn w-full px-5 py-3.5 text-sm"
              >
                <MessageCircle size={17} aria-hidden="true" />
                Send list on WhatsApp
              </a>

              <p className="mt-3 text-center text-xs leading-relaxed text-umber-light">
                Your list is typed out for you. We&apos;ll confirm availability and
                pricing in the chat.
              </p>

              <button
                type="button"
                onClick={clear}
                className="mx-auto mt-4 block text-xs font-semibold text-umber-light underline underline-offset-4 transition-colors hover:text-primary"
              >
                Clear the list
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartPanel;

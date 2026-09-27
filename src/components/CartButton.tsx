import { ShoppingBasket } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

interface CartButtonProps {
  /** Full-width labelled form for the mobile menu; icon-only for the desktop bar. */
  variant?: "icon" | "full";
  /** Runs alongside opening the panel — the mobile menu uses it to close itself,
   *  so the panel does not slide in over a still-open nav drawer. */
  onOpen?: () => void;
  className?: string;
}

/**
 * Opens the list panel, and shows how many items are on it.
 *
 * Renders nothing at count 0. A first-time visitor has no list, and an empty
 * basket icon in the navbar is a dead control that invites a tap leading to an
 * empty panel — the badge appearing the moment something is added is also the
 * clearest possible confirmation that "Add to list" worked.
 */
const CartButton = ({ variant = "icon", onOpen, className }: CartButtonProps) => {
  const { count, setOpen } = useCart();

  if (count === 0) return null;

  const label = `Your list, ${count} ${count === 1 ? "item" : "items"}`;
  const open = () => {
    onOpen?.();
    setOpen(true);
  };

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={open}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary",
          "px-5 py-3 font-display text-base font-bold text-primary transition-colors",
          "hover:bg-cream-200",
          className
        )}
      >
        <ShoppingBasket size={17} aria-hidden="true" />
        Your list
        <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-cream tabular-nums">
          {count}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      aria-label={label}
      className={cn(
        "relative rounded-full p-2 text-bronze transition-colors hover:bg-cream-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <ShoppingBasket size={22} aria-hidden="true" />
      {/* aria-hidden because the count is already in the button's aria-label;
          announced twice it reads as "Your list, 3 items, 3". */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full",
          "bg-sku-moringa px-1 font-display text-[0.65rem] font-bold leading-5 text-cream tabular-nums"
        )}
      >
        {count}
      </span>
    </button>
  );
};

export default CartButton;

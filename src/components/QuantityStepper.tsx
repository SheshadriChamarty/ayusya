import { Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  name: string;
  quantity: number;
  onChange: (quantity: number) => void;
  /** Compact form for the cart panel; the default suits a product card. */
  size?: "sm" | "md";
  className?: string;
}

/**
 * − n + for one line of the list. Shared by ProductCard and CartPanel so the
 * control a customer learns on the card behaves identically in the panel.
 *
 * At quantity 1 the minus becomes a bin icon rather than a disabled minus: from
 * one, the only downward move IS removal, and a dead button that looks pressable
 * reads as a bug. The label changes with it so a screen reader announces the
 * real action.
 */
const QuantityStepper = ({
  name,
  quantity,
  onChange,
  size = "md",
  className,
}: QuantityStepperProps) => {
  const isLast = quantity <= 1;
  const button = cn(
    "grid place-items-center rounded-full border border-caramel/60 bg-cream-50 text-umber",
    "transition-colors hover:border-primary hover:text-primary",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
    size === "sm" ? "h-8 w-8" : "h-10 w-10"
  );

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        className={button}
        aria-label={isLast ? `Remove ${name} from your list` : `One fewer ${name}`}
      >
        {isLast ? <Trash2 size={size === "sm" ? 14 : 16} /> : <Minus size={size === "sm" ? 14 : 16} />}
      </button>

      {/* aria-live so the count is announced when it changes — the buttons keep
          focus, so without it a screen-reader user hears nothing happen. */}
      <span
        aria-live="polite"
        className={cn(
          "text-center font-display font-bold tabular-nums text-primary",
          size === "sm" ? "min-w-7 text-sm" : "min-w-9 text-base"
        )}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        className={button}
        aria-label={`One more ${name}`}
      >
        <Plus size={size === "sm" ? 14 : 16} />
      </button>
    </div>
  );
};

export default QuantityStepper;

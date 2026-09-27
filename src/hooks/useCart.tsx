import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine } from "@/lib/contact";

/**
 * The customer's list.
 *
 * Not a shopping cart in the transactional sense: there is no price, no total and
 * no payment step anywhere on this site. It collects what someone wants so the
 * WhatsApp message can name all of it at once, instead of making them send one
 * enquiry per product — which is what the site did before, and which is unusable
 * for anyone ordering more than two things.
 *
 * ── Two decisions worth knowing about ───────────────────────────────────────
 *
 * Keyed by product NAME, not id. The name is what the customer sees on the card
 * and what has to appear in the WhatsApp message, and `skuAccents.ts` is already
 * keyed by exact name. Carrying an id as well would mean two things to keep in
 * step for no gain — nothing here ever looks a product back up.
 *
 * Insertion order is preserved on quantity change. `setQuantity` maps over the
 * existing array rather than removing and re-appending, so bumping the first
 * item's count does not move it to the bottom of the drawer under the reader's
 * finger.
 *
 * The drawer's open state lives here too, which is not strictly "cart state".
 * It is here because three unrelated places open the same single drawer — the
 * navbar badge, the mobile menu and the CTA rail — and they have no common
 * ancestor below the router. Lifting one boolean into this context is cheaper
 * than a second provider that would always be mounted alongside this one.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const STORAGE_KEY = "ayusya:cart";

/** Guards against a customer ordering 99 of something by holding the + button. */
const MAX_PER_LINE = 99;

interface CartContextValue {
  lines: CartLine[];
  /** Adds one, or increments if the product is already listed. */
  add: (name: string) => void;
  /** Sets an exact count; 0 or less removes the line. */
  setQuantity: (name: string, quantity: number) => void;
  remove: (name: string) => void;
  clear: () => void;
  /** Total units across all lines — what the badge shows. */
  count: number;
  /** Quantity of one product, 0 if not listed. Lets a card render its own stepper. */
  quantityOf: (name: string) => number;
  /** Whether the list panel is showing. See the note above on why it lives here. */
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Read the stored list.
 *
 * Guarded for Safari private mode, where *touching* localStorage throws rather
 * than returning null.
 * Additionally validated shape-by-shape — this value survives deploys, so a
 * stored list written by an older version of the site must not be able to crash
 * the drawer. Anything unrecognised is discarded rather than repaired.
 */
const readStoredCart = (): CartLine[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((entry): CartLine[] => {
      if (typeof entry !== "object" || entry === null) return [];
      const { name, quantity } = entry as Record<string, unknown>;
      if (typeof name !== "string" || !name) return [];
      if (typeof quantity !== "number" || !Number.isFinite(quantity)) return [];
      const clamped = Math.min(Math.max(Math.round(quantity), 1), MAX_PER_LINE);
      return [{ name, quantity: clamped }];
    });
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  /* Initialised from storage in the useState initialiser rather than in an effect,
     so the badge renders with its real count in the first paint instead of
     flashing empty and then filling in. */
  const [lines, setLines] = useState<CartLine[]>(readStoredCart);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* Private mode or a full quota: the list still works for this visit, it
         just will not survive a reload. Failing silently is right here — a
         storage error is not something a customer can act on. */
    }
  }, [lines]);

  const add = useCallback((name: string) => {
    setLines((current) => {
      const existing = current.find((line) => line.name === name);
      if (!existing) return [...current, { name, quantity: 1 }];
      return current.map((line) =>
        line.name === name
          ? { ...line, quantity: Math.min(line.quantity + 1, MAX_PER_LINE) }
          : line
      );
    });
  }, []);

  const setQuantity = useCallback((name: string, quantity: number) => {
    setLines((current) => {
      if (quantity < 1) return current.filter((line) => line.name !== name);
      return current.map((line) =>
        line.name === name
          ? { ...line, quantity: Math.min(quantity, MAX_PER_LINE) }
          : line
      );
    });
  }, []);

  const remove = useCallback((name: string) => {
    setLines((current) => current.filter((line) => line.name !== name));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      add,
      setQuantity,
      remove,
      clear,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      quantityOf: (name) => lines.find((l) => l.name === name)?.quantity ?? 0,
      isOpen,
      setOpen,
    }),
    [lines, add, setQuantity, remove, clear, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/** Throws rather than returning a no-op cart: a silently dead "Add to list"
 *  button is far worse to debug than a component that fails loudly on mount. */
export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside <CartProvider>. See src/App.tsx.");
  }
  return context;
};

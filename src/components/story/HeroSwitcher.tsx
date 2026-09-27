import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HERO_OPTIONS, DEFAULT_HERO_ID } from "./heroOptions";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "ayusya:hero";

/**
 * The hero choice remembered from a previous visit, or the shipped default.
 *
 * Storage only — the caller is responsible for letting `?hero=` take precedence,
 * because reading the URL belongs to the router, not to localStorage. Hero.tsx
 * composes the two.
 *
 * Guarded for the absence of `window` and for Safari private mode, where *touching*
 * localStorage throws rather than returning null. A hero photo is not worth a white
 * screen.
 */
export const readStoredHeroChoice = (): string => {
  if (typeof window === "undefined") return DEFAULT_HERO_ID;
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT_HERO_ID;
  } catch {
    return DEFAULT_HERO_ID;
  }
};

/**
 * A development-only control for comparing hero photographs in place.
 *
 * Why this exists: the hero is the one decision on this site that can only be made
 * by looking at it. Screenshots in a chat window are a poor substitute — they miss
 * the scroll, the navbar over the image, and how the scrim behaves at the real
 * viewport width. So the comparison happens in the real page.
 *
 * Two deliberate constraints:
 *
 * 1. `import.meta.env.DEV` gates the whole component, so none of this *UI* reaches a
 *    production build — verified against dist/: the picker's markup and labels are
 *    absent from the bundle. `readStoredHeroChoice` does survive, because Hero.tsx
 *    imports it, so a production visit performs one synchronous localStorage read
 *    before first paint. That is a few microseconds and it always misses for a real
 *    visitor, who has never written the key — but it is not literally zero, and it
 *    disappears along with this file when the hero is settled.
 * 2. It carries the choice in the URL (`?hero=`) rather than in component state.
 *    Hero.tsx reads that param, so the switcher does not have to own the hero or be
 *    its parent — and the same URL can be pasted to someone else. `replace` keeps
 *    the back button usable after twenty comparisons.
 */
const HeroSwitcher = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  /* Same precedence as Hero.tsx: URL, then remembered choice, then the default. */
  const current = params.get("hero") ?? readStoredHeroChoice();

  if (!import.meta.env.DEV) return null;

  const choose = (id: string) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* Private mode: the query param below still applies the choice for this visit. */
    }
    navigate(`/?hero=${id}`, { replace: true });
  };

  return (
    <div className="fixed bottom-4 left-4 z-[60] print:hidden">
      {open ? (
        <div className="w-64 rounded-2xl border border-bronze/25 bg-cream-100/95 p-3 shadow-warm-lg backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-display text-xs font-bold uppercase tracking-[0.12em] text-bronze">
              Hero photo
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full px-2 text-lg leading-none text-umber hover:text-bronze"
              aria-label="Close hero picker"
            >
              ×
            </button>
          </div>

          <ul className="flex flex-col gap-1.5">
            {HERO_OPTIONS.map((o) => {
              const active = o.id === current;
              return (
                <li key={o.id}>
                  <button
                    type="button"
                    onClick={() => choose(o.id)}
                    aria-current={active}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-xl border p-1.5 text-left transition-colors",
                      active
                        ? "border-bronze bg-caramel/20"
                        : "border-transparent hover:border-bronze/30 hover:bg-caramel/10"
                    )}
                  >
                    {/* The 800px variant as a thumbnail: already cached by the page,
                        so the picker costs no extra requests for the active option. */}
                    <img
                      src={`${o.base}-800.jpg`}
                      alt=""
                      width={56}
                      height={38}
                      loading="lazy"
                      className="h-9 w-14 shrink-0 rounded-lg bg-cream-200 object-cover"
                    />
                    <span
                      className={cn(
                        "font-sans text-[0.8rem] font-semibold",
                        active ? "text-bronze" : "text-umber"
                      )}
                    >
                      {o.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <p className="mt-2 border-t border-bronze/15 pt-2 font-sans text-[0.68rem] leading-snug text-umber-light">
            Dev only — not in the built site. The shipped default is set by
            <code className="mx-1 text-bronze">DEFAULT_HERO_ID</code>.
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full border border-bronze/25 bg-cream-100/95 px-3.5 py-2 font-display text-xs font-bold uppercase tracking-[0.1em] text-bronze shadow-warm backdrop-blur-md hover:bg-cream-100"
        >
          Hero photo
        </button>
      )}
    </div>
  );
};

export default HeroSwitcher;

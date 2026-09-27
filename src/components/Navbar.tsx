import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "The Sun", href: "/solar-advantage" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  /* The bar starts transparent so the story's opening frame runs edge to edge,
     then gains a cream plate once the reader scrolls past it. */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the mobile panel on navigation. */
  useEffect(() => setIsMenuOpen(false), [pathname]);

  return (
    /*
     * Always plated, never transparent.
     *
     * This bar used to render on `bg-transparent` until the reader scrolled 24px,
     * which is exactly the state the legibility complaint was about: the wordmark
     * and links were sitting on whatever the page happened to put behind them.
     * With a photographic hero arriving, bronze type on an unknown photo is
     * unreadable at any weight — so the plate is now unconditional and the scroll
     * state only deepens it.
     */
    <nav
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        isScrolled
          ? "border-caramel/40 bg-cream-100/95 shadow-warm backdrop-blur-md"
          : "border-transparent bg-cream-100/80 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3" aria-label="Ayusya home">
          <img
            src="/assets/logo-128.png"
            alt=""
            width={56}
            height={56}
            className="h-12 w-12 rounded-full object-contain md:h-14 md:w-14"
          />
          <span className="flex flex-col gap-0.5 leading-none">
            {/* 0.18em tracking made this read as six separate letters rather than
                a word. Tightened, enlarged, and taken to 800 — Cinzel is now
                loaded at that weight so the browser renders it rather than
                synthesising a smeared fake bold. */}
            <span className="font-wordmark text-2xl font-extrabold tracking-[0.1em] text-bronze md:text-3xl">
              AYUSYA
            </span>
            {/* Was Pacifico at 10.4px in a 2.63:1 tone — decorative, not readable.
                A script face needs size to work; at tagline scale it needs to be
                a text face instead. */}
            <span className="font-sans text-[0.7rem] font-semibold tracking-wide text-umber md:text-sm">
              Smart Food for Healthy Lives
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              end={link.href === "/"}
              className={({ isActive }) =>
                cn(
                  "relative py-1 font-display text-base font-bold transition-colors",
                  "after:absolute after:-bottom-0.5 after:left-0 after:h-[2.5px] after:w-full",
                  "after:origin-left after:bg-caramel-dark after:transition-transform after:duration-300",
                  /* Both states are bronze now. The active one is marked by the
                     underline, not by being the only readable one. */
                  isActive
                    ? "text-bronze after:scale-x-100"
                    : "text-bronze/85 hover:text-bronze after:scale-x-0 hover:after:scale-x-100"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-full bg-sku-moringa px-5 py-2.5 font-display text-base font-bold text-cream shadow-warm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-warm-lg"
          >
            <MessageCircle size={17} aria-hidden="true" />
            Enquire
          </a>
        </div>

        <button
          type="button"
          className="rounded-full p-2 text-bronze transition-colors hover:bg-cream-200 md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="animate-fade-in border-t border-border bg-cream-100/95 px-5 pb-6 pt-4 shadow-warm backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                end={link.href === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-3 font-display text-base font-bold transition-colors",
                    isActive
                      ? "bg-cream-200 text-bronze"
                      : "text-bronze/85 hover:bg-cream-200 hover:text-bronze"
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-sku-moringa px-5 py-3.5 font-display text-base font-bold text-cream shadow-warm"
            >
              <MessageCircle size={16} aria-hidden="true" />
              Enquire on WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import {
  ADDRESS_SHORT,
  COMPANY_NAME,
  EMAIL,
  FSSAI_LICENSE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/contact";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "The Sun", href: "/solar-advantage" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-caramel-band text-bronze">
      <div className="container mx-auto grid gap-10 px-5 py-14 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/logo-128.png"
              alt=""
              width={52}
              height={52}
              className="h-12 w-12 rounded-full object-contain"
            />
            <span className="flex flex-col leading-tight">
              <span className="font-wordmark text-lg font-bold tracking-[0.16em]">
                AYUSYA
              </span>
              <span className="text-[0.7rem] uppercase tracking-[0.3em] text-bronze/70">
                Foods Industry
              </span>
            </span>
          </div>

          {/* Campaign register — guidelines §7 reserves the poetic lines for
              footers and taglines, away from functional copy. */}
          <p className="font-script text-lg leading-snug text-bronze/90">
            Healing begins where nature whispers and light listens.
          </p>
          <p className="text-sm text-bronze/75">
            Powered by the sun, guided by a mother&apos;s wish.
          </p>
        </div>

        <div className="space-y-3">
          <p className="eyebrow text-bronze/70">Connect</p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
              >
                <Mail size={15} aria-hidden="true" />
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
              >
                <Phone size={15} aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
              >
                <Instagram size={15} aria-hidden="true" />@{INSTAGRAM_HANDLE}
              </a>
            </li>
            <li className="inline-flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
              {ADDRESS_SHORT}
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <p className="eyebrow text-bronze/70">Explore</p>
          <nav className="flex flex-col gap-2 text-sm">
            {exploreLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Extra bottom padding so the fixed CTARail never covers the FSSAI line. */}
      <div className="border-t border-bronze/15 px-5 pb-24 pt-5 text-center text-xs text-bronze/70 md:pb-28">
        <p>
          &copy; {currentYear} {COMPANY_NAME}. Live Better. Feel Stronger. Thrive
          Every Day.
        </p>
        <p className="mt-1.5">FSSAI Lic. No. {FSSAI_LICENSE} · Product of India</p>
      </div>
    </footer>
  );
};

export default Footer;

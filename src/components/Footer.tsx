import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ayusya-cream/80 border-t border-amber-100">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="/assets/ayusya-logo.png"
              alt="Ayusya Logo"
              className="h-12 w-auto"
            />
            <div>
              <p className="text-ayusya-brown font-serif text-xl leading-tight">
                AYUSYA Foods Industry
              </p>
              <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
                Smart Food
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Healing Begins Where Nature Whispers and Light Listens. Powered by
            the sun, guided by a mother&apos;s wish.
          </p>
        </div>

        <div className="space-y-2 text-sm text-gray-700">
          <p className="font-semibold text-ayusya-brown uppercase tracking-[0.3em] text-xs">
            Connect
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:ayusyaexp@gmail.com"
              className="text-amber-700 hover:underline"
            >
              ayusyaexp@gmail.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a
              href="tel:+918333832277"
              className="text-amber-700 hover:underline"
            >
              8333832277
            </a>
          </p>
          <p>
            Social:{" "}
            <a
              href="https://instagram.com/ayusya_smartnutrition"
              target="_blank"
              rel="noreferrer"
              className="text-amber-700 hover:underline"
            >
              @ayusya_smartnutrition
            </a>
          </p>
          <p>Location: Ayusya Foods Industry · India</p>
        </div>

        <div className="space-y-3 text-sm text-gray-700">
          <p className="font-semibold text-ayusya-brown uppercase tracking-[0.3em] text-xs">
            Explore
          </p>
          <div className="flex flex-col gap-2">
            <Link to="/" className="hover:text-amber-700">
              Home
            </Link>
            <Link to="/about" className="hover:text-amber-700">
              Our Story
            </Link>
            <Link to="/products" className="hover:text-amber-700">
              Products
            </Link>
            <Link to="/contact" className="hover:text-amber-700">
              Contact
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-amber-100 py-4 text-center text-xs text-gray-500">
        &copy; {currentYear} AYUSYA Foods Industry. Live Better. Feel Stronger.
        Thrive Every Day.
      </div>
    </footer>
  );
};

export default Footer;

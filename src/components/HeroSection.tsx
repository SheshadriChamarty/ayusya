import React from "react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";

const highlights = [
  "Farm-to-Factory Integration",
  "Eco-Hybrid Solar Drying",
  "Chemical-Free & Shelf-Stable",
  "Mother-led Quality Promise",
];

const benefits = [
  {
    title: "Preserves Nutritional Value",
    description:
      "Gentle, controlled eco-hybrid solar drying retains essential vitamins, minerals, and antioxidants far better than high-heat industrial drying.",
    accent: "bg-emerald-200/70 text-emerald-900",
  },
  {
    title: "Maintains Natural Quality",
    description:
      "Our controlled-temperature process locks in each ingredient's natural color, aroma, and authentic flavor.",
    accent: "bg-amber-100 text-amber-800",
  },
  {
    title: "Eco-Friendly & Energy-Efficient",
    description:
      "We use 100% clean, renewable solar energy, significantly reducing our carbon footprint.",
    accent: "bg-lime-100 text-lime-800",
  },
  {
    title: "Chemical-Free Preservation & Shelf Life",
    description:
      "A purely natural process that prevents spoilage without chemicals, offering long-term, year-round access to seasonal nutrition.",
    accent: "bg-stone-100 text-stone-800",
  },
];

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-ayusya-cream">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_top,_rgba(22,101,52,0.15),_transparent_50%)]" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url(/assets/ayusya-logo.png)",
          backgroundSize: "80%",
          backgroundPosition: "center",
        }}
      />

      <div className="container mx-auto section-padding relative z-10">
        {/* Hero Content */}
        <div className="flex flex-col items-center gap-12 lg:flex-row mb-20 lg:mb-16">
          <div className="w-full space-y-6 text-center lg:w-1/2 lg:text-left">
            <h1 className="text-ayusya-brown">
              <span className="block text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight mb-2 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 bg-clip-text text-transparent">
                AYUSYA
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-sans font-medium">
                Smart Food for{" "}
                <span className="text-amber-700">Healthy Lives.</span>
              </span>
            </h1>
            <p className="text-lg text-gray-700">
              Dehydrated vegetables, fruits, and spices crafted with solar
              precision. Whole nutrition, zero compromises, ready for every
              kitchen ritual.
            </p>
            <p className="text-base text-gray-600">
              Ayusya was born from a mother&apos;s promise—to nurture families
              from childhood to the golden years with clean, natural
              nourishment.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                to="/products"
                className="ayusya-btn bg-amber-700 hover:bg-amber-800"
              >
                Explore Products
              </Link>
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/AYUSYA CATALOGUE.pdf";
                  link.download = "AYUSYA CATALOGUE.pdf";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="ayusya-btn-outline border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white flex items-center gap-2"
                aria-label="Download Catalogue"
              >
                <Download size={20} />
                <span>Catalouge</span>
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="w-full max-w-xl grid gap-5 rounded-3xl border border-amber-100/60 bg-gradient-to-r from-white to-emerald-50/60 p-8 shadow-md backdrop-blur">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 text-base font-medium text-gray-700"
                >
                  <span className="h-3 w-3 rounded-full bg-emerald-500 flex-shrink-0 shadow-sm" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Solar Advantage Section - Seamlessly Integrated */}
        <div className="grid gap-12 lg:grid-cols-2 pt-8">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-amber-700">
              Why Choose Us
            </p>
            <h2 className="heading-lg text-ayusya-brown">
              The Ayusya Advantage: Powered by the Sun.
            </h2>
            <p className="text-gray-600">
              Solar dehydration is our superpower. By pairing eco-hybrid
              technology with mindful craftsmanship, we preserve the goodness of
              every vegetable, fruit, and spice without compromising flavor,
              color, or nutrition.
            </p>
            <div className="rounded-[32px] border border-amber-100 bg-gradient-to-br from-green-50 via-white to-amber-50 p-8 shadow-xl">
              <div className="h-40 rounded-2xl bg-green-500/20">
                <div className="flex h-full items-center justify-center text-sm font-semibold uppercase tracking-[0.5em] text-green-700/80">
                  Placeholder Visual
                </div>
              </div>
              <p className="mt-4 text-center text-sm uppercase tracking-[0.4em] text-amber-800">
                Eco-Hybrid Solar Tunnel
              </p>
            </div>
          </div>

          <div className="grid gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-3xl border border-amber-100/60 bg-gradient-to-r from-white to-emerald-50/60 p-6 shadow-md"
              >
                <div
                  className={`inline-flex items-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${benefit.accent}`}
                >
                  Solar Pure
                </div>
                <h3 className="mt-4 text-xl font-semibold text-amber-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-gray-700">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

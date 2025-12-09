import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const productCategories = [
  {
    name: "Daily Superfood Powders",
    usage:
      "Integrate powerful, concentrated nutrition into your life effortlessly—think smoothies, batters, soups, or natural coloring.",
    tone: "from-amber-50 via-white to-green-50",
    products: [
      {
        product: "Moringa Leaf Powder",
        details:
          "Packed with vitamins A, C, E, minerals, and antioxidants. Boosts energy, immunity, and overall wellness.",
      },
      {
        product: "Spinach Powder",
        details:
          "Loaded with iron, vitamins A, C, K, plus antioxidants. Supports energy, skin vitality, and immune strength.",
      },
      {
        product: "Carrot Powder",
        details:
          "Rich in vitamin A and beta-carotene. Protects eye health, immunity, and glowing skin.",
      },
      {
        product: "Ginger Powder",
        details:
          "Vitamins B3, B6, C, and antioxidants. Aids digestion, immunity, and reduces inflammation.",
      },
      {
        product: "Beetroot Powder",
        details:
          "Vitamins A, C, B9 (folate) with antioxidants. Elevates stamina, heart health, detox, and circulation.",
      },
      {
        product: "Sweet Potato Powder",
        details:
          "Vitamins A, C, B6, E plus fiber, potassium, antioxidants. Sustains energy and supports skin/eye health.",
      },
      {
        product: "Amla Powder",
        details:
          "Vit C, E, and phytonutrients. Revitalizes the body, enhances immunity, and youthful radiance.",
      },
      {
        product: "Bitter Gourd Powder",
        details:
          "Vitamins A, C, B9 and bioactive compounds. Helps regulate blood sugar, metabolism, liver health, detox.",
      },
    ],
  },
  {
    name: "Essential Vegetable & Spice Powders",
    usage:
      "Simplify cooking with concentrated flavors and nutrients. Reduce prep time without sacrificing quality or freshness.",
    tone: "from-green-50 via-white to-amber-50",
    products: [
      {
        product: "Tomato Powder",
        details:
          "Vitamins A, C, K and lycopene. Promotes skin health, heart function, immunity, and deep flavor.",
      },
      {
        product: "Potato Powder",
        details:
          "Vitamins B6, C, potassium. Nourishes for steady energy, glowing skin, and balance.",
      },
      {
        product: "Green Chili Powder",
        details: "Adds natural heat, metabolism, and vitamin C for immunity.",
      },
      {
        product: "Onion Flakes Powder",
        details:
          "Elevates flavor with antioxidants that support heart health and immunity.",
      },
      {
        product: "Mint & Coriander Powder",
        details:
          "Vitamins A, C with phytonutrients. Promotes digestion and radiant skin.",
      },
      {
        product: "Cabbage Powder",
        details:
          "Fiber, vitamin C, antioxidants. Supports digestion, immunity, and skin health.",
      },
      {
        product: "Lemon Powder",
        details:
          "Vitamin C and antioxidants. Rejuvenates, enhances immunity, and brightens skin.",
      },
      {
        product: "Garlic Powder",
        details:
          "Vitamins B6, C, sulfur compounds. Supports heart health, immunity, and cholesterol balance.",
      },
      {
        product: "Capsicum Flakes Powder",
        details:
          "Metabolism support, digestion aid, antioxidant boost for heart and immunity.",
      },
      {
        product: "Pumpkin Powder",
        details:
          "Antioxidants, fiber, vitamins A and C. Supports immunity, digestion, and skin.",
      },
      {
        product: "Fenugreek Powder",
        details:
          "Vitamins A, C, B6. Enhances digestive wellness, hair, and skin radiance.",
      },
      {
        product: "Sorrel Leaves Powder",
        details:
          "Vitamin C-rich antioxidants that uplift immunity and digestion.",
      },
    ],
  },
  {
    name: "Dehydrated Fruit Slices & Powders",
    usage:
      "Perfect for snacking, breakfast bowls, and adding texture or natural sweetness to meals.",
    tone: "from-white via-amber-50 to-green-50",
    products: [
      {
        product: "Banana Powder",
        details:
          "Vitamins B6, C, potassium. Enhances energy and digestive harmony.",
      },
      {
        product: "Papaya Powder",
        details:
          "Vitamins A, C, E plus enzymes. Rejuvenates, aids digestion, and restores radiance.",
      },
      {
        product: "Mango Powder",
        details:
          "Vitamins A, C, E. Boosts immunity, eye health, and glowing skin.",
      },
      {
        product: "Pineapple Powder",
        details:
          "Bromelain enzymes and vitamin C. Supports digestion and immunity.",
      },
      {
        product: "Jackfruit Powder",
        details:
          "Fiber and antioxidants for digestion, immunity, and natural energy.",
      },
      {
        product: "Apple Powder",
        details:
          "Fiber-rich antioxidants that support gut health and overall wellness.",
      },
    ],
  },
];

const ProductsSection: React.FC = () => {
  return (
    <section id="products" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <p className="text-sm uppercase tracking-[0.4em] text-amber-700">
            Our Catalogue
          </p>
          <h2 className="heading-lg text-ayusya-brown">
            Nature-Preserved Nutrition for Every Meal
          </h2>
          <p className="text-gray-600">
            Browse our curated categories of dehydrated powders and slices. Each
            batch captures the season at its peak so you can build vibrant meals
            in seconds.
          </p>
        </div>

        <div className="space-y-12">
          {productCategories.map((category) => (
            <div
              key={category.name}
              className={`rounded-[32px] border border-amber-100 bg-gradient-to-br ${category.tone} p-6 md:p-10 shadow-lg`}
            >
              <div className="flex flex-col gap-8 lg:flex-row">
                <div className="lg:w-1/3 space-y-4">
                  <p className="text-xs uppercase tracking-[0.4em] text-amber-700">
                    Category
                  </p>
                  <h3 className="heading-md text-ayusya-brown">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-700">{category.usage}</p>
                  <div className="rounded-2xl border border-dashed border-amber-400/50 bg-white/50 p-4">
                    <div className="h-32 rounded-xl bg-green-500/20 flex items-center justify-center text-xs font-semibold uppercase tracking-[0.4em] text-green-800/80">
                      Placeholder Visual
                    </div>
                    <p className="mt-3 text-center text-xs uppercase tracking-[0.3em] text-amber-800">
                      Sun-Dried Goodness
                    </p>
                  </div>
                </div>

                <div className="lg:w-2/3 grid gap-4 md:grid-cols-2">
                  {category.products.map((item) => (
                    <div
                      key={item.product}
                      className="rounded-2xl border border-white/60 bg-white/90 p-4 shadow-sm"
                    >
                      <p className="text-sm font-semibold text-amber-900">
                        {item.product}
                      </p>
                      <p className="mt-2 text-sm text-gray-600">
                        {item.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button
            asChild
            className="bg-ayusya-green hover:bg-ayusya-green/90 text-white flex items-center gap-2 px-8 py-6 rounded-full"
          >
            <Link to="/products">
              View Full Catalogue
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

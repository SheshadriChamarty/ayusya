import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Product } from "../data/productData";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState<string | null>(null);

  const handleButtonPress = (buttonType: string, action: () => void) => {
    setIsButtonPressed(buttonType);
    setTimeout(() => {
      setIsButtonPressed(null);
      action();
    }, 300);
  };

  return (
    <div className="product-card h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] animate-fade-in">
      <div className="aspect-square bg-ayusya-lightGreen flex items-center justify-center p-6 overflow-hidden">
        <div className="h-full w-full bg-white rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-[1.03]">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[80%] max-w-[80%] object-contain transition-opacity"
            loading="lazy"
          />
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-serif font-medium text-ayusya-brown mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="mb-3">
          <h4 className="font-medium text-ayusya-green text-sm">
            Key Benefits:
          </h4>
          <ul className="text-sm text-gray-600 mt-1">
            {product.benefits.slice(0, 2).map((benefit, index) => (
              <li key={index} className="flex items-start mb-1">
                <span className="text-ayusya-green mr-2">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ${
            isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mb-4">
            <h4 className="font-medium text-ayusya-green mb-2">
              All Benefits:
            </h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {product.benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-ayusya-green mb-2">Usage Ideas:</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {product.usage.map((usage, index) => (
                <li
                  key={index}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${
                      (index + product.benefits.length) * 100
                    }ms`,
                  }}
                >
                  {usage}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="mb-4 animate-fade-in"
            style={{ animationDelay: "400ms" }}
          >
            <h4 className="font-medium text-ayusya-green mb-2">Shelf Life:</h4>
            <p className="text-gray-600">{product.shelfLife}</p>
          </div>
        </div>

        <div className="mt-auto pt-4 flex flex-col gap-3">
          <button
            className="text-ayusya-green font-medium flex items-center self-start relative overflow-hidden group"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="relative z-10">
              {isExpanded ? "Show less" : "Learn more"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 transition-transform duration-300 ease-in-out ${
                isExpanded ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-ayusya-green scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
          </button>

          <div className="w-full mt-auto">
            <Button
              variant="default"
              className={`w-full flex items-center justify-center bg-ayusya-green hover:bg-ayusya-green/90 whitespace-nowrap transition-all duration-300 ${
                isButtonPressed === "whatsapp"
                  ? "bg-ayusya-green/80 scale-95"
                  : ""
              }`}
              onClick={() =>
                handleButtonPress("whatsapp", () =>
                  window.open("https://wa.me/+918333832277")
                )
              }
            >
              <MessageCircle size={16} className="mr-2 shrink-0" /> Order on
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

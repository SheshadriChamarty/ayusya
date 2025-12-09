
export interface Product {
  id: number;
  name: string;
  description: string;
  benefits: string[];
  usage: string[];
  shelfLife: string;
  image: string;
  categories: string[]; // New field for better filtering
  forAges: string[]; // New field to filter by family member
  isPopular?: boolean; // Optional field for popular products
  isNew?: boolean; // Optional field for new products
}

export const productData: Product[] = [
  {
    id: 1,
    name: "Moringa Powder",
    description: "Sun-dried and powdered moringa leaves rich in essential vitamins, minerals, and antioxidants.",
    benefits: [
      "High in vitamins A, C, and E",
      "Rich source of plant protein",
      "Supports immune health",
      "Natural energy booster"
    ],
    usage: [
      "Add to smoothies and juices",
      "Mix into soups and curries",
      "Sprinkle over salads",
      "Brew as herbal tea"
    ],
    shelfLife: "12 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Immunity", "Energy", "Nutrition"],
    forAges: ["All Ages"],
    isPopular: true
  },
  {
    id: 2,
    name: "Spinach Powder",
    description: "Nutrient-dense spinach leaves, carefully sun-dried and ground to preserve maximum nutrition.",
    benefits: [
      "Excellent source of iron",
      "High in folate and vitamin K",
      "Supports bone health",
      "Rich in antioxidants"
    ],
    usage: [
      "Blend into green smoothies",
      "Mix into pasta sauces",
      "Add to homemade bread dough",
      "Stir into soups and stews"
    ],
    shelfLife: "10 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Bone Health", "Blood Health", "Nutrition"],
    forAges: ["All Ages", "Kids", "Elderly"]
  },
  {
    id: 3,
    name: "Green Chilli Powder",
    description: "Sun-dried green chillies ground into a fine, flavor-packed powder that adds heat and depth to any dish.",
    benefits: [
      "Natural metabolism booster",
      "Rich in vitamin C",
      "Contains capsaicin for pain relief",
      "Supports respiratory health"
    ],
    usage: [
      "Add to curries and marinades",
      "Sprinkle on roasted vegetables",
      "Mix into dips and sauces",
      "Season grilled meats and fish"
    ],
    shelfLife: "12 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Metabolism", "Immunity", "Digestion"],
    forAges: ["Adults", "Elderly"]
  },
  {
    id: 4,
    name: "Tomato Powder",
    description: "Vine-ripened tomatoes, sun-dried to concentrate flavor and nutrients, then finely ground.",
    benefits: [
      "Rich in lycopene antioxidant",
      "Good source of vitamins A and C",
      "Supports heart health",
      "Promotes healthy skin"
    ],
    usage: [
      "Reconstitute for tomato paste or sauce",
      "Add to soups and stews",
      "Mix into dressings and marinades",
      "Blend into spice rubs"
    ],
    shelfLife: "10 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Heart Health", "Skin Health", "Antioxidants"],
    forAges: ["All Ages"]
  },
  {
    id: 5,
    name: "Banana Powder",
    description: "Naturally sweet, energy-rich banana powder made from sun-dried, ripe bananas.",
    benefits: [
      "Natural source of energy",
      "Rich in potassium and magnesium",
      "Contains digestive enzymes",
      "Supports gut health"
    ],
    usage: [
      "Add to smoothies and shakes",
      "Mix into oatmeal and breakfast cereals",
      "Use in baking as natural sweetener",
      "Blend into homemade energy bars"
    ],
    shelfLife: "8 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Energy", "Digestion", "Kids Favorite"],
    forAges: ["All Ages", "Kids"],
    isPopular: true
  },
  {
    id: 6,
    name: "Mint Powder",
    description: "Refreshing mint leaves, carefully sun-dried and ground to preserve their aromatic oils and benefits.",
    benefits: [
      "Supports digestive health",
      "Natural breath freshener",
      "Cooling and calming properties",
      "Rich in antioxidants"
    ],
    usage: [
      "Add to teas and cold drinks",
      "Mix into yogurt and desserts",
      "Sprinkle over fruit salads",
      "Use in savory dishes and sauces"
    ],
    shelfLife: "9 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Digestion", "Relaxation", "Freshness"],
    forAges: ["All Ages"],
    isNew: true
  },
  {
    id: 7,
    name: "Coriander Powder",
    description: "Fresh coriander leaves, sun-dried at peak freshness and ground into a versatile culinary powder.",
    benefits: [
      "Supports digestive health",
      "Rich in vitamins A, C and K",
      "Contains essential minerals",
      "Natural detoxifying properties"
    ],
    usage: [
      "Add to curries and soups",
      "Mix into marinades and dressings",
      "Sprinkle over finished dishes",
      "Blend into chutneys and dips"
    ],
    shelfLife: "10 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Digestion", "Detox", "Culinary"],
    forAges: ["All Ages"]
  }
];

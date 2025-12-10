
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
  },
  {
    id: 8,
    name: "Bittergourd Powder",
    description: "Sun-dried bittergourd crafted into a fine powder for metabolic and blood-sugar support.",
    benefits: [
      "Supports healthy blood sugar",
      "Rich in antioxidants",
      "Traditional metabolic support",
      "Helps digestive balance"
    ],
    usage: [
      "Blend into smoothies with greens",
      "Stir into warm water or soups",
      "Add to savory batters and doughs",
      "Mix with spices for curries"
    ],
    shelfLife: "9 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Metabolism", "Digestion", "Nutrition"],
    forAges: ["Adults", "Elderly"]
  },
  {
    id: 9,
    name: "Sweet Potato Powder",
    description: "Naturally sweet, fiber-rich powder made from gently dried sweet potatoes.",
    benefits: [
      "Good source of complex carbs",
      "Rich in beta-carotene",
      "Supports gut health",
      "Naturally sweet flavor"
    ],
    usage: [
      "Add to smoothies or shakes",
      "Use in pancakes and baking",
      "Thicken soups and stews",
      "Blend into baby food"
    ],
    shelfLife: "10 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Energy", "Kids Favorite", "Nutrition"],
    forAges: ["All Ages", "Kids"]
  },
  {
    id: 10,
    name: "Ginger Powder",
    description: "Aromatic dried ginger powder to add warmth and digestive support to dishes and drinks.",
    benefits: [
      "Supports digestion",
      "Helps nausea relief",
      "Anti-inflammatory properties",
      "Boosts circulation"
    ],
    usage: [
      "Add to teas and kadha",
      "Mix into curries and marinades",
      "Blend into baked goods",
      "Sprinkle over soups"
    ],
    shelfLife: "12 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Digestion", "Immunity", "Spices"],
    forAges: ["All Ages"]
  },
  {
    id: 11,
    name: "Soreal Powder",
    description: "Tangy soreal leaves dried and powdered for a citrusy, antioxidant-rich boost.",
    benefits: [
      "Rich in vitamin C",
      "Supports immunity",
      "Bright, tangy flavor",
      "Antioxidant support"
    ],
    usage: [
      "Stir into soups and stews",
      "Add to chutneys and dips",
      "Blend into smoothies",
      "Use in marinades and dressings"
    ],
    shelfLife: "8 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Immunity", "Antioxidants", "Culinary"],
    forAges: ["All Ages"]
  },
  {
    id: 12,
    name: "Onion Powder",
    description: "Slow-dried onions milled into a convenient, flavor-packed powder.",
    benefits: [
      "Adds savory depth",
      "No tears, ready to use",
      "Natural antioxidants",
      "Consistent flavor"
    ],
    usage: [
      "Season soups and curries",
      "Add to marinades and rubs",
      "Mix into dips and sauces",
      "Enhance roasted veggies"
    ],
    shelfLife: "12 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Culinary", "Convenience", "Flavor"],
    forAges: ["All Ages"]
  },
  {
    id: 13,
    name: "Garlic Powder",
    description: "Aromatic garlic dried and ground for an easy, consistent punch of flavor.",
    benefits: [
      "Supports heart health",
      "Natural antimicrobial properties",
      "Rich flavor, no peeling",
      "Convenient seasoning"
    ],
    usage: [
      "Use in curries and sauces",
      "Add to marinades and rubs",
      "Sprinkle on roasted veggies",
      "Blend into dips and dressings"
    ],
    shelfLife: "12 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Culinary", "Heart Health", "Flavor"],
    forAges: ["All Ages"]
  },
  {
    id: 14,
    name: "Pumpkin Powder",
    description: "Mild, naturally sweet pumpkin powder rich in fiber and beta-carotene.",
    benefits: [
      "Supports eye health",
      "Good source of fiber",
      "Naturally sweet flavor",
      "Rich in beta-carotene"
    ],
    usage: [
      "Blend into smoothies",
      "Use in baking and pancakes",
      "Thicken soups and sauces",
      "Add to baby foods"
    ],
    shelfLife: "10 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Nutrition", "Kids Favorite", "Fiber"],
    forAges: ["All Ages", "Kids"]
  },
  {
    id: 15,
    name: "Lemon Powder",
    description: "Zesty lemon powder delivering bright citrus flavor and vitamin C.",
    benefits: [
      "Rich in vitamin C",
      "Brightens flavor",
      "Supports immunity",
      "Adds natural acidity"
    ],
    usage: [
      "Add to teas and coolers",
      "Use in marinades and dressings",
      "Sprinkle over salads and fruits",
      "Bake into desserts"
    ],
    shelfLife: "9 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Immunity", "Flavor", "Antioxidants"],
    forAges: ["All Ages"]
  },
  {
    id: 16,
    name: "Pineapple Powder",
    description: "Tropical pineapple powder with natural sweetness and bromelain enzymes.",
    benefits: [
      "Natural source of bromelain",
      "Supports digestion",
      "Sweet, tropical flavor",
      "Rich in vitamin C"
    ],
    usage: [
      "Add to smoothies and juices",
      "Use in desserts and baking",
      "Mix into yogurt and cereals",
      "Flavor marinades and sauces"
    ],
    shelfLife: "8 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Digestion", "Energy", "Kids Favorite"],
    forAges: ["All Ages", "Kids"]
  },
  {
    id: 17,
    name: "Papaya Powder",
    description: "Gentle papaya powder rich in papain enzymes for digestive support.",
    benefits: [
      "Supports gut health",
      "Contains papain enzymes",
      "Rich in vitamin A and C",
      "Naturally sweet"
    ],
    usage: [
      "Blend into smoothies",
      "Add to yogurt and bowls",
      "Use in baking for sweetness",
      "Mix into marinades for tenderizing"
    ],
    shelfLife: "8 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Digestion", "Kids Favorite", "Nutrition"],
    forAges: ["All Ages"]
  },
  {
    id: 18,
    name: "Mango Powder",
    description: "Sun-kissed mango powder delivering bright, naturally sweet flavor.",
    benefits: [
      "Rich in vitamins A and C",
      "Antioxidant support",
      "Naturally sweet and tangy",
      "Great for kids' favorites"
    ],
    usage: [
      "Add to smoothies and lassi",
      "Use in desserts and ice creams",
      "Mix into yogurts and cereals",
      "Flavor marinades and sauces"
    ],
    shelfLife: "8 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Kids Favorite", "Antioxidants", "Energy"],
    forAges: ["All Ages", "Kids"]
  },
  {
    id: 19,
    name: "Apple Powder",
    description: "Naturally sweet apple powder with gentle fiber and polyphenols.",
    benefits: [
      "Supports digestion with fiber",
      "Naturally sweet flavor",
      "Contains polyphenol antioxidants",
      "Kid-friendly ingredient"
    ],
    usage: [
      "Add to smoothies and oats",
      "Use in baking and pancakes",
      "Mix into yogurt or cereals",
      "Blend into baby food"
    ],
    shelfLife: "8 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Kids Favorite", "Digestion", "Antioxidants"],
    forAges: ["All Ages", "Kids"]
  },
  {
    id: 20,
    name: "Jackfruit Powder",
    description: "Naturally sweet jackfruit powder, fiber-rich and prebiotic friendly.",
    benefits: [
      "Good source of fiber",
      "Supports gut microbiome",
      "Naturally sweet flavor",
      "Plant-based energy"
    ],
    usage: [
      "Blend into smoothies",
      "Use in baking and batters",
      "Mix into porridge or cereals",
      "Add to desserts for sweetness"
    ],
    shelfLife: "9 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Digestion", "Energy", "Kids Favorite"],
    forAges: ["All Ages"]
  },
  {
    id: 21,
    name: "Red Chilli Powder",
    description: "Sun-dried red chillies ground for bold heat and depth of flavor.",
    benefits: [
      "Adds heat and aroma",
      "Rich in capsaicin",
      "Supports metabolism",
      "Enhances savory dishes"
    ],
    usage: [
      "Use in curries and gravies",
      "Add to marinades and rubs",
      "Mix into spice blends",
      "Sprinkle for finishing heat"
    ],
    shelfLife: "12 months when stored in a cool, dry place",
    image: "/placeholder.svg",
    categories: ["Spices", "Metabolism", "Culinary"],
    forAges: ["Adults", "Elderly"]
  },
  
];

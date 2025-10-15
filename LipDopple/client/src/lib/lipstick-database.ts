export interface Lipstick {
  id: number;
  name: string;
  brand: string;
  price: string;
  priceValue: number;
  shade: string;
  availability: "in-stock" | "online" | "limited";
  finish: "Matte" | "Satin" | "Glossy" | "Cream" | "Liquid Matte" | "Tint" | "Powder Matte";
  undertone: "warm" | "cool" | "neutral";
  imageUrl: string;
  searchTerms: string[]; // For better fuzzy matching
  description?: string;
}

export interface DupeRelationship {
  originalId: number;
  dupeIds: number[];
}

export const lipstickDatabase: Lipstick[] = [
  // High-end originals
  {
    id: 100,
    name: "Ruby Woo",
    brand: "MAC",
    price: "$19.00",
    priceValue: 19.0,
    shade: "Ruby Woo",
    availability: "in-stock",
    finish: "Matte",
    undertone: "cool",
    imageUrl: "https://images.unsplash.com/photo-1602260395251-0fe691861b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBsaXBzdGljayUyMGJlYXV0eXxlbnwxfHx8fDE3NjA0NTMxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["MAC", "Ruby Woo", "red", "matte", "cool red", "blue-based red"],
    description: "Iconic blue-toned red matte lipstick"
  },
  {
    id: 101,
    name: "Pillow Talk",
    brand: "Charlotte Tilbury",
    price: "$34.00",
    priceValue: 34.0,
    shade: "Pillow Talk",
    availability: "in-stock",
    finish: "Satin",
    undertone: "neutral",
    imageUrl: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudWRlJTIwbGlwc3RpY2slMjBtYWtldXB8ZW58MXx8fHwxNzYwNDUzMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["Charlotte Tilbury", "Pillow Talk", "nude", "pink", "neutral", "mlbb"],
    description: "The ultimate nude-pink, my lips but better shade"
  },
  {
    id: 102,
    name: "Velvet Teddy",
    brand: "MAC",
    price: "$19.00",
    priceValue: 19.0,
    shade: "Velvet Teddy",
    availability: "in-stock",
    finish: "Matte",
    undertone: "warm",
    imageUrl: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudWRlJTIwbGlwc3RpY2slMjBtYWtldXB8ZW58MXx8fHwxNzYwNDUzMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["MAC", "Velvet Teddy", "brown", "nude", "matte", "warm"],
    description: "Warm brown-nude matte lipstick"
  },
  {
    id: 103,
    name: "Icon",
    brand: "Huda Beauty",
    price: "$25.00",
    priceValue: 25.0,
    shade: "Icon",
    availability: "online",
    finish: "Matte",
    undertone: "warm",
    imageUrl: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudWRlJTIwbGlwc3RpY2slMjBtYWtldXB8ZW58MXx8fHwxNzYwNDUzMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["Huda Beauty", "Icon", "Iconic", "Power Bullet", "nude", "brown"],
    description: "Huda Beauty Power Bullet Matte Lipstick"
  },
  {
    id: 104,
    name: "Rouge Pur Couture",
    brand: "YSL",
    price: "$38.00",
    priceValue: 38.0,
    shade: "Le Rouge",
    availability: "in-stock",
    finish: "Satin",
    undertone: "cool",
    imageUrl: "https://images.unsplash.com/photo-1602260395251-0fe691861b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBsaXBzdGljayUyMGJlYXV0eXxlbnwxfHx8fDE3NjA0NTMxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["YSL", "Rouge Pur", "red", "satin", "luxury"],
    description: "Luxurious red satin finish lipstick"
  },

  // Affordable dupes
  {
    id: 1,
    name: "Super Stay Matte Ink",
    brand: "Maybelline",
    price: "$9.99",
    priceValue: 9.99,
    shade: "Pioneer",
    availability: "in-stock",
    finish: "Liquid Matte",
    undertone: "cool",
    imageUrl: "https://images.unsplash.com/photo-1602260395251-0fe691861b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBsaXBzdGljayUyMGJlYXV0eXxlbnwxfHx8fDE3NjA0NTMxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["Maybelline", "Super Stay", "Pioneer", "red", "liquid matte", "dupe"],
    description: "Long-lasting liquid matte lipstick"
  },
  {
    id: 2,
    name: "Color Sensational Vivids",
    brand: "Maybelline",
    price: "$7.99",
    priceValue: 7.99,
    shade: "On Fire",
    availability: "online",
    finish: "Satin",
    undertone: "warm",
    imageUrl: "https://images.unsplash.com/photo-1590156352123-30ceb8ac96b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXBzdGljayUyMG1ha2V1cHxlbnwxfHx8fDE3NjA0NTMxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["Maybelline", "Color Sensational", "Vivids", "On Fire", "red"],
    description: "Vivid pigmented satin lipstick"
  },
  {
    id: 3,
    name: "Velvet Matte Lipstick",
    brand: "NYX",
    price: "$6.99",
    priceValue: 6.99,
    shade: "Volcano",
    availability: "in-stock",
    finish: "Matte",
    undertone: "cool",
    imageUrl: "https://images.unsplash.com/photo-1602260395251-0fe691861b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBsaXBzdGljayUyMGJlYXV0eXxlbnwxfHx8fDE3NjA0NTMxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["NYX", "Velvet Matte", "Volcano", "red", "matte", "affordable"],
    description: "Soft matte finish lipstick"
  },
  {
    id: 4,
    name: "Lasting Fix Lip Tint",
    brand: "Etude House",
    price: "$8.50",
    priceValue: 8.5,
    shade: "Red Velvet",
    availability: "limited",
    finish: "Tint",
    undertone: "cool",
    imageUrl: "https://images.unsplash.com/photo-1590156352123-30ceb8ac96b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXBzdGljayUyMG1ha2V1cHxlbnwxfHx8fDE3NjA0NTMxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["Etude House", "Lasting Fix", "Red Velvet", "tint", "korean"],
    description: "Long-lasting lip tint"
  },
  {
    id: 5,
    name: "ColorStay Satin Ink",
    brand: "Revlon",
    price: "$10.99",
    priceValue: 10.99,
    shade: "In The Nude",
    availability: "in-stock",
    finish: "Satin",
    undertone: "neutral",
    imageUrl: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudWRlJTIwbGlwc3RpY2slMjBtYWtldXB8ZW58MXx8fHwxNzYwNDUzMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["Revlon", "ColorStay", "In The Nude", "nude", "pink", "satin"],
    description: "Long-wear satin lipstick"
  },
  {
    id: 6,
    name: "Lip Lingerie Push-Up",
    brand: "NYX",
    price: "$7.99",
    priceValue: 7.99,
    shade: "Silk Indulgent",
    availability: "online",
    finish: "Cream",
    undertone: "neutral",
    imageUrl: "https://images.unsplash.com/photo-1591375462355-a219af30bf16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwbGlwc3RpY2slMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzYwNDUzMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["NYX", "Lip Lingerie", "nude", "cream", "mlbb"],
    description: "Creamy nude lipstick"
  },
  {
    id: 7,
    name: "Stunna Lip Paint",
    brand: "Fenty Beauty",
    price: "$25.00",
    priceValue: 25.0,
    shade: "Uncuffed",
    availability: "in-stock",
    finish: "Liquid Matte",
    undertone: "neutral",
    imageUrl: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudWRlJTIwbGlwc3RpY2slMjBtYWtldXB8ZW58MXx8fHwxNzYwNDUzMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["Fenty", "Stunna", "nude", "liquid matte"],
    description: "Fenty's liquid matte lip paint"
  },
  {
    id: 8,
    name: "Velvetines Liquid Matte",
    brand: "Lime Crime",
    price: "$20.00",
    priceValue: 20.0,
    shade: "Cashmere",
    availability: "limited",
    finish: "Liquid Matte",
    undertone: "neutral",
    imageUrl: "https://images.unsplash.com/photo-1591375462355-a219af30bf16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwbGlwc3RpY2slMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzYwNDUzMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["Lime Crime", "Velvetines", "Cashmere", "nude", "liquid matte"],
    description: "Velvety liquid matte lipstick"
  },
  {
    id: 9,
    name: "Super Stay Matte Ink",
    brand: "Maybelline",
    price: "$9.99",
    priceValue: 9.99,
    shade: "Voyager",
    availability: "in-stock",
    finish: "Liquid Matte",
    undertone: "warm",
    imageUrl: "https://images.unsplash.com/photo-1590156352123-30ceb8ac96b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaXBzdGljayUyMG1ha2V1cHxlbnwxfHx8fDE3NjA0NTMxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["Maybelline", "Super Stay", "Voyager", "brown", "nude"],
    description: "Long-wear liquid matte"
  },
  {
    id: 10,
    name: "ColorStay Satin Ink",
    brand: "Revlon",
    price: "$10.99",
    priceValue: 10.99,
    shade: "Silky Sienna",
    availability: "online",
    finish: "Satin",
    undertone: "warm",
    imageUrl: "https://images.unsplash.com/photo-1591375462355-a219af30bf16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwbGlwc3RpY2slMjBjb3NtZXRpY3N8ZW58MXx8fHwxNzYwNDUzMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["Revlon", "ColorStay", "Silky Sienna", "nude", "satin"],
    description: "Satin finish nude lipstick"
  },
  {
    id: 11,
    name: "Lip Lingerie",
    brand: "NYX",
    price: "$7.99",
    priceValue: 7.99,
    shade: "Cabaret Show",
    availability: "in-stock",
    finish: "Cream",
    undertone: "warm",
    imageUrl: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudWRlJTIwbGlwc3RpY2slMjBtYWtldXB8ZW58MXx8fHwxNzYwNDUzMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["NYX", "Lip Lingerie", "Cabaret Show", "nude", "brown"],
    description: "Creamy warm nude"
  },
  {
    id: 12,
    name: "Glossy Lip Stain",
    brand: "e.l.f.",
    price: "$5.00",
    priceValue: 5.0,
    shade: "Crimson Crush",
    availability: "in-stock",
    finish: "Glossy",
    undertone: "cool",
    imageUrl: "https://images.unsplash.com/photo-1602260395251-0fe691861b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBsaXBzdGljayUyMGJlYXV0eXxlbnwxfHx8fDE3NjA0NTMxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["elf", "e.l.f.", "Glossy", "Crimson Crush", "red", "affordable"],
    description: "Budget-friendly glossy lip stain"
  },
  {
    id: 13,
    name: "Matte Lipstick",
    brand: "Wet n Wild",
    price: "$4.99",
    priceValue: 4.99,
    shade: "Cherry Bomb",
    availability: "in-stock",
    finish: "Matte",
    undertone: "warm",
    imageUrl: "https://images.unsplash.com/photo-1602260395251-0fe691861b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBsaXBzdGljayUyMGJlYXV0eXxlbnwxfHx8fDE3NjA0NTMxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["Wet n Wild", "Cherry Bomb", "red", "matte", "budget"],
    description: "Affordable matte red lipstick"
  },
  {
    id: 14,
    name: "Powder Kiss",
    brand: "MAC",
    price: "$21.00",
    priceValue: 21.0,
    shade: "Devoted to Chili",
    availability: "online",
    finish: "Powder Matte",
    undertone: "warm",
    imageUrl: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudWRlJTIwbGlwc3RpY2slMjBtYWtldXB8ZW58MXx8fHwxNzYwNDUzMTI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    searchTerms: ["MAC", "Powder Kiss", "Devoted to Chili", "nude", "powder matte"],
    description: "Soft powder matte finish"
  },
];

// Define which lipsticks are dupes of which
export const dupeRelationships: DupeRelationship[] = [
  {
    originalId: 100, // MAC Ruby Woo
    dupeIds: [1, 3, 4, 12, 13]
  },
  {
    originalId: 101, // Charlotte Tilbury Pillow Talk
    dupeIds: [5, 6, 7, 8]
  },
  {
    originalId: 102, // MAC Velvet Teddy
    dupeIds: [9, 10, 11, 14]
  },
  {
    originalId: 103, // Huda Beauty Icon
    dupeIds: [9, 10, 11]
  },
  {
    originalId: 104, // YSL Rouge Pur
    dupeIds: [1, 2, 13]
  }
];

export function findDupesForLipstick(lipstickId: number): Lipstick[] {
  const relationship = dupeRelationships.find(r => r.originalId === lipstickId);
  if (!relationship) return [];
  
  return relationship.dupeIds
    .map(id => lipstickDatabase.find(l => l.id === id))
    .filter((l): l is Lipstick => l !== undefined)
    .map((dupe, index) => ({
      ...dupe,
      matchPercentage: 95 - (index * 3), // Decreasing match percentage
      isBestMatch: index === 0
    }));
}

export function findOriginalForDupe(dupeId: number): Lipstick | null {
  const relationship = dupeRelationships.find(r => r.dupeIds.includes(dupeId));
  if (!relationship) return null;
  
  return lipstickDatabase.find(l => l.id === relationship.originalId) || null;
}

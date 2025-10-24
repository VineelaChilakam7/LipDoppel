export interface Lipstick {
  _id: string;
  name: string;
  brand: string;
  price: number;
  priceValue: number;
  shade: string;
  availability: "in-stock" | "online" | "limited";
  finish: string;
  undertone: string;
  imageUrl: string;
  description?: string;
}

const API_BASE = "http://localhost:5050/api/products";

export async function fetchAllLipsticks(): Promise<Lipstick[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function searchLipsticks(term: string): Promise<Lipstick[]> {
  const res = await fetch(`${API_BASE}?search=${encodeURIComponent(term)}`);
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

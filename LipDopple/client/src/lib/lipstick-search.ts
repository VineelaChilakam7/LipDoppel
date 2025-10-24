import Fuse from "fuse.js";
import { fetchAllLipsticks, searchLipsticks as apiSearchLipsticks } from "./lipstick-service";
import type { Lipstick } from "./lipstick-types";

export interface SearchResult extends Lipstick {
  matchPercentage?: number;
  isBestMatch?: boolean;
}

export async function searchLipsticks(query: string, selectedLipstick?: Lipstick): Promise<SearchResult[]> {
  const parsed = parseSearchQuery(query);
  let allLipsticks: Lipstick[] = [];

  try {
    // Step 1: Fetch data
    if (parsed.searchTerm) {
      allLipsticks = await apiSearchLipsticks(parsed.searchTerm);
    } else {
      allLipsticks = await fetchAllLipsticks();
    }
  } catch (error) {
    console.error("Error fetching from API:", error);
    return [];
  }

  // Step 2: Handle "dupe" searches
  if (parsed.isDupeSearch && selectedLipstick) {
    const dupes = findSimilarLipsticks(selectedLipstick, allLipsticks);
    return applyFilters(dupes, parsed);
  }

  // Step 3: Fuzzy search
  const fuse = new Fuse(allLipsticks, {
    keys: [
      { name: "name", weight: 2 },
      { name: "brand", weight: 2 },
      { name: "shade", weight: 1.5 },
      { name: "finish", weight: 0.5 }
    ],
    threshold: 0.4,
    includeScore: true,
  });

  const results = fuse.search(parsed.searchTerm || query);
  const matchedLipsticks = results.map((result, index) => ({
    ...result.item,
    matchPercentage: Math.round((1 - (result.score || 0)) * 100),
    isBestMatch: index === 0,
  }));

  return applyFilters(matchedLipsticks, parsed);
}


export function parseSearchQuery(query: string): {
  searchTerm: string;
  maxPrice?: number;
  finish?: string;
  undertone?: string;
  isDupeSearch: boolean;
} {
  let searchTerm = query.toLowerCase();
  let maxPrice: number | undefined;
  let finish: string | undefined;
  let undertone: string | undefined;
  const isDupeSearch = searchTerm.includes("dupe");

  const pricePatterns = [
    /under\s*\$?(\d+)/i,
    /below\s*\$?(\d+)/i,
    /less than\s*\$?(\d+)/i,
    /\$?(\d+)\s*or\s*less/i,
  ];

  for (const pattern of pricePatterns) {
    const match = query.match(pattern);
    if (match) {
      maxPrice = parseInt(match[1]);
      searchTerm = searchTerm.replace(pattern, "").trim();
    }
  }

  const finishes = ["matte", "satin", "glossy", "cream", "liquid matte", "tint"];
  for (const f of finishes) {
    if (searchTerm.includes(f)) {
      finish = f.charAt(0).toUpperCase() + f.slice(1);
      searchTerm = searchTerm.replace(f, "").trim();
    }
  }

  const undertones = ["warm", "cool", "neutral"];
  for (const u of undertones) {
    if (searchTerm.includes(u)) {
      undertone = u;
      searchTerm = searchTerm.replace(u, "").trim();
    }
  }

  searchTerm = searchTerm.replace(/\s+/g, " ").replace(/dupe/gi, "").trim();
  return { searchTerm, maxPrice, finish, undertone, isDupeSearch };
}

function findSimilarLipsticks(lipstick: Lipstick, allLipsticks: Lipstick[]): SearchResult[] {
  return allLipsticks
    .filter(l => 
      l._id !== lipstick._id &&
      l.finish === lipstick.finish &&
      l.brand !== lipstick.brand
    )
    .map((dupe, index) => ({
      ...dupe,
      matchPercentage: 90 - (index * 3),
      isBestMatch: index === 0,
    }))
    .slice(0, 10);
}

function applyFilters(lipsticks: SearchResult[], filters: { maxPrice?: number; finish?: string; undertone?: string }): SearchResult[] {
  return lipsticks.filter(l => {
    if (filters.maxPrice && (l.price ?? 0) > filters.maxPrice) return false;
    if (filters.finish && !l.finish?.toLowerCase().includes(filters.finish.toLowerCase())) return false;
    if (filters.undertone && l.shade && !l.shade.toLowerCase().includes(filters.undertone.toLowerCase())) return false;
    return true;
  });
}

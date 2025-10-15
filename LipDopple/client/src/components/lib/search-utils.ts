import Fuse from "fuse.js";
import { lipstickDatabase, findDupesForLipstick, type Lipstick } from "./lipstick-database";

export interface SearchResult extends Lipstick {
  matchPercentage?: number;
  isBestMatch?: boolean;
}

// Parse natural language queries
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

  // Extract price constraints
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

  // Extract finish type
  const finishes = ["matte", "satin", "glossy", "cream", "liquid matte", "tint"];
  for (const f of finishes) {
    if (searchTerm.includes(f)) {
      finish = f.charAt(0).toUpperCase() + f.slice(1);
      searchTerm = searchTerm.replace(f, "").trim();
    }
  }

  // Extract undertone
  const undertones = ["warm", "cool", "neutral"];
  for (const u of undertones) {
    if (searchTerm.includes(u)) {
      undertone = u;
      searchTerm = searchTerm.replace(u, "").trim();
    }
  }

  // Clean up search term
  searchTerm = searchTerm
    .replace(/\s+/g, " ")
    .replace(/dupe/gi, "")
    .trim();

  return { searchTerm, maxPrice, finish, undertone, isDupeSearch };
}

export function searchLipsticks(query: string, selectedLipstick?: Lipstick): SearchResult[] {
  const parsed = parseSearchQuery(query);
  
  // If autocomplete selected a specific lipstick or query is for dupes
  if (selectedLipstick || parsed.isDupeSearch) {
    // Find the original lipstick first
    let originalLipstick = selectedLipstick;
    
    if (!originalLipstick && parsed.searchTerm) {
      const fuse = new Fuse(lipstickDatabase, {
        keys: ["name", "brand", "searchTerms"],
        threshold: 0.3,
      });
      
      const results = fuse.search(parsed.searchTerm);
      originalLipstick = results[0]?.item;
    }

    if (originalLipstick) {
      // Find dupes for this lipstick
      let dupes = findDupesForLipstick(originalLipstick.id);
      
      // If the original is affordable, search for similar lipsticks instead
      if (dupes.length === 0 || originalLipstick.priceValue < 15) {
        dupes = findSimilarLipsticks(originalLipstick);
      }

      // Apply additional filters
      return applyFilters(dupes, parsed);
    }
  }

  // Regular search - find all matching lipsticks
  const fuse = new Fuse(lipstickDatabase, {
    keys: [
      { name: "name", weight: 2 },
      { name: "brand", weight: 2 },
      { name: "shade", weight: 1.5 },
      { name: "searchTerms", weight: 1 },
      { name: "finish", weight: 0.5 },
      { name: "undertone", weight: 0.5 },
    ],
    threshold: 0.4,
    includeScore: true,
  });

  const results = fuse.search(parsed.searchTerm || query);
  let matchedLipsticks = results.map((result, index) => ({
    ...result.item,
    matchPercentage: Math.round((1 - (result.score || 0)) * 100),
    isBestMatch: index === 0,
  }));

  return applyFilters(matchedLipsticks, parsed);
}

function findSimilarLipsticks(lipstick: Lipstick): SearchResult[] {
  return lipstickDatabase
    .filter(l => 
      l.id !== lipstick.id &&
      l.finish === lipstick.finish &&
      l.undertone === lipstick.undertone &&
      l.priceValue <= lipstick.priceValue
    )
    .map((dupe, index) => ({
      ...dupe,
      matchPercentage: 90 - (index * 5),
      isBestMatch: index === 0,
    }))
    .slice(0, 10);
}

function applyFilters(
  lipsticks: SearchResult[],
  filters: { maxPrice?: number; finish?: string; undertone?: string }
): SearchResult[] {
  return lipsticks.filter(lipstick => {
    if (filters.maxPrice && lipstick.priceValue > filters.maxPrice) {
      return false;
    }
    if (filters.finish && !lipstick.finish.toLowerCase().includes(filters.finish.toLowerCase())) {
      return false;
    }
    if (filters.undertone && lipstick.undertone !== filters.undertone) {
      return false;
    }
    return true;
  });
}

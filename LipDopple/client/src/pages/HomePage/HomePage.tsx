import { useState } from "react";
import { searchLipsticks, type SearchResult } from "../../lib/lipstick-search";
import type { Lipstick } from "../../lib/lipstick-types";
import { ResultsFilter, type SortOption } from "../../components/ResultsFilter";
import { SearchTabs } from "./SearchTabs";
import { SearchResults } from "./SearchResults";
import { LoadingSpinner } from "./LoadingSpinner";
import { EmptyState } from "./EmptyState";

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<SearchResult[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Filter states
  const [sortBy, setSortBy] = useState<SortOption>("match-desc");
  const [minMatch, setMinMatch] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999);
  const [availabilityFilter, setAvailabilityFilter] = useState<"all" | "in-stock" | "online">("all");
  const [finishFilter, setFinishFilter] = useState("all");
  const [undertoneFilter, setUndertoneFilter] = useState("all");

  const resetFilters = () => {
    setSortBy("match-desc");
    setMinMatch(0);
    setMaxPrice(999);
    setAvailabilityFilter("all");
    setFinishFilter("all");
    setUndertoneFilter("all");
  };

  const handleSearch = async (query: string, lipstick?: Lipstick) => {
    setIsSearching(true);
    setSearchQuery(query);
    resetFilters();

    try {
      const results = await searchLipsticks(query, lipstick); // now async from backend
      setSearchResults(results);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    // Placeholder for image-based search (future)
    setIsSearching(true);
    setSearchQuery("your uploaded image");
    resetFilters();

    // temporarily use a default query
    const results = await searchLipsticks("red matte lipstick");
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleIngredientsSearch = async (ingredients: string) => {
    // Placeholder for ingredients-based search (future)
    setIsSearching(true);
    setSearchQuery("similar formulas");
    resetFilters();

    const results = await searchLipsticks("matte lipstick");
    setSearchResults(results);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-purple-50">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <SearchTabs
          onSearch={handleSearch}
          onImageUpload={handleImageUpload}
          onIngredientsSearch={handleIngredientsSearch}
        />

        {isSearching && <LoadingSpinner />}

        {!isSearching && searchResults && (
          <SearchResults
            results={searchResults}
            searchQuery={searchQuery}
            filters={{
              sortBy,
              setSortBy,
              minMatch,
              setMinMatch,
              maxPrice,
              setMaxPrice,
              availabilityFilter,
              setAvailabilityFilter,
              finishFilter,
              setFinishFilter,
              undertoneFilter,
              setUndertoneFilter,
            }}
          />
        )}

        {!isSearching && !searchResults && <EmptyState />}
      </main>
    </div>
  );
}

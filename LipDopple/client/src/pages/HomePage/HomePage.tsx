import { useState } from "react";
import { searchLipsticks, SearchResult } from "../../lib/search-utils";
import type { Lipstick } from "../../lib/lipstick-database";
import { ResultsFilter, SortOption } from "../../components/ResultsFilter";
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

  const handleSearch = (query: string, lipstick?: Lipstick) => {
    setIsSearching(true);
    setSearchQuery(query);
    resetFilters();

    setTimeout(() => {
      const results = searchLipsticks(query, lipstick);
      setSearchResults(results);
      setIsSearching(false);
    }, 600);
  };

  const handleImageUpload = (file: File) => {
    setIsSearching(true);
    setSearchQuery("your uploaded image");
    resetFilters();

    setTimeout(() => {
      const results = searchLipsticks("red matte lipstick");
      setSearchResults(results);
      setIsSearching(false);
    }, 1500);
  };

  const handleIngredientsSearch = (ingredients: string) => {
    setIsSearching(true);
    setSearchQuery("similar formulas");
    resetFilters();

    setTimeout(() => {
      const results = searchLipsticks("matte lipstick");
      setSearchResults(results);
      setIsSearching(false);
    }, 1200);
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

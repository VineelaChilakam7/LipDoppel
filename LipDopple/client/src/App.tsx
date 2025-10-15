import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { SearchForm } from "./components/SearchForm";
import { ImageUpload } from "./components/ImageUpload";
import { IngredientsForm } from "./components/IngredientsForm";
import { LipstickCard } from "./components/LipstickCard";
import { ResultsFilter, SortOption } from "./components/ResultsFilter";
import { Search, Upload, Sparkles, Microscope } from "lucide-react";
import { searchLipsticks, SearchResult } from "./lib/search-utils";
import type { Lipstick } from "./lib/lipstick-database";

export default function App() {
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

  const handleSearch = (query: string, lipstick?: Lipstick) => {
    setIsSearching(true);
    setSearchQuery(query);
    
    // Reset filters
    setSortBy("match-desc");
    setMinMatch(0);
    setMaxPrice(999);
    setAvailabilityFilter("all");
    setFinishFilter("all");
    setUndertoneFilter("all");
    
    // Simulate API delay for realistic feel
    setTimeout(() => {
      const results = searchLipsticks(query, lipstick);
      setSearchResults(results);
      setIsSearching(false);
    }, 600);
  };

  const handleImageUpload = (file: File) => {
    setIsSearching(true);
    setSearchQuery("your uploaded image");
    
    // Reset filters
    setSortBy("match-desc");
    setMinMatch(0);
    setMaxPrice(999);
    setAvailabilityFilter("all");
    setFinishFilter("all");
    setUndertoneFilter("all");
    
    // Simulate image processing and API delay
    setTimeout(() => {
      // For demo purposes, search for red lipsticks
      const results = searchLipsticks("red matte lipstick");
      setSearchResults(results);
      setIsSearching(false);
    }, 1500);
  };

  const handleIngredientsSearch = (ingredients: string) => {
    setIsSearching(true);
    setSearchQuery("similar formulas");
    
    // Reset filters
    setSortBy("match-desc");
    setMinMatch(0);
    setMaxPrice(999);
    setAvailabilityFilter("all");
    setFinishFilter("all");
    setUndertoneFilter("all");
    
    // Simulate ingredient analysis and API delay
    setTimeout(() => {
      // For demo purposes, return matte lipsticks
      const results = searchLipsticks("matte lipstick");
      setSearchResults(results);
      setIsSearching(false);
    }, 1200);
  };

  // Apply filters and sorting
  const getFilteredAndSortedResults = (): SearchResult[] => {
    if (!searchResults) return [];

    let filtered = searchResults.filter((dupe) => {
      // Filter by match percentage
      if (dupe.matchPercentage !== undefined && dupe.matchPercentage < minMatch) return false;
      
      // Filter by price
      if (dupe.priceValue > maxPrice) return false;
      
      // Filter by availability
      if (availabilityFilter !== "all") {
        if (availabilityFilter === "in-stock" && dupe.availability !== "in-stock") return false;
        if (availabilityFilter === "online" && dupe.availability !== "online") return false;
      }

      // Filter by finish
      if (finishFilter !== "all" && dupe.finish !== finishFilter) return false;

      // Filter by undertone
      if (undertoneFilter !== "all" && dupe.undertone !== undertoneFilter) return false;
      
      return true;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "match-desc":
          const aMatch = a.matchPercentage || 0;
          const bMatch = b.matchPercentage || 0;
          return bMatch - aMatch;
        case "price-asc":
          return a.priceValue - b.priceValue;
        case "price-desc":
          return b.priceValue - a.priceValue;
        case "availability":
          const availabilityOrder = { "in-stock": 0, "online": 1, "limited": 2 };
          return availabilityOrder[a.availability] - availabilityOrder[b.availability];
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredResults = getFilteredAndSortedResults();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-background to-purple-50">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg flex items-center justify-center gap-0.5 p-2">
                {/* Two lipsticks representing original and dupe */}
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-1.5 h-3 bg-white rounded-t-sm"></div>
                  <div className="w-2 h-2 bg-white/90"></div>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-1.5 h-3 bg-white/80 rounded-t-sm"></div>
                  <div className="w-2 h-2 bg-white/70"></div>
                </div>
              </div>
              <div>
                <h1>LipDoppel</h1>
                <p className="text-muted-foreground">Find your perfect lipstick dupe</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Search Section */}
          <div className="bg-background rounded-xl shadow-lg p-6 mb-8">
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="search" className="gap-2">
                  <Search className="w-4 h-4" />
                  Search by Name
                </TabsTrigger>
                <TabsTrigger value="upload" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Image
                </TabsTrigger>
                <TabsTrigger value="ingredients" className="gap-2">
                  <Microscope className="w-4 h-4" />
                  Ingredients
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="search">
                <SearchForm onSearch={handleSearch} />
              </TabsContent>
              
              <TabsContent value="upload">
                <ImageUpload onImageSelect={handleImageUpload} />
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <p className="text-muted-foreground">
                    💡 Tip: For best results, upload a clear photo of the lipstick product or swatch
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="ingredients">
                <IngredientsForm onSearch={handleIngredientsSearch} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Results Section */}
          {isSearching && (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-muted-foreground">Finding the best dupes for you...</p>
            </div>
          )}

          {!isSearching && searchResults && (
            <div>
              <div className="mb-6">
                <h2>
                  {searchResults.some(r => r.matchPercentage !== undefined) 
                    ? `Dupes for "${searchQuery}"` 
                    : `Results for "${searchQuery}"`}
                </h2>
                <p className="text-muted-foreground">
                  Filter and sort to find your perfect match
                </p>
              </div>

              {/* Filter Component */}
              <ResultsFilter
                sortBy={sortBy}
                onSortChange={setSortBy}
                minMatch={minMatch}
                onMinMatchChange={setMinMatch}
                maxPrice={maxPrice}
                onMaxPriceChange={setMaxPrice}
                availabilityFilter={availabilityFilter}
                onAvailabilityFilterChange={setAvailabilityFilter}
                finishFilter={finishFilter}
                onFinishFilterChange={setFinishFilter}
                undertoneFilter={undertoneFilter}
                onUndertoneFilterChange={setUndertoneFilter}
                resultsCount={filteredResults.length}
              />
              
              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults.map((dupe) => (
                    <LipstickCard key={dupe.id} {...dupe} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-background rounded-lg border">
                  <p className="text-muted-foreground">No results found with the current filters.</p>
                  <p className="text-muted-foreground mt-2">Try adjusting your filter settings.</p>
                </div>
              )}
            </div>
          )}

          {!isSearching && !searchResults && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-pink-600" />
              </div>
              <h2 className="mb-2">Start Your Dupe Hunt!</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                Search by name, upload a photo, or paste ingredient lists to discover amazing affordable dupes
              </p>
              <div className="flex flex-col gap-2 text-muted-foreground max-w-md mx-auto">
                <p>✨ Try: "Ruby Woo dupe"</p>
                <p>💰 Try: "MAC red matte under $10"</p>
                <p>💄 Try: "cool toned nude lipstick"</p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-background/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 LipDoople. Find your perfect lipstick match without breaking the bank.</p>
        </div>
      </footer>
    </div>
  );
}

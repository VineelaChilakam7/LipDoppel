import { LipstickCard } from "../../components/LipstickCard";
import { ResultsFilter } from "../../components/ResultsFilter";
import { SearchResult } from "../../lib/search-utils";

interface Props {
  results: SearchResult[];
  searchQuery: string;
  filters: any;
}

export function SearchResults({ results, searchQuery, filters }: Props) {
  const {
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
  } = filters;

  const filteredResults = results
    .filter((dupe) => {
      if (dupe.matchPercentage && dupe.matchPercentage < minMatch) return false;
      if (dupe.priceValue > maxPrice) return false;
      if (availabilityFilter !== "all" && dupe.availability !== availabilityFilter) return false;
      if (finishFilter !== "all" && dupe.finish !== finishFilter) return false;
      if (undertoneFilter !== "all" && dupe.undertone !== undertoneFilter) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "match-desc": return (b.matchPercentage || 0) - (a.matchPercentage || 0);
        case "price-asc": return a.priceValue - b.priceValue;
        case "price-desc": return b.priceValue - a.priceValue;
        default: return 0;
      }
    });

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          {results.some((r) => r.matchPercentage !== undefined)
            ? `Dupes for "${searchQuery}"`
            : `Results for "${searchQuery}"`}
        </h2>
        <p className="text-muted-foreground">Filter and sort to find your perfect match</p>
      </div>

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
    </section>
  );
}

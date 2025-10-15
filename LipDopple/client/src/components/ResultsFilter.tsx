import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { SlidersHorizontal } from "lucide-react";

export type SortOption = "match-desc" | "price-asc" | "price-desc" | "availability";

interface ResultsFilterProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  minMatch: number;
  onMinMatchChange: (value: number) => void;
  maxPrice: number;
  onMaxPriceChange: (value: number) => void;
  availabilityFilter: "all" | "in-stock" | "online";
  onAvailabilityFilterChange: (value: "all" | "in-stock" | "online") => void;
  finishFilter: string;
  onFinishFilterChange: (value: string) => void;
  undertoneFilter: string;
  onUndertoneFilterChange: (value: string) => void;
  resultsCount: number;
}

export function ResultsFilter({
  sortBy,
  onSortChange,
  minMatch,
  onMinMatchChange,
  maxPrice,
  onMaxPriceChange,
  availabilityFilter,
  onAvailabilityFilterChange,
  finishFilter,
  onFinishFilterChange,
  undertoneFilter,
  onUndertoneFilterChange,
  resultsCount,
}: ResultsFilterProps) {
  return (
    <div className="bg-background border rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-4 h-4" />
        <h3>Filter & Sort</h3>
        <Badge variant="secondary" className="ml-auto">
          {resultsCount} results
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sort">Sort By</Label>
          <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
            <SelectTrigger id="sort">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match-desc">Best Match</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="availability">Availability</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="max-price">Max Price</Label>
          <Select value={maxPrice.toString()} onValueChange={(value) => onMaxPriceChange(Number(value))}>
            <SelectTrigger id="max-price">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="999">Any</SelectItem>
              <SelectItem value="10">Under $10</SelectItem>
              <SelectItem value="15">Under $15</SelectItem>
              <SelectItem value="20">Under $20</SelectItem>
              <SelectItem value="30">Under $30</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="finish">Finish Type</Label>
          <Select value={finishFilter} onValueChange={onFinishFilterChange}>
            <SelectTrigger id="finish">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Finishes</SelectItem>
              <SelectItem value="Matte">Matte</SelectItem>
              <SelectItem value="Satin">Satin</SelectItem>
              <SelectItem value="Glossy">Glossy</SelectItem>
              <SelectItem value="Cream">Cream</SelectItem>
              <SelectItem value="Liquid Matte">Liquid Matte</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="undertone">Undertone</Label>
          <Select value={undertoneFilter} onValueChange={onUndertoneFilterChange}>
            <SelectTrigger id="undertone">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Undertones</SelectItem>
              <SelectItem value="warm">Warm</SelectItem>
              <SelectItem value="cool">Cool</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="availability">Availability</Label>
          <Select value={availabilityFilter} onValueChange={(value) => onAvailabilityFilterChange(value as "all" | "in-stock" | "online")}>
            <SelectTrigger id="availability">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="online">Online Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="min-match">Min Match %</Label>
          <Select value={minMatch.toString()} onValueChange={(value) => onMinMatchChange(Number(value))}>
            <SelectTrigger id="min-match">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any</SelectItem>
              <SelectItem value="70">70%+</SelectItem>
              <SelectItem value="80">80%+</SelectItem>
              <SelectItem value="90">90%+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

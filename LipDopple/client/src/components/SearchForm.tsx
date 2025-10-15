import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { AutocompleteSearch } from "./AutocompleteSearch";
import type { Lipstick } from "../lib/lipstick-database";

interface SearchFormProps {
  onSearch: (query: string, lipstick?: Lipstick) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const popularSearches = [
    'Ruby Woo dupe',
    'Pillow Talk dupe',
    'MAC red matte under $10',
    'nude pink lipstick',
    'Huda Beauty Icon'
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="lipstick-search">Search for lipsticks or dupes</Label>
        <AutocompleteSearch 
          onSearch={onSearch}
          placeholder="e.g., Ruby Woo dupe, MAC red matte under $10, nude pink..."
        />
      </div>
      <div className="text-muted-foreground">
        <p>Try searching:</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {popularSearches.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSearch(suggestion)}
              className="px-3 py-1 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-muted-foreground">
          💡 Tip: Try natural queries like "Ruby Woo dupe", "red matte under $10", or "cool toned nude"
        </p>
      </div>
    </div>
  );
}

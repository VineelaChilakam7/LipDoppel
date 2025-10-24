import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import Fuse from "fuse.js";
import type { Lipstick } from "../lib/lipstick-service";
import { fetchAllLipsticks } from "../lib/lipstick-service";

interface AutocompleteSearchProps {
  onSearch: (query: string, lipstick?: Lipstick) => void;
  placeholder?: string;
}

export function AutocompleteSearch({ onSearch, placeholder }: AutocompleteSearchProps) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Lipstick[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [allLipsticks, setAllLipsticks] = useState<Lipstick[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Load all lipsticks once
  useEffect(() => {
    fetchAllLipsticks()
      .then(setAllLipsticks)
      .catch((err) => console.error("Error loading lipsticks:", err));
  }, []);

  // Initialize Fuse.js once allLipsticks is loaded
  const fuse = new Fuse(allLipsticks, {
    keys: [
      { name: "name", weight: 2 },
      { name: "brand", weight: 2 },
      { name: "shade", weight: 1.5 },
      { name: "finish", weight: 0.5 },
      { name: "undertone", weight: 0.5 },
    ],
    threshold: 0.4,
    includeScore: true,
  });

  // Handle clicks outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update suggestions as user types
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const results = fuse.search(query);
    const matchedLipsticks = results.slice(0, 6).map(result => result.item);
    setSuggestions(matchedLipsticks);
    setShowSuggestions(matchedLipsticks.length > 0);
    setSelectedIndex(-1);
  }, [query, allLipsticks]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        onSearch(query, suggestions[selectedIndex]);
      } else {
        onSearch(query);
      }
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (lipstick: Lipstick) => {
    setQuery(`${lipstick.brand} ${lipstick.name}`);
    onSearch(`${lipstick.brand} ${lipstick.name}`, lipstick);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : prev);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
      case "Enter":
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length >= 2 && suggestions.length > 0 && setShowSuggestions(true)}
            placeholder={placeholder || "Search for lipsticks..."}
            className="pl-10 pr-10"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-background border border-border rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {suggestions.map((lipstick, index) => (
            <button
              key={lipstick._id}
              type="button"
              onClick={() => handleSuggestionClick(lipstick)}
              className={`w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-center gap-3 ${
                index === selectedIndex ? "bg-accent" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-md overflow-hidden bg-muted flex-shrink-0">
                <img src={lipstick.imageUrl} alt={lipstick.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="truncate">
                  <span className="font-medium">{lipstick.name}</span>
                  {" – "}
                  <span className="text-muted-foreground">{lipstick.brand}</span>
                </p>
                <p className="text-muted-foreground truncate">
                  {lipstick.shade} • {lipstick.finish} • {lipstick.price}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

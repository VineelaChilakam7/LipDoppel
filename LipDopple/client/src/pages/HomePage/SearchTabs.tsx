import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Search, Upload, Microscope } from "lucide-react";
import { SearchForm } from "../../components/SearchForm";
import { ImageUpload } from "../../components/ImageUpload";
import { IngredientsForm } from "../../components/IngredientsForm";

interface Props {
  onSearch: (query: string) => void;
  onImageUpload: (file: File) => void;
  onIngredientsSearch: (ingredients: string) => void;
}

export function SearchTabs({
  onSearch,
  onImageUpload,
  onIngredientsSearch,
}: Props) {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <section className="bg-background rounded-xl shadow-lg p-4 sm:p-6 mb-8">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-foreground">
        Find Your Perfect Lipstick Dupe
      </h2>

      {/* ----- Mobile Dropdown ----- */}
      <div className="sm:hidden mb-6">
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select search type" />
          </SelectTrigger>
         <SelectContent className="bg-background dark:bg-neutral-900 border border-border shadow-lg z-[9999]">
            <SelectItem value="search">🔍 Search by Name</SelectItem>
            <SelectItem value="upload">📸 Upload Image</SelectItem>
            <SelectItem value="ingredients">🧪 Ingredients</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ----- Desktop Tabs ----- */}
      <div className="hidden sm:block">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
        </Tabs>
      </div>

      {/* ----- Tab / Dropdown Content ----- */}
      <div
        key={activeTab}
        className="mt-2 animate-fade-in transition-all duration-300"
      >
        {activeTab === "search" && <SearchForm onSearch={onSearch} />}

        {activeTab === "upload" && (
          <>
            <ImageUpload onImageSelect={onImageUpload} />
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-muted-foreground text-sm">
                💡 Tip: Upload a clear lipstick photo or swatch for best results.
              </p>
            </div>
          </>
        )}

        {activeTab === "ingredients" && (
          <IngredientsForm onSearch={onIngredientsSearch} />
        )}
      </div>
    </section>
  );
}

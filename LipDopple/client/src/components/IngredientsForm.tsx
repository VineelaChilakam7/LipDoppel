import { Microscope } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

interface IngredientsFormProps {
  onSearch: (ingredients: string) => void;
}

export function IngredientsForm({ onSearch }: IngredientsFormProps) {
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.trim()) {
      onSearch(ingredients);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ingredients">Lipstick Ingredients</Label>
        <Textarea
          id="ingredients"
          placeholder="Paste the ingredient list here... e.g., Dimethicone, Bis-Diglyceryl Polyacyladipate-2, Diisostearyl Malate..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="min-h-32 resize-y"
        />
      </div>
      <Button type="submit" className="w-full">
        <Microscope className="w-4 h-4 mr-2" />
        Find Similar Formulas
      </Button>
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-muted-foreground">
          💡 Tip: You can find ingredient lists on product packaging or the brand's website. We'll match formulas with similar compositions.
        </p>
      </div>
    </form>
  );
}

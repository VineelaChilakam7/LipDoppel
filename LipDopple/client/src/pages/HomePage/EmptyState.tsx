import { Sparkles } from "lucide-react";

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Sparkles className="w-10 h-10 text-pink-600" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">Start Your Dupe Hunt!</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-4">
        Search by name, upload a photo, or paste ingredients to discover amazing affordable dupes.
      </p>
      <div className="flex flex-col gap-2 text-muted-foreground max-w-md mx-auto">
        <p>✨ Try: "Ruby Woo dupe"</p>
        <p>💰 Try: "MAC red matte under $10"</p>
        <p>💄 Try: "cool toned nude lipstick"</p>
      </div>
    </div>
  );
}

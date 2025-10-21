export function LoadingSpinner() {
  return (
    <div className="text-center py-12">
      <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-muted-foreground">Finding the best dupes for you...</p>
    </div>
  );
}

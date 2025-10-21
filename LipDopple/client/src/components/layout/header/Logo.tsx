export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-rose-500 to-purple-600 rounded-xl flex items-center justify-center p-2.5 shadow-lg">
        <div className="flex items-end gap-1.5 h-full">
          {/* Original Lipstick */}
          <div className="flex flex-col items-center justify-end h-full">
            <div className="w-2 h-3 bg-gradient-to-b from-white to-white/95 rounded-t-sm mb-0.5 shadow-sm"></div>
            <div className="w-2 h-2.5 bg-gradient-to-b from-rose-300 to-rose-500 rounded-t-full"></div>
            <div className="w-2.5 h-4 bg-gradient-to-b from-white via-white to-white/90 rounded-b-sm shadow-sm"></div>
          </div>
          {/* Dupe Lipstick */}
          <div className="flex flex-col items-center justify-end h-full">
            <div className="w-2 h-3 bg-gradient-to-b from-white/90 to-white/85 rounded-t-sm mb-0.5 shadow-sm"></div>
            <div className="w-2 h-2.5 bg-gradient-to-b from-pink-300 to-pink-500 rounded-t-full"></div>
            <div className="w-2.5 h-4 bg-gradient-to-b from-white/90 via-white/85 to-white/80 rounded-b-sm shadow-sm"></div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-lg font-semibold">LipDoppel</h1>
        <p className="text-sm text-muted-foreground -mt-1">
          Find your perfect lipstick dupe
        </p>
      </div>
    </div>
  );
}


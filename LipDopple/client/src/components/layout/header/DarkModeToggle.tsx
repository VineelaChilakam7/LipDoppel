import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

export function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-lg border bg-background hover:bg-accent transition-colors flex items-center justify-center"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-amber-500" />
      ) : (
        <Moon className="w-4 h-4 text-slate-600" />
      )}
    </button>
  );
}

import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none flex min-h-16 w-full rounded-md border px-3 py-2 text-base md:text-sm field-sizing-content transition-[color,box-shadow,border,background-color]",
        "bg-background text-foreground placeholder:text-muted-foreground",
        "border-border focus-visible:border-pink-500",
        "focus-visible:ring-2 focus-visible:ring-pink-500/30 outline-none",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />

  );
}

export { Textarea };

import { cn } from "@/lib/utils";

/** Small gold section label with a leading rule. */
export function Eyebrow({
  children,
  className,
  tone = "dark",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <span
      className={cn(
        "text-eyebrow inline-flex items-center gap-3",
        tone === "dark" ? "text-gold-deep" : "text-gold",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-8",
          tone === "dark" ? "bg-gold-deep/50" : "bg-gold/60",
        )}
      />
      {children}
    </span>
  );
}

import { cn } from "@/lib/utils";

/** The site's single horizontal rhythm. Nothing sets its own page gutters. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-10", className)}
    >
      {children}
    </div>
  );
}

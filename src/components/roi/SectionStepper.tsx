import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: 1, label: "Empresa" },
  { id: 2, label: "Contratación" },
  { id: 3, label: "Impacto" },
  { id: 4, label: "Resultados" },
  { id: 5, label: "Resumen" },
];

export function SectionStepper({ current }: { current: number }) {
  return (
    <div className="w-full">
      <ol className="flex items-center justify-between gap-2">
        {SECTIONS.map((s, idx) => {
          const isDone = current > s.id;
          const isActive = current === s.id;
          return (
            <li key={s.id} className="flex-1 flex items-center gap-2">
              <div className="flex flex-col items-center gap-2 min-w-0">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                    isDone && "bg-primary border-primary text-primary-foreground",
                    isActive && "border-primary text-primary bg-background",
                    !isDone && !isActive && "border-border text-muted-foreground bg-background",
                  )}
                >
                  {isDone ? <Check className="h-4 w-4" /> : s.id}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium hidden sm:block",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {s.label}
                </span>
              </div>
              {idx < SECTIONS.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 rounded-full transition-colors -mt-5",
                    current > s.id ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

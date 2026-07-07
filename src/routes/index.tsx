import { createFileRoute } from "@tanstack/react-router";
import { RoiProvider, useRoi } from "@/lib/roi-context";
import { SectionStepper } from "@/components/roi/SectionStepper";
import { CompanySection } from "@/components/roi/CompanySection";
import { HiringSection } from "@/components/roi/HiringSection";

import { ResultsSection } from "@/components/roi/ResultsSection";
import { SummarySection } from "@/components/roi/SummarySection";
import { Calculator } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Calculadora de ROI — HR Tech" },
      {
        name: "description",
        content:
          "Calcula el retorno de inversión de tu plataforma HR Tech: ahorro por rotación, contratación y productividad.",
      },
    ],
  }),
  component: Index,
});

function CalculatorBody() {
  const { currentSection } = useRoi();
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <SectionStepper current={currentSection} />
      {currentSection === 1 && <CompanySection />}
      {currentSection === 2 && <HiringSection />}
      {currentSection === 3 && <ImpactSection />}
      {currentSection === 4 && <ResultsSection />}
      {currentSection === 5 && <SummarySection />}
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card/50 backdrop-blur">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">ROI Calculator</p>
            <p className="text-xs text-muted-foreground">HR Tech — Costo de rotación</p>
          </div>
        </div>
      </header>

      <main className="px-6 py-10 sm:py-16">
        <div className="mx-auto max-w-3xl mb-10 text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Descubre el ROI real de tu inversión
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            En menos de 2 minutos calcula cuánto te ahorras al reducir rotación, optimizar
            contrataciones y recuperar tiempo de tu equipo de HR.
          </p>
        </div>

        <RoiProvider>
          <CalculatorBody />
        </RoiProvider>
      </main>
    </div>
  );
}

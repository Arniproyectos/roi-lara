import { useRoi } from "@/lib/roi-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus, Clock, DollarSign, Receipt, ArrowRight, ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export function HiringSection() {
  const { company, hiring, setHiring, setCurrentSection } = useRoi();

  const update = <K extends keyof typeof hiring>(key: K, value: (typeof hiring)[K]) =>
    setHiring({ ...hiring, [key]: value });

  // Sugerencia automática de contrataciones/año = empleados * rotación%
  useEffect(() => {
    if (
      hiring.hiresPerYear === "" &&
      typeof company.employees === "number" &&
      typeof company.turnoverRate === "number"
    ) {
      const suggested = Math.round((company.employees * company.turnoverRate) / 100);
      if (suggested > 0) setHiring({ ...hiring, hiresPerYear: suggested });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValid =
    Number(hiring.hiresPerYear) > 0 &&
    Number(hiring.daysToHire) > 0 &&
    Number(hiring.hrHourlyCost) > 0 &&
    Number(hiring.costPerHire) >= 0;

  const numberOrEmpty = (v: string): number | "" => (v === "" ? "" : Math.max(0, Number(v)));

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <span className="text-xs font-semibold uppercase tracking-wider">Sección 2 de 4</span>
        </div>
        <CardTitle className="text-2xl">Tu proceso de contratación actual</CardTitle>
        <CardDescription>
          Estos datos nos permiten calcular cuánto tiempo y dinero está costando hoy tu proceso, y
          qué parte se puede optimizar con la herramienta.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="hiresPerYear" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-muted-foreground" />
              Contrataciones por año
            </Label>
            <Input
              id="hiresPerYear"
              type="number"
              min={1}
              placeholder="Ej: 45"
              value={hiring.hiresPerYear}
              onChange={(e) => update("hiresPerYear", numberOrEmpty(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              Vacantes que cubres al año (sumando reemplazos y nuevas posiciones).
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="daysToHire" className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Tiempo promedio para cubrir vacante (días)
            </Label>
            <Input
              id="daysToHire"
              type="number"
              min={1}
              placeholder="Ej: 35"
              value={hiring.daysToHire}
              onChange={(e) => update("daysToHire", numberOrEmpty(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              Desde que se publica la vacante hasta que la persona se incorpora.
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="hrHourlyCost" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              Costo hora del equipo de HR (USD)
            </Label>
            <Input
              id="hrHourlyCost"
              type="number"
              min={0}
              placeholder="Ej: 30"
              value={hiring.hrHourlyCost}
              onChange={(e) => update("hrHourlyCost", numberOrEmpty(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              Costo cargado por hora de un reclutador o miembro del equipo de HR.
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="costPerHire" className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-muted-foreground" />
              Costo actual por contratación (USD)
            </Label>
            <Input
              id="costPerHire"
              type="number"
              min={0}
              placeholder="Ej: 4000"
              value={hiring.costPerHire}
              onChange={(e) => update("costPerHire", numberOrEmpty(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              Suma estimada: job boards, agencias, assessments, onboarding, etc.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/60">
          <Button variant="ghost" onClick={() => setCurrentSection(1)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Atrás
          </Button>
          <Button
            onClick={() => setCurrentSection(3)}
            disabled={!isValid}
            size="lg"
            className="gap-2"
          >
            Continuar
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

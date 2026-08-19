import { useRoi } from "@/lib/roi-context";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Lock, Sparkles } from "lucide-react";

export function CompanySection() {
  const { company, setCompany, setCurrentSection } = useRoi();

  const update = <K extends keyof typeof company>(key: K, value: (typeof company)[K]) =>
    setCompany({ ...company, [key]: value });

  const isValid =
    company.companyName.trim().length > 0 &&
    Number(company.employees) > 0 &&
    Number(company.avgSalary) > 0 &&
    Number(company.turnoverRate) >= 0 &&
    Number(company.turnoverRate) <= 100;

  const numberOrEmpty = (v: string): number | "" => (v === "" ? "" : Math.max(0, Number(v)));

  const leavers =
    Number(company.employees) > 0 && Number(company.turnoverRate) > 0
      ? Math.round(Number(company.employees) * (Number(company.turnoverRate) / 100))
      : 0;

  return (
    <Card className="border-border/60 shadow-sm overflow-hidden">
      <div className="bg-secondary/60 px-6 py-5 sm:px-8 border-b border-border/60">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Paso 1 de 4</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Descubrí el ROI de tu inversión en RRHH
        </h2>
        <p className="text-sm text-muted-foreground mt-1 max-w-lg">
          En menos de 1 minuto y con solo 4 datos, vas a ver cuánto valor devuelve la plataforma a
          tu organización.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> ~45 segundos
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5" /> No guardamos tus datos
          </span>
        </div>
      </div>

      <CardContent className="space-y-6 pt-6 sm:px-8">
        <div className="grid gap-2">
          <Label htmlFor="companyName">¿Cómo se llama tu empresa?</Label>
          <Input
            id="companyName"
            placeholder="Ej: Acme Corp"
            value={company.companyName}
            onChange={(e) => update("companyName", e.target.value.slice(0, 100))}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="employees">Nº de empleados</Label>
            <Input
              id="employees"
              type="number"
              min={1}
              placeholder="Ej: 250"
              value={company.employees}
              onChange={(e) => update("employees", numberOrEmpty(e.target.value))}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="avgSalary">Salario promedio anual (USD)</Label>
            <Input
              id="avgSalary"
              type="number"
              min={0}
              placeholder="Ej: 45000"
              value={company.avgSalary}
              onChange={(e) => update("avgSalary", numberOrEmpty(e.target.value))}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="turnoverRate">Tasa de rotación anual (%)</Label>
          <Input
            id="turnoverRate"
            type="number"
            min={0}
            max={100}
            step={0.1}
            placeholder="Ej: 18"
            value={company.turnoverRate}
            onChange={(e) => update("turnoverRate", numberOrEmpty(e.target.value))}
          />
          <p className="text-xs text-muted-foreground">
            Una estimación aproximada es más que suficiente.
          </p>
        </div>

        {leavers > 0 && (
          <div className="rounded-xl bg-accent/10 border border-accent/20 px-4 py-3 text-sm text-foreground">
            Con esos datos, alrededor de{" "}
            <span className="font-semibold text-accent">{leavers} personas</span> dejan tu empresa
            cada año. Veamos cuánto cuesta eso.
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-border/60">
          <Button
            onClick={() => setCurrentSection(2)}
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

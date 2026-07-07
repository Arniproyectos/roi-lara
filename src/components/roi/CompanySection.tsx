import { useRoi } from "@/lib/roi-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2, Users, DollarSign, TrendingDown, Briefcase, ArrowRight } from "lucide-react";

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

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <span className="text-xs font-semibold uppercase tracking-wider">Sección 1 de 4</span>
        </div>
        <CardTitle className="text-2xl">Datos de la empresa</CardTitle>
        <CardDescription>
          Cuéntanos sobre tu organización. Usaremos estos datos para calcular el impacto económico
          real del costo de rotación y el ROI potencial de nuestra herramienta.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="companyName" className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            Nombre de la empresa
          </Label>
          <Input
            id="companyName"
            placeholder="Ej: Acme Corp"
            value={company.companyName}
            onChange={(e) => update("companyName", e.target.value.slice(0, 100))}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="industry" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            Industria <span className="text-muted-foreground font-normal">(opcional)</span>
          </Label>
          <Input
            id="industry"
            placeholder="Ej: Retail, Tecnología, Salud..."
            value={company.industry}
            onChange={(e) => update("industry", e.target.value.slice(0, 80))}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="employees" className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              Nº total de empleados
            </Label>
            <Input
              id="employees"
              type="number"
              min={1}
              placeholder="Ej: 250"
              value={company.employees}
              onChange={(e) => update("employees", numberOrEmpty(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">Plantilla total actual.</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="avgSalary" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              Salario promedio anual (USD)
            </Label>
            <Input
              id="avgSalary"
              type="number"
              min={0}
              placeholder="Ej: 45000"
              value={company.avgSalary}
              onChange={(e) => update("avgSalary", numberOrEmpty(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">Salario bruto promedio por empleado.</p>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="turnoverRate" className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
            Tasa de rotación anual (%)
          </Label>
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
            % de empleados que dejan la empresa al año. Si no lo sabes con precisión, una estimación
            es suficiente.
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/60">
          <p className="text-xs text-muted-foreground">
            Tus datos solo se usan para este cálculo y no se almacenan.
          </p>
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

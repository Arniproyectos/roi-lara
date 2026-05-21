import { useRoi, defaultImpact, type ImpactData } from "@/lib/roi-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  TrendingDown,
  Clock,
  Users,
  Wallet,
  Rocket,
} from "lucide-react";

type ImpactField = {
  key: keyof ImpactData;
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  max: number;
};

const FIELDS: ImpactField[] = [
  {
    key: "turnoverReductionPct",
    label: "Reducción de rotación",
    hint: "Cuánto baja la rotación anual con mejor selección y onboarding.",
    icon: TrendingDown,
    max: 60,
  },
  {
    key: "timeToHireReductionPct",
    label: "Reducción del time-to-hire",
    hint: "Cuánto se acorta el tiempo promedio para cubrir una vacante.",
    icon: Clock,
    max: 70,
  },
  {
    key: "hrHoursSavedPct",
    label: "Horas de HR ahorradas por proceso",
    hint: "Automatización de screening, agenda y comunicación con candidatos.",
    icon: Users,
    max: 80,
  },
  {
    key: "costPerHireReductionPct",
    label: "Reducción de costo por contratación",
    hint: "Menos gasto en job boards, agencias y procesos repetidos.",
    icon: Wallet,
    max: 60,
  },
  {
    key: "productivityGainPct",
    label: "Ganancia de productividad",
    hint: "Por incorporaciones más rápidas y mejor fit al puesto.",
    icon: Rocket,
    max: 40,
  },
];

export function ImpactSection() {
  const { impact, setImpact, setCurrentSection } = useRoi();

  const update = (key: keyof ImpactData, value: number) =>
    setImpact({ ...impact, [key]: Math.max(0, Math.min(100, value)) });

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <span className="text-xs font-semibold uppercase tracking-wider">
            Sección 3 de 5
          </span>
        </div>
        <CardTitle className="text-2xl">Impacto esperado con la herramienta</CardTitle>
        <CardDescription>
          Estos son los rangos de mejora que vemos en clientes similares. Ajustá los
          porcentajes según tu caso para personalizar el cálculo.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-6">
          {FIELDS.map(({ key, label, hint, icon: Icon, max }) => {
            const value = impact[key];
            return (
              <div key={key} className="space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2 min-w-0">
                    <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                    <div className="min-w-0">
                      <Label className="text-sm font-medium">{label}</Label>
                      <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={value}
                      onChange={(e) => update(key, Number(e.target.value))}
                      className="w-20 h-9 text-right"
                    />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>
                <Slider
                  value={[value]}
                  min={0}
                  max={max}
                  step={1}
                  onValueChange={([v]) => update(key, v)}
                />
              </div>
            );
          })}
        </div>

        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-xs text-muted-foreground">
          Los valores por defecto reflejan promedios observados en implementaciones
          típicas. Si querés ser conservador, bajalos un 30–50 %.
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/60">
          <Button variant="ghost" onClick={() => setCurrentSection(2)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Atrás
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setImpact(defaultImpact)}
              className="gap-2"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Restablecer
            </Button>
            <Button onClick={() => setCurrentSection(4)} size="lg" className="gap-2">
              Calcular ROI
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

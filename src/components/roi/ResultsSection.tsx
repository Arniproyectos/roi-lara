import { useRoi, formatUSD } from "@/lib/roi-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Users,
  Wallet,
  Rocket,
  TrendingDown,
  DollarSign,
  CalendarClock,
  Info,
} from "lucide-react";


export function ResultsSection() {
  const { results, investment, setInvestment, setCurrentSection } = useRoi();

  const buckets = [
    {
      key: "turnover",
      label: "Ahorro por menor rotación",
      value: results.turnoverSavings,
      icon: TrendingDown,
      hint: "Menos reemplazos = menos costo de pérdida y recontratación.",
    },
    {
      key: "cph",
      label: "Ahorro en costo por contratación",
      value: results.costPerHireSavings,
      icon: Wallet,
      hint: "Menos gasto en agencias, job boards y procesos repetidos.",
    },
    {
      key: "hr",
      label: "Ahorro en horas de HR",
      value: results.hrHoursSavings,
      icon: Users,
      hint: "Automatización de screening, agenda y comunicación.",
    },
    {
      key: "prod",
      label: "Ganancia de productividad",
      value: results.productivitySavings,
      icon: Rocket,
      hint: "Nuevas incorporaciones aportan más en su rampa inicial.",
    },
  ];

  const numberOrEmpty = (v: string): number | "" =>
    v === "" ? "" : Math.max(0, Number(v));

  const hasInvestment = typeof investment === "number" && investment > 0;

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <span className="text-xs font-semibold uppercase tracking-wider">
            Sección 3 de 4
          </span>
        </div>
        <CardTitle className="text-2xl">Tus resultados</CardTitle>
        <CardDescription>
          Así se ve el retorno estimado anual en base a los datos cargados.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Hero total */}
        <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 p-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Ahorro anual estimado
          </p>
          <p className="mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            {formatUSD(results.totalSavings)}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Suma de los 5 frentes de impacto de la herramienta.
          </p>
        </div>

        {/* Metodología */}
        <Accordion type="single" collapsible className="rounded-xl border border-border/60 bg-muted/20 px-4">
          <AccordionItem value="method" className="border-0">
            <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline">
              <span className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                ¿Cómo calculamos estos resultados?
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 space-y-4">
              <p className="text-xs text-muted-foreground">
                Todos los resultados son <strong>estimaciones</strong> basadas en
                benchmarks internacionales de HR (SHRM, Gallup, Forbes, LinkedIn
                Talent Solutions). Los valores reales pueden variar según industria,
                región y madurez de tus procesos.
              </p>

              <MethodBlock
                title="1. Ahorro por menor rotación"
                formula="Empleados × % rotación × (50% del salario) × % reducción"
                variables={[
                  `Empleados: ${results.employees.toLocaleString()}`,
                  `Rotación anual: ${results.turnoverRate}%`,
                  `Salario promedio: ${formatUSD(results.avgSalary)}`,
                ]}
                benchmark="Costo de reemplazo ≈ 50% del salario anual del puesto."
                source="SHRM — Human Capital Benchmarking Report"
                assumption="Reducción de rotación aplicada: 25% (benchmark conservador Gallup para equipos con mejor experiencia de empleado)."
                result={results.turnoverSavings}
              />

              <MethodBlock
                title="2. Ahorro en costo por contratación (Hiring)"
                formula="Contrataciones/año × Costo por contratación × % reducción"
                variables={[
                  `Contrataciones/año: ${results.hiresPerYear.toLocaleString()}`,
                  `Costo por contratación: ${formatUSD(results.costPerHire)}`,
                ]}
                benchmark="Costo promedio por contratación en EE.UU. ≈ USD 4.700."
                source="SHRM 2022 — Talent Access Report"
                assumption="Reducción aplicada: 20% (menor gasto en agencias, job boards y procesos duplicados)."
                result={results.costPerHireSavings}
              />

              <MethodBlock
                title="3. Ahorro en horas de HR (Productividad HR)"
                formula="Contrataciones/año × Horas HR por proceso × Costo hora HR × % ahorro"
                variables={[
                  `Contrataciones/año: ${results.hiresPerYear.toLocaleString()}`,
                  `Costo hora HR: ${formatUSD(results.hrHourlyCost)}`,
                ]}
                benchmark="~2 horas de trabajo de HR por día de proceso (screening, agenda, comunicación)."
                source="Forbes HR Insights & LinkedIn Talent Solutions"
                assumption="Ahorro aplicado: 40% del tiempo operativo por automatización."
                result={results.hrHoursSavings}
              />

              <MethodBlock
                title="4. Ganancia de productividad de nuevas incorporaciones"
                formula="Contrataciones/año × Salario promedio × % ganancia × (3/12)"
                variables={[
                  `Contrataciones/año: ${results.hiresPerYear.toLocaleString()}`,
                  `Salario promedio: ${formatUSD(results.avgSalary)}`,
                ]}
                benchmark="Ventana de rampa inicial de 3 meses en la que un nuevo empleado aporta valor incremental."
                source="Gallup — State of the Global Workplace"
                assumption="Ganancia de productividad aplicada: 15% durante la rampa."
                result={results.productivitySavings}
              />

              <div className="rounded-md border border-border/60 bg-background p-3 text-xs text-muted-foreground">
                <strong className="text-foreground">Nota:</strong> Estas cifras son
                proyecciones orientativas. Recomendamos validarlas con datos
                internos de tu operación para un business case final.
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>


        {/* Breakdown */}
        <div className="grid gap-3 sm:grid-cols-2">
          {buckets.map(({ key, label, value, icon: Icon, hint }) => {
            const share =
              results.totalSavings > 0 ? (value / results.totalSavings) * 100 : 0;
            return (
              <div
                key={key}
                className="rounded-lg border border-border/60 bg-card p-4 space-y-2"
              >
                <div className="flex items-start gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground leading-tight">
                      {label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
                  </div>
                </div>
                <div className="flex items-end justify-between gap-2 pt-1">
                  <p className="text-lg font-semibold text-foreground">
                    {formatUSD(value)}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {share.toFixed(0)}%
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${Math.min(100, share)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Inversión + ROI */}
        <div className="rounded-xl border border-border/60 bg-muted/20 p-5 space-y-4">
          <div className="grid gap-2 sm:max-w-xs">
            <Label htmlFor="investment" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              Inversión anual en la herramienta (USD)
            </Label>
            <Input
              id="investment"
              type="number"
              min={0}
              placeholder="Ej: 24000"
              value={investment}
              onChange={(e) => setInvestment(numberOrEmpty(e.target.value))}
            />
            <p className="text-xs text-muted-foreground">
              Cargá el costo anual de licencias para calcular ROI y payback.
            </p>
          </div>

          {hasInvestment && (
            <div className="grid gap-3 sm:grid-cols-3 pt-2">
              <div className="rounded-lg border border-border/60 bg-background p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wider">
                  <TrendingUp className="h-3.5 w-3.5" />
                  ROI
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  {results.roiPct !== null
                    ? `${results.roiPct.toFixed(0)}%`
                    : "—"}
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-background p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wider">
                  <Wallet className="h-3.5 w-3.5" />
                  Beneficio neto
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  {formatUSD(results.netBenefit)}
                </p>
              </div>
              <div className="rounded-lg border border-border/60 bg-background p-4">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium uppercase tracking-wider">
                  <CalendarClock className="h-3.5 w-3.5" />
                  Payback
                </div>
                <p className="mt-2 text-2xl font-bold text-foreground">
                  {results.paybackMonths !== null
                    ? `${results.paybackMonths.toFixed(1)} meses`
                    : "—"}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-xs text-muted-foreground">
          Supuestos: costo de reemplazo ≈ 50% del salario anual (referencia SHRM);
          ~2h de trabajo de HR por día de proceso; ventana de productividad
          de 3 meses para nuevas incorporaciones.
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/60">
          <Button variant="ghost" onClick={() => setCurrentSection(2)} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Atrás
          </Button>
          <Button onClick={() => setCurrentSection(4)} size="lg" className="gap-2">
            Ver resumen
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function MethodBlock({
  title,
  formula,
  variables,
  benchmark,
  source,
  assumption,
  result,
}: {
  title: string;
  formula: string;
  variables: string[];
  benchmark: string;
  source: string;
  assumption: string;
  result: number;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-background p-4 space-y-2 text-xs">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <div>
        <span className="font-medium text-foreground">Fórmula: </span>
        <span className="text-muted-foreground">{formula}</span>
      </div>
      <div>
        <span className="font-medium text-foreground">Variables ingresadas: </span>
        <span className="text-muted-foreground">{variables.join(" · ")}</span>
      </div>
      <div>
        <span className="font-medium text-foreground">Benchmark: </span>
        <span className="text-muted-foreground">{benchmark}</span>
      </div>
      <div>
        <span className="font-medium text-foreground">Supuesto aplicado: </span>
        <span className="text-muted-foreground">{assumption}</span>
      </div>
      <div>
        <span className="font-medium text-foreground">Fuente: </span>
        <span className="text-muted-foreground italic">{source}</span>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border/60">
        <span className="text-muted-foreground">Resultado</span>
        <span className="text-sm font-semibold text-foreground">
          {formatUSD(result)}
        </span>
      </div>
    </div>
  );
}


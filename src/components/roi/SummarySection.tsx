import { useRoi, formatUSD } from "@/lib/roi-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Printer,
  Mail,
  RotateCcw,
  Building2,
  Users,
  CheckCircle2,
} from "lucide-react";

export function SummarySection() {
  const { company, investment, results, setCurrentSection } = useRoi();

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const handleReset = () => {
    if (typeof window !== "undefined") window.location.reload();
  };

  const hasInvestment = typeof investment === "number" && investment > 0;

  return (
    <div className="space-y-6 print:space-y-4">
      <Card className="border-border/60 shadow-sm print:shadow-none print:border-0">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2 text-primary print:hidden">
            <span className="text-xs font-semibold uppercase tracking-wider">
              Paso 4 de 4
            </span>
          </div>
          <CardTitle className="text-2xl">
            ROI esperado para {company.companyName || "tu empresa"}
          </CardTitle>
          <CardDescription>
            Panorama completo de pérdidas identificadas, valor recuperable y retorno esperado de la
            inversión en tecnología de RRHH.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Headline */}
          <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 p-6">
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Valor recuperable anual
                </p>
                <p className="mt-1 text-3xl font-bold text-foreground">
                  {formatUSD(results.totalSavings)}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  ROI
                </p>
                <p className="mt-1 text-3xl font-bold text-foreground">
                  {results.roiPct !== null ? results.roiPct.toFixed(0) : "—"}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Payback
                </p>
                <p className="mt-1 text-3xl font-bold text-foreground">
                  {results.paybackMonths !== null
                    ? `${results.paybackMonths.toFixed(1)} meses`
                    : "—"}
                </p>
              </div>
            </div>
            {!hasInvestment && (
              <p className="mt-3 text-xs text-muted-foreground">
                Cargá la inversión anual en la sección anterior para ver ROI esperado y payback.
              </p>
            )}
          </div>

          {/* Datos de la empresa */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
              <Building2 className="h-4 w-4 text-primary" />
              Datos de la empresa
            </h3>
            <dl className="grid gap-3 sm:grid-cols-2 text-sm">
              <SummaryRow label="Empresa" value={company.companyName || "—"} />
              <SummaryRow label="Industria" value={company.industry || "—"} />
              <SummaryRow label="Empleados" value={results.employees.toLocaleString()} />
              <SummaryRow
                label="Salario promedio"
                value={formatUSD(results.avgSalary)}
              />
              <SummaryRow
                label="Rotación anual"
                value={`${results.turnoverRate}%`}
              />
            </dl>
          </div>

          {/* Proceso */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
              <Users className="h-4 w-4 text-primary" />
              Variables de pérdidas económicas
            </h3>
            <dl className="grid gap-3 sm:grid-cols-2 text-sm">
              <SummaryRow
                label="Contrataciones / año"
                value={results.hiresPerYear.toLocaleString()}
              />
              <SummaryRow
                label="Costo hora HR"
                value={formatUSD(results.hrHourlyCost)}
              />
              <SummaryRow
                label="Costo por contratación"
                value={formatUSD(results.costPerHire)}
              />
            </dl>
          </div>


          {/* Desglose */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Desglose del valor recuperable
            </h3>
            <div className="rounded-lg border border-border/60 overflow-hidden">
              <BreakdownRow
                label="Menor rotación"
                value={results.turnoverSavings}
                total={results.totalSavings}
              />
              <BreakdownRow
                label="Costo por contratación"
                value={results.costPerHireSavings}
                total={results.totalSavings}
              />
              <BreakdownRow
                label="Horas de HR"
                value={results.hrHoursSavings}
                total={results.totalSavings}
              />
              <BreakdownRow
                label="Ganancia productividad"
                value={results.productivitySavings}
                total={results.totalSavings}
              />
              <div className="flex items-center justify-between px-4 py-3 bg-primary/5 border-t border-border/60">
                <span className="text-sm font-semibold text-foreground">Total</span>
                <span className="text-base font-bold text-foreground">
                  {formatUSD(results.totalSavings)}
                </span>
              </div>
            </div>
          </div>

          {hasInvestment && (
            <div className="rounded-lg border border-border/60 bg-muted/20 p-4 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-muted-foreground">Inversión anual estimada</span>
                <span className="font-medium text-foreground">
                  {formatUSD(Number(investment))}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
                <span className="text-muted-foreground">Beneficio neto esperado</span>
                <span className="font-semibold text-foreground">
                  {formatUSD(results.netBenefit)}
                </span>
              </div>
            </div>
          )}

          {/* Acciones */}
          <div className="print:hidden flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border/60">
            <Button
              variant="ghost"
              onClick={() => setCurrentSection(3)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Atrás
            </Button>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" onClick={handleReset} className="gap-2">
                <RotateCcw className="h-3.5 w-3.5" />
                Nuevo diagnóstico
              </Button>
              <Button variant="outline" onClick={handlePrint} className="gap-2">
                <Printer className="h-4 w-4" />
                Imprimir / PDF
              </Button>
              <Button asChild size="lg" className="gap-2">
                <a
                  href={`mailto:?subject=${encodeURIComponent(
                    `Diagnóstico económico para ${company.companyName || "tu empresa"}`,
                  )}&body=${encodeURIComponent(
                    `Hola,\n\nValor recuperable anual estimado: ${formatUSD(
                      results.totalSavings,
                    )}\n${
                      results.roiPct !== null
                        ? `ROI esperado: ${results.roiPct.toFixed(0)}\nPayback: ${results.paybackMonths?.toFixed(1)} meses\n`
                        : ""
                    }\nMe gustaría agendar una conversación para profundizar el diagnóstico.`,
                  )}`}
                >
                  <Mail className="h-4 w-4" />
                  Consultar con un especialista
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border/60 bg-card px-3 py-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground text-right truncate ml-3">
        {value}
      </dd>
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const share = total > 0 ? (value / total) * 100 : 0;
  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60 last:border-0 text-sm">
      <span className="text-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground tabular-nums">
          {share.toFixed(0)}%
        </span>
        <span className="font-medium text-foreground tabular-nums">
          {formatUSD(value)}
        </span>
      </div>
    </div>
  );
}

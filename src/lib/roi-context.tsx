import { createContext, useContext, useState, ReactNode, useMemo } from "react";

export interface CompanyData {
  companyName: string;
  employees: number | "";
  avgSalary: number | "";
  turnoverRate: number | ""; // %
  industry: string;
}

export interface HiringData {
  hiresPerYear: number | "";
  hrHourlyCost: number | "";
  costPerHire: number | "";
}

export interface ImpactData {
  turnoverReductionPct: number;
  timeToHireReductionPct: number;
  hrHoursSavedPct: number;
  costPerHireReductionPct: number;
  productivityGainPct: number;
}

export interface RoiResults {
  // Inputs normalized
  employees: number;
  avgSalary: number;
  turnoverRate: number;
  hiresPerYear: number;
  hrHourlyCost: number;
  costPerHire: number;
  // Savings buckets (USD/año)
  turnoverSavings: number;
  costPerHireSavings: number;
  hrHoursSavings: number;
  
  productivitySavings: number;
  totalSavings: number;
  // Investment-derived
  netBenefit: number;
  roiPct: number | null;
  paybackMonths: number | null;
}

export interface RoiState {
  company: CompanyData;
  setCompany: (data: CompanyData) => void;
  hiring: HiringData;
  setHiring: (data: HiringData) => void;
  impact: ImpactData;
  setImpact: (data: ImpactData) => void;
  investment: number | "";
  setInvestment: (n: number | "") => void;
  currentSection: number;
  setCurrentSection: (n: number) => void;
  results: RoiResults;
}

const defaultCompany: CompanyData = {
  companyName: "",
  employees: "",
  avgSalary: "",
  turnoverRate: "",
  industry: "",
};

const defaultHiring: HiringData = {
  hiresPerYear: "",
  hrHourlyCost: "",
  costPerHire: "",
};

export const defaultImpact: ImpactData = {
  turnoverReductionPct: 25,
  timeToHireReductionPct: 35,
  hrHoursSavedPct: 40,
  costPerHireReductionPct: 20,
  productivityGainPct: 15,
};

const RoiContext = createContext<RoiState | null>(null);

function computeResults(
  company: CompanyData,
  hiring: HiringData,
  impact: ImpactData,
  investment: number | "",
): RoiResults {
  const employees = Number(company.employees) || 0;
  const avgSalary = Number(company.avgSalary) || 0;
  const turnoverRate = Number(company.turnoverRate) || 0;
  const hiresPerYear = Number(hiring.hiresPerYear) || 0;
  const daysToHire = 0;
  const hrHourlyCost = Number(hiring.hrHourlyCost) || 0;
  const costPerHire = Number(hiring.costPerHire) || 0;

  // Costo de reemplazo ≈ 50% del salario anual (referencia SHRM)
  const replacementCost = avgSalary * 0.5;
  const leavers = employees * (turnoverRate / 100);
  const turnoverSavings =
    leavers * replacementCost * (impact.turnoverReductionPct / 100);

  // Ahorro directo en costo por contratación
  const costPerHireSavings =
    hiresPerYear * costPerHire * (impact.costPerHireReductionPct / 100);

  // Horas de HR ahorradas: asumimos ~2h de trabajo HR por día de proceso
  const hrHoursPerHire = daysToHire * 2;
  const hrHoursSavings =
    hiresPerYear *
    hrHoursPerHire *
    hrHourlyCost *
    (impact.hrHoursSavedPct / 100);




  // Ganancia de productividad en nuevas incorporaciones (ventana de 3 meses)
  const productivitySavings =
    hiresPerYear * avgSalary * (impact.productivityGainPct / 100) * (3 / 12);

  const totalSavings =
    turnoverSavings +
    costPerHireSavings +
    hrHoursSavings +
    productivitySavings;

  const inv = Number(investment) || 0;
  const netBenefit = totalSavings - inv;
  const roiPct = inv > 0 ? (netBenefit / inv) * 100 : null;
  const paybackMonths =
    inv > 0 && totalSavings > 0 ? (inv / totalSavings) * 12 : null;

  return {
    employees,
    avgSalary,
    turnoverRate,
    hiresPerYear,
    hrHourlyCost,
    costPerHire,
    turnoverSavings,
    costPerHireSavings,
    hrHoursSavings,
    productivitySavings,
    totalSavings,
    netBenefit,
    roiPct,
    paybackMonths,
  };
}

export function RoiProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<CompanyData>(defaultCompany);
  const [hiring, setHiring] = useState<HiringData>(defaultHiring);
  const [impact, setImpact] = useState<ImpactData>(defaultImpact);
  const [investment, setInvestment] = useState<number | "">("");
  const [currentSection, setCurrentSection] = useState(1);

  const results = useMemo(
    () => computeResults(company, hiring, impact, investment),
    [company, hiring, impact, investment],
  );

  return (
    <RoiContext.Provider
      value={{
        company,
        setCompany,
        hiring,
        setHiring,
        impact,
        setImpact,
        investment,
        setInvestment,
        currentSection,
        setCurrentSection,
        results,
      }}
    >
      {children}
    </RoiContext.Provider>
  );
}

export function useRoi() {
  const ctx = useContext(RoiContext);
  if (!ctx) throw new Error("useRoi must be used within RoiProvider");
  return ctx;
}

export function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

import { createContext, useContext, useState, ReactNode } from "react";

export interface CompanyData {
  companyName: string;
  employees: number | "";
  avgSalary: number | "";
  turnoverRate: number | ""; // %
  industry: string;
}

export interface HiringData {
  hiresPerYear: number | "";
  daysToHire: number | "";
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

export interface RoiState {
  company: CompanyData;
  setCompany: (data: CompanyData) => void;
  hiring: HiringData;
  setHiring: (data: HiringData) => void;
  impact: ImpactData;
  setImpact: (data: ImpactData) => void;
  currentSection: number;
  setCurrentSection: (n: number) => void;
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
  daysToHire: "",
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

export function RoiProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<CompanyData>(defaultCompany);
  const [hiring, setHiring] = useState<HiringData>(defaultHiring);
  const [impact, setImpact] = useState<ImpactData>(defaultImpact);
  const [currentSection, setCurrentSection] = useState(1);

  return (
    <RoiContext.Provider
      value={{
        company,
        setCompany,
        hiring,
        setHiring,
        impact,
        setImpact,
        currentSection,
        setCurrentSection,
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

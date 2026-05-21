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

export interface RoiState {
  company: CompanyData;
  setCompany: (data: CompanyData) => void;
  hiring: HiringData;
  setHiring: (data: HiringData) => void;
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

const RoiContext = createContext<RoiState | null>(null);

export function RoiProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<CompanyData>(defaultCompany);
  const [hiring, setHiring] = useState<HiringData>(defaultHiring);
  const [currentSection, setCurrentSection] = useState(1);

  return (
    <RoiContext.Provider
      value={{ company, setCompany, hiring, setHiring, currentSection, setCurrentSection }}
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

import { createContext, useContext, useState, ReactNode } from "react";

export interface CompanyData {
  companyName: string;
  employees: number | "";
  avgSalary: number | "";
  turnoverRate: number | ""; // %
  industry: string;
}

export interface RoiState {
  company: CompanyData;
  setCompany: (data: CompanyData) => void;
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

const RoiContext = createContext<RoiState | null>(null);

export function RoiProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<CompanyData>(defaultCompany);
  const [currentSection, setCurrentSection] = useState(1);

  return (
    <RoiContext.Provider value={{ company, setCompany, currentSection, setCurrentSection }}>
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

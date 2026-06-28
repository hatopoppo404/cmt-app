import type { Case } from "@/types/case";

export type CaseAlertSummary = {
  highRiskCount: number;
  urgentCount: number;
  delayedCount: number;
  activeCount: number;
};

const getStartOfToday = () => {
  const today = new Date();

  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

const perseDateString = "";

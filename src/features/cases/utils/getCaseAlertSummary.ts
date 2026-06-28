import type { Case } from "@/types/case";
import { isWithBusinessDays } from "./date";

export type CaseAlertSummary = {
  highRiskCount: number;
  urgentCount: number;
  delayedCount: number;
  activeCount: number;
};

export const getCaseAlertSummary = (cases: Case[]): CaseAlertSummary => {
  const activeCases = cases.filter((caseItem) => {
    return caseItem.status === "active" && caseItem.deletedAt === null;
  });

  const delayedCases = activeCases.filter((caseItem) => {
    return caseItem.delayDays > 0;
  });

  const urgentCases = activeCases.filter((caseItem) => {
    return isWithBusinessDays(caseItem.deadline, 3);
  });

  const highRiskCases = activeCases.filter((caseItem) => {
    return caseItem.delayDays > 0 && isWithBusinessDays(caseItem.deadline, 3);
  });

  return {
    highRiskCount: highRiskCases.length,
    urgentCount: urgentCases.length,
    delayedCount: delayedCases.length,
    activeCount: activeCases.length,
  };
};

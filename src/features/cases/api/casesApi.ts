import type { Case } from "@/types/case";
import { saveCases, loadCases } from "../utils/casesStrage";

export const getCases = async (): Promise<Case[] | null> => {
  return loadCases();
};
export const saveCasesApi = async (cases: Case[]): Promise<void> => {
  await saveCases(cases);
};

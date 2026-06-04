import type { Case } from "@/types/case";
import { saveCases, loadCases } from "../utils/casesStrage";

export const getCases = async (): Promise<Case[] | null> => {
  const response = await fetch(
    "/api/cases",
  );

  return response.json();
};

export const saveCasesApi = async (cases: Case[]): Promise<void> => {
  await saveCases(cases);
};

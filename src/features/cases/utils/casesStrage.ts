import type { Case } from "@/types/case";

export const CASES_STORAGE_KEY = "cases";

export const saveCases = (cases: Case[]) => {
  localStorage.setItem(CASES_STORAGE_KEY, JSON.stringify(cases));
};

export const loadCases = (): Case[] | null => {
  const data = localStorage.getItem(CASES_STORAGE_KEY);
  if (!data) return null;

  return JSON.parse(data);
};

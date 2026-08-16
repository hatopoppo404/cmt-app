import { mockCases } from "@/features/cases/data/mockCases";
import type { Case } from "@/types/case";

const DEMO_STORAGE_KEY = "cmt-app-demo-cases";

export const getLocalStorageCases = (): Case[] => {
  if (typeof window === "undefined") return mockCases;

  const savedCases = window.localStorage.getItem(DEMO_STORAGE_KEY);

  if (!savedCases) {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(mockCases));
    return mockCases;
  }

  return JSON.parse(savedCases) as Case[];
};

export const saveLocalStorageCases = (cases: Case[]): void => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(cases));
};

export const resetLocalStorageCases = async (): Promise<void> => {
  saveLocalStorageCases(mockCases);
};

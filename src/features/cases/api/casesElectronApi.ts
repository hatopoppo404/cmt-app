import type { Case } from "@/types/case";

export const getElectronCases = async (): Promise<Case[]> => {
  return window.electronAPI.getCases();
};

export const saveElectronCases = async (cases: Case[]): Promise<void> => {
  await window.electronAPI.saveCases(cases);
};

export const resetElectronCases = async (): Promise<void> => {
  await window.electronAPI.resetCases();
};

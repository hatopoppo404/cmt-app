import {
  getLocalStorageCases,
  saveLocalStorageCases,
  resetLocalStorageCases,
} from "./casesLocalStorage";
import { getWebCases, saveWebCases, resetWebCases } from "./casesWebApi";
import {
  getElectronCases,
  saveElectronCases,
  resetElectronCases,
} from "./casesElectronApi";
import type { Case } from "@/types/case";

type AppMode = "localStorage" | "web" | "electron";
const APP_MODE = process.env.NEXT_PUBLIC_APP_MODE as AppMode;

export const getCases = async (): Promise<Case[]> => {
  switch (APP_MODE) {
    case "localStorage":
      return getLocalStorageCases();
    case "web":
      return getWebCases();
    case "electron":
      return getElectronCases();
  }
};

export const saveCasesApi = async (cases: Case[]): Promise<void> => {
  switch (APP_MODE) {
    case "localStorage":
      return saveLocalStorageCases(cases);
    case "web":
      return saveWebCases(cases);
    case "electron":
      return saveElectronCases(cases);
  }
};

export const resetDemoCasesApi = async (): Promise<void> => {
  switch (APP_MODE) {
    case "localStorage":
      return resetLocalStorageCases();
    case "web":
      return resetWebCases();
    case "electron":
      return resetElectronCases();
  }
};

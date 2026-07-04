import { mockCases } from "@/features/cases/data/mockCases";
import type { Case } from "@/types/case";
import { mock } from "node:test";

const APP_MODE = process.env.NEXT_PUBLIC_APP_MODE;
const DEMO_STORAGE_KEY = "cmt-app-demo-cases";

const isDemoMode = APP_MODE === "demo";

const getDemoCases = (): Case[] => {
  if (typeof window === "undefined") return mockCases;

  const savedCases = window.localStorage.getItem(DEMO_STORAGE_KEY);

  if (!savedCases) {
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(mockCases));
    return mockCases;
  }

  return JSON.parse(savedCases) as Case[];
};

const saveDemoCases = (cases: Case[]): void => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(cases));
};

export const getCases = async (): Promise<Case[] | null> => {
  if (isDemoMode) return getDemoCases();

  const response = await fetch("/api/cases");

  if (!response.ok) {
    throw new Error("案件データの取得に失敗しました");
  }

  return response.json();
};

export const saveCasesApi = async (cases: Case[]): Promise<void> => {
  if (isDemoMode) {
    saveDemoCases(cases);
    return;
  }

  const response = await fetch("/api/cases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cases),
  });
  if (!response.ok) {
    throw new Error("案件データの保存に失敗しました");
  }
};

export const resetDemoCasesApi = async (): Promise<void> => {
  if (isDemoMode) {
    saveDemoCases(mockCases);
    return;
  }

  const response = await fetch("/api/cases/demo/reset", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("デモデータのリセットに失敗しました");
  }
};

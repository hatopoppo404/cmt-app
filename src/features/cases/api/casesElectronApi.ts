import type { Case } from "@/types/case";

export const getElectronCases = async (): Promise<Case[]> => {
  const response = await fetch("/api/cases");

  if (!response.ok) {
    throw new Error("案件データの取得に失敗しました");
  }

  return response.json();
};

export const saveElectronCases = async (cases: Case[]): Promise<void> => {
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

export const resetElectronCases = async (): Promise<void> => {
  const response = await fetch("/api/cases/demo/reset", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("デモデータのリセットに失敗しました");
  }
};

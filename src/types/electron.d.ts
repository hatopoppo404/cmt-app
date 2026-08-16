import type { Case } from "@/types/case";
export {};

declare global {
  interface Window {
    electronAPI: {
      ping: () => Promise<string>;
      openFile: () => Promise<string | null>;
      getCases: () => Promise<Case[]>;
      saveCases: (cases: Case[]) => Promise<void>;
      resetCases: () => Promise<void>;
    };
  }
}

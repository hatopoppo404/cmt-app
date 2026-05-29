import type { Case } from "@/types/case";

export const CASES_STRAGE_KEY = "cases";

export const saveCases = (
    cases: Case[],
) => {
    localStorage.setItem(
        CASES_STRAGE_KEY,
        JSON.stringify(cases),
    )
};

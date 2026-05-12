import type { Case } from "@/types/case";
import type { SortKey } from "@/features/cases/sort/sortOptions";

export const sortCases = (
    cases: Case[],
    sortKey: SortKey | null,
) => {
    if (sortKey === null) {
        return cases;
    }

    return [...cases].sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];

        if (
            typeof aValue === "number" &&
            typeof bValue === "number"
        ) {
            return aValue - bValue;
        }

        return String(aValue).localeCompare(String(bValue));
    });
};
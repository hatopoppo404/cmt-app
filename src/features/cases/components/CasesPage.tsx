
"use client";

import type { Case } from "@/types/case";
import { mockCases } from "@/features/cases/data/mockCases";

import { SearchInput } from "@/features/cases/components/SearchInput";
import { doesCaseMatchSearch } from "@/features/cases/utils/search";

import type { SortKey } from "@/features/cases/sort/sortOptions";
import { SortSet } from "@/features/cases/components/SortSet";
import { sortCases } from "@/features/cases/utils/sortCases";

import { CaseList } from "@/features/cases/components/CaseList";

import { createEmptyCase } from "../utils/createEmptyCase";

import { useState } from "react";


export const CasesPage = () => {

    // カード表示
    const [cases, setCases] = useState<Case[]>(() => {
        return [...mockCases].sort((a, b) => a.sortOrder - b.sortOrder);
    });

    const [searchText, setSearchText] = useState("");
    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [appliedSortKey, setAppliedSortKey] = useState<SortKey | null>(null);

    const visibleCases = cases.filter((caseItem) => {
        return caseItem.status === "active" && caseItem.deletedAt === null;
    });
    const filteredCases = visibleCases.filter((caseItem) => {
        return doesCaseMatchSearch(caseItem, searchText);
    });
    const sortedCases = sortCases(
        filteredCases,
        appliedSortKey,
    );

    // カード追加
    const handleAddCase = () => {
        setCases((prev) => {

            const newCase = createEmptyCase(0);
            const reorderdCases = [
                newCase,
                ...prev,
            ].map((caseItem, index) => {
                return {
                    ...caseItem,
                    sortOrder: index,
                };
            });

            return reorderdCases;
        });
    };
    return (
        <div className="
            flex 
            flex-col 
            gap-4 
            p-4
            relative
        ">
            <div className="
                fixed
                z-999
                top-4
                left-8

                flex 
                gap-6 
                justify-center 
                items-center

                h-fit                
            ">
                <div className="
                    flex 
                    gap-6 
                    justify-center 
                    h-fit
                ">
                    <SearchInput
                        searchText={searchText}
                        onSearchTextChange={setSearchText}
                    />
                    <SortSet
                        sortKey={sortKey}
                        onSortKeyChange={setSortKey}
                        onApplySort={() => setAppliedSortKey(sortKey)}
                    />
                </div>
                <div className="
                    flex 
                    gap-6 
                    justify-center
                ">
                    <button
                        type="button"
                        onClick={handleAddCase}
                        className="
                            bg-(--color-bg-sub)
                            px-2
                            w-10
                            h-10
                            rounded-lg
                            cursor-pointer
                            text-(--color-text)
                        "
                    >
                        +
                    </button>
                </div>
            </div>
            <div className="
                flex 
                max-w-[800px] 
                gap-4 
                justify-center
                mt-20
            ">
                <CaseList
                    cases={sortedCases}
                    onCasesChange={setCases}
                />
            </div>
        </div >
    );
};

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
import clsx from "clsx";


export const CasesPage = () => {

    // カード表示
    const [cases, setCases] = useState<Case[]>(() => {
        return [...mockCases].sort((a, b) => a.sortOrder - b.sortOrder);
    });

    const [searchText, setSearchText] = useState("");
    const [sortKey, setSortKey] = useState<SortKey | null>(null);
    const [appliedSortKey, setAppliedSortKey] = useState<SortKey | null>(null);

    const [currentTab, setCurrentTab] = useState<"active" | "archived">("active"); // タブ切替

    const visibleCases = cases.filter((caseItem) => {
        return (
            caseItem.status === currentTab
            &&
            caseItem.deletedAt === null
        );
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
    // カードアーカイブ
    const handleArchiveCase = (id: string) => {
        const now = new Date().toISOString();
        setCases((prev) => {
            return prev.map((caseItem) => {
                if (
                    caseItem.id !== id
                ) {
                    return caseItem;
                }
                return {
                    ...caseItem,
                    status: "archived",
                    archivedAt: now,
                    updatedAt: now,
                };
            });
        });
    };

    // 編集
    const handleUpdatesCase = (
        id: string,
        updates: Partial<Case>,
    ) => {
        const now = new Date().toISOString();
        setCases(
            (prev) => prev.map(
                (caseItem) =>
                    caseItem.id === id
                        ? {
                            ...caseItem,
                            ...updates,
                            updatedAt: now,
                        }
                        : caseItem,

            ),
        );
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
                            shadow-md

                            transition-transform
                            duration-200
                            hover:scale-105
                            active:scale-95
                            hover:shadow-lg
                        "
                    >
                        +
                    </button>
                </div>
                <div className="
                    relative 
                    flex
                    gap-2
                    rounded-full
                    bg-(--color-bg-sub)
                    p-2
                    text-sm
                    opacity-70
                ">
                    <div
                        className={clsx(
                            "absolute",
                            "top-2",
                            "bottom-2",
                            "w-23",
                            "rounded-full",
                            "bg-(--color-bg)",
                            "shadow",
                            "transition-transform",
                            "duration-200",
                            currentTab === "archived" && "translate-x-23",

                        )}>

                    </div>
                    <button
                        type="button"
                        onClick={() => setCurrentTab("active",)}
                        className={clsx(
                            "relative",
                            "z-10",
                            "w-22",
                            "py-2",
                            "cursor-pointer",
                            "opacity-40",
                            "hover:opacity-100",
                            "text-(--color-text)",
                            currentTab === "active" && "opacity-100",
                        )}>
                        ACTIVE
                    </button>
                    <button
                        type="button"
                        onClick={() => setCurrentTab("archived",)}
                        className={clsx(
                            "relative",
                            "z-10",
                            "w-22",
                            "py-2",
                            "cursor-pointer",
                            "opacity-40",
                            "hover:opacity-100",
                            "text-(--color-text)",
                            currentTab === "archived" && "opacity-100",
                        )}>
                        ARCHIVED
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
                    onArchive={handleArchiveCase}
                    onUpdate={handleUpdatesCase}
                />
            </div>
        </div >
    );
};
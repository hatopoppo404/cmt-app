"use client";

import type { Case } from "@/types/case";
import { mockCases } from "@/features/cases/data/mockCases";

import { SearchInput } from "@/features/cases/components/SearchInput";
import { doesCaseMatchSearch } from "@/features/cases/utils/search";

import type { SortKey } from "@/features/cases/sort/sortOptions";
import { SortSet } from "@/features/cases/components/SortSet";
import { sortCases } from "@/features/cases/utils/sortCases";
import { AddCaseButton } from "@/features/cases/components/AddCaseButton";
import { CasesTabs } from "@/features/cases/components/CasesTabs";

import { CaseList } from "@/features/cases/components/CaseList";

import { createEmptyCase } from "../utils/createEmptyCase";

import { useState } from "react";
import clsx from "clsx";
import { calculateBusinessDelaDays } from "../utils/date";

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
    return caseItem.status === currentTab && caseItem.deletedAt === null;
  });
  const filteredCases = visibleCases.filter((caseItem) => {
    return doesCaseMatchSearch(caseItem, searchText);
  });
  const sortedCases = sortCases(filteredCases, appliedSortKey);

  // カード追加
  const handleAddCase = () => {
    setCases((prev) => {
      const newCase = createEmptyCase(0);
      const reorderdCases = [newCase, ...prev].map((caseItem, index) => {
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
        if (caseItem.id !== id) {
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
  const handleUpdatesCase = (id: string, updates: Partial<Case>) => {
    const now = new Date().toISOString();
    setCases((prev) => {
      return prev.map((caseItem) => {
        if (caseItem.id !== id) return caseItem;
        const updatedCase = {
          ...caseItem,
          ...updates,
          updatedAt: now,
        };
        console.log("updatedCase", updatedCase);
        console.log(typeof updatedCase.dueDate, updatedCase.dueDate);
        console.log(typeof updatedCase.replyDate, updatedCase.replyDate);
        console.log(typeof updatedCase.deadline, updatedCase.deadline);

        const delayDays = calculateBusinessDelaDays({
          dueDate: updatedCase.dueDate,
          replyDate: updatedCase.replyDate,
          deadline: updatedCase.deadline,
        });
        return {
          ...updatedCase,
          delayDays,
        };
      });
    });
  };

  return (
    <div className="relative flex flex-col flex-wrap gap-4 p-4">
      <div
        className={clsx(
          "sticky",
          "z-999",
          "top-4",
          "left-8",

          "flex",
          "flex-wrap",
          "gap-6",
          "justify-center",
          "items-center",

          "h-fit",
        )}
      >
        <div className={clsx("flex", "gap-6", "justify-center", "h-fit")}>
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
        <AddCaseButton onClick={handleAddCase} />
        <CasesTabs currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
      <div className={clsx("flex", "max-w-[800px]", "gap-4", "justify-center", "w-full", "mx-auto")}>
        <CaseList
          cases={sortedCases}
          onCasesChange={setCases}
          onArchive={handleArchiveCase}
          onUpdate={handleUpdatesCase}
        />
      </div>
    </div>
  );
};

"use client";

import type { Case } from "@/types/case";
import { mockCases } from "@/features/cases/data/mockCases";

import { SearchInput } from "@/features/cases/components/SearchInput";
import { doesCaseMatchSearch } from "@/features/cases/utils/search";

import type { SortKey } from "@/features/cases/sort/sortOptions";
import { sortCases } from "@/features/cases/utils/sortCases";

import { CasesSidebar } from "@/features/cases/components/CasesSidebar";
import { AddCaseButton } from "@/features/cases/components/AddCaseButton";
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
    <div
      className={clsx(
        "grid",
        "grid-cols-[400px_1fr]",
        "gap-2",
        "px-8",
        "py-4",
        "h-screen",
      )}
    >
      <CasesSidebar
        searchText={searchText}
        onSearchTextChange={setSearchText}
        sortKey={sortKey}
        onSortKeyChange={setSortKey}
        onApplySort={() => setAppliedSortKey(sortKey)}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />
      <div
        className={clsx(
          "flex",
          "flex-col",
          "gap-4",
          "justify-center",
          "mx-auto",

          "relative",
        )}
      >
        <div className={clsx("sticky", "top-8", "z-998", )}>
          <AddCaseButton onClick={handleAddCase} />
        </div>

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

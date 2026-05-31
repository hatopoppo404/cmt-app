"use client";

import type { Case } from "@/types/case";
import { mockCases } from "@/features/cases/data/mockCases";
import { saveCases, loadCases } from "../utils/casesStrage";

import { doesCaseMatchSearch } from "@/features/cases/utils/search";

import type { SortKey } from "@/features/cases/sort/sortOptions";
import { sortCases } from "@/features/cases/utils/sortCases";

import { CasesSidebar } from "@/features/cases/components/CasesSidebar";

import { createEmptyCase } from "../utils/createEmptyCase";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { calculateBusinessDelayDays } from "../utils/date";
import { CasesMain } from "./CasesMain";

export const CasesPage = () => {
  // カード表示
  const [cases, setCases] = useState<Case[]>(() => {
    return [...mockCases].sort((a, b) => a.sortOrder - b.sortOrder);
  });
  const [isCasesLoaded, setIsCasesLoaded] = useState(false);

  // 読み込み
  useEffect(() => {
    const savedCases = loadCases();
    if (savedCases) {
      setCases(savedCases.sort((a, b) => a.sortOrder - b.sortOrder));
    }
    setIsCasesLoaded(true);
  }, []);

  // 保存
  useEffect(() => {
    if (!isCasesLoaded) return;
    saveCases(cases);
  }, [cases, isCasesLoaded]);

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

        const delayDays = calculateBusinessDelayDays({
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
        "grid-cols-[320px_minmax(0,1fr)]",
        "gap-6",
        "h-dvh",
        "overflow-hidden",
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
      <CasesMain
        cases={sortedCases}
        onAddCase={handleAddCase}
        onCasesChange={setCases}
        onArchive={handleArchiveCase}
        onUpdate={handleUpdatesCase}
      />
    </div>
  );
};

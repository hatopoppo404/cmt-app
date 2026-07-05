"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

import type { Case, CaseStatus, SummaryFilter } from "@/types/case";
import {
  getCases,
  saveCasesApi,
  resetDemoCasesApi,
} from "@/features/cases/api/casesApi";
import { DemoResetButton } from "./DemoResetButton";

import { doesCaseMatchSearch } from "@/features/cases/utils/search";
import type { SortKey } from "@/features/cases/sort/sortOptions";
import { sortCases } from "@/features/cases/utils/sortCases";
import { getCaseAlertSummary } from "@/features/cases/utils/getCaseAlertSummary";

import { CasesTopDock } from "@/features/cases/components/CasesTopDock";
import { CasesAlertSummary } from "@/features/cases/components/CasesAlertSummary";
import { createEmptyCase } from "../utils/createEmptyCase";
import { calculateBusinessDelayDays, isWithBusinessDays } from "../utils/date";
import { CasesMain } from "./CasesMain";
import { toastConfig, Toast } from "@/components/ui/Toast";

export const CasesPage = () => {
  // トースト表示
  const [toast, setToast] = useState<{
    type: keyof typeof toastConfig;
    message: string;
  } | null>(null);

  const showToast = (type: keyof typeof toastConfig, message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 10000);
  };

  // カード表示
  const [cases, setCases] = useState<Case[]>([]);
  const [isCasesLoaded, setIsCasesLoaded] = useState(false);

  // 読み込み
  useEffect(() => {
    const initializeCases = async () => {
      const savedCases = await getCases();

      if (savedCases) {
        setCases(savedCases.sort((a, b) => a.sortOrder - b.sortOrder));
      }
      setIsCasesLoaded(true);
    };

    initializeCases();
  }, []);
  // 集計
  const summary = getCaseAlertSummary(cases);
  const [summaryFilter, setSummaryFilter] = useState<SummaryFilter>(null);
  const handleSummaryFilterChange = (filter: Exclude<SummaryFilter, null>) => {
    setSummaryFilter((currentFilter) =>
      currentFilter === filter ? null : filter,
    );
  };
  const macthesSummaryFilter = (caseItem: Case) => {
    if (!summaryFilter) return true;
    if (caseItem.status !== "active" || caseItem.deletedAt !== null)
      return false;
    switch (summaryFilter) {
      case "active":
        return true;
      case "delayed":
        return caseItem.delayDays < 0;
      case "urgent":
        return isWithBusinessDays(caseItem.deadline, 3);
      case "highRisk":
        return (
          caseItem.delayDays < 0 && isWithBusinessDays(caseItem.deadline, 3)
        );
      default:
        return true;
    }
  };
  // 保存
  useEffect(() => {
    if (!isCasesLoaded) return;
    saveCasesApi(cases);
  }, [cases, isCasesLoaded]);

  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [appliedSortKey, setAppliedSortKey] = useState<SortKey | null>(null);

  const [currentTab, setCurrentTab] = useState<CaseStatus>("active"); // タブ切替

  const visibleCases = cases.filter((caseItem) => {
    return caseItem.status === currentTab && caseItem.deletedAt === null;
  });
  const filteredCases = visibleCases.filter((caseItem) => {
    return (
      doesCaseMatchSearch(caseItem, searchText) &&
      macthesSummaryFilter(caseItem)
    );
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

  //デモリセット
  const [isResettingDemo, setIsResettingDemo] = useState(false);
  const handleResetDemoCases = async () => {
    try {
      setIsResettingDemo(true);
      await resetDemoCasesApi();
      const loadedCases = await getCases();
      setCases(loadedCases ?? []);
      showToast("success", "デモデータを復元しました");
    } catch (error) {
      console.error(error);
    } finally {
      setIsResettingDemo(false);
      showToast("error", "デモデータの復元に失敗しました");
    }
  };

  return (
    <div
      className={clsx(
        // "relative",
        "bg-(--color-bg-page)",
        "min-h-dvh",
        "w-[700px]",
        "mx-auto",

        "grid",
        "grid-rows-[auto_auto_1fr]",
        "gap-6",
        "p-6",
        "h-[calc(100dvh-32px)]",
      )}
    >
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      <DemoResetButton
        onReset={handleResetDemoCases}
        isLoading={isResettingDemo}
      />
      <CasesTopDock
        searchText={searchText}
        onSearchTextChange={setSearchText}
        sortKey={sortKey}
        onSortKeyChange={setSortKey}
        onApplySort={() => setAppliedSortKey(sortKey)}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />
      <CasesAlertSummary
        highRiskCount={summary.highRiskCount}
        urgentCount={summary.urgentCount}
        delayedCount={summary.delayedCount}
        activeCount={summary.activeCount}
        summaryFilter={summaryFilter}
        onSummaryFilterChange={handleSummaryFilterChange}
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

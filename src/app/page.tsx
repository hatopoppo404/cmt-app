"use client";
import type { Case } from "@/types/case";
import type { SortKey } from "@/features/cases/sort/sortOptions";
import { sortCases } from "@/features/cases/utils/sortCases";
import { Card } from "@/features/cases/components/Card";
import clsx from "clsx";
import { SearchInput } from "@/features/cases/components/SearchInput";
import { SortSet } from "@/features/cases/components/SortSet";
import { useState } from "react";
import { doesCaseMatchSearch } from "@/features/cases/utils/search";
import { CaseList } from "@/features/cases/components/CaseList";
import { mockCases } from "@/features/cases/data/mockCases";


export default function Home() {

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



  return (
    <main
      className={clsx(
        "bg-[var(--color-bg)]",
        "bg-[var(--color-gray-500)]",
        "min-h-screen",
        "p-8",
        "flex",
        "flex-col",
        "items-center",
        "gap-8",
      )}
    >
      <div className="flex gap-6">
        <SearchInput searchText={searchText} onSearchTextChange={setSearchText} />
        <SortSet
          sortKey={sortKey}
          onSortKeyChange={setSortKey}
          onApplySort={() => setAppliedSortKey(sortKey)}
        />
      </div>
      <div className="flex w-full max-w-[800px] flex-col gap-4">
        <CaseList
          cases={sortedCases}
          onCasesChange={setCases}
        />
      </div>
    </main>
  );
}

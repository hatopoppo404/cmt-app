"use client";
import type { Case } from "@/types/case";
import type { SortKey } from "@/lib/sort/sortOptions";
import { sortCases } from "@/lib/sort/sortCases";
import { Card } from "@/components/cases/Card";
import clsx from "clsx";
import { SearchInput } from "@/components/toolbar/SearchInput";
import { SortSet } from "@/components/toolbar/SortSet";
import { useState } from "react";
import { doesCaseMatchSearch } from "@/lib/utils/search";
import { CaseList } from "@/components/cases/CaseList";
import { mockCases } from "@/features/cases/data/mockCases";


export default function Home() {
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [searchText, setSearchText] = useState("");
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [appliedSortKey, setAppliedSortKey] = useState<SortKey | null>(null);

  const filteredCases = cases.filter((caseItem) => {
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

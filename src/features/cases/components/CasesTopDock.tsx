"use client";
import { useState } from "react";
import clsx from "clsx";

import { SearchInput } from "./SearchInput";
import { SortSet } from "./SortSet";
import { CasesTabs } from "./CasesTabs";

import type { SortKey } from "../sort/sortOptions";
import type { CaseStatus } from "@/types/case";

type Props = {
  searchText: string;
  onSearchTextChange: (value: string) => void;
  sortKey: SortKey | null;
  onSortKeyChange: (value: SortKey | null) => void;
  onApplySort: () => void;
  currentTab: CaseStatus;
  onTabChange: (tab: CaseStatus) => void;
};

export const CasesTopDock = ({
  searchText,
  onSearchTextChange,
  sortKey,
  onSortKeyChange,
  onApplySort,
  currentTab,
  onTabChange,
}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <aside
      className={clsx(
        "grid",
        "grid-cols-[minmax(0,1fr)_auto]",
        "grid-rows-[auto_auto]",
        "gap-4",
      )}
    >
      <div className={clsx("col-span-2", "row-start-1")}>
        <SearchInput
          searchText={searchText}
          onSearchTextChange={onSearchTextChange}
        />
      </div>
      <div className={clsx("col-start-1", "row-start-2")}>
        <CasesTabs currentTab={currentTab} onTabChange={onTabChange} />
      </div>
      <div className={clsx("col-start-2", "row-start-2")}>
        <SortSet
          sortKey={sortKey}
          onSortKeyChange={onSortKeyChange}
          onApplySort={onApplySort}
        />
      </div>
    </aside>
  );
};

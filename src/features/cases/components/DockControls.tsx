import clsx from "clsx";

import { SearchInput } from "./SearchInput";
import { CasesTabs } from "./CasesTabs";
import { SortSet } from "./SortSet";

import type { CaseStatus } from "@/types/case";
import type { SortKey } from "../sort/sortOptions";

type Props = {
  isOpen: boolean;
  searchText: string;
  onSearchTextChange: (value: string) => void;

  currentTab: CaseStatus;
  onTabChange: (tab: CaseStatus) => void;

  sortKey: SortKey | null;
  onSortKeyChange: (value: SortKey | null) => void;
  onApplySort: () => void;
};

export const DockControls = ({
  isOpen,
  searchText,
  onSearchTextChange,
  currentTab,
  onTabChange,
  sortKey,
  onSortKeyChange,
  onApplySort,
}: Props) => {
  return (
    <div
      className={clsx(
        "relative",
        "z-10",
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
    </div>
  );
};

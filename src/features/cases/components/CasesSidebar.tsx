// import { CasesToolbar } from "@/components/CasesToolbar";
import { SearchInput } from "./SearchInput";
import { SortSet } from "./SortSet";
import { CasesTabs } from "./CasesTabs";

import type { SortKey } from "../sort/sortOptions";

import clsx from "clsx";

type Props = {
  searchText: string;
  onSearchTextChange: (value: string) => void;
  sortKey: SortKey | null;
  onSortKeyChange: (value: SortKey | null) => void;
  onApplySort: () => void;
  currentTab: "active" | "archived";
  onTabChange: (tab: "active" | "archived") => void;
};

export const CasesSidebar = ({
  searchText,
  onSearchTextChange,
  sortKey,
  onSortKeyChange,
  onApplySort,
  currentTab,
  onTabChange,
}: Props) => {
  return (
    <aside
      className={clsx(
        "flex",
        "flex-col",
        "justify-between",
        "gap-6",
        "h-dvh",
        "px-4",
        "py-6",
      )}
    >
      <div className={clsx(
        "flex",
        "flex-col",
         "gap-6",
       )}>
        <SearchInput
          searchText={searchText}
          onSearchTextChange={onSearchTextChange}
        />
        <SortSet
          sortKey={sortKey}
          onSortKeyChange={onSortKeyChange}
          onApplySort={onApplySort}
        />
      </div>
      <div>
        <CasesTabs currentTab={currentTab} onTabChange={onTabChange} />
      </div>
    </aside>
  );
};

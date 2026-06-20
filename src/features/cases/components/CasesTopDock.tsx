"use client";
import { useState } from "react";
import clsx from "clsx";

import type { SortKey } from "../sort/sortOptions";
import type { CaseStatus } from "@/types/case";
import { DockBackground } from "./DockBackground";
import { DockControls } from "./DockControls";
import { DockToggleButton } from "./DockToggleButton";

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
        "relative",

        "w-full",
        "h-fit",
        "px-4",
        "py-4",
      )}
    >
      <DockBackground isOpen={open} />
      <DockControls
        isOpen={open}
        searchText={searchText}
        onSearchTextChange={onSearchTextChange}
        sortKey={sortKey}
        onSortKeyChange={onSortKeyChange}
        onApplySort={onApplySort}
        currentTab={currentTab}
        onTabChange={onTabChange}
      />
      <DockToggleButton
        isOpen={open}
        onToggle={() => setOpen((prev) => !prev)}
      />
    </aside>
  );
};

import clsx from "clsx";

import { SearchInput } from "./SearchInput";
import { CasesTabs } from "./CasesTabs";
import { SortSet } from "./SortSet";

import type { Case, CaseStatus } from "@/types/case";
import type { SortKey } from "../sort/sortOptions";

type Props = {
  isOpen: boolean;
  searchText: string;
  onSearchTextChange: (value: string) => void;

  currentTab: CaseStatus;
};

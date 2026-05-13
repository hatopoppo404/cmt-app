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
import { CasesPage } from "@/features/cases/components/CasesPage";


export default function Home() {
  return (
      <CasesPage />
  );
}

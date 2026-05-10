"use client";
import type { Case } from "@/types/case";
import { Card } from "@/components/cases/Card";
import clsx from "clsx";
import { SearchInput } from "@/components/toolbar/SearchInput";
import { useState } from "react";
import { doesCaseMatchSearch } from "@/lib/utils/search";

const mockCases: Case[] = [
  {
    id: "1",
    itemName: "商品A",
    itemCode: "A-001",
    dueDate: "2024-07-01",
    replyDate: "2024-06-25",
    delayDays: -9,
    orderCode: "ORD-12345",
    deadline: "2024-06-28",
    quantity: 100,
    warehouse: "東京倉庫",
    cause: "部品の遅延",
    note: "部品メーカーの生産遅延が原因で、納期に間に合わない見込みです。",
  },
  {
    id: "2",
    itemName: "商品B",
    itemCode: "B-014",
    dueDate: "2024-07-10",
    replyDate: "2024-07-02",
    delayDays: -1,
    orderCode: "ORD-56789",
    deadline: "2024-07-08",
    quantity: 250,
    warehouse: "福岡倉庫",
    cause: "輸送トラブル",
    note: "台風の影響で輸送便に遅れが発生しています。",
  },
  {
    id: "3",
    itemName: "商品C",
    itemCode: "C-0701",
    dueDate: "2024-07-15",
    replyDate: "2024-07-10",
    delayDays: 3,
    orderCode: "ORD-99881",
    deadline: "2024-07-18",
    quantity: 80,
    warehouse: "大阪倉庫",
    cause: "正常",
    note: "現在のところ大きな問題はなく、予定通り進行しています。",
  },
];

export default function Home() {
  const [searchText, setSearchText] = useState("");

  const filteredCases = mockCases.filter((caseItem) => {
    return doesCaseMatchSearch(caseItem, searchText);
  });

  return (
    <main
      className={clsx(
        "bg-[var(--color-bg)]",
        "min-h-screen",
        "p-8",
        "flex",
        "flex-col",
        "items-center",
        "gap-8",
      )}
    >
      <SearchInput searchText={searchText} onSearchTextChange={setSearchText} />
      <div className="flex w-full max-w-[800px] flex-col gap-4">
        {filteredCases.map((caseItem) => (
          <Card key={caseItem.id} caseItem={caseItem} />
        ))}
      </div>
    </main>
  );
}

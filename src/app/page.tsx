"use client";
import type { Case } from "@/types/case";
import { Card } from "@/components/cases/Card";
import clsx from "clsx";
import { SearchInput } from "@/components/toolbar/SearchInput";

export default function Home() {
  return (
    <main className={clsx("bg-[var(--color-bg)]", "min-h-screen", "p-8", "flex", "flex-col", "items-center","gap-8")}>
      <SearchInput className={clsx("mb-8")} />
      <Card
        caseItem={{
          id: "1",
          itemName: "商品A",
          itemCode: "A-001",
          dueDate: "2024-07-01",
          replyDate: "2024-06-25",
          delayDays: -999,
          orderCode: "ORD-12345",
          deadline: "",
          quantity: 100,
          warehouse: "東京倉庫",
          cause: "部品の遅延",
          note: "部品メーカーの生産遅延が原因で、納期に間に合わない見込みです。",
        }}
      />
    </main>
  );
}

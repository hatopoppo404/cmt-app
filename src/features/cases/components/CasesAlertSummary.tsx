"use client";

import clsx from "clsx";
import { SummaryStatCard } from "@/features/cases/components/SummaryStatCard";
import { useState } from "react";
import type { SummaryFilter } from "@/types/case";

type Props = {
  highRiskCount: number;
  urgentCount: number;
  delayedCount: number;
  activeCount: number;
  summaryFilter: SummaryFilter;
  onSummaryFilterChange: (filter: Exclude<SummaryFilter, null>) => void;
};

export const CasesAlertSummary = ({
  highRiskCount,
  urgentCount,
  delayedCount,
  activeCount,
  summaryFilter,
  onSummaryFilterChange,
}: Props) => {
  const [emphasizedCard, setEmphasizedCard] = useState("highRisk");
  return (
    <section
      className={clsx(
        "grid",
        "grid-cols-4",
        "gap-(--space-gap-md)",
        "p-(--space-gap-md)",
        "bg-(--color-bg-card)",
        "rounded-(--radius-wrapper)",
        "shadow-md",
      )}
    >
      <SummaryStatCard
        label="高リスク"
        value={highRiskCount}
        emphasized={emphasizedCard === "highRisk"}
        onClick={() => {
          if (emphasizedCard === "highRisk") {
            setEmphasizedCard("");
          } else {
            setEmphasizedCard("highRisk");
            onSummaryFilterChange("highRisk");
          }
        }}
      />
      <SummaryStatCard
        label="期限迫り"
        value={urgentCount}
        emphasized={emphasizedCard === "urgent"}
        onClick={() => {
          if (emphasizedCard === "urgent") {
            setEmphasizedCard("");
          } else {
            setEmphasizedCard("urgent");
            onSummaryFilterChange("urgent");
          }
        }}
      />
      <SummaryStatCard
        label="遅延"
        value={delayedCount}
        emphasized={emphasizedCard === "delayed"}
        onClick={() => {
          if (emphasizedCard === "delayed") {
            setEmphasizedCard("");
          } else {
            setEmphasizedCard("delayed");
            onSummaryFilterChange("delayed");
          }
        }}
      />
      <SummaryStatCard
        label="対応中"
        value={activeCount}
        emphasized={emphasizedCard === "active"}
        onClick={() => {
          if (emphasizedCard === "active") {
            setEmphasizedCard("");
          } else {
            setEmphasizedCard("active");
            onSummaryFilterChange("active");
          }
        }}
      />
    </section>
  );
};

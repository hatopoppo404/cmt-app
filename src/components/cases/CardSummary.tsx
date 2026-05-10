"use client";
import type { Case } from "@/types/case";
import clsx from "clsx";

import { DelayBadge } from "@/components/cases/DelayBadge";
import { CardHeader } from "@/components/cases/CardHeader";
import { OpenButton } from "@/components/cases/OpenButton";

type Props = {
  CaseItem: Case;
  isOpen: boolean;
  onClick: () => void;
};

export const CardSummary = ({ CaseItem, isOpen, onClick }: Props) => {
  return (
    <div
      className={clsx(
        "w-[400px]",
        "grid",
        "grid-cols-[auto_1fr_auto]",
        "gap-4",
        "p-4",
        "rounded-lg",
      )}
    >
      <DelayBadge delayDays={CaseItem.delayDays} />
      <CardHeader
        itemName={CaseItem.itemName}
        itemCode={CaseItem.itemCode}
        dueDate={CaseItem.dueDate}
        replyDate={CaseItem.replyDate}
      />
      <OpenButton isOpen={isOpen} onClick={onClick} />
    </div>
  );
};

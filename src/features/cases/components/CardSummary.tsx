"use client";
import type { Case } from "@/types/case";
import clsx from "clsx";

import { DelayBadge } from "@/features/cases/components/DelayBadge";
import { CardHeader } from "@/features/cases/components/CardHeader";
import { OpenButton } from "@/features/cases/components/OpenButton";

type Props = {
  caseItem: Case;
  isOpen: boolean;
  onClick: () => void;
  onUpdate: (
    id: string,
    updates: Partial<Case>,
  ) => void;
};

export const CardSummary = ({
  caseItem,
  isOpen,
  onClick,
  onUpdate,
}: Props) => {
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
      <DelayBadge delayDays={caseItem.delayDays} />
      <CardHeader
        itemName={caseItem.itemName}
        itemCode={caseItem.itemCode}
        dueDate={caseItem.dueDate}
        replyDate={caseItem.replyDate}
        caseId={caseItem.id}
        onUpdate={onUpdate}
      />
      <OpenButton isOpen={isOpen} onClick={onClick} />
    </div>
  );
};

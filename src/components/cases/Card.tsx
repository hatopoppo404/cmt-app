"use client";
import type { Case } from "@/types/case";
import clsx from "clsx";
import { useState } from "react";

import { CardSummary } from "@/components/cases/CardSummary";
import { CardDetail } from "@/components/cases/CardDetail";
import { NoteSec } from "@/components/cases/NoteSec";

type Props = {
  caseItem: Case;
};

export const Card = ({ caseItem }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx(
        "w-fit",
        "grid",
        "grid-rows-[auto_auto_auto]",
        "p-2",
        "rounded-lg",
        "bg-[var(--color-bg-sub)]",
        "shadow-md",
        "transition-shadow",
        "hover:shadow-lg",
        "duration-300",
      )}
    >
      <CardSummary
        caseItem={caseItem}
        isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      <div
        className={clsx(
          "grid",
          "overflow-hidden",
          "transition-[grid-template-rows,opacity]",
          "duration-300",
          "ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <CardDetail
            orderCode={caseItem.orderCode}
            quantity={caseItem.quantity}
            warehouse={caseItem.warehouse}
            deadline={caseItem.deadline}
            cause={caseItem.cause}
          />
          <NoteSec note={caseItem.note} />
        </div>
      </div>
    </div>
  );
};

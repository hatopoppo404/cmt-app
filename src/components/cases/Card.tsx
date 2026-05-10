"use client";
import type { Case } from "@/types/case";
import clsx from "clsx";
import { useState } from "react";

import { CardSummary } from "@/components/cases/CardSummary";
import { CardDetail } from "@/components/cases/CardDetail";
import { NoteSec } from "@/components/cases/NoteSec";

type Props = {
  CaseItem: Case;
};

export const Card = ({ CaseItem }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx(
        "w-fit",
        "grid",
        "grid-rows-[auto_auto_auto]",
        "p-4",
        "rounded-lg",
        "bg-[var(--color-bg-sub)]",
      )}
    >
      <CardSummary
        Cases={CaseItem}
        isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <CardDetail
          orderCode={CaseItem.orderCode}
          quantity={CaseItem.quantity}
          warehouse={CaseItem.warehouse}
          deadline={CaseItem.deadline}
          cause={CaseItem.cause}
        />
      )}
      {isOpen && <NoteSec note={CaseItem.note} />}
    </div>
  );
};

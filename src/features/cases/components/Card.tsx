"use client";
import type { Case } from "@/types/case";
import clsx from "clsx";
import { useState } from "react";

import { CardSummary } from "@/features/cases/components/CardSummary";
import { CardDetail } from "@/features/cases/components/CardDetail";
import { NoteSec } from "@/features/cases/components/NoteSec";
import { text } from "stream/consumers";
import { m } from "framer-motion";
import { ArchiveIcon } from "lucide-react";

type Props = {
  caseItem: Case;
  onArchive: (
    id: string,
  ) => void;
  onUpdate: (
    id: string,
    updates: Partial<Case>,
  ) => void;
};

export const Card = ({
  caseItem,
  onArchive,
  onUpdate,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx(
        "w-[400px]",
        "grid",
        "grid-rows-[auto_auto_auto]",
        "rounded-lg",
        "bg-[var(--color-bg-sub)]",
        "shadow-md",
        "transition-shadow",
        "hover:shadow-lg",
        "duration-300",

        "text-(--color-text)",
      )}
    >
      <CardSummary
        caseItem={caseItem}
        isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        onUpdate={onUpdate}
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
        <div className="min-h-0  px-4">
          <CardDetail
            orderCode={caseItem.orderCode}
            quantity={caseItem.quantity}
            warehouse={caseItem.warehouse}
            deadline={caseItem.deadline}
            cause={caseItem.cause}
            onUpdate={onUpdate}
            caseId={caseItem.id}
          />
          <NoteSec
            caseId={caseItem.id}
            note={caseItem.note}
            onUpdate={onUpdate}
          />
          <button
            type="button"
            onClick={() => onArchive(caseItem.id)}
            className="
            ml-auto
            p-2
            my-0
            opacity-30
            
            hover:text-(--blue-500)
            hover:opacity-100
            cursor-pointer

            group
            flex
            items-center
            gap-2
            "
          >
            <ArchiveIcon
              className="
                size-[20px]
            "/>
            <span className="
              text-[0.7em]
              p-0

              max-w-0
              overflow-hidden
              opacity-0

              transition-all
              duration-200

              group-hover:max-w-fit
              group-hover:opacity-100
              group-hover:pr-1
            ">
              Archive
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

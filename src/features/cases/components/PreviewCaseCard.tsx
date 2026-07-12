"use client";
import type { Case, CaseActions } from "@/types/case";
import clsx from "clsx";
import { useState } from "react";

import { CardSummary } from "@/features/cases/components/CardSummary";
import { CardDetail } from "@/features/cases/components/CardDetail";
import { NoteSec } from "@/features/cases/components/NoteSec";

import { CopyIcon } from "@/components/icons/CopyIcon";
import { ArchiveIcon } from "@/components/icons/ArchiveIcon";
import { DeleteIcon } from "@/components/icons/DeleteIcon";

type Props = {
  caseItem: Case;
  caseActions: CaseActions;
};

export const Card = ({ caseItem, caseActions }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const actionButtonClass = [
    "w-fit",
    "p-2",
    "my-0",
    "size-8",
    "opacity-30",

    "hover:opacity-100",
    "cursor-pointer",

    "group",
    "flex",
    "items-center",
    "gap-2",
  ];
  const actionTextClass = [
    "text-[0.7em]",
    "p-0",

    "max-w-0",
    "overflow-hidden",
    "opacity-0",

    "transition-all",
    "duration-200",

    "group-hover:max-w-fit",
    "group-hover:opacity-100",
    "group-hover:pr-1",
  ];
  return (
    <div
      className={clsx(
        "w-[520px]",
        "grid",
        "grid-rows-[auto_auto_auto]",
        "rounded-lg",
        "bg-(--color-bg-card)",
        "shadow-md",
        "transition-shadow",
        "hover:shadow-lg",
        "duration-300",

        "text-(--color-text)",
        "border-[10px]",
        "border-(--color-border-card)",
      )}
    >
      <CardSummary
        caseItem={caseItem}
        isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        onUpdate={caseActions.onUpdateCase}
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
        <div className="min-h-0 px-4">
          <CardDetail
            orderCode={caseItem.orderCode}
            quantity={caseItem.quantity}
            warehouse={caseItem.warehouse}
            deadline={caseItem.deadline}
            cause={caseItem.cause}
            supplier={caseItem.supplier}
            onUpdate={caseActions.onUpdateCase}
            caseId={caseItem.id}
          />
          <NoteSec
            caseId={caseItem.id}
            note={caseItem.note}
            onUpdate={caseActions.onUpdateCase}
          />
          <div
            className={clsx("flex", "flex-row", "gap-2", "justify-end", "py-2")}
          >
            <button
              type="button"
              onClick={() => caseActions.onDuplicateCase(caseItem.id)}
              className={clsx(actionButtonClass, "hover:text-(--blue-500)")}
            >
              <CopyIcon className="size-[20px]" />
              <span className={clsx(actionTextClass)}>Content Copy</span>
            </button>
            <button
              type="button"
              onClick={() => caseActions.onArchiveCase(caseItem.id)}
              className={clsx(actionButtonClass, "hover:text-(--yellow-500)")}
            >
              <ArchiveIcon className="size-[20px]" />
              <span className={clsx(actionTextClass)}>Archive</span>
            </button>
            <button
              type="button"
              onClick={() => caseActions.onDeleteCase(caseItem.id)}
              className={clsx(actionButtonClass, "hover:text-(--red-500)")}
            >
              <DeleteIcon className="size-[20px]" />
              <span className={clsx(actionTextClass)}>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

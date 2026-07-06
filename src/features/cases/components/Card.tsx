"use client";
import type { Case } from "@/types/case";
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
  onDuplicate: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Case>) => void;
};

export const Card = ({
  caseItem,
  onDuplicate,
  onArchive,
  onDelete,
  onUpdate,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

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
        "border-10",
        "border-(--color-border-card)",
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
        <div className="min-h-0 px-4">
          <CardDetail
            orderCode={caseItem.orderCode}
            quantity={caseItem.quantity}
            warehouse={caseItem.warehouse}
            deadline={caseItem.deadline}
            cause={caseItem.cause}
            supplier={caseItem.supplier}
            onUpdate={onUpdate}
            caseId={caseItem.id}
          />
          <NoteSec
            caseId={caseItem.id}
            note={caseItem.note}
            onUpdate={onUpdate}
          />
          <div className={clsx("flex", "flex-row", "gap-2", "justify-end")}>
            <button
              type="button"
              onClick={() => onDuplicate(caseItem.id)}
              className={clsx(
                // "ml-auto",
                "w-fit",
                "p-2",
                "my-0",
                "opacity-30",
                "size-8",

                "hover:text-(--blue-500)",
                "hover:opacity-100",
                "cursor-pointer",

                "group",
                "flex",
                "items-center",
                "gap-2",
              )}
            >
              <CopyIcon className="size-[20px]" />
              <span
                className={clsx(
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
                )}
              >
                Content Copy
              </span>
            </button>
            <button
              type="button"
              onClick={() => onArchive(caseItem.id)}
              className={clsx(
                // "ml-auto",
                "w-fit",
                "p-2",
                "my-0",
                "size-8",
                "opacity-30",

                "hover:text-(--yellow-500)",
                "hover:opacity-100",
                "cursor-pointer",

                "group",
                "flex",
                "items-center",
                "gap-2",
              )}
            >
              <ArchiveIcon className="size-[20px]" />
              <span
                className={clsx(
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
                )}
              >
                Archive
              </span>
            </button>
            <button
              type="button"
              onClick={() => onDelete(caseItem.id)}
              className={clsx(
                // "ml-auto",
                "w-fit",
                "p-2",
                "my-0",
                "size-8",
                "opacity-30",

                "hover:text-(--red-500)",
                "hover:opacity-100",
                "cursor-pointer",

                "group",
                "flex",
                "items-center",
                "gap-2",
              )}
            >
              <DeleteIcon className="size-[20px]" />
              <span
                className={clsx(
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
                )}
              >
                Delete
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

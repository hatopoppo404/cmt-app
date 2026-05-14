"use client";

import type { Case } from "@/types/case";
import { formatDate } from "@/lib/utils/formatDate";
import clsx from "clsx";
import { useState } from "react";

import { NoteIcon } from "@/components/icons/NoteIcon";
import { Editabletextarea } from "./EditbleTextarea";

type Props = {
  caseId: string;
  note: string; //備考
  onUpdate: (
    id: string,
    updates: Partial<Case>,
  ) => void;
};

export const NoteSec = ({ caseId, note, onUpdate, }: Props) => {
  return (
    <div
      className={clsx(
        "grid",
        "grid-cols-[auto_1fr]",
        "grid-rows-[auto_auto]",
        "gap-2",
        "p-4",

        "bg-[var(--white)]",
        "rounded-md",
        "w-100%",
      )}
    >
      <div className="flex items-center">
        <NoteIcon className="size-[20px]" />
      </div>
      <div className="">
        <p className="flex items-center text-sm">備考</p>
      </div>
      <div className="col-span-2">
        <Editabletextarea
          value={note}
          onSave={(nextValue) =>
            onUpdate(caseId, {
              note: nextValue,
            })
          }
          className={clsx(
            "flex items-center text-sm min-h-[1.5em] w-full",
          )}
        />
      </div>
    </div>
  );
};

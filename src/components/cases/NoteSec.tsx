"use client";

import type { Case } from "@/types/case";
import { formatDate } from "@/lib/utils/formatDate";
import clsx from "clsx";
import { useState } from "react";

import { NoteIcon } from "@/components/icons/NoteIcon";

type Props = {
  note: string; //備考
};

export const NoteSec = ({ note }: Props) => {
  return (
    <div
      className={clsx(
        "grid",
        "grid-cols-[auto_1fr]",
        "grid-rows-[auto_auto]",
        "gap-2",
        "p-4",
        "m-4",

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
        <p className="flex items-center text-sm">{note}</p>
      </div>
    </div>
  );
};

"use client";

import { SortAZIcon } from "@/components/icons/SortAZIcon";
import clsx from "clsx";

export const SortButton = () => {
  return (
    <button
      type="submit"
      className={clsx(
        "flex",
        "items-center",
        "gap-1",
        "font-bold",
        "text-(--color-text-inverse)",

        "bg-(--color-bg-iconbutton)",
        "p-3",
        "rounded-full",
        "aspect-square",

        "border-default",

        "cursor-pointer",
        "transition-transform",
        "hover:scale-105",
        "active:scale-95",
        "duration-200",
      )}
    >
      <SortAZIcon className={clsx("size-[18px]")} />
    </button>
  );
};

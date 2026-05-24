"use client";
import type { Case } from "@/types/case";
import { formatDate } from "@/lib/utils/formatDate";
import { ArrowIcon } from "@/components/icons/ArrowIcon";
import clsx from "clsx";

type OpenButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

export const OpenButton = ({ isOpen, onClick }: OpenButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex",
        "items-center",
        "gap-1",
        "font-bold",
        "text-(--color-text)",
        "bg-(--color-bg-openbutton)",
        "p-2",
        "rounded-md",

        "cursor-pointer",
      )}
    >
      <ArrowIcon
        className={clsx(
          "size-[24px]",
          "transition-transform",
          "duration-500",
          isOpen && "rotate-180",
        )}
      />
    </button>
  );
};

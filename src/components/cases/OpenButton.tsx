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
        "text-[var(--color-gray-500)]",

        "bg-[var(--color-gray-100)]",
        "p-2",
        "rounded-md",

        "cursor-pointer",
      )}
    >
      <ArrowIcon
        className={clsx(
          "size-[24px]",
          "transition-transform",
          isOpen && "scale-y-[-1]",
        )}
      />
    </button>
  );
};

"use client";

import { SortAZIcon } from "@/components/icons/SortAZIcon";
import clsx from "clsx";

type ButtonProps = {
    onClick: () => void;
};

export const SortButton = ({ onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "flex",
                "items-center",
                "gap-1",
                "font-bold",
                "text-[var(--color-gray-500)]",

                "bg-[var(--color-bg)]",
                "p-3",
                "rounded-full",
                "aspect-square",

                "cursor-pointer",
                "transition-transform",
                "hover:scale-105",
                "active:scale-95",
                "duration-200",
            )}
        >
            <SortAZIcon
                className={clsx(
                    "size-[20px]",
                )}
            />
        </button>
    );
};
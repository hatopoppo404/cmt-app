"use client";

import { ArrowIcon } from "@/components/icons/ArrowIcon";
import {
    sortOptions,
    type SortKey
} from "@/features/cases/sort/sortOptions";
import clsx from "clsx";

type Props = {
    sortKey: SortKey | null;
    onSortKeyChange: (value: SortKey | null) => void;
    className?: string;
};

export const SortSelect = ({
    sortKey,
    onSortKeyChange,
    className,
}: Props) => {
    return (
        <div className={clsx(
            // "opacity-0",
            "flex",
            "items-center",
            "text-sm",
            "text-(--color-text)",
            "relative",
            { className },
        )}>
            <select
                className={clsx(
                    "rounded-full",
                    "p-4",
                    "pr-5",
                    "appearance-none",
                    "select-none",
                    "cursor-pointer",

                    "focus:outline-none",
                )}
                value={sortKey ?? ""}
                onChange={(e) => {
                    const value = e.target.value;

                    onSortKeyChange(
                        value === "" ? null : (value as SortKey),
                    );
                }}
            >
                <option value="">並び替えなし</option>

                {sortOptions.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
            <ArrowIcon className={clsx(
                "size-[12px]",
                "pointer-events-none",
                "absolute",
                "right-0",
            )} />
        </div>
    );
};
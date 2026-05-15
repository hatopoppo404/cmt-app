"use client";

import type { SortKey } from "@/features/cases/sort/sortOptions";
import { SortSelect } from "@/features/cases/components/SortSelect";
import { SortButton } from "@/features/cases/components/SortButton";
import clsx from "clsx";


type Preps = {
    sortKey: SortKey | null;
    onSortKeyChange: (value: SortKey | null) => void;
    onApplySort: () => void;
};

export const SortSet = ({
    sortKey,
    onSortKeyChange,
    onApplySort,
}: Preps) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onApplySort();
            }}
            className={clsx(
                "pl-2",
                "pr-1.5",
                "py-1",
                "rounded-full",
                "h-fit",
                "shadow-md",

                "bg-[var(--color-bg-sub)]",
                "flex",
                "items-center",
                "gap-4",

                "transition-transform",
                "hover:scale-101",
                "hover:shadow-lg",
                "active:scale-100",
                "duration-200",
            )}
        >

            <SortSelect
                sortKey={sortKey}
                onSortKeyChange={onSortKeyChange}
            />

            <SortButton />
        </form>
    );
};
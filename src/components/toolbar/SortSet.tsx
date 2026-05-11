"use client";

import type { SortKey } from "@/lib/sort/sortOptions";
import { SortSelect } from "@/components/toolbar/SortSelect";
import { SortButton } from "@/components/toolbar/SortButton";
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
            onSubmit={(e)=>{
                e.preventDefault();
                onApplySort();
            }}
            className={clsx(
                "pl-2",
                "pr-2",
                "rounded-full",

                "bg-[var(--color-bg-sub)]",
                "flex",
                "items-center",
                "gap-4",

                "transition-transform",
                "hover:scale-101",
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
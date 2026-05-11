"use client";

import { ArrowIcon } from "@/components/icons/ArrowIcon";
import clsx from "clsx";
import type { SortKey } from "@/types/sortKey";
import { useState } from "react";

type Props = {
    keys: SortKey;
    className?: string;
};

export const SortSelect = (
    {
        keys,
        className,
    }: Props
) => {
    const [sortKey, setSortKey] = useState<SortKey>("none");
    const [appliedSortKey, setAppliedSortKey] = useState<SortKey>("none");
    const options = [
        { value: "none", label: "並び替えなし", },
        { value: "delayDays", label: "遅延日数", },
        { value: "dueDate", label: "希望納期", },
        { value: "replyDate", label: "回答納期", },
        { value: "deadline", label: "限界納期", },
        { value: "itemName", label: "品目名称", },
        { value: "itemCode", label: "品目コード", },
        { value: "cause", label: "起因名", },
    ]

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
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
            >
                {options.map((row) => (
                    <OptionRow
                        className="cursor-pointer"
                        value={row.value}
                        label={row.label}
                    />
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



type OptionProps = {
    value: string;
    label: string;
    className?: string;
};

const OptionRow = ({
    value,
    label,
    className,
}: OptionProps) => {
    return (
        <option
            className={className}
            value={value}
        >
            {label}
        </option>
    );
};
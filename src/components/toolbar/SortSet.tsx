"use client";

import clsx from "clsx";
import { useState } from "react";

import type { SortKey } from "@/types/sortKey";
import { SortSelect } from "@/components/toolbar/SortSelect";
import { SortButton } from "@/components/toolbar/SortButton";

type Preps = {

};

export const SortSet = ({ }: Preps) => {
    return (
        <div className={clsx(
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
        )}>
            <SortSelect keys="none" className={clsx(
                "opacity-0",
            )}/>
            <SortButton onClick={() => { }} />
        </div>
    );
};
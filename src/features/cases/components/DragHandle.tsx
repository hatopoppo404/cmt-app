"use client";
import type { Case } from "@/types/case";
import clsx from "clsx";
import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

type Props = {
    attributes: React.HTMLAttributes<HTMLElement>;
    listeners: SyntheticListenerMap | undefined;
};

export const DragHandle = ({
    attributes,
    listeners,
}: Props) => {
    return (
        <button
            type="button"
            {...attributes}
            {...listeners}
            className={clsx(
                "w-30",
                "h-1",
                "outline",
                "border-1",
                "border-(--color-border)",
                "bg-(--color-border)",
                "opacity-10",
                "mx-4",
                "rounded-full",
                "mb-0",
                "cursor-grab",
                "absolute",
                "right-1/3",
                "top-2",

            )}
        ></button>
    );
};
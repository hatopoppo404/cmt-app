"use client";

import type { Case } from "@/types/case";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "@/components/cases/DragHandle";

import { Card } from "./Card";
import clsx from "clsx";

type Props = {
    caseItem: Case;
    activeId: string | null;
};

export const SortableCard = ({
    caseItem,
    activeId,
}: Props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: caseItem.id
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const isActive = activeId === caseItem.id;
    const isOtherDragging = activeId !== null && !isActive;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={clsx(
                "relative",
                "transition-opacity",
                isActive && "z-999 opacity-0",
                isOtherDragging && "opacity-70",
                "w-fit",
            )}
        >
            <DragHandle
                attributes={attributes}
                listeners={listeners}
            />
            <Card caseItem={caseItem} />
        </div>
    );
};
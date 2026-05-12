import type { Case } from "@/types/case";
import { Card } from "@/components/cases/Card";
import { SortableCard } from "./SortableCard";
import {
    DndContext,
    DragOverlay,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { useState } from "react";

type Props = {
    cases: Case[];
    onCasesChange: (
        cases: Case[],
    ) => void;
};

export const CaseList = ({
    cases,
    onCasesChange,
}: Props) => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const activeCase = cases.find(
        (caseItem) => caseItem.id === activeId,
    );
    return (
        <DndContext
            onDragStart={(e) => {
                setActiveId(String(e.active.id));
            }}
            onDragEnd={(event) => {
                setActiveId(null);

                const {
                    active,
                    over,
                } = event;
                if (!over) return;
                if (active.id === over.id) return;
                const oldIndex = cases.findIndex(
                    (caseItem) =>
                        caseItem.id === active.id,
                );
                const newIndex = cases.findIndex(
                    (caseItem) =>
                        caseItem.id === over.id,
                );
                const reorderedCases = arrayMove(
                    cases,
                    oldIndex,
                    newIndex,
                ).map((caseItem, index) => ({
                    ...caseItem,
                    sortOrder: index,
                    updatedAt: new Date().toISOString(),
                }));
                onCasesChange(reorderedCases);
            }}
            onDragCancel={() => {
                setActiveId(null);
            }}
        >
            <SortableContext
                items={cases.map(
                    (caseItem) => caseItem.id,
                )}
                strategy={
                    verticalListSortingStrategy
                }
            >
                <div className="flex flex-col gap-4">
                    {cases.map((caseItem) => (
                        <SortableCard
                            key={caseItem.id}
                            caseItem={caseItem}
                            activeId={activeId}
                        />
                    ))}
                </div>
            </SortableContext>
            <DragOverlay>
                {activeCase ? (
                    <div className="scale-105 shadow-2xl">
                        <Card caseItem={activeCase} />
                    </div>) : null}
            </DragOverlay>
        </DndContext>
    );
};
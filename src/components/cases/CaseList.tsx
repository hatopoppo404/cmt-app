import type { Case } from "@/types/case";
import { Card } from "@/components/cases/Card";
import { SortableCard } from "./SortableCard";
import { DndContext } from "@dnd-kit/core";
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
                const reoderedCases = arrayMove(
                    cases,
                    oldIndex,
                    newIndex,
                );
                onCasesChange(reoderedCases);
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
        </DndContext>
    );
};
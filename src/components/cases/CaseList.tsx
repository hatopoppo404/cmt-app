import type { Case } from "@/types/case";
import { Card } from "@/components/cases/Card";
import { SortableCard } from "./SortableCard";
import { DndContext } from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

type Props = {
    cases: Case[];
};

export const CaseList = ({ cases }: Props) => {
    const [activeId, setActiveId] = useState<string | null>(null);
    return (
        <DndContext
            onDragStart={(e) => {
                setActiveId(String(e.active.id));
            }}
            onDragEnd={()=>{
                setActiveId(null);
            }}
            onDragCancel={()=>{
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
import { AddCaseButton } from "@/features/cases/components/AddCaseButton";
import { CaseList } from "@/features/cases/components/CaseList";
import type { Case } from "@/types/case";

import clsx from "clsx";

type Props = {
  cases: Case[];
  onAddCase: () => void;
  onCasesChange: (cases: Case[]) => void;
  onDuplicate: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Case>) => void;
  className?: string;
};

export const CasesMain = ({
  cases,
  onAddCase,
  onCasesChange,
  onDuplicate,
  onArchive,
  onDelete,
  onUpdate,
  className,
}: Props) => {
  return (
    <main
      className={clsx(
        "p-4",
        "overflow-y-auto",
        "flex",
        "flex-col",
        "items-center",
        "justify-start",
        "gap-4",
        className,
      )}
    >
      <div className={clsx("")}>
        <AddCaseButton onClick={onAddCase} />
      </div>

      <CaseList
        cases={cases}
        onCasesChange={onCasesChange}
        onDuplicate={onDuplicate}
        onArchive={onArchive}
        onDelete={onDelete}
        onUpdate={onUpdate}
        className={clsx("w-full", "mx-auto", "p-8")}
      />
    </main>
  );
};

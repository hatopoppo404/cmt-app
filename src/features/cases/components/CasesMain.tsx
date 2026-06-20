import { AddCaseButton } from "@/features/cases/components/AddCaseButton";
import { CaseList } from "@/features/cases/components/CaseList";
import type { Case } from "@/types/case";

import clsx from "clsx";

type Props = {
  cases: Case[];
  onAddCase: () => void;
  onCasesChange: (cases: Case[]) => void;
  onArchive: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Case>) => void;
  className?: string;
};

export const CasesMain = ({
  cases,
  onAddCase,
  onCasesChange,
  onArchive,
  onUpdate,
  className,
}: Props) => {
  return (
    <main
      className={clsx(
        "p-4",
        "overflow-y-auto",
        "relative",
        "flex",
        "flex-col",
        "items-center",
        "justify-start",
        className,
      )}
    >
      <div className={clsx()}>
        <AddCaseButton onClick={onAddCase} />
      </div>

      <CaseList
        cases={cases}
        onCasesChange={onCasesChange}
        onArchive={onArchive}
        onUpdate={onUpdate}
        className={clsx("w-full", "mx-auto", "p-8")}
      />
    </main>
  );
};

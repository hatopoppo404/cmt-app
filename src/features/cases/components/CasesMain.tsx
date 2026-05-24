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
        "bg-(--color-bg-casesmain)",
        "rounded-l-2xl",
        "p-4",
        "overflow-y-auto",

        "relative",
        className,
      )}
    >
      <div
        className={clsx(
          "sticky",
          "top-0",
          "z-999",
          "p-4",
          "w-full",
          "max-w-3xl",
        )}
      >
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

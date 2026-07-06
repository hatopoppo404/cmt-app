import { AddCaseButton } from "@/features/cases/components/AddCaseButton";
import { CaseList } from "@/features/cases/components/CaseList";
import type { Case, CaseActions } from "@/types/case";

import clsx from "clsx";

type Props = {
  cases: Case[];
  onAddCase: () => void;
  onCasesChange: (cases: Case[]) => void;
  caseActions: CaseActions;
  className?: string;
};

export const CasesMain = ({
  cases,
  onAddCase,
  onCasesChange,
  caseActions,
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
        caseActions={caseActions}
        className={clsx("w-full", "mx-auto", "p-8")}
      />
    </main>
  );
};

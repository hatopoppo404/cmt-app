import { AddCaseButton } from "@/features/cases/components/AddCaseButton";
import { CaseList } from "@/features/cases/components/CaseList";
import type { Case, CaseActions } from "@/types/case";

import { Button } from "@/components/ui/Button/Button";
import { AddCardIcon } from "@/components/icons/AddCardIcon";

import clsx from "clsx";

type Props = {
  cases: Case[];
  onAddCase: () => void;
  onCasesChange: (cases: Case[]) => void;
  caseActions: CaseActions;
  className?: string;
  onCreatorOpen: () => void;
};

export const CasesMain = ({
  cases,
  onAddCase,
  onCasesChange,
  caseActions,
  className,
  onCreatorOpen,
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
      <div className={clsx("flex", "flex-row", "gap-4")}>
        <AddCaseButton onClick={onAddCase} />
        <Button
          variant="ghost"
          size="sm"
          icon={<AddCardIcon />}
          text="Create a Card from Clipboard"
          onClick={onCreatorOpen}
        />
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

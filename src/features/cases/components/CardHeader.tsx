import type { Case } from "@/types/case";
import { formatDate } from "@/lib/utils/formatDate";
import { ReplyDateIcon } from "@/components/icons/ReplyDateIcon";
import { DueDateIcon } from "@/components/icons/DueDateIcon";
import clsx from "clsx";
import { EditableText } from "./EditableText";

type CardHeaderProps = {
  itemName: string;
  itemCode: string;
  dueDate: string;
  replyDate: string;
  caseId: string;
  onUpdate: (
    id: string,
    updates: Partial<Case>,
  ) => void;
};
export const CardHeader = ({
  itemName,
  itemCode,
  dueDate,
  replyDate,
  caseId,
  onUpdate,
}: CardHeaderProps) => {
  return (
    <div>
      <div className="flex flex-col gap-0.5 py-1">
        <EditableText
          value={itemName}
          onSave={(nextValue) =>
            onUpdate(caseId, {
              itemName: nextValue,
            })
          }
          className="text-sm min-h-[1em] w-full"
        />
        <EditableText
          value={itemCode}
          onSave={(nextValue) =>
            onUpdate(caseId, {
              itemCode: nextValue,
            })
          }
          className="text-xl/5 font-bold min-h-[1em] w-full"
        />
        <div className="flex flex-row gap-3 text-sm mt-2">
          <div className="flex flex-row items-center gap-1">
            <div className="flex flex-row items-center">
              <ReplyDateIcon className="size-[20px]" />
              <p>回答</p>
            </div>
            <p className="w-[2.5em]">{formatDate(replyDate)}</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="flex flex-row items-center">
              <DueDateIcon className="size-[20px]" />
              <p>希望</p>
            </div>
            <p className="w-[2.5em]">{formatDate(dueDate)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

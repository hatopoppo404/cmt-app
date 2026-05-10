import type { Case } from "@/types/case";
import { formatDate } from "@/lib/utils/formatDate";
import { ReplyDateIcon } from "@/components/icons/ReplyDateIcon";
import { DueDateIcon } from "@/components/icons/DueDateIcon";
import clsx from "clsx";

type CardHeaderProps = {
  itemName: string;
  itemCode: string;
  dueDate: string;
  replyDate: string;
};
export const CardHeader = ({
  itemName,
  itemCode,
  dueDate,
  replyDate,
}: CardHeaderProps) => {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <p className="text-sm">{itemName}</p>
        <h3 className="text-xl font-bold">{itemCode}</h3>
        <div className="flex flex-row gap-3 text-sm">
          <div className="flex flex-row items-center gap-1">
            <div className="flex flex-row items-center">
              <ReplyDateIcon className="size-[20px]" />
              <p>回答</p>
            </div>
            <p>{formatDate(replyDate)}</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="flex flex-row items-center">
              <DueDateIcon className="size-[20px]" />
              <p>希望</p>
            </div>
            <p>{formatDate(dueDate)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

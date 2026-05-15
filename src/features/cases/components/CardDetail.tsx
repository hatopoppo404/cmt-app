"use client";

import { formatDate } from "@/lib/utils/formatDate";
import clsx from "clsx";

import type { Case } from "@/types/case";
import { AmountIcon } from "@/components/icons/AmountIcon";
import { DeadlineIcon } from "@/components/icons/DeadlineIcon";
import { FolderIcon } from "@/components/icons/FolderIcon";
import { ReceiptIcon } from "@/components/icons/ReceiptIcon";
import { WarehouseIcon } from "@/components/icons/WarehouseIcon";
import { EditableQuentity } from "./EditableQuentity";
import { EditableDate } from "./EditableDate";
import { EditableText } from "./EditableText";

type DetailRowProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
};

const DetailRow = ({ icon, label, value }: DetailRowProps) => {
  return (
    <>
      <div className="flex items-center">{icon}</div>
      <p className="flex items-center text-sm border-b-1 border-dashed border-(--color-gray-300)">{label}</p>
      <p className="flex items-center text-sm border-b-1 border-dashed border-(--color-gray-300)">{value}</p>
    </>
  );
};


type Props = {
  orderCode: string; //注文番号
  quantity: number; //数量
  warehouse: string; //納品先
  deadline: string; //限界納期
  cause: string; //起因名
  caseId: string;
  onUpdate: (
    id: string,
    updates: Partial<Case>,
  ) => void;
};
export const CardDetail = ({
  orderCode,
  quantity,
  warehouse,
  deadline,
  cause,
  caseId,
  onUpdate,
}: Props) => {
  const detailRows = [
    {
      icon: <ReceiptIcon className="size-[20px]" />,
      label: "注文番号",
      value: (
        <EditableText
          value={orderCode}
          onSave={(nextValue) =>
            onUpdate(caseId, {
              deadline: nextValue,
            })}
          className="w-full"
        />
      ),
    },
    {
      icon: <AmountIcon className="size-[20px]" />,
      label: "数量",
      value: (
        <>
          <EditableQuentity
            value={quantity}
            onSave={(nextValue) =>
              onUpdate(caseId, {
                quantity: nextValue,
              })
            }
          />
          <span className="ml-1 text-xs">pc</span>
        </>
      ),
    },
    {
      icon: <WarehouseIcon className="size-[20px]" />,
      label: "納品先",
      value: (
        <EditableText
          value={warehouse}
          onSave={(nextValue) =>
            onUpdate(caseId, {
              deadline: nextValue,
            })}
          className="w-full"
        />
      ),
    },
    {
      icon: <DeadlineIcon className="size-[20px]" />,
      label: "限界",
      value: (
        <EditableDate
          value={deadline}
          onSave={(nextValue) =>
            onUpdate(caseId, {
              deadline: nextValue,
            })}
          className="w-full"
        />
      ),
    },
    {
      icon: <FolderIcon className="size-[20px]" />,
      label: "起因名",
      value: (
        <EditableText
          value={cause}
          onSave={(nextValue) =>
            onUpdate(caseId, {
              deadline: nextValue,
            })}
          className="w-full"
        />
      ),
    },
  ];

  return (
    <div
      className={clsx(
        "grid",
        "grid-cols-[auto_1fr_4fr]",
        "gap-2",
        "w-100%",
        "mx-4",
        "my-2",
      )}
    >
      {detailRows.map((row) => (
        <DetailRow
          key={row.label}
          icon={row.icon}
          label={row.label}
          value={row.value}
        />
      ))}
    </div>
  );
};

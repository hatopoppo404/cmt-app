"use client";

import { formatDate } from "@/lib/utils/formatDate";
import clsx from "clsx";

import { AmountIcon } from "@/components/icons/AmountIcon";
import { DeadlineIcon } from "@/components/icons/DeadlineIcon";
import { FolderIcon } from "@/components/icons/FolderIcon";
import { ReceiptIcon } from "@/components/icons/ReceiptIcon";
import { WarehouseIcon } from "@/components/icons/WarehouseIcon";

type Props = {
  orderCode: string; //注文番号
  quantity: number; //数量
  warehouse: string; //納品先
  deadline: string; //限界納期
  cause: string; //起因名
};
type DetailRowProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
};

const DetailRow = ({ icon, label, value }: DetailRowProps) => {
  return (
    <>
      <div className="flex items-center">{icon}</div>
      <p className="flex items-center text-sm">{label}</p>
      <p className="flex items-center text-sm">{value}</p>
    </>
  );
};

export const CardDetail = ({
  orderCode,
  quantity,
  warehouse,
  deadline,
  cause,
}: Props) => {
  const detailRows = [
    {
      icon: <ReceiptIcon className="size-[20px]" />,
      label: "注文番号",
      value: orderCode,
    },
    {
      icon: <AmountIcon className="size-[20px]" />,
      label: "数量",
      value: (
        <>
          {quantity}
          <span className="ml-1 text-xs">pc</span>
        </>
      ),
    },
    {
      icon: <WarehouseIcon className="size-[20px]" />,
      label: "納品先",
      value: warehouse,
    },
    {
      icon: <DeadlineIcon className="size-[20px]" />,
      label: "限界",
      value: formatDate(deadline),
    },
    {
      icon: <FolderIcon className="size-[20px]" />,
      label: "起因名",
      value: cause,
    },
  ];

  return (
    <div
      className={clsx(
        "grid",
        "grid-cols-[auto_1fr_4fr]",
        "gap-2",
        "p-4",
        "ml-4",
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

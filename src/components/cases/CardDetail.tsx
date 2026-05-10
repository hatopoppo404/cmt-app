"use client";

import type { Case } from "@/types/case";
import { formatDate } from "@/lib/utils/formatDate";
import clsx from "clsx";
import { useState } from "react";

import { AmountIcon } from "@/components/icons/AmountIcon";
import { DeadlineIcon } from "@/components/icons/DeadlineIcon";
import { FolderIcon } from "@/components/icons/FolderIcon";
import { NoteIcon } from "@/components/icons/NoteIcon";
import { ReceiptIcon } from "@/components/icons/ReceiptIcon";
import { WarehouseIcon } from "@/components/icons/WarehouseIcon";

type Props = {
  orderCode: string; //注文番号
  quantity: number; //数量
  warehouse: string; //納品先
  deadline: string; //限界納期
  cause: string; //起因名
};

export const CardDetail = ({
  orderCode,
  quantity,
  warehouse,
  deadline,
  cause,
}: Props) => {
  return (
    <div
      className={clsx(
        "grid",
        "grid-cols-[auto_1fr_4fr]",
        "grid-rows-5",
        "gap-2",
        "p-4",
        "mx-4",
      )}
    >
      <div className="flex items-center">
        <ReceiptIcon className="size-[20px]" />
      </div>
      <div>
        <p className="flex items-center text-sm">注文番号</p>
      </div>
      <div>
        <p className="flex items-center text-sm">{orderCode}</p>
      </div>
      <div className="flex items-center">
        <AmountIcon className="size-[20px]" />
      </div>
      <div>
        <p className="flex items-center text-sm">数量</p>
      </div>
      <div>
        <p className="flex items-center text-sm">
          {quantity}
          <span className="ml-1 text-xs">pc</span>
        </p>
      </div>
      <div className="flex items-center">
        <WarehouseIcon className="size-[20px]" />
      </div>
      <div>
        <p className="flex items-center text-sm">納品先</p>
      </div>
      <div>
        <p className="flex items-center text-sm">{warehouse}</p>
      </div>
      <div className="flex items-center">
        <DeadlineIcon className="size-[20px]" />
      </div>
      <div>
        <p className="flex items-center text-sm">限界</p>
      </div>
      <div>
        <p className="flex items-center text-sm">{formatDate(deadline)}</p>
      </div>
      <div className="flex items-center">
        <FolderIcon className="size-[20px]" />
      </div>
      <div>
        <p className="flex items-center text-sm">起因名</p>
      </div>
      <div>
        <p className="flex items-center text-sm">{cause}</p>
      </div>
    </div>
  );
};

import type { Case } from "@/types/case";
import { formatDate } from "@/lib/utils/formatDate";
import { DelayIcon } from "@/components/icons/DelayIcon";
import clsx from "clsx";

type DelayBadgeProps = {
  delayDays: number;
};
export const DelayBadge = ({ delayDays }: DelayBadgeProps) => {
  const days = delayDays;
  const statusMap = {
    danger: {
      color: "bg-[var(--color-error)]",
      text: "危険",
    },
    warning: {
      color: "bg-[var(--color-warning)]",
      text: "注意",
    },
    safe: {
      color: "bg-[var(--color-success)]",
      text: "安全",
    },
    new: {
      color: "bg-[var(--blue-500)]",
      text: "新規",
    },
  };

  const status = (() => {
    if (days === 9999) return "new";
    if (days <= -2) return "danger";
    if (days <= 1) return "warning";
    if (days > 1) return "safe";
    return "new";
  })()

  const badge = statusMap[status];
  return (
    <div
      className={clsx(
        "aspect-square",
        "w-20",
        "rounded-md",
        "p-3",
        badge.color,
        "text-white",
        "grid",
        "grid-cols[14px_2fr]",
        "grid-rows[auto_1fr]",
        "gap-1",
      )}
    >
      <div className={"flex items-center justify-center"}>
        <DelayIcon className="size-[16px] text-white" />
      </div>

      <span className="text-sm font-bold">{badge.text}</span>

      <div className={clsx("col-span-2 flex items-center justify-center")}>
        <span className="text-xl font-bold">{days}</span>
      </div>
    </div>
  );
};

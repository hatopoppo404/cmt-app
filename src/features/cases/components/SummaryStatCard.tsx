import clsx from "clsx";

type Props = {
  label: string;
  value: number;
  unit?: string;
  emphasized?: boolean;
  onClick: () => void;
};

export const SummaryStatCard = ({
  label,
  value,
  unit = "件",
  emphasized = false,
  onClick,
}: Props) => {
  return (
    <button
      className={clsx(
        "flex",
        "flex-row",
        "items-center",
        "justify-center",
        "gap-2",
        "py-2",
        "text-(--color-text)",
        emphasized && "bg-(--color-bg-panel)",
        "h-[5rem]",
        "rounded-(--radius-card)",
        "border-default",
        "cursor-pointer",
      )}
      onClick={onClick}
    >
      <span className={clsx("text-(length:--font-size-sm)")}>{label}</span>
      <span
        className={clsx(
          "text-(length:--font-size-3xl)",
          emphasized && "font-bold text-(--color-action-danger)",
        )}
      >
        {value}
      </span>
      <span
        className={clsx(
          "text-(length:--font-size-sm)",
          "inline-block",
          "h-[2rem]",
          "self-end",
          "align-center",
        )}
      >
        {unit}
      </span>
    </button>
  );
};

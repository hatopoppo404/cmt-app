import clsx from "clsx";

type Props = {
  onReset: () => Promise<void>;
  isLoading: boolean;
};

export const DemoResetButton = ({ onReset, isLoading }: Props) => {
  return (
    <button
      type="button"
      onClick={onReset}
      disabled={isLoading}
      className={clsx(
        "cursor-pointer",
        "absolute",
        "z-[9999]",
        "right-4",
        "bottom-4",

        "border",
        "border-[var(--color-border)]",
        "rounded-full",
        "bg-[var(--color-bg-card)]",
        "text-(length:--font-size-sm)",
        "text-[var(--color-text-sub)]",

        "px-3",
        "py-2",

        "hover:scale-102",
        "active:scale-95",
        "disabled:pointer-events-none",
        "disabled:opacity-60",
      )}
    >
      {isLoading ? "復元中..." : "デモデータを復元"}
    </button>
  );
};

import clsx from "clsx";

type Props = {
  onClick: () => void;
};

export const AddCaseButton = ({ onClick }: Props) => {
  return (
    <div className={clsx("flex", "gap-6", "justify-center")}>
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          "bg-(--color-action-primary)",
          "px-2",
          "w-10",
          "h-10",
          "rounded-lg",
          "!cursor-pointer",
          "text-(--color-text)",
          "shadow-md",
          "transition-transform",
          "duration-200",
          "hover:scale-105",
          "active:scale-95",
          "hover:shadow-lg",
          "[&_*]:pointer-events-none",
        )}
      >
        ＋
      </button>
    </div>
  );
};

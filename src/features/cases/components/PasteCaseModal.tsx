import clsx from "clsx";
import { CopyIcon } from "@/components/icons/CopyIcon";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { Button } from "@/components/ui/Button/Button";

type Props = {
  onClose: () => void;
};

export const PasteCaseModal = ({ onClose }: Props) => {
  return (
    <div
      className={clsx(
        "fixed",
        "top-16",
        "right-16",
        "bottom-16",
        "left-16",
        "z-50",

        "grid",
        "grid-cols-2",
        "grid-rows-3",
        "grid-cols-[1fr_auto]",
        "gap-4",
        "p-10",
        "rounded-(--radius-modal)",
        "border",
        "border-(--color-border)",
        "bg-(--color-bg-page)/70",
        "backdrop-blur-sm",
      )}
    >
      <section className={clsx("blur-none")}>
        <header
          className={clsx(
            "flex",
            "flex-row",
            "items-center",
            "justify-between",
            "gap-4",
            "mb-4",
          )}
        >
          <h2>Excleのコピー範囲から案件を作成します</h2>
          <button
            onClick={onClose}
            className={clsx(
              "border-none",
              "bg-inherit",
              "cursor-pointer",
              "text-(--color-text)",
              "hover:text-(--color-text-hover)",
            )}
          >
            <CloseIcon />
          </button>
        </header>
        <textarea
          className={clsx(
            "grid-cols-span-2",
            "p-4",
            "border",
            "border-(--color-border)",
            "bg-(--color-bg-input)",
            "text-(--color-text)",
          )}
          placeholder="エクセルでコピーした内容をここに貼り付け"
        />
        <Button
          variant="primary"
          size="sm"
          icon={<CopyIcon />}
          text="クリップボードから貼り付け"
          onClick={() => {}}
        />
      </section>
    </div>
  );
};

import clsx from "clsx";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { ArrowIcon } from "@/components/icons/ArrowIcon";

type Props = {
  isOpen: boolean;
  onToggle: () => void;
};

export const DockToggleButton = ({ isOpen, onToggle }: Props) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? "検索メニューを閉じる" : "検索メニューを開く"}
      className={clsx(
        "absolute",
        "z-20",
        "grid",
        "size-11",
        "place-items-center",
        "rounded-full",
        "bg-[var(--color-bg-card)]",
        "text-[var(--color-text-main)]",
        "transition-all",
        "duration-300",
        "cursor-pointer",
        "right-6",
        "-translate-y-[0.1px]",
        isOpen ? "top-[calc(100%)]" : "top-2",
      )}
    >
      {isOpen ? <ArrowIcon className="rotate-180" /> : <SearchIcon />}
    </button>
  );
};

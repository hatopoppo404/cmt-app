import clsx from "clsx";

type Props = {
  currentTab: "active" | "archived";
  onTabChange: (tab: "active" | "archived") => void;
};

export const CasesTabs = ({ currentTab, onTabChange }: Props) => {
  return (
    <div
      className={clsx(
        "relative",
        "flex",
        "gap-2",
        "rounded-full",
        "bg-(--color-bg-sub)",
        "p-2",
        "text-[10px]",
        "opacity-70",
      )}
    >
      <div
        className={clsx(
          "absolute",
          "top-2",
          "bottom-2",
          "w-23",
          "rounded-full",
          "bg-(--color-bg)",
          "shadow",
          "transition-transform",
          "duration-200",
          currentTab === "archived" && "translate-x-23 bg-(--color-blue-100)",
        )}
      ></div>
      <button
        type="button"
        onClick={() => onTabChange("active")}
        className={clsx(
          "relative",
          "z-10",
          "w-22",
          "py-2",
          "cursor-pointer",
          "opacity-40",
          "hover:opacity-100",
          "text-(--color-text)",
          currentTab === "active" && "opacity-100",
        )}
      >
        ACTIVE
      </button>
      <button
        type="button"
        onClick={() => onTabChange("archived")}
        className={clsx(
          "relative",
          "z-10",
          "w-22",
          "py-2",
          "cursor-pointer",
          "opacity-40",
          "hover:opacity-100",
          "text-(--color-text)",
          currentTab === "archived" && "opacity-100",
        )}
      >
        ARCHIVED
      </button>
    </div>
  );
};

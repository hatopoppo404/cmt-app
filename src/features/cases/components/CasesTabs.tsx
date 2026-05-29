import clsx from "clsx";

type TabButtonProps = {
  label: string;
  value: "active" | "archived";
  currentTab: "active" | "archived";
  onTabChange: (tab: "active" | "archived") => void;
};
const TabButton = ({
  label,
  value,
  currentTab,
  onTabChange,
}: TabButtonProps) => {
  const isActive = currentTab === value;

  return (
    <button
      type="button"
      onClick={() => onTabChange(value)}
      className={clsx(
        "relative",
        "z-10",
        "w-22",
        "py-2",
        "cursor-pointer",
        isActive
          ? ["opacity-100", "text-(--color-text-inverse)"]
          : ["opacity-70", "text-(--color-text-muted)", "hover:opacity-100"],
      )}
    >
      {label}
    </button>
  );
};

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
        "bg-(--color-bg-casestabs)",
        "p-2",
        "text-[10px]",
        "w-fit",
      )}
    >
      <div
        className={clsx(
          "absolute",
          "top-2",
          "bottom-2",
          "w-23",
          "rounded-full",
          "bg-(--color-bg-activetab)",
          "shadow",
          "transition-transform",
          "duration-200",
          "ease-[cubic-bezier(0.34,1.4,0.64,1)]",
          currentTab === "archived" && "translate-x-23",
        )}
      ></div>
      <TabButton
        label="ACTIVE"
        value="active"
        currentTab={currentTab}
        onTabChange={onTabChange}
      />
      <TabButton
        label="ARCHIVED"
        value="archived"
        currentTab={currentTab}
        onTabChange={onTabChange}
      />
    </div>
  );
};

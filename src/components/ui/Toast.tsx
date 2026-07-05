import { CheckCircleIcon } from "../icons/CheckCircleIcon";
import { ErrorIcon } from "../icons/ErrorIcon";
import { InfoIcon } from "../icons/InfoIcon";
import clsx from "clsx";

export const toastConfig = {
  success: {
    colorClass: "bg(--color-action-success)",
    Icon: CheckCircleIcon,
  },
  error: {
    colorClass: "bg(--color-action-error)",
    Icon: ErrorIcon,
  },
  info: {
    colorClass: "bg(--color-action-info)",
    Icon: InfoIcon,
  },
};

type Props = {
  type: keyof typeof toastConfig;
  message: string;
  onClose: () => void;
};

export const Toast = ({ type, message, onClose }: Props) => {
  const { colorClass, Icon } = toastConfig[type];

  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        "gap-2",
        "p-4",
        "rounded-md",
        colorClass,
        "text-white",
        "absolute",
        "top-4",
        "right-4",
        "left-4",
        "z-[9999]",
      )}
    >
      <Icon className="h-6 w-6 text-white" />
      <p>{message}</p>
      <button
        type="button"
        className={clsx("text-white", "text-[12px]")}
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
};

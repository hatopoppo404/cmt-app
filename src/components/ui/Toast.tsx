import { CheckCircleIcon } from "../icons/CheckCircleIcon";
import { ErrorIcon } from "../icons/ErrorIcon";
import { InfoIcon } from "../icons/InfoIcon";
import clsx from "clsx";

export const toastConfig = {
  success: {
    colorClass: "bg-(--color-toast-success)",
    Icon: CheckCircleIcon,
  },
  error: {
    colorClass: "bg-(--color-toast-error)",
    Icon: ErrorIcon,
  },
  info: {
    colorClass: "bg-(--color-toast-info)",
    Icon: InfoIcon,
  },
};

export type ToastItem = {
  id: string;
  type: keyof typeof toastConfig;
  message: string;
  isVisible: boolean;
};

export type ToastTimerIds = {
  show?: number;
  hide?: number;
  remove?: number;
};

type Props = {
  id: string;
  type: keyof typeof toastConfig;
  message: string;
  onClose: () => void;
  isVisible: boolean;
};

export const Toast = ({
  id,
  type,
  message,
  onClose,
  isVisible = false,
}: Props) => {
  const { colorClass, Icon } = toastConfig[type];

  return (
    <div
      id={id}
      className={clsx(
        "flex",
        "flex-row",
        "gap-2",
        "items-center",
        "justify-center",

        "transition-all",
        "duration-300",
        "ease-out",
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",

        "p-4",
        "rounded-md",
        colorClass,
        "text-white",
        "w-fit",
        "max-w-[600px]",

        "relative",
      )}
    >
      <Icon className="h-8 w-8 text-white" />
      <p className="mr-4">{message}</p>
      <button
        type="button"
        className={clsx(
          "text-(--color-text)",
          "text-[12px]",
          "cursor-pointer",
          "absolute",
          "top-2",
          "right-2",
        )}
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
};

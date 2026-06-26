"use client";
import clsx from "clsx";

type Props = {
  isOpen: boolean;
};

export const DockBackground = ({ isOpen }: Props) => {
  return (
    <div
      className={clsx(
        "absolute",
        "inset-0",
        "z-0",
        "rounded-[32px]",
        "w-full",
        "duration-300",
        "bg-(--color-bg-dock)",
        "pointer-events-none",
        isOpen ? "mb-10 h-[calc(100%)]" : "h-[60px] delay-200",
      )}
    />
  );
};

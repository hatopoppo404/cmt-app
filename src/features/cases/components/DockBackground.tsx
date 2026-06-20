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
        isOpen ? "h-[calc(100%+55px)]" : "h-[60px]",
      )}
    />
  );
};

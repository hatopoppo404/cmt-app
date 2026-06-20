"use client";
import clsx from "clsx";

type Props = {
  isOpen: boolean;
};

const DockBackground = ({ isOpen }: Props) => {
  return (
    <div
      className={clsx(
        "absolute",
        "inset-0",
        "z-0",
        "rounded-[32px]",
        "",
        "duration-300",
        "bg-(--color-bg-dock)",
        isOpen ? "h-[200px]" : "h-[20px]",
      )}
    />
  );
};

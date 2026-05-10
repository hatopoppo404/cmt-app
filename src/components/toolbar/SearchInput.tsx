'use client';

import { SearchIcon } from "@/components/icons/SearchIcon";
import clsx from "clsx";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchInput = ({ value, onChange }: Props) => {
  return (
    <div
      className={clsx(
        "flex",
        "items-center",
        "gap-2",
        "px-4",
        "py-2",
        "rounded-md",
        "bg-[var(--color-bg-sub)]",
      )}
    >
      <SearchIcon className="size-[16px]" />
      <input
        type="text"
        placeholder="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "flex-1",
          "bg-transparent",
          "outline-none",
          "text-sm",
          "text-[var(--color-gray-500)]",
        )}
      />
    </div>
  );
};
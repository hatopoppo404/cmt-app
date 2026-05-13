"use client";

import { SearchIcon } from "@/components/icons/SearchIcon";
import clsx from "clsx";

type Props = {
  searchText?: string;
  onSearchTextChange?: (value: string) => void;
};

export const SearchInput = ({ searchText, onSearchTextChange }: Props) => {
  return (
    <div
      className={clsx(
        "flex",
        "items-center",
        "gap-2",
        "pl-6",
        "pr-2",
        "py-2",
        "rounded-full",
        "h-fit",
        "bg-[var(--color-bg-sub)]",
        "shadow-md",

        "transition-transform",
        "duration-200",
        "focus-within:scale-101",
        "hover:scale-101",
        "hover:shadow-lg",
      )}
    >
      <input
        type="text"
        placeholder="キーワードで検索"
        value={searchText}
        onChange={(e) => onSearchTextChange && onSearchTextChange(e.target.value)}
        className={clsx(
          "flex-1",
          "outline-none",
          "text-sm",
          "text-[var(--color-gray-500)]",
        )}
      />
      <SearchButton />
    </div>
  );
};

export const SearchButton = () => {
  return (
    <button
      className={clsx(
        "flex",
        "items-center",
        "gap-2",
        "rounded-full",
        "bg-[var(--color-bg)]",
        "p-2",
        "text-md",
        "text-[var(--color-text)]",
        "hover:cursor-pointer",
        "transition-transform",
        "hover:scale-105",
        "active:scale-95",
        "duration-200",
        "aspect-square",
      )}
    >
      <SearchIcon className="size-[24px]" />
    </button>
  );
};

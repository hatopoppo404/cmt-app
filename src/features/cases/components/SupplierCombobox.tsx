"use client";
import clsx from "clsx";
import { useState } from "react";

type Props = {
  value: string;
  options: string[];
  onSave: (value: string) => void;
  className?: string;
};

export const SupplierCombobox = ({
  value,
  options,
  onSave,
  className,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draftValue, setDraftValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const filteredOptions = options.filter((option) => {
    return option.includes(draftValue);
  });

  const save = (newValue: string) => {
    setDraftValue(newValue);
    setIsOpen(false);
    setIsEditing(false);

    if (newValue === value) return;

    onSave(newValue);
  };
  if (!isEditing) {
    return (
      <span
        onDoubleClick={() => {
          setDraftValue(value);
          setIsEditing(true);
          setIsOpen(true);
        }}
        className={clsx("cursor-text", className)}
      >
        {value || "未入力"}
      </span>
    );
  }

  return (
    <div className={clsx("relative", className)}>
      <input
        autoFocus
        value={draftValue}
        onChange={(e) => {
          setDraftValue(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          save(draftValue);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            save(draftValue);
          }

          if (event.key === "Escape") {
            setDraftValue(value);
            setIsOpen(false);
            setIsEditing(false);
          }
        }}
        className={clsx(
            className,
        )}
      />
      {isOpen && filteredOptions.length > 0 && (
        <div
          className={clsx(
            "absolute",
            "top-full",
            "left-0",
            "z-999",
            "mt-1",
            "w-full",
            "rounded-md",
            "bg-(--color-bg-input)",
            "shadow-lg",
          )}
        >
          {filteredOptions.map((option) => (
            <button
              key={option}
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
                save(option);
              }}
              className={clsx(
                "block",
                "w-full",
                "px-3",
                "py-2",
                "text-left",
                "text-sm",
                "cursor-pointer",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

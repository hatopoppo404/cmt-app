"use client";
import clsx from "clsx";
import { useState } from "react";

type Props = {
  value: string;
  onSave: (value: string) => void;
  className?: string;
};

export const EditableText = ({ value, onSave, className }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(value);

  const save = () => {
    setIsEditing(false);
    if (draftValue === value) return;

    onSave(draftValue);
  };

  if (isEditing) {
    return (
      <input
        autoFocus
        type="text"
        value={draftValue}
        onChange={(event) => setDraftValue(event.target.value)}
        onBlur={save}
        onKeyDown={(event) => {
          if (event.key === "Enter") save();
          if (event.key === "Escape") {
            setDraftValue(value);
            setIsEditing(false);
          }
        }}
        className={clsx(
          "rounded-md bg-(--color-bg-editable-area) p-1",
          className,
        )}
      />
    );
  }

  return (
    <span
      onDoubleClick={() => {
        setDraftValue(value);
        setIsEditing(true);
      }}
      className={className}
    >
      {value || "未入力"}
    </span>
  );
};

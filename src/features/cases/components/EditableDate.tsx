"use client";
import clsx from "clsx";
import { useRef, useState } from "react";
import {
  formatDateForDisplay,
  formatDateForEdit,
  normalizeDateInput,
} from "../utils/date";
import { ReplyDateIcon } from "@/components/icons/ReplyDateIcon";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { createPortal } from "react-dom";
import { ja } from "date-fns/locale";

type Props = {
  value: string;
  onSave: (value: string) => void;
  className?: string;
};

export const EditableDate = ({ value, onSave, className }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(formatDateForEdit(value));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const calendarTriggerRef = useRef<HTMLButtonElement | null>(null);
  const calendarPosition = calendarTriggerRef.current?.getBoundingClientRect();
  const isCalendarInteractingRef = useRef(false);

  const save = () => {
    const normalizedDate = normalizeDateInput(draftValue);
    if (normalizedDate === null || normalizedDate === value) {
      setDraftValue(formatDateForDisplay(value));
      setIsEditing(false);
      return;
    }
    normalizedDate && onSave(normalizedDate);
  };

  if (isEditing) {
    return (
      <div
        className="relative flex"
        onBlur={(event) => {
          // フォーカスがカレンダーに移動する場合は閉じない
          const nextFocusedElement = event.relatedTarget;
          if (event.currentTarget.contains(nextFocusedElement)) return;
          if (isCalendarInteractingRef.current) return;
          save();
        }}
      >
        <input
          autoFocus
          type="text"
          value={draftValue}
          onChange={(event) =>
            setDraftValue(formatDateForEdit(event.target.value))
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") save();
            if (event.key === "Escape") {
              setDraftValue(formatDateForEdit(value));
              setIsEditing(false);
            }
          }}
          className={clsx("", className)}
        />
        <button
          ref={calendarTriggerRef}
          type="button"
          onClick={() => setIsCalendarOpen((prev) => !prev)}
          className={clsx("cursor-pointer")}
        >
          <ReplyDateIcon />
        </button>
        {isCalendarOpen &&
          calendarPosition &&
          createPortal(
            <div
              //   onMouseDown={(event) => {
              //     event.preventDefault();
              //   }}
              onMouseDown={() => {
                isCalendarInteractingRef.current = true;
              }}
              onPointerUp={() => {
                window.setTimeout(() => {
                  isCalendarInteractingRef.current = false;
                }, 0);
              }}
              className={clsx(
                "fixed z-[999]",
                "rounded-2xl bg-(--color-bg) p-4 shadow-lg",
                "border-10 border-(--color-bg-sub)",
              )}
              style={{
                top: calendarPosition.bottom + 4,
                left: calendarPosition.left,
              }}
            >
              <DayPicker
                mode="single"
                locale={ja}
                captionLayout="dropdown"
                startMonth={new Date(2020, 0)}
                endMonth={new Date(2030, 11)}
                selected={value ? new Date(value) : undefined}
                onSelect={(date) => {
                  if (!date) return;
                  isCalendarInteractingRef.current = false;
                  const year = date.getFullYear();
                  const month = String(date.getMonth() + 1).padStart(2, "0");
                  const day = String(date.getDate()).padStart(2, "0");
                  const nextValue = `${year}-${month}-${day}`;
                  onSave(nextValue);

                  setDraftValue(formatDateForEdit(nextValue));
                  setIsCalendarOpen(false);
                  setIsEditing(false);
                }}
                classNames={{
                  root: "text-sm text-(--color-text) bg-(--color-bg)",
                  month_caption: "pb-4 text-lg font-bold",
                  weekday: "mx-4 align-center",
                  day: "m-1 rounded-md hover:bg-(--color-bg-sub)",
                  day_button: `
                        flex
                        items-center
                        justify-center
                        h-10
                        w-10
                        cursor-pointer
                    `,
                  selected: "bg-[var(--color-primary)] text-(--color-white)",
                }}
              />
            </div>,
            document.body,
          )}
      </div>
    );
  }

  return (
    <span
      onDoubleClick={() => {
        setDraftValue(formatDateForEdit(value));
        setIsEditing(true);
      }}
      className={clsx("cursor-text", className)}
    >
      {value ? formatDateForDisplay(value) : "00/00"}
    </span>
  );
};

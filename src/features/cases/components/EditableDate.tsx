"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import {
  formatDateForDisplay,
  formatDateForEdit,
  normalizeDateInput,
} from "../utils/date";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { createPortal } from "react-dom";
import { ja } from "date-fns/locale";

type Props = {
  value: string;
  onSave: (value: string) => void;
  className?: string;
};
type CalendarPosition = {
  top: number;
  left: number;
};

export const EditableDate = ({ value, onSave, className }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(formatDateForEdit(value));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [calendarPosition, setCalendarPosition] =
    useState<CalendarPosition | null>(null);
  const isCalendarInteractingRef = useRef(false);

  const CALENDAR_WIDTH = 320;
  const CALENDAR_HEIGHT = 360;
  const CALENDAR_MARGIN = 40;
  const getCalendarTop = (position: DOMRect) =>
    position.bottom + CALENDAR_HEIGHT + CALENDAR_MARGIN > window.innerHeight
      ? position.top - CALENDAR_HEIGHT - 8
      : position.bottom + 8;
  const getCalendarLeft = (position: DOMRect) =>
    position.left + CALENDAR_WIDTH > window.innerWidth
      ? window.innerWidth - CALENDAR_WIDTH - CALENDAR_MARGIN
      : position.left;

  useEffect(() => {
    if (!isEditing) return;

    const timerId = window.setTimeout(() => {
      openCalendar();
    }, 10);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [isEditing]);

  const openCalendar = () => {
    const rect = inputRef.current?.getBoundingClientRect();

    if (!rect) {
      setIsCalendarOpen(false);
      return;
    }

    setCalendarPosition({
      top: getCalendarTop(rect),
      left: getCalendarLeft(rect),
    });

    setIsCalendarOpen(true);
  };

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
          ref={inputRef}
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
          className={clsx("rounded-md bg-(--color-bg-input) p-1", className)}
        />
        {isCalendarOpen &&
          calendarPosition &&
          createPortal(
            <div
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
                "rounded-2xl bg-(--color-bg-input) p-4 shadow-lg",
                "border-10 border-(--color-bg-sub)",
              )}
              style={{
                top: calendarPosition.top,
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
                  root: "text-sm text-(--color-text) bg-(--color-bg-input)",
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
                  selected:
                    "bg-[var(--color-primary)] text-(--color-text-inverse)",
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

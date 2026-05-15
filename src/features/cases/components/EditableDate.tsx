"use client";
import clsx from "clsx";
import { useState } from "react";
import { formatDateForDisplay, formatDateForEdit, normalizeDateInput } from "../utils/date";

type Props = {
    value: string;
    onSave: (value: string) => void;
    className?: string;
};


export const EditableDate = ({
    value,
    onSave,
    className,
}: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [draftValue, setDraftValue] = useState(formatDateForEdit(value));

    const save = () => {
        const normalizedDate = normalizeDateInput(draftValue);
        if (normalizedDate === null) {
            setDraftValue(formatDateForEdit(value));
            setIsEditing(false);
        }
        if (normalizedDate === value) return;
        normalizedDate && onSave(normalizedDate);
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
                        setDraftValue(formatDateForEdit(value));
                        setIsEditing(false);
                    }
                }}
                className={className}
            />
        )
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
    )

};
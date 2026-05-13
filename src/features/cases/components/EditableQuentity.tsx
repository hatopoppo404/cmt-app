"use client";

import clsx from "clsx";
import { useState } from "react";
import { normalizeQuentity } from "../utils/normalizeQuentity";

type Props = {
    value: number;
    onSave: (value: number) => void;
    className?: string;
};

export const EditableQuentity = ({
    value,
    onSave,
    className,
}: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [draftValue, setDraftValue] = useState(value.toString(),);

    const save = () => {

        const normalizedValue = normalizeQuentity(draftValue,);
        if (normalizedValue === null) return;
        setIsEditing(false);
        if (normalizedValue === value) return;

        onSave(normalizedValue);
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
                        setDraftValue(value.toString(),);
                        setIsEditing(false);
                    }
                }}
                className={className}
            />
        );
    }
    return (
        <span
            onDoubleClick={() => {
                setDraftValue(value.toString(),);
                setIsEditing(true);
            }}
            className={clsx(
                "cursor-text",
                className,
            )}
        >
            {value}
        </span>
    );
};
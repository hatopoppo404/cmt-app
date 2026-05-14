"use client";

import clsx from "clsx";
import { useState } from "react";


type Props = {
    value: string;
    onSave: (
        value: string,
    ) => void;
    className?: string;
};

export const Editabletextarea = ({
    value,
    onSave,
    className,
}: Props) => {

    const [isEditing, setIsEditing] = useState(false);
    const [draftValue, setDraftValue] = useState(value);

    const save = () => {
        setIsEditing(false);
        if (draftValue === value) return;

        onSave(draftValue);
    };

    if (isEditing) {
        return (
            <textarea
                autoFocus
                value={draftValue}
                onChange={(event) => setDraftValue(event.target.value)}
                onBlur={save}
                className={clsx(
                    "h-20",
                    className)}
            />
        );
    }

    return (
        <div
            onDoubleClick={() => {
                setDraftValue(value);
                setIsEditing(true);
            }}
            className={clsx(
                "cursur-text",
                "whitespace-pre-wrap",
                className,
            )}
        >
            {value || "未入力"}
        </div>
    );
};
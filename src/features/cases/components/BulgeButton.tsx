import clsx from 'clsx';
import type { ReactNode } from 'react';

type Props = {
    onClick: () => void;
    children?: ReactNode;
};

export const BulgeButton = ({
    onClick,
    children,
}: Props,) => {
    return (
        <button
            type="button"
            className={clsx(
                "m-5 py-6 px-8 bg-(--green-400)",
                "rounded-[30%/40%]",
            )}
        >
            {children}
        </button>
    )
};
// Spinner.tsx
export default function Spinner({
    size = "md",
}: {
    size?: "sm" | "md" | "lg";
}) {
    const px = {
        sm: 16,
        md: 24,
        lg: 32
    }[size];
    return (
        <svg
            className="spinner"
            width={px}
            height={px}
            viewBox="0 0 50 50"
            role="status"
        >
            {/* 背景の薄い円 */}
            <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                opacity="0.2"
            />

            {/* 回転する線 */}
            <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="90"
                strokeDashoffset="60"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur="1.2s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
}

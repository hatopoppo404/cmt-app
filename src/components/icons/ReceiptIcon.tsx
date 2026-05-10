type IconProps = {
  className?: string;
};

export const ReceiptIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 11V1L2.25 1.75L3 1L3.75 1.75L4.5 1L5.25 1.75L6 1L6.75 1.75L7.5 1L8.25 1.75L9 1L9.75 1.75L10.5 1V11L9.75 10.25L9 11L8.25 10.25L7.5 11L6.75 10.25L6 11L5.25 10.25L4.5 11L3.75 10.25L3 11L2.25 10.25L1.5 11ZM3 8.5H9V7.5H3V8.5ZM3 6.5H9V5.5H3V6.5ZM3 4.5H9V3.5H3V4.5ZM2.5 9.55H9.5V2.45H2.5V9.55Z"
        fill="currentColor"
      />
    </svg>
  );
};

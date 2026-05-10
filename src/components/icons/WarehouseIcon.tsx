type IconProps = {
  className?: string;
};

export const WarehouseIcon = ({ className }: IconProps) => {
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
        d="M2 9.5H3V5.5H9V9.5H10V4.175L6 2.575L2 4.175V9.5ZM1 10.5V3.5L6 1.5L11 3.5V10.5H8V6.5H4V10.5H1ZM4.5 10.5V9.5H5.5V10.5H4.5ZM5.5 9V8H6.5V9H5.5ZM6.5 10.5V9.5H7.5V10.5H6.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

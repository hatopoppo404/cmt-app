type ArrowIconProps = {
  className?: string;
};

export const ArrowIcon = ({ className }: ArrowIconProps) => {
  return (
    <svg
      className={className}
      width="15"
      height="9"
      viewBox="0 0 15 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.00006 0.999999L5.94783 7.08957C6.74822 8.07465 8.25191 8.07465 9.05229 7.08957L14.0001 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

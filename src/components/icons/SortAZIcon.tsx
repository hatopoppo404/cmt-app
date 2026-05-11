type IconProps = {
  className?: string;
};

export const SortAZIcon = ({ className }: IconProps) => {
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
        d="M0 9L2.25 3H3.54L5.79 9H4.56L4.05 7.56H1.74L1.26 9H0ZM2.1 6.54H3.66L2.94 4.29H2.85L2.1 6.54ZM7.02 9V7.86L10.05 4.08H7.14V3H11.37V4.14L8.37 7.92H11.4V9H7.02ZM4.2 1.8L6 0L7.8 1.8H4.2ZM6 12L4.2 10.2H7.8L6 12Z"
        fill="currentColor"
      />
    </svg>
  );
};

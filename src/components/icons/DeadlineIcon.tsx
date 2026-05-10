type IconProps = {
  className?: string;
};

export const DeadlineIcon = ({ className }: IconProps) => {
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
        d="M4.85 9.35L4.15 8.65L5.3 7.5L4.15 6.35L4.85 5.65L6 6.8L7.15 5.65L7.85 6.35L6.7 7.5L7.85 8.65L7.15 9.35L6 8.2L4.85 9.35ZM2.5 11C2.225 11 1.98958 10.9021 1.79375 10.7063C1.59792 10.5104 1.5 10.275 1.5 10V3C1.5 2.725 1.59792 2.48958 1.79375 2.29375C1.98958 2.09792 2.225 2 2.5 2H3V1H4V2H8V1H9V2H9.5C9.775 2 10.0104 2.09792 10.2063 2.29375C10.4021 2.48958 10.5 2.725 10.5 3V10C10.5 10.275 10.4021 10.5104 10.2063 10.7063C10.0104 10.9021 9.775 11 9.5 11H2.5ZM2.5 10H9.5V5H2.5V10ZM2.5 4H9.5V3H2.5V4Z"
        fill="currentColor"
      />
    </svg>
  );
};

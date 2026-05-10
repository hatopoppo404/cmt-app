type IconProps = {
  className?: string;
};

export const NoteIcon = ({ className }: IconProps) => {
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
        d="M4 9H8V8H4V9ZM4 7H8V6H4V7ZM3 11C2.725 11 2.48958 10.9021 2.29375 10.7063C2.09792 10.5104 2 10.275 2 10V2C2 1.725 2.09792 1.48958 2.29375 1.29375C2.48958 1.09792 2.725 1 3 1H7L10 4V10C10 10.275 9.90208 10.5104 9.70625 10.7063C9.51042 10.9021 9.275 11 9 11H3ZM6.5 4.5V2H3V10H9V4.5H6.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

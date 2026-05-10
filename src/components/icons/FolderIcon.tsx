type IconProps = {
  className?: string;
};

export const FolderIcon = ({ className }: IconProps) => {
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
        d="M2 10C1.725 10 1.48958 9.90208 1.29375 9.70625C1.09792 9.51042 1 9.275 1 9V3C1 2.725 1.09792 2.48958 1.29375 2.29375C1.48958 2.09792 1.725 2 2 2H5L6 3H10C10.275 3 10.5104 3.09792 10.7063 3.29375C10.9021 3.48958 11 3.725 11 4V9C11 9.275 10.9021 9.51042 10.7063 9.70625C10.5104 9.90208 10.275 10 10 10H2ZM2 9H10V4H5.5875L4.5875 3H2V9Z"
        fill="currentColor"
      />
    </svg>
  );
};

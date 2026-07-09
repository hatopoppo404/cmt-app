"use client";
import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";
import { Variant, Size } from "@/types/buttons";
import Spinner from "../Spinner/Spinner";

type Props = {
  variant: Variant;
  size: Size;
  icon?: ReactNode;
  iconClass?: string;
  text?: string;
  textClass?: string;
  iconOnly?: boolean;
  buttonClass?: string;

  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

export const Button = ({
  variant = "ghost",
  size = "md",
  icon,
  iconClass,
  text = "送信",
  textClass,
  buttonClass,
  iconOnly = false,
  disabled = false,
  loading = false,
  onClick,
}: Props) => {
  const Icon = icon;
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        iconOnly && styles.iconOnly,
        disabled && styles.disabled,
        loading && styles.loading,
        buttonClass,
      )}
      onClick={onClick}
    >
      <div className={clsx(styles.icon_container, iconClass)}>{Icon}</div>
      {loading && (
        <span className={styles.spinner}>
          <Spinner size={size} />
        </span>
      )}
      <span className={clsx(styles.text, textClass)}>{text}</span>
    </button>
  );
};

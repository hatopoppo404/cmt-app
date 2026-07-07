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
  text?: string;
  iconOnly?: boolean;

  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

export const Button = ({
  variant = "ghost",
  size = "md",
  icon,
  text = "送信",
  iconOnly = false,
  disabled = false,
  loading = false,
}: Props) => {
  const Icon = icon;
  return (
    <button
      disabled={disabled || loading}
      className={[
        styles.button,
        styles[variant],
        styles[size],
        iconOnly && styles.iconOnly,
        disabled && styles.disabled,
        loading && styles.loading,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={[styles.icon_container].join(" ")}>{Icon}</div>
      {loading && (
        <span className={styles.spinner}>
          <Spinner size={size} />
        </span>
      )}
      <span className={styles.text}>{text}</span>
    </button>
  );
};

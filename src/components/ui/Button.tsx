"use client";

import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink/90 border border-ink",
  secondary:
    "bg-paper-raised text-ink border border-line hover:border-ink/30",
  ghost:
    "bg-transparent text-ink-soft hover:text-ink hover:bg-black/[0.03] border border-transparent",
  danger:
    "bg-transparent text-red-600 hover:bg-red-50 border border-transparent",
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md";
}

export function Button({
  variant = "secondary",
  size = "md",
  className = "",
  children,
  ...props
}: Props) {
  const sizeCls =
    size === "sm" ? "px-2.5 py-1.5 text-[12.5px]" : "px-3.5 py-2 text-[13.5px]";
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition disabled:opacity-40 disabled:pointer-events-none ${variants[variant]} ${sizeCls} ${className}`}
    >
      {children}
    </button>
  );
}

export function IconButton({
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-faint transition hover:bg-black/[0.04] hover:text-ink disabled:opacity-30 ${className}`}
    >
      {children}
    </button>
  );
}

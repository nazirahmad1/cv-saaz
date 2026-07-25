"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-line bg-paper-raised px-3 py-2 text-[13.5px] text-ink placeholder:text-ink-faint outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft ${
        props.className ?? ""
      }`}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full resize-y rounded-lg border border-line bg-paper-raised px-3 py-2 text-[13.5px] leading-relaxed text-ink placeholder:text-ink-faint outline-none transition focus:border-accent focus:ring-2 focus:ring-accent-soft ${
        props.className ?? ""
      }`}
    />
  );
}

export function Label({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={`mb-1.5 block text-[11.5px] font-medium uppercase tracking-wide text-ink-faint ${className}`}
    >
      {children}
    </label>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

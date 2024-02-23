"use client";

import { Toaster as Sonner } from "sonner";

export type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="light"
      closeButton
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted group-[.toast]:text-sm",
          actionButton: "group-[.toast]:bg-gray-900 group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-gray-900 group-[.toast]:text-white",
          title: "group-[.toast]:text-base",
        },
      }}
      {...props}
    />
  );
}

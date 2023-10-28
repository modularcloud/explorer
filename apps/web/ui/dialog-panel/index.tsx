"use client";

import React from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";

interface Props {
  triggerIcon: React.ReactNode;
  children?: React.ReactNode;
  contentClass: string;
  btnClass?: string;
  overlayClass?: string;
  removeCloseBtn?: boolean;
}

export function DialogPanel({
  children,
  triggerIcon,
  contentClass,
  overlayClass,
  btnClass,
  removeCloseBtn,
}: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className={btnClass}>{triggerIcon}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={clsx(
            "bg-night/50 fixed inset-0 backdrop-blur-sm",
            overlayClass,
          )}
        />
        <Dialog.Content className={contentClass}>
          {children}
          <Dialog.Close asChild>
            <button
              className={clsx("absolute right-9 top-9 inline-flex", {
                hidden: removeCloseBtn,
              })}
              aria-label="Close"
            >
              <Cross1Icon className="text-night" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

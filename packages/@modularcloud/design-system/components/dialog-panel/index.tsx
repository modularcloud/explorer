import React from "react";
import { Cross1Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";

interface Props {
  triggerIcon: React.ReactNode;
  children?: React.ReactNode;
  contentClass: string;
  removeCloseBtn?: boolean;
}

export function DialogPanel({
  children,
  triggerIcon,
  contentClass,
  removeCloseBtn,
}: Props) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="h-7 flex justify-center items-center rounded-full border-mid-dark-100 border p-1 shadow-[0px_3px_6px_rgba(42,43,46,0.07),0px_1px_2px_rgba(42,43,46,0.04)]">
          {triggerIcon}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-night/50 backdrop-blur-sm" />
        <Dialog.Content className={contentClass}>
          {children}
          <Dialog.Close asChild>
            <button
              className={clsx("inline-flex absolute right-9 top-9", {
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

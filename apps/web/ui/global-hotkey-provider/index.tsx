"use client";
import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import type { OptionGroups } from "~/lib/utils";

type GlobalHotkeyContextType = {
  isSearchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
};

export const GlobalHotkeyContext = React.createContext<GlobalHotkeyContextType>(
  {
    isSearchModalOpen: false,
    setSearchModalOpen() {}, // dummy
  },
);

export function GlobalHotkeyProvider({
  children,
  optionGroups,
}: {
  children: React.ReactNode;
  optionGroups: OptionGroups;
}) {
  const [isSearchModalOpen, setSearchModalOpen] = React.useState(false);
  const router = useRouter();
  const params = useParams();
  const sequenceKeyPressedRef = React.useRef<boolean>(false);

  const network = React.useMemo(() => {
    const values = Object.values(optionGroups).flat();
    return values.find((network) => network.id === params.network) ?? values[0];
  }, [optionGroups, params.network]);

  React.useEffect(() => {
    const pasteEventListener = (event: ClipboardEvent) => {
      if (
        !isSearchModalOpen &&
        !(document.activeElement instanceof HTMLInputElement) // if the input is not focused
      ) {
        const text = event.clipboardData?.getData("text/plain");
        if (text) {
          // Push
          router.push(`/${network.id}/search/${encodeURIComponent(text)}`);
        }
      }
    };

    const keyDownListener = (event: KeyboardEvent) => {
      if (event.key === "/" && !isSearchModalOpen) {
        setSearchModalOpen(true);
        event.preventDefault();
      } else if (event.key.toLowerCase() === "g") {
        // signal that we clicked on `G` and only wait for 1 second to listen for the next key press
        sequenceKeyPressedRef.current = true;
        setTimeout(() => {
          sequenceKeyPressedRef.current = false;
        }, 1000);
      } else if (["b", "t"].includes(event.key.toLowerCase())) {
        const key = event.key.toLowerCase();
        if (sequenceKeyPressedRef.current) {
          sequenceKeyPressedRef.current = false;
          if (key === "b") {
            router.push(`/${network.id}/latest/blocks`);
          } else {
            router.push(`/${network.id}/latest/transactions`);
          }
        }
      } else {
        // ignore the shortcut if other keys are pressed
        sequenceKeyPressedRef.current = false;
      }
    };

    window.addEventListener("keydown", keyDownListener);
    window.addEventListener("paste", pasteEventListener);
    return () => {
      window.removeEventListener("paste", pasteEventListener);
      window.removeEventListener("keydown", keyDownListener);
    };
  }, [isSearchModalOpen, router, network.id]);

  return (
    <GlobalHotkeyContext.Provider
      value={{
        isSearchModalOpen,
        setSearchModalOpen,
      }}
    >
      {children}
    </GlobalHotkeyContext.Provider>
  );
}

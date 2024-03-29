"use client";
import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import type { GroupedNetworkChains } from "~/lib/grouped-network-chains";
import { useHotkey } from "~/lib/hooks/use-hotkey";
import { env } from "~/env";

type GlobalHotkeyContextType = {
  isSearchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const GlobalHotkeyContext = React.createContext<GlobalHotkeyContextType>(
  {
    isSearchModalOpen: false,
    searchValue: "",
    setSearchModalOpen() {},
    setSearchValue() {},
  },
);

export function GlobalHotkeyProvider({
  children,
  optionGroups,
}: {
  children: React.ReactNode;
  optionGroups: GroupedNetworkChains;
}) {
  const [isSearchModalOpen, setSearchModalOpen] = React.useState(false);

  const [initialSearchValue, setInitialSearchValue] = React.useState("");
  const router = useRouter();
  const params = useParams();
  const sequenceKeyPressedRef = React.useRef(false);

  useHotkey({
    keys: ["ArrowLeft", "ArrowRight"],
    modifier: "META",
    listener: (pressedKey) => {
      if (env.NEXT_PUBLIC_TARGET === "electron") {
        if (pressedKey === "ArrowLeft") {
          router.back();
        } else {
          router.forward();
        }
        console.log(`consumed [cmd+${pressedKey}]`);
        return true;
      }
      return false;
    },
  });

  const network = React.useMemo(() => {
    const values = optionGroups.flat();
    return (
      values.find((network) => network.slug === params.network) ?? values[0]
    );
  }, [optionGroups, params.network]);

  React.useEffect(() => {
    const pasteEventListener = (event: ClipboardEvent) => {
      if (
        !isSearchModalOpen &&
        !(document.activeElement instanceof HTMLInputElement)
      ) {
        const text = event.clipboardData?.getData("text/plain");
        if (text) {
          setSearchModalOpen(true);
          setInitialSearchValue(text);
        }
      }
    };

    const keyDownListener = (event: KeyboardEvent) => {
      // Ignore held down keys & don't listen for them if the search modal is open
      if (event.repeat || isSearchModalOpen) return;

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
            router.push(`/${network.slug}/blocks`);
          } else {
            router.push(`/${network.slug}/transactions`);
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
  }, [isSearchModalOpen, router, network.slug]);

  return (
    <GlobalHotkeyContext.Provider
      value={{
        isSearchModalOpen,
        setSearchModalOpen,
        searchValue: initialSearchValue,
        setSearchValue: setInitialSearchValue,
      }}
    >
      {children}
    </GlobalHotkeyContext.Provider>
  );
}

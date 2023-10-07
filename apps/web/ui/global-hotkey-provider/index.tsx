"use client";
import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import type { OptionGroups } from "~/lib/shared-utils";

type SimpleCallback = () => Promise<any>;
type HotKeySequence = {
  key: string;
  modifier?: "CTRL" | "CMD" | "ALT";
  callback: SimpleCallback;
};

type GlobalHotkeyContextType = {
  isSearchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  registerHotKeySequence: (
    sequenceId: string,
    sequence: HotKeySequence,
  ) => void;
  unRegisterHotKeySequence: (sequenceId: string) => void;
};

export const GlobalHotkeyContext = React.createContext<GlobalHotkeyContextType>(
  {
    isSearchModalOpen: false,
    searchValue: "",
    setSearchModalOpen() {},
    setSearchValue() {},
    registerHotKeySequence: () => {},
    unRegisterHotKeySequence: () => {},
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
  const [hotkeyList, setHotkeyList] = React.useState<
    Record<string, HotKeySequence>
  >({});
  const currentPressedModifierRef = React.useRef<
    HotKeySequence["modifier"] | null
  >(null);

  const [initialSearchValue, setInitialSearchValue] = React.useState("");
  const router = useRouter();
  const params = useParams();
  const sequenceKeyPressedRef = React.useRef(false);

  const network = React.useMemo(() => {
    const values = Object.values(optionGroups).flat();
    return values.find((network) => network.id === params.network) ?? values[0];
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

  React.useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => {
      const sequence = Object.entries(hotkeyList).find(([id, sequence]) => {
        if (sequence.key) {
          // TODO
        }
      });
      // if(event.)
      // if (event.key === "/" && !isSearchModalOpen) {
      //   setSearchModalOpen(true);
      //   event.preventDefault();
      // } else if (event.key.toLowerCase() === "g") {
      //   // signal that we clicked on `G` and only wait for 1 second to listen for the next key press
      //   sequenceKeyPressedRef.current = true;
      //   setTimeout(() => {
      //     sequenceKeyPressedRef.current = false;
      //   }, 1000);
      // } else if (["b", "t"].includes(event.key.toLowerCase())) {
      //   const key = event.key.toLowerCase();
      //   if (sequenceKeyPressedRef.current) {
      //     sequenceKeyPressedRef.current = false;
      //     if (key === "b") {
      //       router.push(`/${network.id}/latest/blocks`);
      //     } else {
      //       router.push(`/${network.id}/latest/transactions`);
      //     }
      //   }
      // } else {
      //   // ignore the shortcut if other keys are pressed
      //   sequenceKeyPressedRef.current = false;
      // }
    };

    window.addEventListener("keydown", keyDownListener);
    return () => {
      window.removeEventListener("keydown", keyDownListener);
    };
  }, [hotkeyList]);

  return (
    <GlobalHotkeyContext.Provider
      value={{
        isSearchModalOpen,
        setSearchModalOpen,
        searchValue: initialSearchValue,
        setSearchValue: setInitialSearchValue,
        registerHotKeySequence(sequenceId, sequence) {
          setHotkeyList((old) => {
            return {
              ...old,
              [sequenceId]: sequence,
            };
          });
        },
        unRegisterHotKeySequence(sequenceId) {
          setHotkeyList((old) => {
            const { [sequenceId]: _, ...rest } = old;
            return rest;
          });
        },
      }}
    >
      {children}
    </GlobalHotkeyContext.Provider>
  );
}

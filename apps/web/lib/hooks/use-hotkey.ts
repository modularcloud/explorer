import * as React from "react";
import { GlobalHotkeyContext } from "~/ui/global-hotkey-provider";
import { isMacLike } from "~/lib/shared-utils";

type UseHotkeyArgs = {
  keys: string[];
  modifier?: "CTRL" | "META" | "ALT";
  /**
   * callback to run when the hotkey is executed,
   * the returned value tells if the event has been consumed or not
   */
  listener: (keyPressed: string) => boolean;
};

/**
 * Hook for listening to hotkeys
 */
export function useHotkey({ keys, modifier, listener }: UseHotkeyArgs) {
  const isSearchModalOpen = React.use(GlobalHotkeyContext).isSearchModalOpen;
  const keysPressedRef = React.useRef<Record<string, boolean>>({});

  const listenerRef = React.useRef(listener);
  const keysRef = React.useRef(keys);
  const modifierRef = React.useRef(modifier);
  React.useLayoutEffect(() => {
    listenerRef.current = listener;
    keysRef.current = keys;
    modifierRef.current = modifier;
  });

  React.useEffect(() => {
    function keyDownListener(event: KeyboardEvent) {
      if (isSearchModalOpen) {
        return;
      }

      if (event.ctrlKey) {
        keysPressedRef.current["CTRL"] = true;

        /**
         * On windows, we consider the meta key as CTRL because
         * if we don't do this the meta key will never be detected on windows
         */
        if (!isMacLike(navigator.userAgent)) {
          keysPressedRef.current["META"] = true;
        }
      } else if (event.metaKey) {
        keysPressedRef.current["META"] = true;
      } else if (event.altKey) {
        keysPressedRef.current["ALT"] = true;
      } else {
        keysPressedRef.current[event.key] = true;
      }

      const keys = keysRef.current;
      const modifier = modifierRef.current;
      const currentListener = listenerRef;
      if (
        keys.includes(event.key) &&
        (!modifier || keysPressedRef.current[modifier])
      ) {
        const consumed = currentListener.current(event.key);

        if (consumed) {
          event.stopPropagation();
          event.preventDefault();
        }
      }
    }

    const keyUpListener = (event: KeyboardEvent) => {
      const { [event.key]: _, ...keysPressed } = keysPressedRef.current;
      keysPressedRef.current = keysPressed;
    };

    window.addEventListener("keydown", keyDownListener);
    window.addEventListener("keyup", keyUpListener);
    return () => {
      window.removeEventListener("keyup", keyUpListener);
      window.removeEventListener("keydown", keyDownListener);
    };
  }, [isSearchModalOpen]);
}

import * as React from "react";
import { GlobalHotkeyContext } from "~/ui/global-hotkey-provider";
import { isMacLike } from "~/lib/shared-utils";

type HotkeyListener = (keyPressed: string) => void;
type UseHotkeyListenerArgs = {
  keys: string[];
  modifier?: "CTRL" | "META" | "ALT";
  listener: HotkeyListener;
};

export function useHotkeyListener({
  keys,
  modifier,
  listener,
}: UseHotkeyListenerArgs) {
  const { isSearchModalOpen } = React.use(GlobalHotkeyContext);
  const keysPressedRef = React.useRef<Record<string, boolean>>({});

  React.useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => {
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

      if (
        keys.includes(event.key) &&
        (!modifier || keysPressedRef.current[modifier])
      ) {
        listener(event.key);
      }
    };

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
  }, [isSearchModalOpen, listener, keys, modifier]);
}

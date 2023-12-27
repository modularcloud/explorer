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
  const { isSearchModalOpen } = React.use(GlobalHotkeyContext);
  const keysPressedRef = React.useRef<Record<string, boolean>>({});

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

      // TODO : one more bug -> we also need to check that the keys don't include unwanted shortcuts
      if (
        keys.includes(event.key) &&
        (!modifier || keysPressedRef.current[modifier])
      ) {
        const consumed = listener(event.key);

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
  }, [isSearchModalOpen, listener, keys, modifier]);
}

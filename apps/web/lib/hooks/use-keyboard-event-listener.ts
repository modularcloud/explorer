import * as React from "react";
import { GlobalHotkeyContext } from "~/ui/global-hotkey-provider";

type SimpleCallback = () => Promise<any>;
type UseHotkeyListenerArgs = {
  key: string;
  modifier?: "CTRL" | "CMD" | "ALT";
  callback: SimpleCallback;
};

export function useHotkeyListener({
  key,
  modifier,
  callback,
}: UseHotkeyListenerArgs) {
  const { isSearchModalOpen } = React.use(GlobalHotkeyContext);
  const keysPressedRef = React.useRef<Record<string, boolean>>({});

  React.useEffect(() => {
    const keyDownListener = (event: KeyboardEvent) => {
      if (!isSearchModalOpen) {
        return;
      }
      if (event.ctrlKey) {
        keysPressedRef.current["CTRL"] = true;
      } else if (event.metaKey) {
        keysPressedRef.current["CMD"] = true;
      } else if (event.altKey) {
        keysPressedRef.current["ALT"] = true;
      } else {
        keysPressedRef.current[event.key] = true;
      }

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        (!modifier || keysPressedRef.current[modifier])
      ) {
        callback();
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
  }, [isSearchModalOpen, callback, key, modifier]);
}

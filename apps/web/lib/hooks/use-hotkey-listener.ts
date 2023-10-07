import * as React from "react";
import { GlobalHotkeyContext } from "~/ui/global-hotkey-provider";

type HotkeyListener<TKeys extends string = string> = (
  keyPressed: TKeys,
) => void;
type UseHotkeyListenerArgs<TKeys extends string = string> = {
  keys: TKeys[];
  modifier?: "CTRL" | "CMD" | "ALT";
  listener: HotkeyListener<TKeys>;
};

export function useHotkeyListener<TKeys extends string = string>({
  keys,
  modifier,
  listener,
}: UseHotkeyListenerArgs<TKeys>) {
  const { isSearchModalOpen } = React.use(GlobalHotkeyContext);
  const keysPressedRef = React.useRef<Record<string, boolean>>({});

  React.useEffect(() => {
    function isKeyPressed(key: string): key is TKeys {
      return (
        keys.includes(key as TKeys) &&
        (!modifier || keysPressedRef.current[modifier])
      );
    }

    const keyDownListener = (event: KeyboardEvent) => {
      if (isSearchModalOpen) {
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

      if (isKeyPressed(event.key)) {
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

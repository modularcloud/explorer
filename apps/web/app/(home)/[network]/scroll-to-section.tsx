"use client";

import { useHotkey } from "~/lib/hooks/use-hotkey";

export function ScrollToSection() {
  useHotkey({
    keys: ["a"],
    listener: () => {
      const section = document.getElementById("activity");
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      return true;
    },
  });
  useHotkey({
    keys: ["s"],
    listener: () => {
      const section = document.getElementById("statistics");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      return true;
    },
  });
  return null;
}

"use client";
import * as React from "react";

interface Props {
  path: string;
  replace?: boolean;
}

export function ShallowPush({ path, replace = false }: Props) {
  React.useEffect(() => {
    shallowPush(path, replace);
  }, [path, replace]);
  return null;
}

export function shallowPush(path: string, replace = false) {
  if (replace) {
    return window.history.replaceState(null, "", path);
  }
  window.history.pushState(null, "", path);
}

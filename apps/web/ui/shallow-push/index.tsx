"use client";
import React from "react";

interface Props {
  path: string;
}

export function ShallowPush({ path }: Props) {
  React.useEffect(() => {
    shallowPush(path);
  }, [path]);
  return null;
}

export function shallowPush(path: string) {
  window.history.pushState(null, "", path);
}

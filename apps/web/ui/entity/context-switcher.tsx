"use client";

import { useContext } from "react";
import { ViewContext } from "../view-context/client";

type Props = {
  overview: React.ReactNode;
  raw: React.ReactNode;
};

export function ContextSwitcher({ overview, raw }: Props) {
  const view = useContext(ViewContext);
  switch (view.entity) {
    case "overview":
      return <>{overview}</>;
    case "raw":
      return <>{raw}</>;
    default:
      return null;
  }
}

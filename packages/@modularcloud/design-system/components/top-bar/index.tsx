import React from "react";
import { CardOff } from "../../icons";

type Props = {
  type: string;
  id: string;
  children: React.ReactNode;
};

export function TopBar({ type, id, children }: Props) {
  return (
    <div className="h-12 bg-specialty-gray py-2 px-6 flex flex-row xs:justify-between gap-16 border-b border-mid-dark/5 shadow-[inset_0px_1px_7px_rgba(42,43,46,0.06)]">
      {children}
      <div className="flex flex-row gap-2 items-center truncate">
        <span className="flex flex-row gap-2 items-center">
          <CardOff />
          <p className="font-semibold">{type}</p>
        </span>
        <span className="text-gray">/</span>
        <p className="truncate">{id}</p>
      </div>
    </div>
  );
}

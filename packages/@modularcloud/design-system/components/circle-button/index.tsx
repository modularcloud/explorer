import * as React from "react";

type Props = {
  children?: React.ReactNode;
};

export function CircleButton({ children }: Props) {
  return (
    <button className="h-7 flex justify-center items-center rounded-full border-mid-dark-100 border p-1 shadow-[0px_3px_6px_rgba(42,43,46,0.07),0px_1px_2px_rgba(42,43,46,0.04)]">
      {children}
    </button>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FetchLoadArgs } from "../../../../lib/utils";

type Props = {
  resourcePath?: FetchLoadArgs;
  children: React.ReactNode;
};
export function ClickableRow({ resourcePath, children }: Props) {
  const router = useRouter();
  const destination = resourcePath ? `/${resourcePath.network}/${resourcePath.type}/${resourcePath.query}` : "";

  useEffect(() => {
    if(resourcePath) {
        router.prefetch(destination);
    }
  }, []);

  const onClick = () => {
    if(resourcePath) {
        router.push(destination);
    }
  }

  return (
    <tr
      onClick={onClick}
      className="border-b border-b-[#F0F0F1] hover:bg-[#08061505] cursor-pointer"
    >
      {children}
    </tr>
  );
}

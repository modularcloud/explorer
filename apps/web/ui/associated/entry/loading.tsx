"use client";

import { useContext } from "react";
import { ViewContext } from "../../view-context/client";

function FeedEntryFallback() {
  return (
    <div className="border-mid-dark-100 w-full rounded-xl border shadow-[0px_3px_6px_rgba(42,43,46,_0.07),0px_1px_2px_rgba(42,43,46,0.04)] lg:w-[42rem] xl:w-[48rem] 2xl:w-[56rem]">
      <div className="bg-slate/[.04] border-b border-slate-100 px-4 py-1.5 font-bold">
        Loading...
      </div>
      <div className="px-4 py-2">
        <div className="h-10 w-full text-center">Loading...</div>
      </div>
    </div>
  );
}

function TableEntryFallback() {
  return (
    <tr className="border-b border-b-[#F0F0F1]">
      <td aria-hidden={true} className="p-2">
        {/** For spacing purposes */}
      </td>
      <td className="h-12">Loading...</td>
      <td aria-hidden={true} className="p-2" colSpan={100}>
        {/** For spacing purposes */}
      </td>
    </tr>
  );
}

export function AssociatedEntryLoadingFallback() {
  const view = useContext(ViewContext);
  switch (view.associated) {
    case "feed":
      return <FeedEntryFallback />;
    case "table":
      return <TableEntryFallback />;
    default:
      return null;
  }
}

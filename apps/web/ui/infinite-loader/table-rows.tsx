"use client";

import { Suspense, useContext } from "react";
import { ClientTableRow } from "../table/row/client";
import { InfiniteLoaderContext } from "./context";

export function InfiniteTableLoaderRows() {
    const tableRows = useContext(InfiniteLoaderContext);
    return <>
      {tableRows.map((row) => (
        <tr
          className="border-b border-b-[#F0F0F1] hover:bg-[#08061505] cursor-pointer"
          key={row.query}
        >
          <td aria-hidden={true} className="p-2">
            {/** For spacing purposes */}
          </td>
          <Suspense fallback={<td className="h-12">Loading...</td>}>
            <ClientTableRow row={row} />
          </Suspense>
          <td aria-hidden={true} className="p-2">
            {/** For spacing purposes */}
          </td>
        </tr>
      ))}
      </>
}

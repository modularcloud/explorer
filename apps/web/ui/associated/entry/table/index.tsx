import clsx from "clsx";
import { Entity } from "@modularcloud/ecs";
import { AssociatedArchetype } from "../../../../ecs/archetypes/associated";
import { CellBox } from "./cell-box";
import { generateColumnStyle } from "../../list/table/column-styles";
import { generateCellStyle } from "./cell-style";
import { ClickableRow } from "./clickable-row";
import SvgThreeDotsHorizontal from "../../../../app/[network]/[type]/(standard)/[query]/[section]/(components)/(icons)/ThreeDotsHorizontal";
import * as Popover from "@radix-ui/react-popover";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
export interface Props {
  entity: Entity<typeof AssociatedArchetype>;
}

export function TableEntry({ entity }: Props) {
  const router = useRouter();
  const openTransaction = () => {
    const resourcePath = entity.components.row.data.link;
    const destination = resourcePath
      ? `/${resourcePath.network}/${resourcePath.type}/${resourcePath.query}`
      : "";
    router.push(destination);
  };
  return (
    <ClickableRow resourcePath={entity.components.row.data.link}>
      <td aria-hidden={true} className="p-2 sm:p-3 lg:p-4">
        {/** For spacing purposes */}
      </td>
      {entity.components.row.data.tableData.map((entry) => (
        <td
          className={clsx(
            "h-[3.375rem]",
            generateColumnStyle(entry.column),
            generateCellStyle(entry.cell),
            entry.column.showOnlyIfDifferent && "hidden"
          )}
          key={entry.column.columnLabel}
        >
          <CellBox value={entry.cell} />
        </td>
      ))}
      <td
        className="h-[3.375rem] z-30"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="IconButton" aria-label="Update dimensions">
              <SvgThreeDotsHorizontal />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="PopoverContent" sideOffset={5}>
              <div className=" z-30 bg-white rounded-xl w-44 border-solid border-[1px] border-[#2A2B2E1A] absolute right-0 shadow-md">
                <div
                  className="flex  py-2 px-3  items-center  justify-between border-solid border-b-2 hover:bg-[#08061505] cursor-pointer"
                  onClick={() => {
                    openTransaction();
                  }}
                >
                  <div className="font-medium text-[#2A2B2E]">Open</div>
                  <div className="text-[#80838D] text-xs">enter</div>
                </div>
                <div className="flex  py-2 px-3  items-center  justify-between border-solid border-b-2 hover:bg-[#08061505] cursor-pointer">
                  <div className="font-medium text-[#2A2B2E] ">Preview</div>
                  <div className="text-[#80838D] text-xs">space</div>
                </div>
                <div
                  className="flex py-2 px-3 items-center  justify-between hover:bg-[#08061505] cursor-pointer "
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      entity.components.row.data.link?.query ?? ""
                    );
                  }}
                >
                  <div className="font-medium text-[#2A2B2E] text-sm">Copy</div>
                  <div className="text-[#80838D] text-xs">⌘+C </div>
                </div>
              </div>
              <Popover.Close
                className="PopoverClose"
                aria-label="Close"
              ></Popover.Close>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </td>
      <td aria-hidden={true} className="p-2 sm:p-3 lg:p-4">
        {/** For spacing purposes */}
      </td>
    </ClickableRow>
  );
}

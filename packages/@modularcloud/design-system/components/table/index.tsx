import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Entity } from "service-manager/types/entity.type";
import { ElipsHorizOff } from "../../icons";
import clsx from "clsx";
import { Badge } from "../badge";
import { Status } from "../status";
import * as React from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type Props = {
  data: Entity[];
  router: any;
};

type EntityColumn<T extends React.ReactNode> = {
  id: string;
  header?: string;
  hideOnXS?: boolean;
  showOnXS?: boolean;
  rightJustifyOnXS?: boolean;
  isPrimaryKey?: boolean;
  isIcon?: boolean;
  getCell: (entity: Entity) => T;
};

type TableSection = {
  rows: Entity[];
  columns: EntityColumn<any>[];
  label: string;
};

function forceLength(
  str: string,
  len: number,
  strategy: "middle" | "end" = "middle"
) {
  const MIN = 4;
  const diff = str.length - len;
  if (diff > 0) {
    if (strategy === "end") {
      let shortend = str.slice(-len);
      if (shortend.length < MIN) {
        shortend = str.slice(0, MIN);
      }
      return shortend + "...";
    }
    if (strategy === "middle") {
      const midpoint = Math.floor(str.length / 2);
      const removal = Math.floor(diff / 2);
      let start = str.slice(0, midpoint - removal);
      let end = str.slice(midpoint + removal);
      if (start.length + end.length < MIN) {
        start = str.slice(0, MIN);
        end = str.slice(-MIN);
      }
      return start + "..." + end;
    }
  }
  return str;
}

function LongVal({
  value,
  max,
  step,
  strategy,
}: {
  value: string;
  max: number;
  step: number;
  strategy?: "middle" | "end";
}) {
  return (
    <>
      <div className="hidden 2xl:block">{value}</div>
      <div className="hidden xl:block 2xl:hidden">
        {forceLength(value, max, strategy)}
      </div>
      <div className="hidden lg:block xl:hidden">
        {forceLength(value, max - step, strategy)}
      </div>
      <div className="hidden md:block lg:hidden">
        {forceLength(value, max - step * 2, strategy)}
      </div>
      <div className="hidden sm:block md:hidden">
        {forceLength(value, max - step * 3, strategy)}
      </div>
      <div className="hidden xs:block sm:hidden">
        {forceLength(value, max - step * 4, strategy)}
      </div>
      <div className="hidden max-xs:block">
        {forceLength(value, max - step * 5, strategy)}
      </div>
    </>
  );
}

export function Table({ data, router }: Props) {
  const push = React.useCallback(
    (path: any) => {
      router.push(path);
    },
    [router.push]
  );

  const section = React.useMemo(() => {
    if (data.length === 0) {
      return null;
    }
    const type = data[0].context.entityTypeName;
    const isNotCosmos = !data[0].context.network
      .toLowerCase()
      .match(/(^hub$)|rollapp|dymension|mocha/);
    const filterData = data.filter(
      (entity) => entity.context.entityTypeName === type
    );
    let section: TableSection;
    if (type === "ERC20 Event") {
      section = {
        rows: filterData,
        label: "Transfers",
        columns: [
          {
            id: "from",
            header: "From",
            getCell: (entity: Entity) => (
              <LongVal
                value={entity.metadata.From.payload as string}
                max={40}
                step={8}
              />
            ),
          },
          {
            id: "to",
            header: "To",
            getCell: (entity: Entity) => (
              <LongVal
                value={entity.metadata.To.payload as string}
                max={40}
                step={8}
              />
            ),
          },
          {
            id: "value",
            header: "Value",
            getCell: (entity: Entity) => (
              <LongVal
                value={entity.metadata.Value.payload as string}
                max={20}
                step={3}
                strategy="end"
              />
            ),
          },
          {
            id: "height",
            header: "Height",
            getCell: (entity: Entity) => entity.metadata.Height.payload,
          },
          {
            id: "timestamp",
            header: "Timestamp",
            getCell: (entity: Entity) => dayjs(entity.metadata.Timestamp.payload as number).fromNow(),
          },
          {
            id: "menu",
            isIcon: true,
            getCell: (entity: Entity) => <ElipsHorizOff />,
          },
        ],
      };
    } else if (type === "Account") {
      section = {
        rows: filterData,
        label: "Accounts",
        columns: [
          {
            id: "address",
            header: "Address",
            isPrimaryKey: true,
            getCell: (entity: Entity) => entity.uniqueIdentifier,
          },
          {
            id: "balance",
            header: "Balance",
            getCell: (entity: Entity) => entity.metadata.Balance.payload,
          },
          {
            id: "menu",
            isIcon: true,
            getCell: (entity: Entity) => <ElipsHorizOff />,
          },
        ],
      };
    } else if (type === "Transaction") {
      const height = data[0].metadata.Height.payload;
      const differentHeight = !!data.find(
        (entity) => entity.metadata.Height.payload !== height
      );
      section = {
        rows: filterData,
        label: "Transactions",
        columns: [
          {
            id: "icon",
            isIcon: true,
            showOnXS: true,
            getCell: (entity: Entity) => (
              <Status
                status={Boolean(entity.metadata.Status.payload)}
                mode="icon"
              />
            ),
          },
          {
            id: "hash",
            header: "Transactions",
            getCell: (entity: Entity) => <LongVal
            value={entity.uniqueIdentifier}
            max={50}
            step={10}
          />,
          },
          differentHeight
            ? {
                id: "height",
                header: "Height",
                getCell: (entity: Entity) => entity.metadata.Height.payload,
              }
            : null,
          differentHeight
            ? {
                id: "timestamp",
                header: "Timestamp",
                hideOnXS: true,
                getCell: (entity: Entity) => dayjs(entity.metadata.Timestamp.payload as number).fromNow(),
              }
            : null,
          {
            id: "type",
            header: "Type",
            rightJustifyOnXS: true,
            getCell: (entity: Entity) => (
              <Badge
                list={
                  entity.computed.TableType ??
                  entity.computed.Messages?.map(
                    (message: any) => message.uniqueIdentifier
                  )
                }
              />
            ),
          },
          {
            id: "status",
            header: "Status",
            hideOnXS: true,
            getCell: (entity: Entity) => (
              <Status status={Boolean(entity.metadata.Status.payload)} />
            ),
          },
          {
            id: "menu",
            isIcon: true,
            getCell: (entity: Entity) => <ElipsHorizOff />,
          },
        ].filter((notnull) => notnull) as EntityColumn<any>[],
      };
    } else {
      section = {
        rows: filterData,
        label: type + "s", // TODO: handle plural better
        columns: [
          /*{
        id: "icon",
        isIcon: true,
        showOnXS: true,
        getCell: (entity: Entity) => <Status status={entity.metadata.status} mode="icon" />
      },*/
          {
            id: "id",
            header: type + "s", // TODO: handle plural better
            isPrimaryKey: true,
            getCell: (entity: Entity) => entity.uniqueIdentifier,
          },
          {
            id: "menu",
            isIcon: true,
            getCell: (entity: Entity) => <ElipsHorizOff />,
          },
        ],
      };
    }
    return section;
  }, [data]);

  const columnHelper = createColumnHelper<Entity>();

  const columns = React.useMemo(() => {
    if (section === null) return null;
    return section.columns.map((col) => {
      return columnHelper.accessor("uniqueIdentifier", {
        id: col.id,
        header: col.header ?? (() => null),
        cell: (info) => col.getCell(info.row.original),
      });
    });
  }, [section]);

  const table = useReactTable<Entity>({
    data: section?.rows || [],
    columns: columns || [],
    getCoreRowModel: getCoreRowModel(),
  });

  if (section === null) return null;

  const maxXSLeftPadding = section.columns.findIndex((col) => !col.hideOnXS);
  const maxXSRightPadding =
    section.columns.length -
    1 -
    [...section.columns].reverse().findIndex((col) => !col.hideOnXS);
  const minXSLeftPadding = section.columns.findIndex((col) => !col.showOnXS);
  const minXSRightPadding =
    section.columns.length -
    1 -
    [...section.columns].reverse().findIndex((col) => !col.showOnXS);

  // const maxXSLeftPadding = React.useMemo(
  //   () => section.columns.findIndex((col) => !col.hideOnXS),
  //   [section]
  // );
  // const maxXSRightPadding = React.useMemo(
  //   () =>
  //     section.columns.length -
  //     1 -
  //     [...section.columns].reverse().findIndex((col) => !col.hideOnXS),
  //   [section]
  // );
  // const minXSLeftPadding = React.useMemo(
  //   () => section.columns.findIndex((col) => !col.showOnXS),
  //   [section]
  // );
  // const minXSRightPadding = React.useMemo(
  //   () =>
  //     section.columns.length -
  //     1 -
  //     [...section.columns].reverse().findIndex((col) => !col.showOnXS),
  //   [section]
  // );

  return (
    <div className="w-full overflow-x-hidden">
      <div className="xs:hidden border-b border-b-night-100 h-10 font-bold w-full px-4 flex items-center">
        {section.label}
      </div>
      <table className="text-left w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              className="max-xs:hidden border-b border-b-night-100 h-10 font-bold"
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header, index) => {
                const rules = section.columns[index];
                return (
                  <th
                    className={clsx(
                      "px-1",
                      rules.showOnXS && "xs:hidden",
                      rules.hideOnXS && "max-xs:hidden",
                      rules.rightJustifyOnXS &&
                        "max-xs:flex max-xs:justify-end",
                      index === minXSLeftPadding && "xs:px-4 sm:px-6 md:px-8",
                      index == minXSRightPadding && "xs:pr-4 sm:pr-6 md:pr-8",
                      index === maxXSLeftPadding && "max-xs:pl-4",
                      index == maxXSRightPadding && "max-xs:pr-4",
                      !rules.isPrimaryKey &&
                        !rules.isIcon &&
                        "sm:w-[167px] md:w-[175px]",
                      rules.isIcon && "w-5"
                    )}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className={clsx(
                "border-b border-b-[#F0F0F1]",
                row.original.context.network !== "N/A" &&
                  "hover:bg-[#08061505] cursor-pointer"
              )}
              key={row.id}
              onClick={() =>
                row.original.context.network === "N/A"
                  ? null
                  : push(
                      `/${row.original.context.network}/${row.original.context.entityTypeName}/${row.original.uniqueIdentifierLabel}/${row.original.uniqueIdentifier}`
                    )
              }
            >
              {row.getVisibleCells().map((cell, index) => {
                const rules = section.columns[index];
                return (
                  <td
                    className={clsx(
                      "py-3 px-1 text-mid-dark",
                      rules.showOnXS && "xs:hidden",
                      rules.hideOnXS && "max-xs:hidden",
                      rules.rightJustifyOnXS &&
                        "max-xs:flex max-xs:justify-end",
                      index === minXSLeftPadding && "xs:px-4 sm:px-6 md:px-8",
                      index == minXSRightPadding && "xs:pr-4 sm:pr-6 md:pr-8",
                      (index === maxXSLeftPadding ||
                        index == maxXSRightPadding) &&
                        "max-xs:px-4",
                      !rules.isPrimaryKey &&
                        !rules.isIcon &&
                        "sm:w-[167px] md:w-[175px]",
                      rules.isIcon && "w-5"
                    )}
                    key={cell.id}
                  >
                    <div
                      className={clsx(
                        rules.isPrimaryKey && "max-sm:w-20 truncate"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

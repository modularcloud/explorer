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

export function Table({ data, router }: Props) {
  // temporarily before we have multi-entity tables
  if (!data.length) {
    return null;
  }
  const type = data[0].context.entityTypeName;
  const isNotCosmos = !data[0].context.network.toLowerCase().match(/(^hub$)|rollapp|dymension|mocha/);
  const filterData = data.filter(
    (entity) => entity.context.entityTypeName === type
  );
  let section: TableSection;
  if (type === "Transaction") {
    if (isNotCosmos) {
      section = {
        rows: filterData,
        label: "Transactions",
        columns: [
          {
            id: "hash",
            header: "Transactions",
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
    } else {
      section = {
        rows: filterData,
        label: "Transactions",
        columns: [
          {
            id: "icon",
            isIcon: true,
            showOnXS: true,
            getCell: (entity: Entity) => (
              <Status status={entity.metadata.status} mode="icon" />
            ),
          },
          {
            id: "hash",
            header: "Transactions",
            isPrimaryKey: true,
            getCell: (entity: Entity) => entity.uniqueIdentifier,
          },
          {
            id: "type",
            header: "Type",
            rightJustifyOnXS: true,
            getCell: (entity: Entity) => (
              <Badge
                list={entity.computed.Messages?.map(
                  (message: any) => message.uniqueIdentifier
                )}
              />
            ),
          },
          {
            id: "status",
            header: "Status",
            hideOnXS: true,
            getCell: (entity: Entity) => (
              <Status status={entity.metadata.Status} />
            ),
          },
          {
            id: "menu",
            isIcon: true,
            getCell: (entity: Entity) => <ElipsHorizOff />,
          },
        ],
      };
    }
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

  const columnHelper = createColumnHelper<Entity>();
  const columns = section.columns.map((col) => {
    return columnHelper.accessor("uniqueIdentifier", {
      id: col.id,
      header: col.header ?? (() => null),
      cell: (info) => col.getCell(info.row.original),
    });
  });

  const table = useReactTable<Entity>({
    data: section.rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
                      rules.showOnXS && "xs:hidden",
                      rules.hideOnXS && "max-xs:hidden",
                      rules.rightJustifyOnXS &&
                        "max-xs:flex max-xs:justify-end",
                      index === minXSLeftPadding && "xs:pl-4 sm:pl-6 md:pl-8",
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
              className="border-b border-b-[#F0F0F1] hover:bg-[#08061505] cursor-pointer"
              key={row.id}
              onClick={() =>
                row.original.context.network === "N/A"
                  ? null
                  : router.push(
                      `/${row.original.context.network}/${row.original.context.entityTypeName}/${row.original.uniqueIdentifierLabel}/${row.original.uniqueIdentifier}`
                    )
              }
            >
              {row.getVisibleCells().map((cell, index) => {
                const rules = section.columns[index];
                return (
                  <td
                    className={clsx(
                      "py-3 text-mid-dark",
                      rules.showOnXS && "xs:hidden",
                      rules.hideOnXS && "max-xs:hidden",
                      rules.rightJustifyOnXS &&
                        "max-xs:flex max-xs:justify-end",
                      index === minXSLeftPadding && "xs:pl-4 sm:pl-6 md:pl-8",
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

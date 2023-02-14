import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Entity } from "service-manager/types/entity.type";
import { ElipsHorizOff } from "../../icons";
import clsx from 'clsx';
import { Badge } from "../badge";
import { Status } from "../status";
import * as React from 'react';

type Props = {
  data?: Entity[];
  onRowClick?: (row: Entity) => void;
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
} 

type TableSection = {
  rows: Entity[];
  columns: EntityColumn<any>[];
  label: string;
}

export function Table(props?: Props) {
  const data: Entity[] = [{
    uniqueIdentifierLabel: "Hash",
    uniqueIdentifier: "E9A41C60FA1DCBA5B9CE560325FDB6F456464",
    metadata: { 
      type: "Get Reward",
      status: "Success"
     },
    context: {
      network: "Mocha",
      entityTypeName: "Transaction",
    },
    raw: "blah blah blah",
  },
  {
    uniqueIdentifierLabel: "Hash",
    uniqueIdentifier: "09A41C60FA1DCBA5B9CE560325FDB6F456466",
    metadata: { 
      type: "IBC Update Client,IBC Acknowledgement",
      status: "Success"
     },
    context: {
      network: "Mocha",
      entityTypeName: "Transaction",
    },
    raw: "blah blah blah",
  },
  {
    uniqueIdentifierLabel: "Hash",
    uniqueIdentifier: "F9A41C60FA1DCBA5B9CE560325FDB6F456465",
    metadata: { 
      type: "Pay For Data",
      status: "Failure"
     },
    context: {
      network: "Mocha",
      entityTypeName: "Transaction",
    },
    raw: "blah blah blah",
  }
  ];

  const section: TableSection = {
    rows: data,
    label: "Transactions",
    columns: [
      {
        id: "icon",
        isIcon: true,
        showOnXS: true,
        getCell: (entity: Entity) => <Status status={entity.metadata.status} mode="icon" />
      },
      {
        id: "hash",
        header: "Transactions",
        isPrimaryKey: true,
        getCell: (entity: Entity) => entity.uniqueIdentifier
      },
      {
        id: "type",
        header: "Type",
        rightJustifyOnXS: true,
        getCell: (entity: Entity) => <Badge list={entity.metadata.type?.split(",")} />
      },
      {
        id: "status",
        header: "Status",
        hideOnXS: true,
        getCell: (entity: Entity) => <Status status={entity.metadata.status} />
      },
      {
        id: "menu",
        isIcon: true,
        getCell: (entity: Entity) => <ElipsHorizOff />
      },
    ]
  }
  
  const columnHelper = createColumnHelper<Entity>();
  const columns = section.columns.map(col => {
    return columnHelper.accessor("uniqueIdentifier", {
      id: col.id,
      header: col.header ?? (() => null),
      cell: (info) => col.getCell(info.row.original),
    })
  });

  const table = useReactTable<Entity>({
    data: section.rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const maxXSLeftPadding = section.columns.findIndex(col => !col.hideOnXS);
  const maxXSRightPadding = section.columns.length - 1 - [...section.columns].reverse().findIndex(col => !col.hideOnXS);
  const minXSLeftPadding = section.columns.findIndex(col => !col.showOnXS);
  const minXSRightPadding = section.columns.length - 1 - [...section.columns].reverse().findIndex(col => !col.showOnXS);

  return (
    <div className="w-full overflow-x-hidden">
      <div className="xs:hidden border-b border-b-night-100 h-10 font-bold w-full px-4 flex items-center">{section.label}</div>
      <table className="text-left w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="max-xs:hidden border-b border-b-night-100 h-10 font-bold" key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                const rules = section.columns[index];
                return <th className={clsx(rules.showOnXS && "xs:hidden", rules.hideOnXS && "max-xs:hidden", rules.rightJustifyOnXS && "max-xs:flex max-xs:justify-end", index === minXSLeftPadding && "xs:pl-4 sm:pl-6 md:pl-8", index == minXSRightPadding && "xs:pr-4 sm:pr-6 md:pr-8", index === maxXSLeftPadding && "max-xs:pl-4", index == maxXSRightPadding && "max-xs:pr-4", (!rules.isPrimaryKey && !rules.isIcon) && "sm:w-[167px] md:w-[175px]", rules.isIcon && "w-5")} key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                        )}
                </th>
              })}
            </tr>
        ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="border-b border-b-[#F0F0F1] hover:bg-[#08061505] cursor-pointer" key={row.id} onClick={() => console.log(row.id)}>
              {row.getVisibleCells().map((cell, index) => {
                const rules = section.columns[index];
                return <td className={clsx("py-3 text-mid-dark", rules.showOnXS && "xs:hidden", rules.hideOnXS && "max-xs:hidden", rules.rightJustifyOnXS && "max-xs:flex max-xs:justify-end", index === minXSLeftPadding && "xs:pl-4 sm:pl-6 md:pl-8", index == minXSRightPadding && "xs:pr-4 sm:pr-6 md:pr-8", (index === maxXSLeftPadding || index == maxXSRightPadding) && "max-xs:px-4", (!rules.isPrimaryKey && !rules.isIcon) && "sm:w-[167px] md:w-[175px]", rules.isIcon && "w-5")} key={cell.id}>
                  <div className={clsx(rules.isPrimaryKey && "max-sm:w-20 truncate")}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                </td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

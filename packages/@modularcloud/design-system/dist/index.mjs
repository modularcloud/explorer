// Button.tsx
import { jsx } from "react/jsx-runtime";
var Button = ({
  primary = false,
  label = "Boop",
  size = "small"
}) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      style: {
        backgroundColor: primary ? "red" : "blue",
        fontSize: size === "large" ? "50px" : "14px"
      },
      children: label
    }
  );
};

// components/table/index.tsx
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function Table({ data, onRowClick }) {
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("uniqueIdentifier", {
      cell: (info) => info.getValue(),
      header: "Id"
    })
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  return /* @__PURE__ */ jsxs("table", { children: [
    /* @__PURE__ */ jsx2("thead", { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx2("tr", { children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx2("th", { children: header.isPlaceholder ? null : flexRender(
      header.column.columnDef.header,
      header.getContext()
    ) }, header.id)) }, headerGroup.id)) }),
    /* @__PURE__ */ jsx2("tbody", { children: table.getRowModel().rows.map((row) => /* @__PURE__ */ jsx2("tr", { onClick: () => onRowClick(row.original), children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx2("td", { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) })
  ] });
}

// atoms/boxed-value/index.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var BoxedValue = ({ value }) => {
  return /* @__PURE__ */ jsx3("span", { className: "flex justify-center items center rounded font-medium text-xs", children: value });
};
export {
  BoxedValue,
  Button,
  Table
};

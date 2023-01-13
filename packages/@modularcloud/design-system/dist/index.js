"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.tsx
var design_system_exports = {};
__export(design_system_exports, {
  BoxedValue: () => BoxedValue,
  Button: () => Button,
  Table: () => Table
});
module.exports = __toCommonJS(design_system_exports);

// Button.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Button = ({
  primary = false,
  label = "Boop",
  size = "small"
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_react_table = require("@tanstack/react-table");
var import_jsx_runtime2 = require("react/jsx-runtime");
function Table({ data, onRowClick }) {
  const columnHelper = (0, import_react_table.createColumnHelper)();
  const columns = [
    columnHelper.accessor("uniqueIdentifier", {
      cell: (info) => info.getValue(),
      header: "Id"
    })
  ];
  const table = (0, import_react_table.useReactTable)({
    data,
    columns,
    getCoreRowModel: (0, import_react_table.getCoreRowModel)()
  });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("table", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("thead", { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tr", { children: headerGroup.headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: header.isPlaceholder ? null : (0, import_react_table.flexRender)(
      header.column.columnDef.header,
      header.getContext()
    ) }, header.id)) }, headerGroup.id)) }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tbody", { children: table.getRowModel().rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tr", { onClick: () => onRowClick(row.original), children: row.getVisibleCells().map((cell) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { children: (0, import_react_table.flexRender)(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) })
  ] });
}

// atoms/boxed-value/index.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var BoxedValue = ({ value }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "flex justify-center items center rounded font-medium text-xs", children: value });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BoxedValue,
  Button,
  Table
});

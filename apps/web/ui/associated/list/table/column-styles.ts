import { Column } from "../../../../ecs/components/row";

export const generateColumnStyle = (column: Column) => {
  switch(column.breakpoint) {
    case "xs":
      return "max-xs:hidden";
    case "sm":
      return "max-sm:hidden";
    case "md":
      return "max-md:hidden";
    case "lg":
      return "max-lg:hidden";
    case "xl":
      return "max-xl:hidden";
    case "2xl":
      return "max-2xl:hidden";
    case "max-xs":
      return "xs:hidden";
    case "max-sm":
      return "sm:hidden";
    case "max-md":
      return "md:hidden";
    case "max-lg":
      return "lg:hidden";
    case "max-xl":
      return "xl:hidden";
    case "max-2xl":
      return "2xl:hidden";
  }
};

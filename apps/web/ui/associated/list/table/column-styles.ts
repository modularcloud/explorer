import { Column } from "../../../../ecs/components/row";

export const generateColumnStyle = (column: Column) => {
  if (column.hiddenOnDesktop) {
    return "xs:hidden";
  }
  if (column.hiddenOnMobile) {
    return "max-xs:hidden";
  }
  if (column.showOnlyIfDifferent) {
    return "hidden";
  }
};

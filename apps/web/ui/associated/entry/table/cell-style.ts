import { Cell } from "../../../../ecs/components/row";

export const generateCellStyle = (cell: Cell) => {
  switch (cell.type) {
    case "badge":
    case "status":
      return "sm:w-[167px] md:w-[175px]";
  }
};

import { FetchLoadArgs } from "../../../lib/utils";

export interface TableRowProps {
    name?: string;
    header?: boolean;
    row: FetchLoadArgs;
  };
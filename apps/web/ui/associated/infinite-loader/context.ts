import { createContext } from "react";
import { FetchLoadArgs } from "~/lib/shared-utils";

export const InfiniteLoaderContext = createContext<FetchLoadArgs[]>([]);

import { FetchLoadArgs } from "../../../../../../lib/utils";
import Table from "./component";

export default async function TablePage({
    params,
  }: {
    params: FetchLoadArgs;
  }) {
    /**
     * For now, we will default to the table view
     */

    // @ts-expect-error Async Server Component
    return <Table resourcePath={params} />;
  }
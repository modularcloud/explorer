import { FetchLoadArgs } from "../../../../../../lib/utils";
import Feed from "./component";

export default async function FeedPage({
    params,
  }: {
    params: FetchLoadArgs;
  }) {
    /**
     * For now, we will default to the table view
     */

    // @ts-expect-error Async Server Component
    return <Feed resourcePath={params} />;
  }
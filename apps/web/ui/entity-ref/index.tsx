import Link from "next/link";
import { FetchLoadArgs } from "~/lib/utils";

export function EntityRef({ entity }: { entity: FetchLoadArgs }) {
  return (
    <Link
      className="underline"
      href={`/${entity.network}/${entity.type}/${entity.query}`}
    >
      {entity.query}
    </Link>
  );
}

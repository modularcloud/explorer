import * as React from "react";
import { FetchLoadArgs } from "~/lib/shared-utils";

interface Props {
  params: FetchLoadArgs & {
    section: string;
  };
}

export default function Page({
  params: { network, type, query, section },
}: Props) {
  return (
    <h1 className="text-xl font-bold">{`${network}/${type}/${query}/${section}`}</h1>
  );
}

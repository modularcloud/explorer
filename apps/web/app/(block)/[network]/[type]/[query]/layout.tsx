import * as React from "react";
import { FetchLoadArgs } from "~/lib/utils";
import { HeaderTabs } from "~/ui/tabs/header-tabs";

interface Props {
  children: React.ReactNode;
  params: FetchLoadArgs;
}

export default function EntityLayout({ children, params }: Props) {
  return (
    <>
      <HeaderTabs params={params} />
      <div>{children}</div>
    </>
  );
}

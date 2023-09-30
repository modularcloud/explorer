import * as React from "react";
import { OverviewSkeleton } from "~/ui/entity/overview";

interface Props {}

export default function Loading({}: Props) {
  return <OverviewSkeleton />;
}

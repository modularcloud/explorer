"use client";

import { ErrorBoundary } from "react-error-boundary";
import { CelestiaWidgetSkeleton } from "./skeleton";

export function CelestiaWidgetLayoutErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={CelestiaWidgetSkeleton}>
      {children}
    </ErrorBoundary>
  );
}

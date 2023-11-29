"use client";

import { ErrorBoundary } from "react-error-boundary";
import { SVMWidgetSkeleton } from "./skeleton";

export function SVMWidgetLayoutErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={SVMWidgetSkeleton}>
      {children}
    </ErrorBoundary>
  );
}

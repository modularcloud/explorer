"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Placeholder } from "~/ui/network-widgets/widgets/placeholder";

export function CelestiaWidgetLayoutErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={CelestiaWidgetErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}

export function CelestiaWidgetErrorFallback(props: {
  error: { message: string };
}) {
  return (
    <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 auto-rows-[145px] auto-cols-[145px] relative">
      <div className="absolute inset-0 backdrop-blur-md rounded-lg text-center p-24 border border-red-400">
        <p className="text-red-400 text-lg">
          ⚠️ An Error Occured while loading the widgets :&nbsp;
          <strong className="font-medium">{props.error.message}</strong>
        </p>
      </div>

      <Placeholder className="lg:row-start-1 lg:col-start-3" />

      <Placeholder className="col-span-2 row-span-2" />

      <Placeholder className="lg:row-start-2 lg:col-start-3" />

      <Placeholder className="lg:row-start-3 lg:col-start-1" />

      <Placeholder className="lg:row-start-3 lg:col-start-5 sm:col-start-4 sm:row-start-1 row-start-3 col-start-2" />

      <Placeholder className="lg:col-span-1 row-span-1 hidden lg:block lg:row-start-3" />
      <Placeholder className="lg:col-span-1 row-span-1 hidden lg:block lg:row-start-3" />
      <Placeholder className="lg:col-span-1 row-span-1 hidden lg:block lg:row-start-3" />

      <Placeholder className="col-span-2 row-span-2 order-first lg:row-start-1 lg:col-start-4" />
    </div>
  );
}

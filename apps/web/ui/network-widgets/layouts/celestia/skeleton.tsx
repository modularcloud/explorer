import clsx from "clsx";
import { Placeholder } from "~/ui/network-widgets/widgets/placeholder";

export function CelestiaWidgetSkeleton(props: { error?: { message: string } }) {
  return (
    <div
      className={clsx(
        "w-full",
        "grid grid-cols-2 tab:grid-cols-4 lg:grid-cols-5",
        "[grid-template-areas:var(--grid-area-mobile)]",
        "tab:[grid-template-areas:var(--grid-area-tab)]",
        "lg:[grid-template-areas:var(--grid-area-lg)]",
        "w-full gap-8 tab:gap-10 max-w-full auto-rows-[145px] auto-cols-[145px] relative",
      )}
    >
      {props.error && (
        <div className="absolute inset-0 backdrop-blur-md rounded-lg text-center p-24 border border-red-400">
          <p className="text-red-400 text-lg">
            ⚠️ An Error Occured while loading the widgets :&nbsp;
            <strong className="font-medium">{props.error?.message}</strong>
          </p>
        </div>
      )}

      <Placeholder className="[grid-area:LT]" />
      <Placeholder className="[grid-area:TR]" />
      <Placeholder className="[grid-area:LB]" />
      <Placeholder className="[grid-area:NS]" />
      <Placeholder className="[grid-area:BK]" />
      <Placeholder className="[grid-area:BL]" />
      <Placeholder className="[grid-area:GP]" />
      <Placeholder className="hidden lg:block [grid-area:P1]" />
      <Placeholder className="hidden lg:block [grid-area:P2]" />
    </div>
  );
}

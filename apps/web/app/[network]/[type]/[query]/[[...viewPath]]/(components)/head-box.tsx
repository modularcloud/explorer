import clsx from "clsx";

export default function HeadBox({ children, spacingPurposesOnly, classes }: { children?: React.ReactNode, spacingPurposesOnly?: boolean, classes?: string }) {
  return <th aria-hidden={spacingPurposesOnly} className={clsx(classes, "sticky top-[4.25rem]")}>
    <div className={clsx(classes, "h-10 py-2 bg-translucent backdrop-blur-xs border-b border-b-night-100 h-10 font-bold")}>
      {children}
    </div>
  </th>;
}
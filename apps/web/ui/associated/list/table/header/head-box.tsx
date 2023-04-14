import clsx from "clsx";

// I have no idea why tailwind is not working for this
const positioningStyle = {
  top: "4.25rem",
};

export default function HeadBox({
  children,
  spacingPurposesOnly,
  classes,
  colspan,
}: {
  children?: React.ReactNode;
  spacingPurposesOnly?: boolean;
  classes?: string;
  colspan?: number;
}) {
  return (
    <th
      aria-hidden={spacingPurposesOnly}
      style={positioningStyle}
      className={clsx(classes, "sticky")}
      colSpan={colspan ?? 1}
    >
      <div
        className={clsx(
          classes,
          "h-10 py-2 bg-translucent backdrop-blur-xs border-b border-b-night-100 h-10 font-bold"
        )}
      >
        {children}
      </div>
    </th>
  );
}

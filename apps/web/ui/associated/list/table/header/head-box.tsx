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
  hideText,
}: {
  children?: React.ReactNode;
  spacingPurposesOnly?: boolean;
  classes?: string;
  colspan?: number;
  hideText?: boolean;
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
          "bg-translucent backdrop-blur-xs border-b-night-100 h-10 h-10 border-b py-2 font-bold",
        )}
      >
        {hideText ? <div className="invisible">{children}</div> : children}
      </div>
    </th>
  );
}

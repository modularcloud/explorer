import Image from "next/image";
import * as React from "react";
import { Card } from "~/ui/card";
import { cn } from "~/ui/shadcn/utils";

type ImageCheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type" | "className"
> & {
  image?: string;
  className?: string;
  label: string;
  type?: "checkbox" | "radio";
  direction?: "horizontal" | "vertical";
};

export function ImageCheckbox({
  image,
  label,
  value,
  className,
  direction = "vertical",
  type = "checkbox",
  ...checkboxProps
}: ImageCheckboxProps) {
  const checkboxId = React.useId();
  return (
    <div className="w-full h-full flex">
      <input
        type={type}
        id={checkboxId}
        defaultValue={value}
        className="peer sr-only"
        {...checkboxProps}
      />
      <Card
        as="label"
        htmlFor={checkboxId}
        className={cn(
          "flex items-center cursor-pointer",
          "peer-checked:border-primary peer-checked:border-2",
          "peer-disabled:cursor-default",
          {
            "py-2": !!image,
            "py-3": !image,
            "flex-col justify-center text-xs": direction === "vertical",
            "flex-row text-sm gap-2": direction === "horizontal",
          },
          className,
        )}
      >
        {image && (
          <div className="h-8 w-8 p-1">
            <Image
              src={image}
              alt={label}
              width={32}
              height={32}
              className="object-center object-contain aspect-square"
            />
          </div>
        )}
        <p className="overflow-x-hidden whitespace-nowrap text-ellipsis flex-shrink flex-grow-0 max-w-full">
          {label}
        </p>
      </Card>
    </div>
  );
}

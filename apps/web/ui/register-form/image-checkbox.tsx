import Image from "next/image";
import * as React from "react";
import { Card } from "~/ui/card";
import { cn } from "~/ui/shadcn/utils";

type ImageCheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "type"
> & {
  image?: string;
  label: string;
  type?: "checkbox" | "radio";
};

export function ImageCheckbox({
  image,
  label,
  value,
  type = "checkbox",
  ...checkboxProps
}: ImageCheckboxProps) {
  const checkboxId = React.useId();
  return (
    <div>
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
          "flex flex-col text-xs items-center cursor-pointer",
          "peer-checked:border-primary peer-checked:border-2",
          "peer-disabled:cursor-default",
          {
            "py-2": !!image,
            "py-3": !image,
          },
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
        {label}
      </Card>
    </div>
  );
}

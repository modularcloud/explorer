import { Badge } from "~/ui/badge";
import { OldStatus } from "~/ui/old-status";
import { Cell } from "~/ecs/components/row";
import { CompactDate } from "~/ui/compact-date";
import { LongVal } from "~/ui/long-val";
import Image from "next/image";
import SvgGreenTick from "~/ui/icons/GreenTick";
import SvgRedCross from "~/ui/icons/RedCross";
import { OldCopyableValue } from "~/ui/old-copyable";

export function CellBox({ value }: { value: Cell }) {
  if (value.type === "badge") {
    return <Badge text={value.payload.text} extra={value.payload.extraCount} />;
  }
  if (value.type === "standard") {
    return value.payload ? <OldCopyableValue value={value.payload} /> : <></>;
  }
  if (value.type === "status") {
    return <OldStatus status={value.payload} />;
  }
  if (value.type === "icon") {
    switch (value.payload) {
      case "SUCCESS":
        return <SvgGreenTick />;
      case "FAILURE":
        return <SvgRedCross />;
    }
  }
  if (value.type === "longval") {
    return (
      <OldCopyableValue value={value.payload.value}>
        <LongVal
          value={value.payload.value}
          max={value.payload.maxLength ?? 50}
          step={value.payload.stepDown ?? 10}
          strategy={value.payload.strategy}
        />
      </OldCopyableValue>
    );
  }
  if (value.type === "block") {
    return (
      <OldCopyableValue value={value.payload.number}>
        <div className="flex flex-nowrap whitespace-nowrap">
          {value.payload.number}
          <CompactDate
            classes="pl-1 before:content-['('] after:content-[')'] hidden md:block"
            datetime={value.payload.timestamp}
          />
        </div>
      </OldCopyableValue>
    );
  }
  if (value.type === "image") {
    return value.payload ? (
      <Image
        src={value.payload.src}
        alt={value.payload.alt}
        width={value.payload.width}
        height={value.payload.height}
      />
    ) : (
      <Image
        src="/images/placeholder-square.jpg"
        alt="Image not found"
        width="24"
        height="24"
      />
    );
  }
  return null;
}

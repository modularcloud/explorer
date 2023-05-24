import { Badge } from "../../../badge";
import { Status } from "../../../status";
import { Cell } from "../../../../ecs/components/row";
import { CompactDate } from "../../../compact-date";
import { LongVal } from "../../../long-val";
import Image from "next/image";
import SvgGreenTick from "../../../icons/GreenTick";
import SvgRedCross from "../../../icons/RedCross";

export function CellBox({ value }: { value: Cell }) {
  if (value.type === "badge") {
    return <Badge text={value.payload.text} extra={value.payload.extraCount} />;
  }
  if (value.type === "standard") {
    return <>{String(value.payload)}</>;
  }
  if (value.type === "status") {
    return <Status status={value.payload} />;
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
      <LongVal
        value={value.payload.value}
        max={value.payload.maxLength ?? 50}
        step={value.payload.stepDown ?? 10}
        strategy={value.payload.strategy}
      />
    );
  }
  if (value.type === "block") {
    return (
      <div className="whitespace-nowrap flex flex-nowrap">
        {value.payload.number}
        <CompactDate
          classes="pl-1 before:content-['('] after:content-[')'] hidden md:block"
          datetime={value.payload.timestamp}
        />
      </div>
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

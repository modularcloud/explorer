import SvgGreenTick from "../../../../app/[network]/[type]/[query]/[[...viewPath]]/(components)/(icons)/GreenTick";
import SvgRedCross from "../../../../app/[network]/[type]/[query]/[[...viewPath]]/(components)/(icons)/RedCross";
import { Badge } from "../../../../app/[network]/[type]/[query]/[[...viewPath]]/(components)/badge";
import { Status } from "../../../../app/[network]/[type]/[query]/[[...viewPath]]/(components)/status";
import { Cell } from "../../../../ecs/components/row";
import { CompactDate } from "../../../compact-date";
import { LongVal } from "../../../long-val";

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
        <CompactDate classes="pl-1 before:content-['('] after:content-[')'] hidden md:block" datetime={value.payload.timestamp} />
      </div>
    );
  }
  return null;
}

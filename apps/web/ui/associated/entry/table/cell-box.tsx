import SvgGreenTick from "../../../../app/[network]/[type]/[query]/[[...viewPath]]/(components)/(icons)/GreenTick";
import SvgRedCross from "../../../../app/[network]/[type]/[query]/[[...viewPath]]/(components)/(icons)/RedCross";
import { Badge } from "../../../../app/[network]/[type]/[query]/[[...viewPath]]/(components)/badge";
import { Status } from "../../../../app/[network]/[type]/[query]/[[...viewPath]]/(components)/status";
import { Cell } from "../../../../ecs/components/row";
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
  if (value.type === "hashOrAddress") {
    return <LongVal value={value.payload} max={50} step={10} />;
  }
  return null;
}

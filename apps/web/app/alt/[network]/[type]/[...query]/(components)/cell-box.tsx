import { z } from "zod";
import { AssociatedArchetype } from "../../../../../../ecs/archetypes/associated";
import SvgGreenTick from "./(icons)/GreenTick";
import SvgRedCross from "./(icons)/RedCross";
import { Badge } from "./badge";
import { Status } from "./status";

export function CellBox({
  value,
}: {
  value: z.infer<(typeof AssociatedArchetype)["row"]>["data"][0]["cell"];
}) {
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
  return null;
}

export type SimpleJsonSchema = (
  | {
      type: "object";
      properties: Record<string, SimpleJsonSchema>;
    }
  | {
      type: "array";
      items: SimpleJsonSchema;
    }
  | { type: "string" }
  | { type: "boolean" }
) & {
  contentEncoding?: string;
  contentMediaType?: string;
  "x-label"?: string;
  "x-jsonata"?: string;
  "x-render"?: "timestamp";
  "x-units"?: "seconds" | "milliseconds";
};

export function jsonSchemaToPage(
  data: Record<string, any>,
  jsonSchema: {
    type: "object";
    properties: Record<string, SimpleJsonSchema>;
  },
) {
  const properties = jsonSchema.properties;
  const obj: Record<string, any> = {};
  for (const key in properties) {
    const newKey =
      properties[key]["x-label"] ??
      key // "myExampleKey" => "My Example Key"
        .replace(/([A-Z])/g, " $1") // Add space before capital letters
        .replace(/\s+/g, " ") // Remove extra spaces
        .trim()
        .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize first letter
    const value = data[key];
    if (value === undefined) {
      continue;
    }
    if (properties[key].type === "object") {
      continue;
    }
    if (properties[key].type === "array") {
      continue;
    }
    if (properties[key].type === "boolean") {
      continue;
    }
    // if (properties[key].type === "string") {
    if (typeof value !== "string") {
      console.warn(
        `Expected string for ${key}, got ${typeof value}. Skipping...`,
      );
      continue;
    }

    let standardValue: string | number = value;

    if (properties[key].contentEncoding === "base16") {
      standardValue = Number(value);
    }

    switch (properties[key]["x-render"]) {
      case "timestamp":
        obj[newKey] = {
          type: "timestamp",
          payload: {
            original: value,
            value:
              Number(standardValue) *
              (properties[key]["x-units"] === "seconds" ? 1000 : 1),
          },
        };
        break;
      default:
        obj[newKey] = {
          type: "standard",
          payload: standardValue,
        };
    }
    // }
  }
  return obj;
}

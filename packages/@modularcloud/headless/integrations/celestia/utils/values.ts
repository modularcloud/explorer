import {
  StandardSchema,
  StatusSchema,
  ListSchema,
  ImageSchema,
  LongvalSchema,
  IconSchema,
  ErrorSchema,
  TimestampSchema,
  LinkSchema,
} from "../../../schemas/page";
import { z } from "zod";

export function Standard(payload: z.infer<typeof StandardSchema>["payload"]) {
  return StandardSchema.parse({
    type: "standard",
    payload,
  });
}

export function Status(payload: z.infer<typeof StatusSchema>["payload"]) {
  return StatusSchema.parse({
    type: "status",
    payload,
  });
}

export function List(payload: z.infer<typeof ListSchema>["payload"]) {
  return ListSchema.parse({
    type: "list",
    payload,
  });
}

export function Image(payload: z.infer<typeof ImageSchema>["payload"]) {
  return ImageSchema.parse({
    type: "image",
    payload,
  });
}

export function Longval(payload: z.infer<typeof LongvalSchema>["payload"]) {
  return LongvalSchema.parse({
    type: "longval",
    payload,
  });
}

export function Icon(payload: z.infer<typeof IconSchema>["payload"]) {
  return IconSchema.parse({
    type: "icon",
    payload,
  });
}

export function Error() {
  return ErrorSchema.parse({
    type: "error",
  });
}

export function Timestamp(
  original: z.infer<typeof TimestampSchema>["payload"]["original"],
) {
  return TimestampSchema.parse({
    type: "timestamp",
    payload: {
      original,
      value: new Date(original).valueOf(),
    },
  });
}

export function Link(
  payload: z.infer<typeof LinkSchema>["payload"],
): z.infer<typeof LinkSchema> {
  return LinkSchema.parse({
    type: "link",
    payload,
  });
}

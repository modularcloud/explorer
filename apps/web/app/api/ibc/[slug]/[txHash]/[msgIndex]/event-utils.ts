export type Event = {
  type: string;
  attributes: Array<{ key: string; value: string }>;
};

export function getValue(
  events: Array<Event>,
  type: string,
  key: string,
): string | undefined {
  const event = events.find((e) => e.type === type);
  return event?.attributes.find((a) => a.key === key)?.value;
}

export function getAction(events: Array<Event>): string | undefined {
  return getValue(events, "message", "action");
}

import type React from "react";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
export type ValueOf<T> = T[keyof T];

type GetEventHandlers<T extends keyof React.JSX.IntrinsicElements> = Extract<
  keyof React.JSX.IntrinsicElements[T],
  `on${string}`
>;

/**
 * Provides the event type for a given element and handler.
 *
 * @example
 *
 * type MyEvent = EventFor<"input", "onChange">;
 */
export type EventFor<
  TElement extends keyof React.JSX.IntrinsicElements,
  THandler extends GetEventHandlers<TElement>,
> = React.JSX.IntrinsicElements[TElement][THandler] extends
  | ((e: infer TEvent) => any)
  | undefined
  ? TEvent
  : never;

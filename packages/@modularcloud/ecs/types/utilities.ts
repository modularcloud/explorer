export type StringLiteralOrUnion<T> = string extends T
  ? never // must be narrower than string
  : [T] extends [never | undefined | null]
  ? never // must be wider than never and nullable
  : [T] extends [string]
  ? T // must be wider than string
  : never;

export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

export type NoUnion<Key> =
  // If this is a simple type UnionToIntersection<Key> will be the same type, otherwise it will an intersection of all types in the union and probably will not extend `Key`
  [Key] extends [UnionToIntersection<Key>] ? Key : never;

export type StringLiteral<T> = NoUnion<StringLiteralOrUnion<T>>;

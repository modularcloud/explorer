import _slugify from "slugify";

export function slugify(str: string): string {
  return _slugify(str, { lower: true, strict: true });
}

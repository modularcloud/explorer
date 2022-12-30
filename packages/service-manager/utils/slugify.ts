export function slugify(str: string): string {
  return str.replace(/\s+/, "-").replace(/\w|-/, "").toLowerCase();
}

import slugify from "slugify";

export function convertToSlug(text: string): string {
  return slugify(text, { lower: true });
}

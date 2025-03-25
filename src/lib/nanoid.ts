import { customAlphabet } from "nanoid";

export function createSlugNanoId(): string {
  const generateNanoId = customAlphabet("abcdefghijklmnopqrstuvwxyz", 14);
  return generateNanoId();
}

export function createNameNanoId(): string {
  const generateNanoId = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 14);
  return generateNanoId();
}

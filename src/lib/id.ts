export function createNewId(items: { id: number }[]): number {
  return items.length > 0 ? items[items.length - 1].id + 1 : 1;
}

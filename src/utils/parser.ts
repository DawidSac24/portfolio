const isObject = (item: unknown): item is Record<string, unknown> =>
  typeof item === "object" && item !== null;

export { isObject };

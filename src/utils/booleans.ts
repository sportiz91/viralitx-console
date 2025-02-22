const isNull = (val: unknown): val is null => val === null;
const isUndefined = (val: unknown): val is undefined => val === undefined;
const isFunction = (val: unknown): val is Function => typeof val === "function";
const isObject = (val: unknown): val is object =>
  !isNull(val) && typeof val === "object";
const isStream = (val: unknown): val is { pipe: Function } =>
  !isNull(val) &&
  isObject(val) &&
  isFunction((val as Record<string, unknown>)["pipe"]);

export { isNull, isUndefined, isFunction, isObject, isStream };

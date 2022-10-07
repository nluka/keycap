export function throwIfParamIsNotFinite(paramName: string, paramValue: number) {
  if (!Number.isFinite(paramValue)) {
    throw new RangeError(`'${paramName}' (${paramValue}) is not finite`);
  }
}

export function throwIfParamIsLessThanZero(
  paramName: string,
  paramValue: number,
) {
  if (paramValue < 0) {
    throw new RangeError(`'${paramName}' (${paramValue}) must be >= 0`);
  }
}

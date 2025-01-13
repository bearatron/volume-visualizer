export function isZeroFunction(func, min, max) {
  for (let i = min; i <= max; i += STEP) {
    if (func(i) !== 0) {
      return false;
    }
  }
  return true;
}

export function findIntersectionPoints(func1, func2, start, end, step) {
  if (isZeroFunction(func1, start, end) || isZeroFunction(func2, start, end)) {
    return [0]; // Special case when f(x) = 0 or g(x) = 0
  }

  const intersections = [];
  for (let x = -start; x <= end; x += step) {
    if (Math.abs(func1(x) - func2(x)) < 0.01) {
      if (!intersections.some((val) => Math.abs(val - x) < 0.1)) {
        intersections.push(x);
      }
    }
  }
  return intersections;
}

export const XAXIS = 0;
export const YAXIS = 1;

export const STEP = 0.0001;

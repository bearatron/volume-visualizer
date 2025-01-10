export function findIntersectionPoints(func1, func2, start, end, step) {
  if (
    (func1(0) === 0 && func1(1000) === 0) ||
    (func2(0) === 0 && func2(1000) === 0)
  ) {
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

export function f(x) {
  return 0.5;
}

export function g(x) {
  return 1;
}

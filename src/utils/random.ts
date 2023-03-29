export function randomItem<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function randomNumberInRange(from: number, to: number) {
  return Math.random() * (to - from) + from;
}

export function randomIntegerInRange(from: number, to: number) {
  return Math.floor(randomNumberInRange(from, to));
}

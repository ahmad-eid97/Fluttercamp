/** Simulated network latency so loaders/skeletons actually appear. */
export function delay(min = 140, max = 420): Promise<void> {
  const ms = min + Math.random() * (max - min);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

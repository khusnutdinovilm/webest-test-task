export default function generateRange(start: number, end: number): number[] {
  const length = end - start + 1;

  return Array.from({ length }, (_, i) => start + i);
}

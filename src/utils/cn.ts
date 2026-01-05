/**
 * Utility function to merge class names
 * A simple implementation that filters out falsy values
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

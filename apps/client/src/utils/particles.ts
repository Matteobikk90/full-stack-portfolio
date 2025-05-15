export const getCSSVariable = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

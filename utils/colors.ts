/**
 * Raw color values for JS props (canvas / particle effects) where Tailwind
 * utility classes can't be applied. These mirror the surface / ink tokens
 * defined in tailwind.config.js — keep them in sync.
 */
export const colors = {
  surfaceDark: "#0c0c0c", // surface.dark
  black: "#000000",
  particle: "#555555", // mid-grey particles on the light hero background
} as const;

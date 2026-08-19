/**
 * Minimal typings for authoring the template without `node_modules`.
 * With dependencies installed, `@types/react` provides full definitions.
 */
declare module 'react/jsx-runtime' {
  export function jsx(type: unknown, props: unknown, key?: unknown): unknown;
  export function jsxs(type: unknown, props: unknown, key?: unknown): unknown;
  export const Fragment: unknown;
}

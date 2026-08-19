/**
 * Global JSX so native elements (e.g. `<div>`) typecheck without `@types/react`.
 */
export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: unknown;
    }
  }
}

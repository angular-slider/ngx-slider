// Declaration for ResizeObserver a new API available in some of newest browsers:
// https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare class ResizeObserver {
}

/** Helper with compatibility functions to support different browsers */
export class CompatibilityHelper {
  /** Detect presence of ResizeObserver API */
  public static isResizeObserverAvailable(): boolean {
    return (window as any).ResizeObserver !== undefined;
  }
}

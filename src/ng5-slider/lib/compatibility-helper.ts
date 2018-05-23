/** Helper with compatibility functions to support different browsers */
export class CompatibilityHelper {
  /** Workaround for  TouchEvent constructor sadly not being available on all browsers (e.g. Firefox, Safari) */
  public static isTouchEvent(event: any): boolean {
    if ((window as any).TouchEvent !== undefined) {
      return event instanceof TouchEvent;
    }

    return event.touches !== undefined;
  }
}

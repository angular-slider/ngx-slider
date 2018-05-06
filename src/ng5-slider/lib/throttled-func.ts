export class ThrottledFunc {
  func: () => void;
  wait: number;
  previous: number = 0;
  timeout: any = null;

  constructor(func: () => void, wait: number) {
    this.func = func;
    this.wait = wait;
  }

  getTime(): number {
    return Date.now();
  }

  callLater(): void {
    this.previous = this.getTime();
    this.timeout = null;
    this.func();
  }

  call(): void {
    const now: number = this.getTime();
    const remaining: number = this.wait - (now - this.previous);

    if (remaining <= 0) {
      clearTimeout(this.timeout);
      this.timeout = null;
      this.previous = now;
      this.func();
    } else if (this.timeout === null) {
      this.timeout = setTimeout(() => this.callLater(), remaining);
    }
  }
}

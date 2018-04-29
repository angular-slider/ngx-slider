export class ThrottledFunc {
  func: () => void;
  wait: number;
  previous: number = 0;
  timeout: any = null;

  constructor(func, wait) {
    this.func = func;
    this.wait = wait;
  }

  getTime(): number {
    return Date.now();
  }

  callLater() {
    this.previous = this.getTime();
    this.timeout = null;
    this.func();
  }

  call() {
    const now = this.getTime();
    const remaining = this.wait - (now - this.previous);

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

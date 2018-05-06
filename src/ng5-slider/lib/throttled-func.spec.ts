import { ThrottledFunc } from './throttled-func';

describe('ThrottledFunc', () => {
  let calledTimes: number;
  const callback: () => void = (): void => { calledTimes++; };
  const wait: number = 100;
  let throttledFunc: ThrottledFunc;
  const baseTime: Date = new Date(2013, 9, 23);

  beforeEach(() => {
    jasmine.clock().install();

    calledTimes = 0;
    throttledFunc = new ThrottledFunc(callback, wait);

    jasmine.clock().mockDate(baseTime);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should call straight through on first call', () => {
    throttledFunc.call(); // call through
    expect(calledTimes).toEqual(1);
  });

  it('should schedule a timeout on second call right after the first one', () => {
    throttledFunc.call(); // call through
    throttledFunc.call(); // set timeout
    expect(calledTimes).toEqual(1);

    jasmine.clock().tick(100); // move time forward to trigger the timeout
    expect(calledTimes).toEqual(2);
  });

  it('should ignore a call when a timeout is already set', () => {
    throttledFunc.call(); // call through
    throttledFunc.call(); // set timeout
    throttledFunc.call(); // ignore
    expect(calledTimes).toEqual(1);

    jasmine.clock().tick(100); // move the time forward to trigger the timeout
    expect(calledTimes).toEqual(2);
  });

  it('should set timeout again after the first timeout has passed', () => {
    throttledFunc.call(); // call through
    throttledFunc.call(); // set timeout
    expect(calledTimes).toEqual(1);

    jasmine.clock().tick(100); // move the time forward to trigger the timeout
    expect(calledTimes).toEqual(2);

    throttledFunc.call(); // set timeout
    expect(calledTimes).toEqual(2);

    jasmine.clock().tick(100); // move the time forward to trigger the timeout
    expect(calledTimes).toEqual(3);
  });

  it('should call through again after the first timeout has passed twice', () => {
    throttledFunc.call(); // call through
    throttledFunc.call(); // set timeout
    expect(calledTimes).toEqual(1);

    jasmine.clock().tick(100); // move the time forward to trigger the timeout
    expect(calledTimes).toEqual(2);

    jasmine.clock().tick(100); // move the time forward to allow a call through
    expect(calledTimes).toEqual(2);

    throttledFunc.call(); // call through
    expect(calledTimes).toEqual(3);
  });
});

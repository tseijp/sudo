export class DelayController {
  listener = () => {};
  callback = () => {};
  timeStamp = 1000;

  apply(callback = () => {}, timeStamp = 1000) {
    this.callback = callback;
    this.timeStamp = timeStamp;
    return this.delay.bind(this);
  }

  delay(...args: unknown[]) {
    const timeout = window.setTimeout(this.callback, this.timeStamp, ...args);
    this.listener();
    this.listener = () => void window.clearTimeout(timeout);
  }
}

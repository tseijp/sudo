import React from "react";
import { Controller, Native, Props } from "./Controller";

class DelayController {
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

export function useDelay(callback = () => {}, timeStamp = 1000) {
  const [ctrl] = React.useState(() => new DelayController());
  React.useEffect(() => ctrl.listener, [ctrl]);
  return ctrl.apply(callback, timeStamp);
}

export function useUpdate() {
  const update = React.useState([])[1]
  return React.useCallback(() => void update([]), [update])
}

export default function $(props: Props, native: Native) {
  const update = useUpdate();
  const [ctrl] = React.useState(new Controller(props, native));
  React.useEffect(() => update(), [update])
  React.useEffect(() => ctrl.effect());
  React.useEffect(() => () => ctrl.clean(), [ctrl]);
  return ctrl.apply(props, native, update);
}

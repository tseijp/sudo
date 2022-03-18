import React from "react";
import { Controller, Props } from "./Controller";
import { DelayController } from "./DelayController";

export function useDelay(callback = () => {}, timeStamp = 1000) {
  const [ctrl] = React.useState(() => new DelayController());
  React.useEffect(() => ctrl.listener, [ctrl]);
  return ctrl.apply(callback, timeStamp);
}

export default function $(props: Props) {
  const [ctrl] = React.useState(new Controller(props));
  React.useEffect(() => ctrl.effect());
  React.useEffect(() => () => ctrl.clean(), [ctrl]);
  return ctrl.apply(props);
}

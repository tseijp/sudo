import type { Controller } from "./Controller";
export class Discriminator {
  ctrl: Controller;
  constructor(ctrl: Controller) {
    this.ctrl = ctrl;
  }
}

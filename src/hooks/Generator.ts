import SimplexNoise from "simplex-noise"
import { Controller } from "./Controller";

const { abs, random } = Math

export class Generator {
  private _ctrl: Controller;
  private _simplex: any;

  constructor(ctrl: Controller) {
    this._ctrl = ctrl;
    const { state: $ } = this;
    this._simplex = new SimplexNoise($.seed = $.seed || random());
  }

  effect() {
    const { discr, state: $ } = this._ctrl;
    if($.isFirst) {
      this._ctrl.each(k =>
        this._ctrl.each(l =>
          void discr.set(this._generate(k, l), k, l)
        )
      );
    }
    return () => {};
  }

  private _generate(i=0, j=0) {
    const { state: $ } = this;
    const noise = abs(this._simplex.noise2D(i, j) * ($.nn) << 0);
    return $.toString(noise);
  }

  get props() {
    return this._ctrl.props
  }

  get state() {
    return this._ctrl.state
  }
}

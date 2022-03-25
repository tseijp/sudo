import SimplexNoise from "simplex-noise";
import { Controller } from "./Controller";

const { abs, random } = Math;

export class Generator {
  private _ctrl: Controller;
  private _simplex: any;

  constructor(ctrl: Controller) {
    this._ctrl = ctrl;
    const { state: $ } = this._ctrl;
    this._simplex = new SimplexNoise(($.seed = $.seed || random()));
  }

  effect() {
    const { discr, state: $ } = this._ctrl;
    if ($.isFirst) {
      discr.clear();
      this._ctrl.each((j) => {
        this._ctrl.each((i) => {
          const x = this._generate(i, j);
          discr.set(x, this._ctrl.ij2m(i, j));
          discr.set(x, this._ctrl.ij2m(i, $.nn - j));
          discr.set(x, this._ctrl.ij2m($.nn - i, j));
          discr.set(x, this._ctrl.ij2m($.nn - i, $.nn - j));
        });
      });
    }
  }

  private _generate(i = 0, j = 0) {
    const { state: $ } = this._ctrl;
    const noise = abs((this._simplex.noise2D(i, j) * $.nn) << 0);
    return $.toString(noise);
  }
}

import type { Controller } from "./Controller";

export class Discriminator {
  /*
   * _m is n*n length Map include values
   */
  private _m = new Map<number, number>();
  private _ctrl: Controller;
  private _cols: Set<number>[] = [];
  private _rows: Set<number>[] = [];
  private _grids: Set<number>[] = [];

  constructor(ctrl: Controller) {
    this._ctrl = ctrl;
  }

  get(i = 0, j = -1, m = i) {
    if (!!~j) m = this._ctrl.ij2m(i, j); // j was not -1
    return this._m.get(m);
  }

  set(x = 1, i = 0, j = -1, m = i) {
    if (!~j) [i, j] = this._ctrl.m2ij(i); // j was -1
    else m = this._ctrl.ij2m(i, j);       // j was not -1
    return x && this.col(i).add(x) && this.row(j).add(x) &&
               this.grid(m).add(x) && this._m.set(m, x);
  }

  del(i = 0, j = -1, m = i) {
    if (!~j) [i, j] = this._ctrl.m2ij(m)
    else m = this._ctrl.ij2m(i, j); // j was not -1
    const x = this._m.get(m);
    return x && this.col(i).delete(x) && this.row(j).delete(x) &&
               this.grid(m).delete(x) && this._m.delete(m);
  }

  has(x = 1, i = 0, j = -1) {
    if (!~j) [i, j] = this._ctrl.m2ij(i); // j was -1
    return this.col(i).has(x) || this.row(j).has(x) || this.grid(i, j).has(x);
  }

  row(j = 0) {
    const { _rows, _ctrl } = this
    return _rows[j] = _rows[j] || this.create((i) => _ctrl.ij2m(i, j));
  }

  col(i = 0) {
    const { _cols, _ctrl } = this
    return _cols[i] = _cols[i] || this.create((j) => _ctrl.ij2m(i, j));
  }

  grid(i = 0, j = -1) {
    const { _ctrl, _grids } = this
    if (!!~j) i = (_ctrl.ij2m(i, j) / 9) << 0; // j !== -1
    return _grids[i] = _grids[i] || this.create((l) => _ctrl.kl2m(i, l));
  }

  create(fun = (i = 0) => i) {
    const set = new Set<number>();
    this._ctrl.each((i) => this._m.get(fun(i)));
    return set;
  }

  get props() {
    return this._ctrl.props;
  }

  get state() {
    return this._ctrl.state;
  }
}

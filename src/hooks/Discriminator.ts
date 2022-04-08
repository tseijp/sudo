import type { Controller } from "./Controller";


export type Args = [k: number, l: number] | [m: number]

export class Discriminator {
  /*
   * _m is n*n length Map include values
   * _0 is Set for column direction
   * _1 is Set for _row direction
   * _2 is Set for _grid group
   */
  private _ctrl: Controller;
  private _m = new Map<number, string>();
  private _0: Set<string>[] = [];
  private _1: Set<string>[] = [];
  private _2: Set<string>[] = [];

  constructor(ctrl: Controller) {
    this._ctrl = ctrl;
  }

  effect() {}

  clear() {
    this._m.clear();
    [this._0, this._1, this._2] = [[], [], []]
  }

  get(k = 0, l = -1, m = k) {
    if (!!~l) m = this._ctrl.kl2m(k, l); // l was not -1 and existing
    return this._m.get(m) || "0";
  }

  size(...args: Args) {
    const [i, j, k] = this._klm2(...args);
    return [this._col(i).size, this._row(j).size, this._grid(k).size];
  }

  set(x = "1", ...args: Args) {
    const [i, j, k, , m] = this._klm2(...args);
    if(!this.has(x, ...args)) {
      this._m.set(m, x);
      void [this._col(i), this._row(j), this._grid(k)].map(_ => _.add(x));
    }
  }

  del(...args: Args) {
    const [i, j, k, , m] = this._klm2(...args);
    const x = this._m.get(m)!;
    if(this.has(x, ...args)) {
      this._m.delete(m)
      void [this._col(i), this._row(j), this._grid(k)].map(_ => _.delete(x));
    }
  }

  items (...args: Args) {
    const ret: number[] = []
    this._ctrl.each((x) => !this.has(x+"", ...args) && ret.push(x));
    return ret
  }

  has(x = "1", ...args: Args) {
    let [i, j, k, , m] = this._klm2(...args);
    if (this._m.get(m) === x) return true;
    return this._col(i).has(x) || this._row(j).has(x) || this._grid(k).has(x);
  }

  relative(m: number, ...args: Args) {
    if(!~m) return false;
    const a = this._klm2(m);
    const b = this._klm2(...args);
    return a[0] === b[0] || a[1] === b[1] || a[2] === b[2]
  }

  private _col(k = 0 , l = -1, i = k) {
    if(!!~l) i = this._ctrl.m2ij(this._ctrl.kl2m(k, l))[0]; // l was not -1 and existing
    return this._0[i] = this._0[i] ?? this._create((j) => this._ctrl.ij2m(i, j));
  }

  private _row(k = 0, l = -1, j = k) {
    if(!!~l) j = this._ctrl.m2ij(this._ctrl.kl2m(k, l))[1]; // l was not -1 and existing
    return this._1[j] = this._1[j] ?? this._create((i) => this._ctrl.ij2m(i, j));
  }

  private _grid(i = 0, j = -1, k = i) {
    if (!!~j) [k] = this._ctrl.m2kl(this._ctrl.ij2m(i, j)); // j was not -1 and existing
    return this._2[k] = this._2[k] ?? this._create((l) => this._ctrl.kl2m(k, l));
  }

  private _create(fun = (i = 0) => i) {
    const set = new Set<string>();
    this._ctrl.each((i) => void set.add(this._m.get(fun(i))!));
    return set;
  }

  private _klm2(k = 0, l = -1, m = k) {
    if (!!~l) m = this._ctrl.kl2m(k, l); // l was not -1 and existing
    else [k, l] = this._ctrl.m2kl(m)     // l was -1 and not existing
    const [i, j] = this._ctrl.m2ij(m)
    return [i, j, k, l, m]
  }
}

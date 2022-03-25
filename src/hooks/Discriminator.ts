import type { Controller } from "./Controller";

export class Discriminator {
  /*
   * _m is n*n length Map include values
   * _0 is Set for column direction
   * _1 is Set for row direction
   * _2 is Set for grid group
   */
  private _ctrl: Controller;
  private _m = new Map<number, string>();
  private _0: Set<string>[] = [];
  private _1: Set<string>[] = [];
  private _2: Set<string>[] = [];

  constructor(ctrl: Controller) {
    this._ctrl = ctrl;
  }

  effect() {
    // console.log(this._m)
    // console.log(this._0)
    // console.log(this._1)
    // console.log(this._2)
  }

  clear() {
    this._m.clear();
    [this._0, this._1, this._2] = [[], [], []]
  }

  get(k = 0, l = -1, m = k) {
    if (!!~l) m = this._ctrl.kl2m(k, l); // l was not -1 and existing
    return this._m.get(m);
  }

  size(...args: [k: number, l: number] | [m: number]) {
    const [i, j, k] = this._klm2(...args);
    return [this.col(i).size, this.row(j).size, this.grid(k).size];
  }

  set(x = "1", ...args: [k: number, l: number] | [m: number]) {
    const [i, j, k, , m] = this._klm2(...args);
    if(!this.has(x, ...args)) {
      this._m.set(m, x);
      void [this.col(i), this.row(j), this.grid(k)].map(_ => _.add(x));
    }
  }

  del(...args: [k: number, l: number] | [m: number]) {
    const [i, j, k, , m] = this._klm2(...args);
    const x = this._m.get(m)!;
    if(this.has(x, ...args)) {
      this._m.delete(m)
      void [this.col(i), this.row(j), this.grid(k)].map(_ => _.delete(x));
    }
  }

  has(x = "1", ...args: [k: number, l: number] | [m: number]) {
    let [i, j, k, , m] = this._klm2(...args);
    if (this._m.get(m) === x) return true;
    return this.col(i).has(x) || this.row(j).has(x) || this.grid(k).has(x);
  }

  col(k = 0 , l = -1, i = k) {
    if(!!~l) i = this._ctrl.m2ij(this._ctrl.kl2m(k, l))[0]; // l was not -1 and existing
    return this._0[i] = this._0[i] ?? this._create((j) => this._ctrl.ij2m(i, j));
  }

  row(k = 0, l = -1, j = k) {
    if(!!~l) j = this._ctrl.m2ij(this._ctrl.kl2m(k, l))[1]; // l was not -1 and existing
    return this._1[j] = this._1[j] ?? this._create((i) => this._ctrl.ij2m(i, j));
  }

  grid(i = 0, j = -1, k = i) {
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
    console.log([i, j, k, l, m])
    return [i, j, k, l, m]
  }
}

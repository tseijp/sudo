import type { Controller } from "./Controller";
import { m2kl, kl2m, ij2m, m2ij } from "./utils";

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
    return () => {};
  }

  get(k = 0, l = -1, m = k) {
    if (!!~l) m = this._kl2m(k, l); // l was not -1 and existing
    return this._m.get(m);
  }

  size(...args: [k: number, l: number] | [m: number]) {
    const [i, j, k] = this._klm2(...args);
    return [this.col(i).size, this.row(j).size, this.grid(k).size];
  }

  set(x = "1", ...args: [k: number, l: number] | [m: number]) {
    const [i, j, k, , m] = this._klm2(...args);
    if(x) this._m.set(m, x);
    return [this.col(i), this.row(j), this.grid(k)].map(_ => _.add(x));
  }

  del(...args: [k: number, l: number] | [m: number]) {
    const [i, j, k, , m] = this._klm2(...args);
    const x = this._m.get(m)!;
    if(x) this._m.delete(m);
    return [this.col(i), this.row(j), this.grid(k)].map(_ => _.delete(x));
  }

  has(x = "1", ...args: [k: number, l: number] | [m: number]) {
    let [i, j, k, , m] = this._klm2(...args);
    if (this._m.get(m) === x) return true;
    return this.col(i).has(x) || this.row(j).has(x) || this.grid(k).has(x);
  }

  col(k = 0 , l = -1, i = k) {
    if(!!~l) i = this._m2ij(this._kl2m(k, l))[0]; // l was not -1 and existing
    return this._0[i] = this._0[i] || this._create((j) => this._ij2m(i, j));
  }

  row(k = 0, l = -1, j = k) {
    if(!!~l) j = this._m2ij(this._kl2m(k, l))[1]; // l was not -1 and existing
    return this._1[j] = this._1[j] || this._create((i) => this._ij2m(i, j));
  }

  grid(i = 0, j = -1, k = i) {
    if (!!~j) [k] = this._m2kl(this._ij2m(i, j)); // j was not -1 and existing
    return this._2[k] = this._2[k] || this._create((l) => this._kl2m(k, l));
  }

  private _create(fun = (i = 0) => i) {
    const set = new Set<string>();
    this._ctrl.each((i) => void set.add(this._m.get(fun(i))!));
    return set;
  }

  private _klm2(k = 0, l = -1, m = k) {
    if (!!~l) m = this._kl2m(k, l); // j was not -1 and existing
    else [k, l] = this._m2kl(m)     // j was -1 and not existing
    const [i, j] = this._m2ij(m)
    return [i, j, k, l, m]
  }

  /**
   * @TODO using wasm
   */
  private _m2kl(m = 0) {
    return m2kl(m, this.state.n, this.state.nn);
  }

  private _m2ij(m = 0) {
    return m2ij(m, this.state.n, this.state.nn, this.state.nnn);
  }

  private _kl2m(k = 0, l = 0) {
    return kl2m(k, l, this.state.n, this.state.nn);
  }

  private _ij2m(i = 0, j = 0) {
    return ij2m(i, j, this.state.n, this.state.nn, this.state.nnn);
  }


  get props() {
    return this._ctrl.props;
  }

  get state() {
    return this._ctrl.state;
  }
}

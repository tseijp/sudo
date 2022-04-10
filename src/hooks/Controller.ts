import { createElement as el } from "react";
import { Generator } from "./Generator";
import { Discriminator } from "./Discriminator";
import { m2kl, kl2m, ij2m, m2ij } from "../utils";
import { Grid, Box } from "../components";

export type Props = {
  pads: number[][]; // not using
  m: number;  
  n: number;
  x: number;
  isNum: boolean;
  isBlind: boolean;
  isFixed: boolean;
};

export type Native = {
  [key in string]: (state: State & {event: Event, args: any}) => void
};

export type State = {
  /**
   * generic state
   */
  n: number;
  nn: number;
  nnn: number;
  seed: number | string;
  isNum: boolean;
  isFirst: boolean;
  gener: Generator;
  discr: Discriminator;
  update: (...args: any) => void
  toString: (i?: number) => string;
};

export class Controller {
  // pads: Map<number, number>;
  native: Native = {} as Native
  props: Props = {} as Props;
  state: State = {} as State;
  update = () => {};


  constructor(props: Props, native: Native) {
    this.each = this.each.bind(this);
    this.props = props;
    this.native = native;
    this.state.gener = new Generator(this);
    this.state.discr = new Discriminator(this);
  }

  effect() {
    const { state: $ } = this;
    /**
     * update if change n
     */
    if($.isFirst) this.update();
    this.state.gener.effect();
    this.state.discr.effect();
    $.isFirst = false;
  }

  clean() {
    return;
  }

  apply(props: Props, native: Native, update = () => {}) {
    const { state: $ } = this;
    this.props = props;
    this.native = native;
    this.state.update = update;
    $.isFirst = props.n !== $.n;
    $.nnn = ($.nn = ($.n = props.n || 3) * $.n) * $.n;
    $.isNum = props.isNum || $.nn < 2 || 36 < $.nn;
    $.toString = $.isNum
      ? (i = 0) => i + ""
      : (i = 0) => i.toString($.nn + 1);
    return this.bind.bind(this);
  }

  bind(k: number = 0, l: number = -1) {
    const { state: $, props, native } = this;
    const { m, n, x, isBlind } = props;
    const _props: any = {};
    let _m, _x, args: any;
    args = [,,,, _m, _x] = ~l
      ? $.discr._klm2(k, l)
      : [0,0,0,0, -1, k];
    _props.$isRelative = ~l && $.discr.relative(m, k, l);
    _props.$isPrimary = ~l && _m === m;
    _props.$isEqual = ~l? _x !== 0 && _x === x: _x === x;
    _props.children = _x? $.toString(_x): isBlind ||
      el(Grid, {$n: n, $end: true}, (i=0, j=0) => {
        const __x = j * n + i + 1;
        const __c = $.discr.has(__x, k, l)? "": $.toString(__x);
        const $isEqual = __c !== "" && __x !== 0 && __x === x;
        return el(Box, {key: __x, $end: true, $isEqual}, __c);
      });

    for(const key in native)
      _props[key] = (e: Event) => native[key]({event: e, args, ...$});

    return _props;
  }

  each(fun = (_: number) => {}) {
    for (let i = 0, nn = this.state.nn; i < nn; i++) fun(i);
  }

  /**
   * @TODO using wasm
   */
  m2kl(m = 0) {
    return m2kl(m, this.state.n, this.state.nn);
  }

  m2ij(m = 0) {
    return m2ij(m, this.state.n, this.state.nn, this.state.nnn);
  }

  kl2m(k = 0, l = 0) {
    return kl2m(k, l, this.state.n, this.state.nn);
  }

  ij2m(i = 0, j = 0) {
    return ij2m(i, j, this.state.n, this.state.nn, this.state.nnn);
  }
}

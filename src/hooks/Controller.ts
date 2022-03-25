import { Generator } from "./Generator";
import { Discriminator } from "./Discriminator";
import { m2kl, kl2m, ij2m, m2ij } from "./utils";

export type Props = {
  isNum: boolean;
  n: number;
  pads: number[][];
};

export type State = {
  n: number;
  nn: number;
  nnn: number;
  isNum: boolean;
  isFirst: boolean;
  seed: number | string;
  toString: (i: number) => string;
};

export class Controller {
  // pads: Map<number, number>;
  props: Props = {} as Props;
  state: State = {} as State;
  gener: Generator;
  discr: Discriminator;
  update = () => {};

  constructor(props: Partial<Props> = {}) {
    this.each = this.each.bind(this);
    this.props = props as Props;
    this.gener = new Generator(this);
    this.discr = new Discriminator(this);
  }

  effect() {
    const { state: $ } = this;
    this.gener.effect();
    this.discr.effect();
    if ($.isFirst) this.update();
    $.isFirst = false;
  }

  clean() {
    return;
  }

  apply(props: Props, update = () => {}) {
    const { state: $ } = this;
    this.props = props;
    this.update = update;
    $.isFirst = props.n !== $.n;
    $.nnn = ($.nn = ($.n = props.n || 3) * $.n) * $.n;
    $.isNum = props.isNum || $.nn < 2 || 36 < $.nn;
    $.toString = $.isNum ? (i = 0) => i + "" : (i = 0) => i.toString($.nn);
    return this.bind.bind(this);
  }

  bind(k = 0, l = 0) {
    const props: any = {};
    props.children = this.discr.get(k, l);
    props.value = this.discr.get(k, l);
    props.onChange = () => {};
    return props;
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

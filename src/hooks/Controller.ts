import { Generator } from "./Generator";
import { Discriminator } from "./Discriminator";
export type Props = {
  isNum: boolean
  n: number;
  pads: number[][];
};

export type State = {
  n: number;
  nn: number;
  nnn: number;
  isNum: boolean;
  isFirst: boolean;
  seed: number|string;
  toString: (i: number) => string;
};

export class Controller {
  // pads: Map<number, number>;
  props: Props = {} as Props;
  state: State = {} as State;
  gener: Generator;
  discr: Discriminator;
  update = () => {}

  constructor(props: Partial<Props> = {}) {
    this.each = this.each.bind(this);
    this.props = props as Props;
    this.gener = new Generator(this);
    this.discr = new Discriminator(this);
  }

  effect() {
    const { state: $ } = this
    const _g = this.gener.effect();
    const _d = this.discr.effect();
    $.isFirst = false;
    return () => void (_g(), _d());
  }

  clean() {
    return;
  }

  apply(props: Props, update = () => {}) {
    const { state: $ } = this
    this.props = props;
    this.update = update;
    $.isFirst = props.n !== $.n;
    $.nnn = ($.nn = ($.n = props.n || 3) * $.n) * $.n;
    $.isNum = props.isNum || $.nn < 2 || 36 < $.nn;
    $.toString = $.isNum? (i=0) => i + "": (i=0) => i.toString($.nn)
    return this.bind.bind(this);
  }

  bind(k=0, l=0) {
    const props: any = {};
    props.children = this.discr.get(k, l);
    props.value = this.discr.get(k, l);
    props.onChange = () => {}
    return props;
  }

  each(fun = (_: number) => {}) {
    for (let i = 0, nn = this.state.nn; i < nn; i++) fun(i);
  }
}

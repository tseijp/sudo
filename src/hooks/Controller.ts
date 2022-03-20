import { Generator } from "./Generator";
import { Discriminator } from "./Discriminator";
import { m2kl, kl2m, ij2m, m2ij } from "./utils";

export type Props = {
  pads: number[][];
  n: number;
};

export type State = {
  pads: Set<number>;
  n: number;
};

export class Controller {
  // pads: Map<number, number>;
  props: Props = {} as Props;
  state: State = {} as State;
  gener: Generator;
  discr: Discriminator;
  constructor(props: Partial<Props> = {}) {
    // this.pads = new Map();
    this.props = props as Props;
    this.gener = new Generator(this);
    this.discr = new Discriminator(this);
    this.each = this.each.bind(this);
    this.initializa();
  }

  effect() {
    return;
  }

  clean() {
    return;
  }

  initializa() {
    // const { props, state, each } = this;
  }

  apply(props: Props) {
    this.props = props;
    return this.bind.bind(this);
  }

  bind(i = -1, j = -1, ii = -1, jj = -1) {
    const props: any = {};
    if (!~i || !~j || !~ii || !~jj) return {};
    i = i * 3 + ii;
    j = j * 3 + jj;
    props.children = this.props.pads[j][i] % 10 || undefined;
    props.onClick = () => (this.props.pads[j][i] += 1);
    return props;
  }

  each(fun = (i: number) => {}) {
    for (let i = 0, nn = this.state.n ** 2; i < nn; i++) fun(i);
  }

  /**
   * @TODO using wasm
   */
  m2kl(m = 0) {
    return m2kl(m, this.state.n);
  }

  kl2m(k = 0, l = 0) {
    return kl2m(k, l, this.state.n);
  }

  ij2m(i = 0, j = 0) {
    return ij2m(i, j, this.state.n);
  }

  m2ij(m = 0) {
    return m2ij(m, this.state.n);
  }
}

import { Generator } from "./Generator";
import { Discriminator } from "./Discriminator";

export type Props = Partial<{
  pads: number[][];
}>;

export class Controller {
  // pads: Map<number, number>;
  props: Props;
  generator;
  discriminator;
  constructor(props: Props) {
    // this.pads = new Map();
    this.props = props;
    this.generator = new Generator(this);
    this.discriminator = new Discriminator(this);
  }

  effect() {
    return;
  }

  clean() {
    return;
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
    props.children = this.props.pads?.[j]?.[i] || undefined;
    props.onClick = () => console.log(i, j);
    return props;
  }
}

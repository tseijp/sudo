import { ReactNode, createElement as el } from "react";
import styled from "styled-components";
import { ThemeProps } from "./Home";
import { range } from "../utils";
import * as styles from "./styles";

export type GridProps = Partial<{
  $isRelative: boolean;
  $isPrimary: boolean;
  $isEqual: boolean;
  $right: boolean;
  $left: boolean;
  $nav: boolean;
  $top: boolean;
  $one: boolean;
  $end: boolean;
  $i: string | number;
  $j: string | number;
  $n: string | number;
  $w: string | number;
  $h: string | number;
  children: ReactNode | ((i: number, j: number) => ReactNode);
}>;

export function Grid(props: GridProps) {
  const { $n, $nav, $one, children = () => "" } = props;
  const toFun = <T>(v: T) => (typeof v === "function" ? v : (..._: any) => v);
  const n = Number($n);
  const child = $nav? children: $one
      ? range(n).map((i) => toFun(children)(i, -1))
      : range(n).map((j) => range(n).map((i) => toFun(children)(i, j)))
  return el(Grid.Wrap, props, child);
}

function repeat<T extends string|number>(len?: T, per?: T) {
  return !len? per: `repeat(${len || 0}, ${per || "1fr"})`;
}

Grid.Wrap = styled.div<GridProps & { theme?: ThemeProps }>`
  display: grid;
  padding: ${($) => $.theme.$gap};
  grid-gap: ${($) => $.theme.$gap};
  border-radius: ${($) => $.theme.$radius};
  grid-auto-rows: 1fr;
  ${($) => `grid-template-rows: ${repeat($.$n, $.$j)};`}
  ${($) => `grid-template-columns: ${repeat($.$n, $.$i)};`}
  ${styles.oneGridStyle}
  ${styles.topGridStyle}
  ${styles.endGridStyle}
  ${styles.debugStyle}
`;

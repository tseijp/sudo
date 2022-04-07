import { ReactNode, createElement as el } from "react";
import styled, { css } from "styled-components";
import { ThemeProps, debugStyle } from "./Home";
import { range } from "../utils";

export type GridProps = Partial<{
  $i: string | number;
  $j: string | number;
  $n: string | number;
  $w: string | number;
  $h: string | number;
  $nav: boolean;
  $top: boolean;
  $one: boolean;
  $left: boolean;
  $right: boolean;
  children: ReactNode | ((i: number, j: number) => ReactNode);
}>;

export function Grid(props: GridProps) {
  const { $n, $nav, $one, children=() => ''} = props;
  const toFun = <T>(v: T) => typeof v === "function"? v: (..._: any) => v
  const n = Number($n);
  return el(Grid.Wrap, props, $nav? children: $one
      ? range(n).map(i => toFun(children)(i, -1))
      : range(n).map(j => range(n).map(i => toFun(children)(i, j)))
  );
}

function repeat(
  length: string | number = 0,
  percentage: string | number = "1fr"
) {
  if (!length) return percentage;
  return `repeat(${length}, ${percentage})`;
}

function topStyle($: GridProps & { theme: ThemeProps }) {
  if (!$.$top) return;
  return css`
    /**
     * can not work using width and height key
    */
    min-width: ${$.theme.$size};
    max-width: ${$.theme.$size};
    min-height: ${$.theme.$size};
    max-height: ${$.theme.$size};
    padding: calc(2 * ${$.theme.$gap});
  `;
}

function oneStyle($: GridProps & { theme: ThemeProps }) {
  if (!$.$one) return;
  return css`
    background: none;
    @media screen and (${($) => $.theme.$aspect}) {
      grid-auto-flow: column;
    }
  `
}

Grid.Wrap = styled.div<GridProps & { theme?: ThemeProps }>`
  display: grid;
  padding: ${($) => $.theme.$gap};
  grid-gap: ${($) => $.theme.$gap};
  background: ${($) => $.theme.$dark};
  border-radius: ${($) => $.theme.$radius};
  grid-auto-rows: 1fr;
  ${oneStyle}
  ${topStyle}
  ${debugStyle}
  ${($) => `grid-template-rows: ${repeat($.$n, $.$j)};`}
  ${($) => `grid-template-columns: ${repeat($.$n, $.$i)};`}
`;

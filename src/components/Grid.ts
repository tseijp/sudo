import { useMemo, useEffect, useRef, ReactNode, createElement as el } from "react";
import styled, { css } from "styled-components";
import { ThemeProps } from "./Home";
import { range } from "../utils";

export type GridProps = Partial<{
  $i: string | number;
  $j: string | number;
  $n: string | number;
  $w: string | number;
  $h: string | number;
  $top: boolean;
  $one: boolean;
  children: (i: number, j: number) => ReactNode;
}>;

export function Grid(props: GridProps) {
  const { $n, $one=false, children=() => '' } = props;
  const ref = useRef(children);
  useEffect(() => void (ref.current = children));
  return el(Grid.Wrap, props, useMemo(() => {
    const n = Number($n);
    if ($one) return range(n).map(i => ref.current(i, 0));
    return range(n).map(j => range(n).map(i => ref.current(i, j)));
  }, [$n, $one]));
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
    padding: calc(2 * ${$.theme.$gap});
    /*
    // this css can not work(;_;)!
    width: ${$.theme.$size};
    height: ${$.theme.$size}; */
    min-width: ${$.theme.$size};
    max-width: ${$.theme.$size};
    min-height: ${$.theme.$size};
    max-height: ${$.theme.$size};
  `;
}

Grid.Wrap = styled.div<GridProps & { theme?: ThemeProps }>`
  display: grid;
  max-width: 100%;
  max-height: 100%;
  border-radius: ${($) => $.theme.$radius};
  padding: ${($) => $.theme.$gap};
  grid-gap: ${($) => $.theme.$gap};
  background: ${($) => $.theme.$dark};
  /* background: ${() =>
    "#" + ((Math.random() * 0xffffff) | 0).toString(16)}; */
  grid-auto-rows: 1fr;
  ${($) => `grid-template-rows: ${repeat($.$n, $.$j)};`}
  ${($) => `grid-template-columns: ${repeat($.$n, $.$i)};`}
  ${topStyle}
`;

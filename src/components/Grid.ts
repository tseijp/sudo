import styled, { css } from "styled-components";
import { ThemeProps } from "./Home";

export type GridProps = { theme: ThemeProps } & Partial<{
  $i: string | number;
  $j: string | number;
  $n: string | number;
  $w: string | number;
  $h: string | number;
  $top: boolean;
}>;

function repeat(
  length: string | number = 0,
  percentage: string | number = "1fr"
) {
  if (!length) return percentage;
  return `repeat(${length}, ${percentage})`;
}

function topStyle($: GridProps) {
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

export const Grid = styled.div<GridProps>`
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

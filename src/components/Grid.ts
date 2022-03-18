import styled from "styled-components";

function repeat(
  length: string | number = 0,
  percentage: string | number = "1fr"
) {
  if (!length || length + "" === "1") return percentage;
  return `repeat(${length}, ${percentage})`;
}

export type GridProps = Partial<{
  $i: string | number;
  $j: string | number;
  $w: string | number;
  $h: string | number;
  $top: boolean;
}>;

export const Grid = styled.div<GridProps>`
  display: grid;
  max-width: 100%;
  border-radius: ${($) => $.theme.$radius};
  padding: ${($) => ($.$top ? `calc(2 * ${$.theme.$gap})` : $.theme.$gap)};
  grid-gap: ${($) => $.theme.$gap};
  background: ${($) => $.theme.$dark};
  /* background: ${() =>
    "#" + ((Math.random() * 0xffffff) | 0).toString(16)}; */
  ${({ $j, $h }) => `grid-template-rows: ${repeat($h, $j)};`}
  ${({ $i, $w }) => `grid-template-columns: ${repeat($w, $i)};`}
`;

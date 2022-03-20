import styled, { css } from "styled-components";

export type BoxProps = Partial<{
  $i: string | number;
  $j: string | number;
  $n: string | number;
  $s: string | number;
}>;

export const Box = styled.div<BoxProps>`
  display: flex;
  border: initial;
  outline: none;
  text-align: center;
  align-items: center;
  user-select: none;
  text-overflow: ellipsis;
  vertical-align: middle;
  justify-content: center;
  border-radius: ${($) => $.theme.$radius};
  background: ${($) => $.theme.$light};
  font-size: ${($) => css`min(200%, 2rem)`};
  color: ${($) => $.theme.$dark};
  ${({ $j }) => $j && `grid-row: ${$j};`}
  ${({ $i }) => $i && `grid-column: ${$i};`};
  ${($) =>
    $.theme.debug &&
    `background: ${"#" + ((Math.random() * 0xffffff) | 0).toString(16)};`};
`;

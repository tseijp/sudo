import styled from "styled-components";

export type BoxProps = Partial<{
  $i: string | number;
  $j: string | number;
  $w: string | number;
  $h: string | number;
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
  font-size: ${($) => `calc((${$.theme.$size}) / ${$.$h} - ${$.theme.$gap})`};
  height: ${($) => `calc((${$.theme.$size}) / ${$.$h} - 2 * ${$.theme.$gap})`};
  width: ${($) => `calc((${$.theme.$size}) / ${$.$w} - 2 * ${$.theme.$gap})`};
  color: ${($) => $.theme.$dark};
  ${({ $j }) => $j && `grid-row: ${$j};`}
  ${({ $i }) => $i && `grid-column: ${$i};`};
`;

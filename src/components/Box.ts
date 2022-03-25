import { ReactNode, createElement as el } from "react";
import styled from "styled-components";

export type BoxProps = Partial<{
  $i: string | number;
  $j: string | number;
  $s: string | number;
  as: string;
  id: string;
  type: string;
  children: ReactNode;
  onChange: (e: Event) => void;
}>;

export function Box<T>(props: T & BoxProps) {
  const { children } = props;
  return el(Box.Wrap, props, children !== "0" && children);
}

function useBoxWrapAttrs(props: BoxProps) {
  return props;
}

Box.Wrap = styled.div.attrs(useBoxWrapAttrs)<BoxProps>`
  display: flex;
  border: initial;
  outline: none;
  text-align: center;
  align-items: center;
  user-select: none;
  text-overflow: ellipsis;
  vertical-align: middle;
  justify-content: center;
  font-size: 2rem;
  border-radius: ${($) => $.theme.$radius};
  background: ${($) => $.theme.$light};
  color: ${($) => $.theme.$dark};
  ${({ $j }) => $j && `grid-row: ${$j};`}
  ${({ $i }) => $i && `grid-column: ${$i};`};
  ${($) =>
    $.theme.debug &&
    `background: ${"#" + ((Math.random() * 0xffffff) | 0).toString(16)};`};
`;

Box.Select = styled.div``;

import { ReactNode, createElement as el } from "react";
import styled, { css } from "styled-components";
import { ThemeProps, debugStyle } from "./Home";

export type BoxProps = Partial<{
  $isHighlight: boolean;
  $isColor: boolean;
  $i: string | number;
  $j: string | number;
  $s: string | number;
  as: string;
  id: string;
  type: string;
  children: ReactNode;
  onChange: (e: any) => void;
}>;

export function Box<T>(props: T & BoxProps) {
  const { children } = props;
  return el(Box.Wrap, props, children !== "0" && children);
}

export function colorStyle($: BoxProps & { theme: ThemeProps }) {
  if (!$.$isColor) return;
  return css`
    background: ${$.theme.$yellow};
  `;
}

export function highlightStyle($: BoxProps & { theme: ThemeProps }) {
  if (!$.$isHighlight) return;
  return css`
    background: ${$.theme.$gray};
    transition: 0.25s;
  `;
}

Box.Wrap = styled.div<BoxProps>`
  display: flex;
  outline: none;
  text-align: center;
  align-items: center;
  overflow: hidden;
  user-select: none;
  text-overflow: ellipsis;
  vertical-align: middle;
  justify-content: center;
  font-size: ${($) => $.theme.$font};
  border-radius: ${($) => $.theme.$radius};
  border-color: ${($) => $.theme.$color};
  border-width: ${($) => $.theme.$radius};
  border-style: solid;
  color: ${($) => $.theme.$color};
  ${($) => $.$j && `grid-row: ${$.$j};`}
  ${($) => $.$i && `grid-column: ${$.$i};`}
  ${highlightStyle}
  ${colorStyle}
  ${debugStyle}
`;

Box.Select = styled.div``;

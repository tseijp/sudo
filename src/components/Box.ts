import { ReactNode, createElement as el } from "react";
import styled from "styled-components";
import * as styles from "./styles";

export type BoxProps = Partial<{
  $isRelative: boolean;
  $isPrimary: boolean;
  $isEqual: boolean;
  $end: boolean;
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
  ${styles.relativeBoxStyle}
  ${styles.primaryBoxStyle}
  ${styles.equalBoxStyle}
  ${styles.endBoxStyle}
  ${styles.debugStyle}
`;

Box.Select = styled.div``;

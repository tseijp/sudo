import { ReactNode, createElement as el } from "react";
import styled from "styled-components";
import { debugStyle } from "./Home";

export type NavProps = Partial<{
  $n: number;
  children: ReactNode;
}>;

export function Nav(props: NavProps) {
  return el(Nav.Wrap, props);
}

Nav.Wrap = styled.div<NavProps>`
  display: flex;
  text-align: center;
  align-items: start;
  vertical-align: center;
  flex-direction: column-reverse;
  width: 100%;
  height: 100%;
  grid-row: ${($) => $.$n! ** 2 - 2};
  grid-column: auto;
  @media screen and (${($) => $.theme.$aspect}) {
    grid-row: auto;
    grid-column: ${($) => $.$n! ** 2 - 2};
    flex-direction: row-reverse;
  }
  ${debugStyle}
`;

Nav.Other = styled.div`
  display: flex;
  margin: 1rem;
  text-align: center;
  align-items: center;
  vertical-align: center;
  flex-direction: row;
  @media screen and (${($) => $.theme.$aspect}) {
    flex-direction: column;
  }
  ${debugStyle}
`;

Nav.Title = styled.h1`
  margin: 0;
  padding: 0;
  color: ${($) => $.theme.$color};
  font-size: ${($) => $.theme.$title};
  @media screen and (min-aspect-ratio: 1/1) {
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
`;

Nav.Select = styled.select`
  margin: auto;
  text-align: center;
  vertical-align: center;
  @media screen and (min-aspect-ratio: ${($) => $.theme.$aspect}) {
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
  border: 0;
  border-radius: ${($) => $.theme.$radius};
  background: ${($) => $.theme.$background};
  color: ${($) => $.theme.$color};
  font-size: 2rem;
  > option {
    border: 0;
    font-size: 1rem;
  }
`;

function useCheckAttrs(props: { type: string; name: string }) {
  props.type = "checkbox";
  props.name = "checkbox";
  return props;
}

Nav.Check = styled.input.attrs(useCheckAttrs)``;

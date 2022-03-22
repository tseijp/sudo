import { ReactNode, createElement as el } from "react";
import styled from "styled-components";
import { darken, lighten } from "polished";

export type NaviProps = Partial<{
  children: ReactNode
  $top: boolean
}>

export function Navi<T>(props: T & NaviProps) {
  return el(Navi.Wrap, props)
}

Navi.Wrap = styled.div<NaviProps>`
  display: flex;
  text-align: center;
  align-items: start;
  flex-direction: end;
  vertical-align: center;
  width: 100%;
  height: ${($) => $.$top? $.theme.$navi: "auto"};
  @media screen and (min-aspect-ratio: 1/1) {
    width: ${($) => $.$top? $.theme.$navi: "auto"};
    height: 100%;
    flex-direction: column;
  }
  /* background: ${() =>
    "#" + ((Math.random() * 0xffffff) | 0).toString(16)}; */
`;

Navi.Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: ${($) => $.theme.$title};
  @media screen and (min-aspect-ratio: 1/1) {
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
`;

Navi.Select = styled.select`
  margin: auto;
  text-align: center;
  vertical-align: center;
  @media screen and (min-aspect-ratio: 1/1) {
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
  border: 0;
  border-radius: ${($) => $.theme.$radius};
  background: ${($) => darken(0.05, $.theme.$light)};
  color: ${($) => lighten(0.05, $.theme.$dark)};
  font-size: 2rem;
  > option {
    border: 0;
    font-size: 1rem;
  }
`;

function useCheckAttrs(props: {type: string, name: string}) {
  props.type="checkbox"
  props.name="checkbox"
  return props
}

Navi.Check = styled.input.attrs(useCheckAttrs)`
`

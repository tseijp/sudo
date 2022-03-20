import styled from "styled-components";

export type _Navi = {
  <T>(props: T): null | JSX.Element;
  Title: <T>(props: T) => null | JSX.Element;
  Select: <T>(props: T) => null | JSX.Element;
};

export const Navi = styled.div`
  display: flex;
  text-align: center;
  align-items: start;
  flex-direction: row;
  vertical-align: center;
  width: 100%;
  height: ${($) => $.theme.$navi};
  @media screen and (min-aspect-ratio: 1/1) {
    width: ${($) => $.theme.$navi};
    height: 100%;
    flex-direction: column;
  }
  /* background: ${() =>
    "#" + ((Math.random() * 0xffffff) | 0).toString(16)}; */
` as unknown as _Navi;

Navi.Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: ${($) => $.theme.$title};
  @media screen and (min-aspect-ratio: 1/1) {
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
`;

Navi.Select = styled.div`
  display: flex;
  text-align: center;
  vertical-align: center;
  @media screen and (min-aspect-ratio: 1/1) {
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
  background: ${() => "#" + ((Math.random() * 0xffffff) | 0).toString(16)};
`;

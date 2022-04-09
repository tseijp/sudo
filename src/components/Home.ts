import { ReactNode, createElement as el } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
// import { useControls } from "leva";

export type ThemeProps = {
  /**
   * root setting
   */
  $isNum: boolean;
  $isDark: boolean;
  $isDebug: boolean;
  $isBlind: boolean;
  /**
   * color
   */
  $primary: string;
  $gray: string;
  $blue: string;
  $green: string;
  $yellow: string;
  $orange: string;
  $color: string;
  $background: string;
  /**
   * shape
   */
  $aspect: string;
  $radius: string;
  $margin: string;
  $gap: string;
  $font: string;
  $nav: string;
  $title: string;
  $size: string;
};

export const Home = (props: ThemeProps & { children: ReactNode }) => {
  const { children, $isNum, $isDark, $isBlind, $isDebug, ...other } = props;
  const theme = other as ThemeProps // useControls(other as ThemeProps, [$isDark]);
  theme.$isNum = $isNum
  theme.$isDark = $isDark
  theme.$isBlind = $isBlind
  theme.$isDebug = $isDebug
  const _children = el(Home._Wrap, {}, [el(Home._Style, {key: 0}), children])
  return el(ThemeProvider, { theme }, _children);
};

Home._Wrap = styled.div`
  position: absolute;
  overflow-x: hidden;
  display: flex;
  border: "#000";
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: crosshair;
  text-align: center;
  align-items: center;
  vertical-align: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (${($) => $.theme.$aspect}) {
    flex-direction: row;
  }
`;

Home._Style = createGlobalStyle<{ theme: ThemeProps }>`
  html,
  body,
  #root {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  body {
    font-family: system-ui;
    margin: 0;
    background: ${($) => $.theme.$background};
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }
`;

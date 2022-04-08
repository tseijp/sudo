import { ReactNode, createElement as el } from "react";
import styled, {
  css,
  createGlobalStyle,
  ThemeProvider
} from "styled-components";
import { useControls } from "leva";

export type ThemeProps = {
  /**
   * root setting
   */
  $isDebug: boolean;
  $isDark: boolean;
  $isNum: boolean;
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
  const { children, ...other } = props;
  const theme = useControls(other as ThemeProps);
  return el(ThemeProvider, { theme }, children);
};

export function debugStyle($: { theme: ThemeProps }) {
  if ($.theme.$isDebug)
    return css`
      background: ${"#" + ((Math.random() * 0xffffff) | 0).toString(16)};
    `;
}

Home.Wrap = styled.div`
  position: fixed;
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

Home.Style = createGlobalStyle<{ theme: ThemeProps }>`
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

import { createElement as el } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { lighten, darken } from "polished";
import { useControls } from "leva";

const theme = {
  $dark: lighten(0.02, "#121214"),
  $light: darken(0.02, "#ededeb"),
  $primary: "#0087ff",
  $steps: "10",
  $radius: "2.5px",
  $margin: "100px",
  $gap: "0.15rem",
  $title: "5rem",
  $navi: "5rem",
  $test: "1rem",
  $size: "min(100vw, 100vh)",
  $debug: false
};

export type ThemeProps = typeof theme;

export const Home = <T>(props: T) => {
  return el(ThemeProvider, { theme: useControls(theme), ...props });
};

Home.Wrap = styled.div`
  position: relative;
  display: flex;
  border: "#000";
  margin: auto;
  cursor: crosshair;
  text-align: center;
  align-items: flex-start;
  vertical-align: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 720px;
  max-height: 720px;
  @media screen and (min-aspect-ratio: 1/1) {
    flex-direction: row;
  }
`;

export type StyleProps = { theme: ThemeProps };

Home.Style = createGlobalStyle<StyleProps>`
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
    background: ${($) => lighten(0.02, $.theme.$dark)};
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }
`;

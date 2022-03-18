import { ReactNode, createElement as el } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";

export type HomeProps = {
  theme: unknown;
  children?: null | ReactNode;
};

export const Home = (props: HomeProps) => {
  return el(ThemeProvider, props);
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

Home.Style = createGlobalStyle`
  html,
  body,
  #root {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  body {
    font-family: system-ui;
    margin: 0;
  }

  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }
`;

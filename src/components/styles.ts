import { css } from "styled-components"
import { GridProps } from "./Grid";
import { ThemeProps } from "./Home"

/**
 * each debug styles
 */
export function debugStyle($: { theme: ThemeProps }) {
  if ($.theme.$isDebug)
    return css`
      background: ${"#" + ((Math.random() * 0xffffff) | 0).toString(16)};
    `;
}

/**
 * Box styles
 */
export function relativeBoxStyle($: GridProps & { theme: ThemeProps }) {
  if (!$.$isRelative) return;
  return css`
    background: ${$.theme.$gray};
    transition: 0.25s;
  `;
}

export function primaryBoxStyle($: GridProps & { theme: ThemeProps }) {
  if(!$.$isPrimary) return;
  return css`
    border-color: ${$.theme.$primary};
  `
}

export function equalBoxStyle($: GridProps & { theme: ThemeProps }) {
  if (!$.$isEqual) return;
  return css`
    background: ${$.theme.$yellow};
  `;
}

/**
 * Grid Style
 */
export function topGridStyle($: GridProps & { theme: ThemeProps }) {
  if (!$.$top) return;
  return css`
    /**
     * can not work using width and height key
    */
    min-width: ${$.theme.$size};
    max-width: ${$.theme.$size};
    min-height: ${$.theme.$size};
    max-height: ${$.theme.$size};
    padding: calc(2 * ${$.theme.$gap});
  `;
}

export function oneGridStyle($: GridProps & { theme: ThemeProps }) {
  if (!$.$one) return;
  return css`
    background: none;
    @media screen and (${($) => $.theme.$aspect}) {
      grid-auto-flow: column;
    }
  `;
}

export function endGridStyle($: GridProps & { theme: ThemeProps }) {
  if (!$.$end) return;
  return css`
    width: 100%;
    height: 100%;
    border: none;
    text-align: center;
    vertical-align: center;
    font-size: calc(${$.theme.$font} / ${$.$n});
    grid-gap: 0;
    padding: 0;
    > div {
      ${debugStyle}
    }
  `;
}


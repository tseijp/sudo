import { css } from "styled-components"
import { GridProps } from "./Grid";
import { BoxProps } from "./Box";
import { ThemeProps } from "./Home";

/**
 * each debug styles
 */
export function debugStyle($: { theme: ThemeProps }) {
  if ($.theme.$isDebug) return css`
    background: ${"#" + ((Math.random() * 0xffffff) | 0).toString(16)};
  `;
}

/**
 * Box styles
 */
export function relativeBoxStyle($: BoxProps & { theme: ThemeProps }) {
  if ($.$isRelative) return css`
    background: ${$.theme.$gray};
    transition: 0.25s;
  `;
}

export function primaryBoxStyle($: BoxProps & { theme: ThemeProps }) {
  if($.$isPrimary) return css`
    border-color: ${$.theme.$primary};
  `
}

export function equalBoxStyle($: BoxProps & { theme: ThemeProps }) {
  if($.$isEqual) return css`
    background: ${$.theme.$yellow};
  `;
}

export function endBoxStyle($: BoxProps & { theme: ThemeProps }) {
  if($.$end) return css`
    font-size: ${$.theme.$hint};
    border: none;
  `;
}

/**
 * Grid Style
 */
export function topGridStyle($: GridProps & { theme: ThemeProps }) {
  if ($.$top) return css`
    /**
     * can not work using width and height key
     */
    min-width: ${$.theme.$size};
    min-height: ${$.theme.$size};
    max-width: ${$.theme.$size};
    max-height: ${$.theme.$size};
    padding: calc(2 * ${$.theme.$gap});
  `;
}

export function oneGridStyle($: GridProps & { theme: ThemeProps }) {
  if ($.$one) return css`
    background: none;
    @media screen and (${($) => $.theme.$aspect}) {
      grid-auto-flow: column;
    }
  `;
}

export function endGridStyle($: GridProps & { theme: ThemeProps }) {
  if ($.$end) return css`
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


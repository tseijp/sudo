import styled from "styled-components";

export type WrapProps = Partial<{}>;

export const Wrap = styled.div<WrapProps>`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: "#000";
  cursor: crosshair;
  text-align: center;
  align-items: center;
  vertical-align: center;
  flex-direction: column;
  justify-content: center;
  @media screen and (min-aspect-ratio: 1/1) {
    flex-direction: row;
  }
  background: ${() => "#" + ((Math.random() * 0xffffff) | 0).toString(16)};
`;

import styled from "styled-components";

export const Title = styled.h1`
  display: flex;
  height: ${($) => `calc(100% - ${$.theme.$size})`};
  @media screen and (min-aspect-ratio: 1/1) {
    width: ${($) => `calc(100% - ${$.theme.$size})`};
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
`;

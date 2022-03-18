import React from "react";
import { render } from "react-dom";
import { lighten, darken } from "polished";
import { Grid, Box, Home, Navi } from "./components";
import { useControls } from "leva";
import $ from "./hooks";

function range(n = 0) {
  const ret = new Array(n);
  for (; n--; ) ret[n] = n;
  return ret;
}

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
  $size: "min(100vw, 100vh)"
};

const pads = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function App() {
  const bind = $({ pads });

  return (
    <Home theme={useControls(theme)}>
      <Home.Style />
      <Home.Wrap>
        <Navi>
          <Navi.Title>SUDO</Navi.Title>
          {/* <Navi.Select/> */}
        </Navi>
        <Grid $w="3" $h="3" $top>
          {range(3).map((j) =>
            range(3).map((i) => (
              <Grid $w="3" $h="3" key={i << j}>
                {range(3).map((jj) =>
                  range(3).map((ii) => (
                    <Box $w="9" $h="9" key={ii << jj} {...bind(i, j, ii, jj)} />
                  ))
                )}
              </Grid>
            ))
          )}
        </Grid>
      </Home.Wrap>
    </Home>
  );
}

render(<App />, document.getElementById("root"));

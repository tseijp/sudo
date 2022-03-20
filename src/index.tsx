import React from "react";
import { render } from "react-dom";
import { Grid, Box, Home, Navi } from "./components";
import $ from "./hooks";

function range(n = 0) {
  const ret = new Array(n);
  for (; n--; ) ret[n] = n;
  return ret;
}

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
  const n = 3;
  return (
    <Home>
      <Home.Style />
      <Home.Wrap>
        <Navi>
          <Navi.Title>SUDO</Navi.Title>
          {/* <Navi.Select/> */}
        </Navi>
        <Grid $n={n} $top>
          {range(n).map((j) =>
            range(n).map((i) => (
              <Grid $n={n} key={i << j}>
                {range(n).map((jj) =>
                  range(n).map((ii) => (
                    <Box $n={n * n} key={ii << jj} {...bind(i, j, ii, jj)} />
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

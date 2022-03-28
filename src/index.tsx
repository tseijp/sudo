import React from "react";
import { render } from "react-dom";
import { Grid, Box, Home, Navi, Toggle } from "./components";
import { range } from "./utils";
import $ from "./hooks";

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
  const [n, setN] = React.useState(2);
  const [isNum, setIsNum] = React.useState(false);
  const bind = $({ pads, n, isNum });
  return (
    <Home>
      <Home.Style />
      <Home.Wrap>
        <Navi $top>
          <Navi.Title>SUDO</Navi.Title>
          <Navi.Wrap>
            <Navi.Select
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              children={range(6).map((i) => (
                <option key={i}>{i}</option>
              ))}
            />
            <Box $to={7}>{n}</Box>
            <Toggle
              leftIcon="🔢"
              rightIcon="🔡"
              checked={isNum}
              onChange={(e) => setIsNum(e.target.checked)}
            />
          </Navi.Wrap>
        </Navi>
        <Grid $n={n} $top>
          {(i, j) => (
            <Grid $n={n} key={i << j}>
              {(ii, jj) => (
                <Box key={ii << jj} {...bind(i + j * n, ii + jj * n)} />
              )}
            </Grid>
          )}
        </Grid>
      </Home.Wrap>
    </Home>
  );
}

render(<App />, document.getElementById("root"));

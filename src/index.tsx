import React from "react";
import { render } from "react-dom";
import { lighten, darken } from "polished";
import { Grid, Box, Home, Nav, Toggle } from "./components";
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
  const [n, setN] = React.useState(4);
  const [isNum, setIsNum] = React.useState(false);
  const bind = $({ pads, n, isNum });
  return (
    <Home
      $dark={lighten(0.02, "#121214")}
      $light={darken(0.02, "#ededeb")}
      $aspect={`min-aspect-ratio: ${n*n+2}/${n*n}`}
      $primary="#0087ff"
      $steps="10"
      $radius="2.5px"
      $margin="100px"
      $title="min(10vw, 10vh)"
      $test="1rem"
      $nav="1rem"
      $gap="0.15rem"
      $size="min(100vw, 100vh)"
      $font={`calc(min(100vw, 100vh) / ${2*n*n})`}
      $debug={false}
    >
      <Home.Style />
      <Home.Wrap>
        <Grid $n={n} $one $left $top $nav>
          {range(n*(n-1)).map((i) => <div key={i}/>)}
          <Nav $n={n}>
            <Nav.Title>SUDO</Nav.Title>
          </Nav>
          <Nav $n={n}>
            <Nav.Other>
              <Nav.Select
                value={n}
                onChange={(e) => setN(Number(e.target.value))}
                children={range(7).map((i) => (
                  <option key={i}>{i}</option>
                ))}
              />
              <Toggle
                leftIcon="🔢"
                rightIcon="🔡"
                checked={isNum}
                onChange={(e) => setIsNum(e.target.checked)}
              />
            </Nav.Other>
          </Nav>
        </Grid>
        <Grid $n={n} $top>
          {(i, j) => (
            <Grid $n={n} key={i << j}>
              {(ii, jj) => (
                <Box key={ii << jj} {...bind(i + j * n, ii + jj * n)} />
              )}
            </Grid>
          )}
        </Grid>
        <Grid $n={n} $one $right $top>
          {(i) => (
            <Grid $n={n} key={i} $one $right>
              {(ii) => (
                <Box key={ii} children={(i*n+ii).toString(n*n)}/>
              )}
            </Grid>
          )}
        </Grid>
      </Home.Wrap>
    </Home>
  );
}

render(<App />, document.getElementById("root"));

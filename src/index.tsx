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
  const [x, setX] = React.useState("");
  const [m, setM] = React.useState(-1);
  const [n, setN] = React.useState(2);
  const [isNum, setIsNum] = React.useState(false);
  const [isDark, setIsDark] = React.useState(true);
  const [isBlind, setIsBlind] = React.useState(false);
  const [isDebug, setIsDebug] = React.useState(false);
  const bind = $({ pads, x, m, n, setM, setN, setX, isNum, isBlind });
  return (
    <Home
      $isNum={isNum}
      $isDark={isDark}
      $isBlind={isDebug}
      $isDebug={isDebug}
      $primary="#0087ff"
      $orange="#f5793a"
      $blue="#85c0f9"
      $gray={isDark ? "#939598" : "#8b888a"}
      $green={isDark ? "#538d4e" : "#6aaa64"}
      $yellow={isDark ? "#b59f3b" : "#c9b458"}
      $color={isDark ? darken(0.02, "#fff") : lighten(0.02, "#212121")}
      $background={isDark ? lighten(0.02, "#212121") : darken(0.02, "#fff")}
      $margin="100px"
      $radius="0.2rem"
      $gap="0.2rem"
      $nav="1rem"
      $title="min(10vw, 10vh)"
      $size="min(100vw, 100vh)"
      $font={`calc(min(100vw, 100vh) / ${2 * n * n})`}
      $aspect={`min-aspect-ratio: ${n * n + 2}/${n * n}`}
    >
      <Home.Style />
      <Home.Wrap>
        <Grid $n={n} $one $left $top $nav>
          {range(n * (n - 1)).map((i) => (
            <div key={i} />
          ))}
          <Nav $n={n}>
            <Nav.Title>{x || "SUDO"}</Nav.Title>
          </Nav>
          <Nav $n={n}>
            <Nav.Other>
              <Nav.Select value={n} onChange={(e) => setN(Number(e.target.value))} >
                {range(7).map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </Nav.Select>
              <Toggle checked={isDark} onChange={(e) => setIsDark(e.target.checked)} />
              <Toggle leftIcon="🔢" rightIcon="🔡" checked={isNum} onChange={(e) => setIsNum(e.target.checked)}/>
              <Toggle leftIcon="😎" rightIcon="💡" checked={isBlind} onChange={(e) => setIsBlind(e.target.checked)} />
              <Toggle leftIcon="🐛" rightIcon="👀" checked={isDebug} onChange={(e) => setIsDebug(e.target.checked)}/>
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
              {(ii) => <Box key={ii} {...bind(i * n + ii + 1)} />}
            </Grid>
          )}
        </Grid>
      </Home.Wrap>
    </Home>
  );
}

render(<App />, document.getElementById("root"));

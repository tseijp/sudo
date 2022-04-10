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
  const [x, setX] = React.useState(-1);
  const [m, setM] = React.useState(-1);
  const [n, setN] = React.useState(2);
  const [isNum, setIsNum] = React.useState(false);
  const [isDark, setIsDark] = React.useState(true);
  const [isBlind, setIsBlind] = React.useState(false);
  const [isFixed, setIsFixed] = React.useState(false);
  const [isDebug, setIsDebug] = React.useState(false);
  const bind = $({ pads, x, m, n, isNum, isBlind, isFixed}, {
    onMouseEnter: ({args: [,,,,_m,_x]}) => !isFixed && (setM(_m), setX(_x)),
    onMouseLeave: () => !isFixed && (setM(-1), setX(-1)),
    onClick: ({event, discr, args: [,,,,_m,_x]}) => {
      event.stopPropagation();
      if(!~_m) {
        if(isFixed) {
          discr.set(_x, m);
          return (setIsFixed(false), setM(-1), setX(_x));
        }
      } else {
        if(isFixed)
          return m === _m? setIsFixed(false): (setM(_m), setX(_x));
        setIsFixed(true);
      }
    }
  })

  return (
    <Home
      onClick={() => void (setIsFixed(false), setM(-1), setX(-1))}
      $isNum={isNum}
      $isDark={isDark}
      $isBlind={isDebug}
      $isDebug={isDebug}
      $primary="#0087ff"
      $orange="#f5793a"
      $blue="#85c0f9"
      $gray={isDark? "#8b888a": "#939598"}
      $green={isDark? "#538d4e": "#6aaa64"}
      $yellow={isDark? "#b59f3b": "#c9b458"}
      $color={isDark? darken(0.02, "#e0e0e0"): lighten(0.02, "#212121")}
      $background={isDark? lighten(0.02, "#212121"): darken(0.02, "#fff")}
      $margin="100px"
      $radius="1px"
      $gap="0.2rem"
      $nav="1rem"
      $title={`calc(min(100vw, 100vh) / ${4*n})`}
      $size="min(100vw, 100vh)"
      $font={`calc(min(100vw, 100vh) / ${4 * n * n})`}
      $hint={`calc(min(100vw, 100vh) / ${4 * n * n * n})`}
      $aspect={`min-aspect-ratio: ${n * n + 2}/${n * n}`}
    >
      <Grid $n={n} $one $left $top $nav>
        <Nav $n={n}>
          <Nav.Title>{"SUDO"}</Nav.Title>
        </Nav>
        <Nav $n={n}>
          <Nav.Other>
            <Nav.Select value={n} onChange={(e) => setN(Number(e.target.value))} >
              {range(5).map((i) => <option key={i}>{i+1}</option>)}
            </Nav.Select>
            <Toggle args={[isDark, (e) => setIsDark(e.target.checked)]} />
            <Toggle args={[isNum, (e) => setIsNum(e.target.checked), "🔢", "🔡"]} />
            <Toggle args={[isBlind, (e) => setIsBlind(e.target.checked), "😎", "💡"]} />
            <Toggle args={[isDebug, (e) => setIsDebug(e.target.checked), "🐛", "👀"]} />
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
    </Home>
  );
}

render(<App />, document.getElementById("root"));

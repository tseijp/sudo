import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components'
import { useSpring, animated } from 'react-spring'

// Based on react-toggle (https://github.com/aaronshaf/react-toggle/).
type ToggleProps = Partial<{
  checked: boolean
  disabled: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
  left: React.ReactNode
  right: React.ReactNode
  args: [
    checked: ToggleProps["checked"],
    onChange: ToggleProps["onChange"],
    left?: ToggleProps["left"],
    right?: ToggleProps["right"]
  ]
}>

export function Toggle <T>(props: T & ToggleProps): JSX.Element {
  let { checked, onChange, left="🌟", right="🌞", disabled=false, args, ...other } = props
  if (args) [checked, onChange, left=left, right=right] = args;
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = disabled? undefined: () => inputRef.current?.click()
  const [_, set_] = useState(checked || false);
  return (
    <Toggle.Container disabled={disabled} {...other}>
      <Toggle.Track role="button" tabIndex={-1} onClick={handleClick} disabled={disabled}>
        <Toggle.TrackCheck style={useSpring({ left: _? "0.8rem": "0rem", opacity: _? "1": "0"})}>
          <Toggle.Icon>
            {left}
          </Toggle.Icon>
        </Toggle.TrackCheck>
        <Toggle.TrackCheck style={useSpring({ right: _? "0rem": "1rem", opacity: _? "0": "1"})}>
          <Toggle.Icon>
            {right}
          </Toggle.Icon>
        </Toggle.TrackCheck>
        <Toggle.TrackThumb style={useSpring({ left: _? "2.6rem": "0rem" })}/>
      </Toggle.Track>
      <Toggle.ScreenReader
        ref={inputRef}
        type="checkbox"
        onChange={onChange}
        onClick={() => void set_(p => !p)}
        checked={_}
      />
    </Toggle.Container>
  );
}

Toggle.Container = styled.div<ToggleProps>`
  touch-action: pan-x;
  position: relative;
  cursor: pointer;
  user-select: none;
  ${_ => _.disabled && css`
    cursor: not-allowed;
    opacity: 0.5;
  `}
`

Toggle.Track = styled(animated.div)<ToggleProps>`
  width: 5rem;
  height: 2.4rem;
  border-radius: 3rem;
  background-color: #4d4d4d;
  position: relative;
  ${_ => _.disabled && css`:hover {
    transition: all 0.2s ease;
    background-color: #000000;
  }`}
`

Toggle.TrackCheck = styled(animated.div)`
  top: 0;
  bottom: 0;
  width: 1rem;
  height: 1rem;
  margin: auto 0;
  position: absolute;
`

Toggle.Icon = styled.span`
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

Toggle.TrackThumb = styled(animated.div)`
  width: 2.2rem;
  height: 2.2rem;
  border: 0.1rem solid #4d4d4d;
  border-radius: 50%;
  background-color: #fafafa;
  position: absolute;
`

Toggle.ScreenReader = styled.input`
  width: 0.1rem;
  height: 0.1rem;
  border: 0;
  margin: -0.1rem;
  clip: rect(0 0 0 0);
  overflow: hidden;
  position: absolute;
`

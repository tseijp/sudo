import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components'
import { useSpring, animated } from 'react-spring'

// Based on react-toggle (https://github.com/aaronshaf/react-toggle/).
type ToggleProps = Partial<{
  checked: boolean
  disabled: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement>
  leftIcon: React.ReactNode
  rightIcon: React.ReactNode
}>

export function Toggle <T>(props: T & ToggleProps): JSX.Element {
  const { disabled=false, onChange, leftIcon="🌟", rightIcon="🌞", ...other } = props
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = disabled? undefined: () => inputRef.current?.click()
  const [checked, setChecked] = useState(props.checked || false);
  const thumb = useSpring({ left: checked? "2.6rem": "0rem" })
  const right = useSpring({ right: checked? "0rem": "1rem", opacity: checked? "0": "1"})
  const left = useSpring({ left: checked? "0.8rem": "0rem", opacity: checked? "1": "0"})
  return (
    <Toggle.Container disabled={disabled} {...other}>
      <Toggle.Track role="button" tabIndex={-1} onClick={handleClick} disabled={disabled}>
        <Toggle.TrackCheck style={left}>
          <Toggle.Icon>
            {leftIcon}
          </Toggle.Icon>
        </Toggle.TrackCheck>
        <Toggle.TrackCheck style={right}>
          <Toggle.Icon>
            {rightIcon}
          </Toggle.Icon>
        </Toggle.TrackCheck>
        <Toggle.TrackThumb style={thumb}/>
      </Toggle.Track>
      <Toggle.ScreenReader
        ref={inputRef}
        type="checkbox"
        onChange={onChange}
        onClick={() => void setChecked(!checked)}
        checked={checked}
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

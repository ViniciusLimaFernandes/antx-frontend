import { Button as BsButton } from 'react-bootstrap'
import styled, { css } from 'styled-components'
import { colors } from 'common/styles'

export const GREEN = 'BUTTON_GREEN'
export const BLUE = 'BUTTON_BLUE'
export const RED = 'BUTTON_RED'
export const COLORS = {GREEN, BLUE, RED}

const COLORS_STYLES = {
  [COLORS.GREEN]: css`
    background: ${colors.green};
    color: white;

    &:hover {
      background: ${colors.red900};
    }
  `,

  [COLORS.BLUE]: css`
    background: ${colors.blue};
    color: white;

    &:hover {
      background: ${colors.red900};
    }
  `,

  [COLORS.RED]: css`
    background: ${colors.red};
    color: white;

    &:hover {
      background: ${colors.red900};
    }
  `
}

function styleForColor ({ color }) {
  return COLORS_STYLES[color]
}

const Button = styled(BsButton)`
  width: 100%;
  border: 0px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  transition: .10s ease all;

  ${styleForColor};

  &:hover, &:focus {
    outline: none !important;
  }
`

export default Button

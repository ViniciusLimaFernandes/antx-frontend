import React from 'react'
import Props from 'prop-types'
import { values } from 'lodash'

import Button, { COLORS } from './Button.styles'
export const GREEN = COLORS.GREEN
export const BLUE = COLORS.BLUE
export const RED = COLORS.RED

export default function ExportedButton ({ label, style, color, type, onClick, ...props }) {
  return (
    <Button color={color} style={style} type={type} onClick={onClick} {...props}>
      { label }
    </Button>
  )
}

ExportedButton.propTypes = {
  label: Props.string.isRequired,
  type: Props.string.isRequired,
  style: Props.object,
  color: Props.oneOf(values(COLORS)),
  onClick: Props.func.isRequired
}

ExportedButton.defaultProps = {
  type: 'button',
  onClick: () => null
}

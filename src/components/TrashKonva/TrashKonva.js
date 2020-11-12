import React from 'react'
import { Shape } from 'react-konva'
import { shape, number, bool, func, oneOf } from 'prop-types'

import { colors } from 'common/styles'
import { trashWidth as defaultWidth, trashHeight as defaultHeight } from 'App/config'

export const MAP_TYPE = 'MAP_TRASH'
export const LIST_TYPE = 'LIST_TRASH'

export default function TrashKonva ({
  id,
  coords: { x, y },
  draggable,
  percent,
  onDragMove,
  type
}) {
  const trashWidth = type === MAP_TYPE ? defaultWidth : 70
  const trashHeight = type === MAP_TYPE ? defaultHeight : 70

  function colorForPercent (value) {
    const color = (value < .3)
      ? 'trash_green'
      : (value < .7)
        ? 'trash_yellow'
        : 'trash_red'

    const primary = colors[color]
    const secondary = colors[`${color}2`]

    return ([0, primary, .9, secondary, 1, 'transparent'])
  }

  function pointX (pointPercent) {
    return (pointPercent * trashWidth)
  }

  function pointY (pointPercent) {
    return (pointPercent * trashHeight)
  }

  function columnPercent (percent) {
    return pointY(((-.675 * percent) + .9))
  }

  function points (pX, pY) {
    return [pointX(pX),pointY(pY)]
  }

  function createTrash (context, shape) {
    context.beginPath()
  
    // Lixeira
    context.moveTo(...points(.30, .90))
    context.lineTo(...points(.70, .90))
    context.lineTo(...points(.85, .30))
    context.lineTo(...points(.15, .30))
    context.lineTo(...points(.30, .92))
  
    // Tampa
    context.moveTo(...points(.15, .225))
    context.lineTo(...points(.85, .225))

    // Apoio Para mãos da tamap
    context.moveTo(...points(.35, .225))
    context.quadraticCurveTo(...points(.5, 0), ...points(.65, .225))
  
    // Linhas
    context.moveTo(...points(.30, .4))
    context.lineTo(...points(.40, .8))
    context.moveTo(...points(.70, .4))
    context.lineTo(...points(.60, .8))
  
    context.closePath()
    context.fillStrokeShape(shape)
  }

  return (
    <Shape
      x={x} y={y}
      sceneFunc={createTrash}
      draggable={draggable}
      onDragMove={onDragMove}
      strokeWidth={ type === MAP_TYPE ? 1.5 : 2.5 }
      stroke={ type === MAP_TYPE ? 'white' : 'black' }
      fillLinearGradientStartPoint={{ x: pointX(.5), y: pointY(.9) }}
      fillLinearGradientEndPoint={{ x: pointX(.5), y: columnPercent(percent) }}
      fillLinearGradientColorStops={colorForPercent(percent)}
    />
  )
}

TrashKonva.propTypes = {
  id: number.isRequired,
  coords: shape({
    x: number.isRequired,
    y: number.isRequired
  }).isRequired,
  percent: number.isRequired,
  draggable: bool.isRequired,
  onDragMove: func.isRequired,
  type: oneOf([MAP_TYPE, LIST_TYPE]).isRequired
}

TrashKonva.defaultProps = {
  coords: { x: 0, y: 0 },
  draggable: false,
  onDragMove: function () { return null }
}
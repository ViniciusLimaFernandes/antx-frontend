import React, { useRef } from 'react'
import { Rect, Group } from 'react-konva'
import ReactTooltip from "react-tooltip"
import { shape, number, bool, func } from 'prop-types'

import TrashKonva, { MAP_TYPE } from 'components/TrashKonva'
import { trashWidth, trashHeight } from 'App/config'

export default function Trash ({ id, coords: { x, y }, percent, draggable, highlight, onDragMove }) {
  const tooltip = useRef()
  
  return (
    <Group
      ref={tooltip}
      data-tip='trash-tooltip'
      onMouseEnter={ReactTooltip.show(tooltip.current)}
    >
      <Rect
        x={x}
        y={y - 1}
        width={trashWidth + 2}
        height={trashHeight + 3}
        fill={highlight ? '#FFFFFFAA' : '#000000AA'}
        cornerRadius={2}
        data-tip={id}
      />

      <TrashKonva
        id={id}
        coords={{ x, y }}
        percent={percent}
        draggable={draggable}
        onDragMove={onDragMove}
        type={MAP_TYPE}
      />
    </Group>
  )
}

Trash.propTypes = {
  id: number.isRequired,
  coords: shape({
    x: number.isRequired,
    y: number.isRequired
  }).isRequired,
  percent: number.isRequired,
  draggable: bool.isRequired,
  highlight: bool.isRequired,
  onDragMove: func.isRequired
}

Trash.defaultProps = {
  draggable: false,
  highlight: false
}
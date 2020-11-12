import React, { useEffect, createRef, useState } from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { ProgressBar, Popover as BsPopover, OverlayTrigger, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { isEmpty } from 'lodash'

import { Danger, Warning, Success, User } from './Markers'
import { mapHeight, mapWidth, senacLat, senacLong } from 'App/config'

import Button from 'components/Button'

export default function Map ({ list, user }) {
  const [highlighted, toggleHighlighted] = useState(-1)
  const [minPercent, toggleMinPercent] = useState(60)
  const [path, togglePath] = useState([])
  
  const markers = Array(list.length).fill(0).map(() => createRef())
  
  useEffect(() => {
    const highlight = list.findIndex(t => t.highlight)
    if (highlight >= 0) {
      markers[highlight].current.leafletElement.openPopup()
      toggleHighlighted(highlight)
    } else if (highlighted >= 0) {
      markers[highlighted].current.leafletElement.closePopup()
      toggleHighlighted(-1)
    }
  }, [list])
  
  function getCoords (coords) { return [coords.x, coords.y] }
  
  function renderMarker ({ id, name, percent, coords }, idx) {
    let value = (percent * 100).toFixed(2)
    const color = (value < 30)
    ? 'success'
    : (value < 70)
    ? 'warning'
    : 'danger'

    return (
      <Marker
        key={id}
        ref={markers[idx]}
        position={getCoords(coords)}
        icon={color === 'danger' ? Danger : color === 'warning' ? Warning : Success}
      >
        <Popup>
          <div style={styles.popup}>
            {name} <br /> <b>{value}%</b>
            <ProgressBar
              animated
              variant={color}
              now={value}
              style={styles.progress}
            />
          </div>
        </Popup>
      </Marker>
    )
  }

  function renderUserMarker () {
    if (isEmpty(user.coords)) { return null }

    return (
      <Marker position={[user.coords.x, user.coords.y]} icon={User}>
        <Popup>
          Sua localização
        </Popup>
      </Marker>
    )
  }

  function memoized(fn) {
    var lookupTable = {}

    var keymaker = function (args) {
      return JSON.stringify(args)
    }

    return function () {
      const key = keymaker.call(this, arguments)
      return lookupTable[key] || (lookupTable[key] = fn.apply(this, arguments))
    }
  }

  function simpleDist(pointA, pointB) {
    const x = pointA[0] - pointB[0],
          y = pointA[1] - pointB[1];

    return Math.sqrt(x * x + y * y);
  }

  function distanceFrom(pointC) {
    return function (pointA, pointB) {
      const distA = simpleDist(pointA, pointC);
      const distB = simpleDist(pointB, pointC);

      if (distA < distB) return -1;
      if (distA > distB) return 1;
      return 0;
    }
  }

  function createPath () {
    const filteredCoords = [[user.coords.x, user.coords.y]].concat(list.filter(t => (t.percent * 100) > minPercent).map(t => getCoords(t.coords)))
    console.log(filteredCoords)
    const initDistance = memoized(distanceFrom(getCoords(user.coords)))
    const coords = filteredCoords.sort(initDistance)

    if (coords.length > 1) {
      togglePath(coords)
    }
  }

  function renderButton () {
    if (isEmpty(path)) {
      return (
        <Button style={styles.createPath} label='Criar rota' variant='success' />
      )
    }

    return (
      <Button style={styles.createPath} label='Remover rota' variant='danger' onClick={() => togglePath([])} />
    )
  }

  const Popover = (
    <BsPopover id='path-popover'>
        <BsPopover.Content>
            <Form.Group style={styles.form}>
              <Form.Label style={styles.label}>Porcentagem mínima das lixeiras:</Form.Label>
          <div className='d-flex align-items-center'>
              <Form.Control style={styles.percent} type='number' placeholder='' value={minPercent} onChange={ev => toggleMinPercent(ev.target.value)} min="0" max="100" />
            <FontAwesomeIcon onClick={createPath} fixedWidth icon={faCheck} style={styles.checkIcon} />
          </div>
            </Form.Group>
        </BsPopover.Content>
      </BsPopover>
  )
  
  return (
    <>
      <LeafletMap
        dragging={false}
        boxZoom={false}
        doubleClickZoom={false}
        keyboard={false}
        scrollWheelZoom={false}
        touchZoom={false}
        zoomControl={false}
        zoom={10}
        center={[senacLat, senacLong]}
        style={styles.map}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <Polyline positions={path} color='#000000' weight={2} smoothFactor={0} />
        {renderUserMarker()}
        {list.map(renderMarker)}
      </LeafletMap>
      <OverlayTrigger onExit={() => toggleMinPercent(60)} trigger='click' placement='top' overlay={Popover} rootClose>
        {renderButton()}
      </OverlayTrigger>
    </>
  )
}

const styles = {
  map: {
    width: mapWidth,
    height: mapHeight,
    maxWidth: '100%',
    margin: 'auto',
    borderRadius: '3px',
    boxShadow: '0px 3px 6px #00000022'
  },

  popup: {
    textAlign: 'center'
  },

  progress: {
    height: 10,
    marginTop: 5
  },

  createPath: {
    width: mapWidth,
    maxWidth: '100%',
    marginTop: 10
  },

  form: {
    margin: 0
  },

  label: {
    fontSize: 11
  },

  percent: {
    width: 130
  },

  checkIcon: {
    color: '#27AE60',
    margin: '0px 10px',
    cursor: 'pointer'
  }
}
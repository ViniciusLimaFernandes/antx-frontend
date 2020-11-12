import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Container from './Home.styles'

import List from './List'
import Map from './Map'

import Title from 'UI/Template/Title'
import Button from 'components/Button'

import { Types, Selectors } from 'ducks/trash'
import { Types as UserTypes, Selectors as UserSelectors } from 'ducks/user'

export default function () {
  const dispatch = useDispatch()
  const list = useSelector(Selectors.list)
  const user = { coords: useSelector(UserSelectors.coords) }

  const [hasPermission, togglePermission] = useState(null)

  function setLocation (x, y) {
    dispatch({
      type: UserTypes.SET_USER_COORDS,
      coords: { x, y }
    })
  }

  function fetchTrashs () {
    dispatch({ type: Types.GET_LIST_REQUEST }) 
  }

  function startLocalization () {
    navigator.geolocation.getCurrentPosition(function ({ coords: { latitude, longitude } }) {
      setLocation(latitude, longitude)
    })

    navigator.geolocation.watchPosition(function ({ coords: { latitude, longitude }}) {
      setLocation(latitude, longitude)
    })

    setInterval(fetchTrashs, (60) * 1000)
    fetchTrashs()
  }

  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({name: 'geolocation'}).then(status => {
        console.log(status)
        if (status.state === 'granted') {
          togglePermission(true)
          startLocalization()
        } else {
          togglePermission(false)
        }
      })
    } else {
      togglePermission(false)
    }
  }, [])

  function changeTrashName (id, name) {
    dispatch({ type: Types.CHANGE_TRASH_NAME, id, name })
  }

  function locateInMap (trash) {
    dispatch({ type: Types.LOCATE_IN_MAP, trash })
  }

  function hideInMap (trash) {
    dispatch({ type: Types.HIDE_LOCATION_IN_MAP, trash })
  }

  if (hasPermission === null) { return null }

  if (hasPermission === false) {
    return (
      <Container fluid>
        <Row className='pt-4 pb-5'>
          <Col xs={12} className='text-center'>
            <p>
              <span onClick={startLocalization} className='btn-link'> Clique aqui</span> para permitir o uso da sua localização.
              <br />
              Após isso, <span className='btn-link' onClick={() => window.location.reload()}>recarregue</span> a página.
            </p>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container fluid>
      <Row className='pt-4 pb-5'>
        <Col xs={12} xl={6} className='text-center'>
          <div className='pb-3'>
            <Title> Mapa do Campus </Title>
          </div>
          <Map list={list} user={user} />
        </Col>

        <Col xs={12} xl={6} className='text-center pt-4 pt-xl-0'>
          <div className='pb-3'>
            <Title> Lista de Lixeiras </Title>
          </div>
          <List
            list={list}
            locateInMap={locateInMap}
            hideInMap={hideInMap}
            changeTrashName={changeTrashName}
          />
        </Col>
      </Row>
    </Container>
  )
}
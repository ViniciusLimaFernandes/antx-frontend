import React, { useState } from 'react'
import { Stage, Layer } from 'react-konva'
import { Popover as BsPopover, OverlayTrigger, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import Trash, { LIST_TYPE } from 'components/TrashKonva'
import Button, { BLUE } from 'components/Button'

import { Container } from './List.styles'

export default function TrashList ({ list, locateInMap, hideInMap, changeTrashName }) {
  const [newName, toggleNewName] = useState('')

  function changeName ({ id }) {
    return function (_) {
      changeTrashName(id, newName)
    }
  }

  function percentSort (a, b) {
    return (b.percent - a.percent)
  }

  function createPopover (trash) {
    return (
      <BsPopover id={`popover-${trash.id}`}>
        <BsPopover.Content>
          <div className='d-flex align-items-center'>
            <Form.Control type='text' placeholder='Digite um nome novo' value={newName} onChange={ev => toggleNewName(ev.target.value)} />
            <FontAwesomeIcon onClick={changeName(trash)} fixedWidth icon={faCheck} style={styles.checkIcon} />
          </div>
        </BsPopover.Content>
      </BsPopover>
    )
  }

  return (
    <div className='d-flex justify-content-start flex-wrap'>
      {list.sort(percentSort).map(trash => {
        const Popover = createPopover(trash)
        return (
          <Container key={`trash-list-${trash.id}`} onMouseEnter={() => locateInMap(trash)} onMouseLeave={() => hideInMap(trash)}>
            <Stage key={trash.id} width={70} height={70}>
              <Layer>
                <Trash type={LIST_TYPE} percent={trash.percent} id={trash.id} />
              </Layer>
            </Stage>
            <p style={styles.trashName}> {trash.name} </p>
            <p style={styles.trashPercent}> {(trash.percent * 100).toFixed(2).replace('.', ',')}% </p>
            <OverlayTrigger onExit={() => toggleNewName('')} trigger='click' placement='top' overlay={Popover} rootClose>
              <Button color={BLUE} style={styles.nameButton} label='Alterar Nome' />
            </OverlayTrigger>
          </Container>
        )}
      )}
    </div>
  )
}

const styles = {
  nameButton: {
    width: 150,
    fontSize: 11,
    marginTop: 20
  },

  trashName: {
    margin: 0,
    marginTop: 10,
    fontSize: 18,
    lineHeight: '18px'
  },

  trashPercent: {
    fontSize: 20,
    lineHeight: '20px',
    fontWeight: 'bold',
    margin: 0,
    marginTop: 5
  },

  checkIcon: {
    color: '#27AE60',
    margin: '0px 10px',
    cursor: 'pointer'
  }
}
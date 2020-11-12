import { isNil } from 'lodash'

import Default from './Default'
import MapCoordsDto from './MapCoords.dto'

export default class TrashDto extends Default {
  constructor (data = {}) {
    super(data)
    
    this.name = data.name
    this.type = data.type
    this.percent = data.percent
    this.coords = new MapCoordsDto(data.coords)
    this.draggable = data.draggable
    this.highlight = data.highlight
  }

  static fromApi(data = {}) {
    if (isNil(data.latitude) || isNil(data.longitude)) { return null }

    const obj = {
      id: data.id,
      name: data.name,
      percent: (data.percentage / 100),
      coords: {
        x: data.latitude,
        y: data.longitude
      }
    }

    return { ...obj }
  }

  get isInMap () {
    return (!isNil(this.coords.x) && !isNil(this.coords.y))
  }
}